# drawDB Canvas Controls vs Figma

This document compares the drawDB editor's canvas controls with Figma's, and lists what this branch (`feat/space-pan`) changes to match Figma.

- `Ctrl` on Windows / Linux maps to `Cmd` on macOS (bound as `mod` in code).
- Status: ✅ same as Figma　🆕 added in this branch　⚠️ different (kept on purpose)　❌ not supported yet
- None of the shortcuts below fire while focus is in an input, a textarea, a note's text area or the DBML/SQL code editor. Keys there keep their normal text-editing behavior.

---

## 1. Panning

| Action                                            | Figma                           | drawDB (before)                    | drawDB (this branch)                                                              | Status                   |
| ------------------------------------------------- | ------------------------------- | ---------------------------------- | --------------------------------------------------------------------------------- | ------------------------ |
| Hold Space + left-drag                            | Pan                             | Not supported                      | Pan. Pressing on a table, note or area also only pans and never drags the element | 🆕                       |
| Middle-button drag                                | Pan                             | Pan                                | Pan                                                                               | ✅                       |
| Right-button drag                                 | No pan (opens the context menu) | Pan                                | Pan                                                                               | ⚠️ extra in drawDB, kept |
| Mouse wheel                                       | Vertical scroll                 | Vertical scroll                    | Vertical scroll                                                                   | ✅                       |
| `Shift` + wheel                                   | Horizontal scroll               | Horizontal scroll                  | Horizontal scroll                                                                 | ✅                       |
| Two-finger trackpad swipe (vertical / horizontal) | Pan in any direction            | Vertical only (horizontal ignored) | Pan in any direction                                                              | 🆕                       |
| Arrow keys (nothing selected)                     | None                            | Pan 60px                           | Pan 60px                                                                          | ⚠️ extra in drawDB, kept |

## 2. Zooming

| Action                               | Figma                               | drawDB (before)                           | drawDB (this branch)                                                                                                                | Status               |
| ------------------------------------ | ----------------------------------- | ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `Ctrl` + wheel                       | Zoom around the cursor              | Fixed 5% per notch                        | Fixed 5% per notch (unchanged)                                                                                                      | ✅                   |
| Trackpad pinch                       | Smooth, proportional to the gesture | Fixed 5% per event, so too fast and jumpy | Smooth, proportional to the gesture, around the cursor                                                                              | 🆕                   |
| Zoom in                              | `Ctrl` + `=` (or `+`)               | `Ctrl` + `↑`                              | `Ctrl` + `=` / `Ctrl` + `Shift` + `=` / `Ctrl` + `;` (the `+` key on JIS keyboards) / `Ctrl` + numpad `+`. `Ctrl` + `↑` still works | 🆕                   |
| Zoom out                             | `Ctrl` + `-`                        | `Ctrl` + `↓`                              | `Ctrl` + `-` / `Ctrl` + numpad `-`. `Ctrl` + `↓` still works                                                                        | 🆕                   |
| Zoom to 100%                         | `Shift` + `0`                       | None (`Enter` also resets the position)   | `Shift` + `0` (changes the zoom only, keeps the position)                                                                           | 🆕                   |
| Zoom to fit all                      | `Shift` + `1`                       | `Ctrl` + `Alt` + `W`                      | `Shift` + `1`. `Ctrl` + `Alt` + `W` still works                                                                                     | 🆕                   |
| Zoom to selection                    | `Shift` + `2`                       | None                                      | `Shift` + `2`                                                                                                                       | 🆕                   |
| Reset view (100% and back to origin) | None                                | `Enter`                                   | `Enter`                                                                                                                             | ⚠️ drawDB only, kept |

## 3. Selection

| Action                         | Figma                    | drawDB (before)          | drawDB (this branch)                        | Status |
| ------------------------------ | ------------------------ | ------------------------ | ------------------------------------------- | ------ |
| Click to select                | ✅                       | ✅                       | ✅                                          | ✅     |
| Box select                     | Left-drag on empty space | Left-drag on empty space | Left-drag on empty space                    | ✅     |
| Add to / remove from selection | `Shift` + click          | `Ctrl` + click           | `Shift` + click or `Ctrl` + click           | 🆕     |
| Add a box selection            | `Shift` + box select     | `Ctrl` + box select      | `Shift` + box select or `Ctrl` + box select | 🆕     |
| Select all                     | `Ctrl` + `A`             | None                     | `Ctrl` + `A` (locked elements excluded)     | 🆕     |
| Deselect                       | `Esc`                    | None                     | `Esc`                                       | 🆕     |

## 4. Editing

| Action                                          | Figma                                              | drawDB (before)                                 | drawDB (this branch)                                            | Status |
| ----------------------------------------------- | -------------------------------------------------- | ----------------------------------------------- | --------------------------------------------------------------- | ------ |
| Delete                                          | `Delete` / `Backspace`, works on a multi-selection | `Delete` only, removes just the current element | `Delete` / `Backspace`, removes every selected element          | 🆕     |
| Arrow keys move the selection                   | 1px                                                | None (arrow keys pan the canvas)                | 1px, undoable. With nothing selected, they still pan the canvas | 🆕     |
| `Shift` + arrow keys                            | Move 10px                                          | None                                            | Move 10px, undoable                                             | 🆕     |
| Undo                                            | `Ctrl` + `Z`                                       | `Ctrl` + `Z`                                    | `Ctrl` + `Z`                                                    | ✅     |
| Redo                                            | `Ctrl` + `Shift` + `Z`                             | `Ctrl` + `Y`                                    | `Ctrl` + `Shift` + `Z` or `Ctrl` + `Y`                          | 🆕     |
| Copy / paste / cut                              | `Ctrl` + `C` / `V` / `X`                           | Same (single element)                           | Same (single element)                                           | ✅     |
| Duplicate                                       | `Ctrl` + `D`                                       | `Ctrl` + `D`                                    | `Ctrl` + `D`                                                    | ✅     |
| `Alt` + drag to duplicate                       | ✅                                                 | None                                            | None                                                            | ❌     |
| `Shift` + drag to lock to horizontal / vertical | ✅                                                 | None                                            | None                                                            | ❌     |
| Lock / unlock an element                        | `Ctrl` + `Shift` + `L`                             | UI button only                                  | UI button only                                                  | ❌     |
| Tool switching (`H` hand / `V` move)            | ✅                                                 | None                                            | None                                                            | ❌     |

## 5. drawDB-only shortcuts (unchanged)

| Shortcut                              | Function                  |
| ------------------------------------- | ------------------------- |
| `Ctrl` + `S` / `Ctrl` + `Shift` + `S` | Save / Save as            |
| `Ctrl` + `O`                          | Open                      |
| `Ctrl` + `I`                          | Import                    |
| `Ctrl` + `E`                          | Edit the selected element |
| `Ctrl` + `Shift` + `G`                | Show / hide the grid      |
| `Ctrl` + `Shift` + `M`                | Strict mode               |
| `Ctrl` + `Shift` + `F`                | Field summary             |
| `Ctrl` + `Alt` + `C`                  | Copy as image             |
| `Alt` + `E`                           | Toggle the DBML editor    |
| `Ctrl` + `H`                          | Open the docs             |

---

## Implementation notes

Changed files:

- `src/components/EditorCanvas/Canvas.jsx`
  - Space + drag panning. Pointer events are intercepted in the capture phase, so elements are never dragged
  - `Shift` + click / box select adds to the selection
  - Wheel handling: supports `deltaX`; trackpad pinch zooms proportionally; Firefox line / page delta units are converted to pixels
- `src/components/EditorHeader/ControlPanel.jsx`
  - New shortcuts: `Shift+0/1/2`, `Ctrl+=/-`, `Ctrl+A`, `Esc`, `Backspace`, `Ctrl+Shift+Z`, `Shift+arrow keys`
  - Delete works on a multi-selection. Notes and areas are re-indexed after a delete, so they are deleted from the highest id down to avoid removing the wrong one
  - Arrow keys move the selected elements (recorded in undo history), or pan the canvas when nothing is selected
  - `fitToView` can fit only the given elements (used by `Shift+2`), and no longer produces NaN on an empty diagram
  - Undoing the deletion of two related tables deleted together no longer adds the shared relationships twice
  - Shortcut labels in the menus were updated to match

## Known limitations

- Shortcuts match the **physical key** (`KeyboardEvent.code`). On JIS keyboards `Ctrl+=` lands on the `^` key, so `Ctrl+;` (where JIS has `+`) is bound as well.
- While a button has focus, Space is used for panning and no longer clicks the button.
- Each arrow-key press adds one undo entry. Figma merges consecutive nudges into one; this branch does not.
- Cut (`Ctrl+X`) still handles a single element only, consistent with copy.
