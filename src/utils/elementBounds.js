import { ObjectType, noteWidth } from "../data/constants";
import { isInsideRect } from "./rect";
import { getTableHeight, getTableWidth } from "./utils";
import { getViewHeight, getViewWidth, resolveViewColumns } from "./views";

const isSameElement = (a, b) => a.id === b.id && a.type === b.type;

/**
 * Bounding boxes of every table, view, area and note in diagram space.
 */
export function getElementBounds({
  tables,
  views,
  areas,
  notes,
  relationships,
  showComments,
}) {
  return [
    ...tables.map((table) => ({
      id: table.id,
      type: ObjectType.TABLE,
      locked: table.locked,
      x: table.x,
      y: table.y,
      width: getTableWidth(table),
      height: getTableHeight(table, showComments, relationships),
    })),
    ...views.map((view) => ({
      id: view.id,
      type: ObjectType.VIEW,
      locked: view.locked,
      x: view.x,
      y: view.y,
      width: getViewWidth(view),
      height: getViewHeight(
        view,
        resolveViewColumns(view, tables),
        showComments,
      ),
    })),
    ...areas.map((area) => ({
      id: area.id,
      type: ObjectType.AREA,
      locked: area.locked,
      x: area.x,
      y: area.y,
      width: area.width,
      height: area.height,
    })),
    ...notes.map((note) => ({
      id: note.id,
      type: ObjectType.NOTE,
      locked: note.locked,
      x: note.x,
      y: note.y,
      width: note.width ?? noteWidth,
      height: note.height,
    })),
  ];
}

/**
 * Elements lying fully inside any of the given areas, so that they can be
 * moved together with them like the contents of a figma section.
 * Locked elements and the ones in `exclude` are skipped.
 * @param {number[]} areaIds
 * @param {Parameters<typeof getElementBounds>[0]} diagram
 * @param {{ id: any, type: string }[]} exclude
 */
export function getAreaContents(areaIds, diagram, exclude = []) {
  const bounds = getElementBounds(diagram);
  const containers = bounds.filter(
    (b) => b.type === ObjectType.AREA && areaIds.includes(b.id),
  );
  return bounds.filter(
    (b) =>
      !b.locked &&
      !exclude.some((el) => isSameElement(el, b)) &&
      containers.some((c) => !isSameElement(c, b) && isInsideRect(b, c)),
  );
}
