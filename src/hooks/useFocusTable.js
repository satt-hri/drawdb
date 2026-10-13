import { useEffect, useRef } from "react";
import { ObjectType } from "../data/constants";
import { getTableHeight, getTableWidth } from "../utils/utils";
import useDiagram from "./useDiagram";
import useSelect from "./useSelect";
import useSettings from "./useSettings";
import useTransform from "./useTransform";

const panDuration = 300;
const flashDuration = 2000;

/**
 * Returns a function that smoothly pans the canvas so that the given table is
 * centered, then briefly highlights it. Used when a table is picked in the sidebar.
 */
export default function useFocusTable() {
  const { tables, relationships } = useDiagram();
  const { settings } = useSettings();
  const { transform, setTransform } = useTransform();
  const { setFocusFlash } = useSelect();
  const frame = useRef(null);
  const flashTimeout = useRef(null);

  useEffect(
    () => () => {
      cancelAnimationFrame(frame.current);
      clearTimeout(flashTimeout.current);
    },
    [],
  );

  return (tableId) => {
    const table = tables.find((t) => t.id === tableId);
    if (!table) return;

    const start = transform.pan;
    const target = {
      x: table.x + getTableWidth(table) / 2,
      y:
        table.y +
        getTableHeight(table, settings.showComments, relationships) / 2,
    };
    const startTime = performance.now();

    cancelAnimationFrame(frame.current);
    const step = (now) => {
      const progress = Math.min(1, (now - startTime) / panDuration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setTransform((prev) => ({
        ...prev,
        pan: {
          x: start.x + (target.x - start.x) * eased,
          y: start.y + (target.y - start.y) * eased,
        },
      }));
      if (progress < 1) frame.current = requestAnimationFrame(step);
    };
    frame.current = requestAnimationFrame(step);

    const key = Date.now();
    setFocusFlash({ id: tableId, type: ObjectType.TABLE, key });
    clearTimeout(flashTimeout.current);
    flashTimeout.current = setTimeout(
      () => setFocusFlash((prev) => (prev?.key === key ? null : prev)),
      flashDuration,
    );
  };
}
