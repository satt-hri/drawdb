import { useSettings, useTransform } from "../hooks";
import {
  createContext,
  useCallback,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import { useEventListener, useResizeObserver } from "usehooks-ts";

export const CanvasContext = createContext({
  canvas: {
    screenSize: {
      x: 0,
      y: 0,
    },
    viewBox: new DOMRect(),
  },
  coords: {
    toDiagramSpace(coords) {
      return coords;
    },
    toScreenSpace(coords) {
      return coords;
    },
  },
  pointer: {
    spaces: {
      screen: {
        x: 0,
        y: 0,
      },
      diagram: {
        x: 0,
        y: 0,
      },
    },
    style: "default",
    setStyle() {},
  },
});

export function CanvasContextProvider({ children, ...attrs }) {
  const canvasWrapRef = useRef(null);
  const { transform } = useTransform();
  const canvasSize = useResizeObserver({
    ref: canvasWrapRef,
    box: "content-box",
  });
  const screenSize = useMemo(
    () => ({
      x: canvasSize.width ?? 0,
      y: canvasSize.height ?? 0,
    }),
    [canvasSize.height, canvasSize.width],
  );
  const viewBoxSize = useMemo(
    () => ({
      x: screenSize.x / transform.zoom,
      y: screenSize.y / transform.zoom,
    }),
    [screenSize.x, screenSize.y, transform.zoom],
  );
  const viewBox = useMemo(
    () =>
      new DOMRect(
        transform.pan.x - viewBoxSize.x / 2,
        transform.pan.y - viewBoxSize.y / 2,
        viewBoxSize.x,
        viewBoxSize.y,
      ),
    [transform.pan.x, transform.pan.y, viewBoxSize.x, viewBoxSize.y],
  );

  const toDiagramSpace = useCallback(
    (coord) => ({
      x:
        typeof coord.x === "number"
          ? (coord.x / screenSize.x) * viewBox.width + viewBox.left
          : undefined,
      y:
        typeof coord.y === "number"
          ? (coord.y / screenSize.y) * viewBox.height + viewBox.top
          : undefined,
    }),
    [
      screenSize.x,
      screenSize.y,
      viewBox.height,
      viewBox.left,
      viewBox.top,
      viewBox.width,
    ],
  );

  const toScreenSpace = useCallback(
    (coord) => ({
      x:
        typeof coord.x === "number"
          ? ((coord.x - viewBox.left) / viewBox.width) * screenSize.x
          : undefined,
      y:
        typeof coord.y === "number"
          ? ((coord.y - viewBox.top) / viewBox.height) * screenSize.y
          : undefined,
    }),
    [
      screenSize.x,
      screenSize.y,
      viewBox.height,
      viewBox.left,
      viewBox.top,
      viewBox.width,
    ],
  );

  // The pointer position is kept in a ref instead of state: updating state on
  // every pointermove re-rendered the whole canvas even when nothing changed.
  // Handlers read the latest position through the getters below.
  const { settings } = useSettings();
  const [, rerenderDebugCoordinates] = useReducer((n) => n + 1, 0);
  const pointerScreenRef = useRef({ x: 0, y: 0 });
  const toDiagramSpaceRef = useRef(toDiagramSpace);
  toDiagramSpaceRef.current = toDiagramSpace;
  const pointerSpaces = useMemo(
    () => ({
      get screen() {
        return pointerScreenRef.current;
      },
      get diagram() {
        return toDiagramSpaceRef.current(pointerScreenRef.current);
      },
    }),
    [],
  );
  const [pointerStyle, setPointerStyle] = useState("default");

  /**
   * @param {PointerEvent} e
   */
  function detectPointerMovement(e) {
    const targetElm = /** @type {HTMLElement | null} */ (e.currentTarget);
    if (!e.isPrimary || !targetElm) return;

    const canvasBounds = targetElm.getBoundingClientRect();

    pointerScreenRef.current = {
      x: e.clientX - canvasBounds.left,
      y: e.clientY - canvasBounds.top,
    };
    // only the debug panel shows the live position
    if (settings.showDebugCoordinates) rerenderDebugCoordinates();
  }

  // Important for touch screen devices!
  useEventListener("pointerdown", detectPointerMovement, canvasWrapRef);

  useEventListener("pointermove", detectPointerMovement, canvasWrapRef);

  const contextValue = {
    canvas: {
      screenSize,
      viewBox,
    },
    coords: {
      toDiagramSpace,
      toScreenSpace,
    },
    pointer: {
      spaces: pointerSpaces,
      style: pointerStyle,
      setStyle: setPointerStyle,
    },
  };

  return (
    <CanvasContext.Provider value={contextValue}>
      <div {...attrs} ref={canvasWrapRef}>
        {children}
      </div>
    </CanvasContext.Provider>
  );
}
