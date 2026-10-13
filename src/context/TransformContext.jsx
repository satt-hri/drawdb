import { createContext, useCallback, useRef, useState } from "react";

export const TransformContext = createContext(null);
// A ref that always holds the latest transform. Its value never changes, so
// reading it doesn't re-render on every pan frame, unlike TransformContext.
export const TransformRefContext = createContext({ current: null });
// setTransform alone, which is stable, for components that only change the transform
export const SetTransformContext = createContext(() => {});

export default function TransformContextProvider({ children }) {
  const [transform, setTransformInternal] = useState({
    zoom: 1,
    pan: { x: 0, y: 0 },
  });
  const transformRef = useRef(transform);
  transformRef.current = transform;

  /**
   * @type {typeof DrawDB.TransformContext["setTransform"]}
   */
  const setTransform = useCallback(
    (actionOrValue) => {
      const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
      const findFirstNumber = (...values) =>
        values.find((value) => typeof value === "number" && !isNaN(value));

      setTransformInternal((prev) => {
        if (typeof actionOrValue === "function") {
          actionOrValue = actionOrValue(prev);
        }

        return {
          zoom: clamp(
            findFirstNumber(actionOrValue.zoom, prev.zoom, 1),
            0.02,
            5,
          ),
          pan: {
            x: findFirstNumber(actionOrValue.pan?.x, prev.pan?.x, 0),
            y: findFirstNumber(actionOrValue.pan?.y, prev.pan?.y, 0),
          },
        };
      });
    },
    [setTransformInternal],
  );

  return (
    <TransformContext.Provider value={{ transform, setTransform }}>
      <TransformRefContext.Provider value={transformRef}>
        <SetTransformContext.Provider value={setTransform}>
          {children}
        </SetTransformContext.Provider>
      </TransformRefContext.Provider>
    </TransformContext.Provider>
  );
}
