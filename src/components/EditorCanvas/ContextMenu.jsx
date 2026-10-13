import { Fragment } from "react";
import { Dropdown } from "@douyinfe/semi-ui";
import { useTranslation } from "react-i18next";
import { useHotkeys } from "react-hotkeys-hook";

/**
 * drawDB's own right-click menu on the canvas.
 * `menu.target` is the right-clicked element, or null for the empty canvas.
 * `actions` is a ref to the actions registered by the control panel, so the
 * menu runs the same code as the header menus and the keyboard shortcuts.
 */
export default function ContextMenu({ menu, actions, onClose }) {
  const { t } = useTranslation();

  useHotkeys("escape", onClose, { enabled: menu !== null });

  if (menu === null || !actions?.current) return null;

  const a = actions.current;
  const item = (label, shortcut, run, disabled = false) => ({
    label,
    shortcut,
    run,
    disabled,
  });

  let groups;
  if (menu.target === null) {
    groups = [
      [
        item(t("paste"), "Ctrl+V", a.paste, a.readOnly),
        item(t("select_all"), "Ctrl+A", a.selectAll),
      ],
      [
        item(t("zoom_to_fit"), "Shift+1", a.fitWindow),
        item(t("zoom_to_100"), "Shift+0", a.resetZoom),
        item(t("reset_view"), "Enter", a.resetView),
      ],
    ];
  } else if (menu.selectionSize > 1) {
    groups = [
      [item(t("zoom_to_selection"), "Shift+2", a.zoomToSelection)],
      [
        item(
          `${t("delete")} (${menu.selectionSize})`,
          "Del",
          a.deleteSelection,
          a.readOnly,
        ),
      ],
    ];
  } else {
    groups = [
      [item(t("edit"), "Ctrl+E", a.edit, a.readOnly)],
      [
        item(t("copy"), "Ctrl+C", a.copy),
        item(t("cut"), "Ctrl+X", a.cut, a.readOnly),
        item(t("duplicate"), "Ctrl+D", a.duplicate, a.readOnly),
      ],
      [
        item(
          menu.target.locked ? t("unlock") : t("lock"),
          "",
          () => a.toggleLock(menu.target),
          a.readOnly,
        ),
        item(t("zoom_to_selection"), "Shift+2", a.zoomToSelection),
      ],
      [item(t("delete"), "Del", a.deleteSelection, a.readOnly)],
    ];
  }

  return (
    <Dropdown
      key={`${menu.x},${menu.y}`}
      trigger="custom"
      visible
      position="bottomLeft"
      spacing={0}
      onClickOutSide={onClose}
      render={
        <Dropdown.Menu>
          {groups.map((group, i) => (
            <Fragment key={i}>
              {i > 0 && <Dropdown.Divider />}
              {group.map(({ label, shortcut, run, disabled }) => (
                <Dropdown.Item
                  key={label}
                  disabled={disabled}
                  onClick={() => {
                    onClose();
                    run();
                  }}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "24px",
                    minWidth: "200px",
                  }}
                >
                  <span>{label}</span>
                  <span className="text-gray-400">{shortcut}</span>
                </Dropdown.Item>
              ))}
            </Fragment>
          ))}
        </Dropdown.Menu>
      }
    >
      <div
        className="fixed w-px h-px pointer-events-none"
        style={{ left: menu.x, top: menu.y }}
      />
    </Dropdown>
  );
}
