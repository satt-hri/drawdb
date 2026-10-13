# 修改日志（全部）

- 仓库：`satt-hri/drawdb`（fork 自 `drawdb-io/drawdb`）
- 分支：`feat/space-pan`
- 基准：`6053240`（上游 main，Add husky #1160）
- 最后更新：2026-10-09
- 行号均指**当前工作区**（尚未提交）中的文件。提交或继续修改后，行号会变化。
- 相关文档：`docs/changelog.md`（按时间顺序的记录）、`docs/performance-analysis.md`（性能分析）、`docs/context-menu-and-area-move.md`（右键菜单 / 区域移动设计）、`docs/shortcuts-vs-figma*.md`（快捷键对照表）

---

## 0. 总览

| Issue                                               | 类型        | 内容                                                                                       | 状态                                                  |
| --------------------------------------------------- | ----------- | ------------------------------------------------------------------------------------------ | ----------------------------------------------------- |
| [#6](https://github.com/satt-hri/drawdb/issues/6)   | 功能        | 空格 + 拖动平移                                                                            | **已提交** `a52a2f1`                                  |
| [#7](https://github.com/satt-hri/drawdb/issues/7)   | 功能        | 缩放快捷键（Shift+0/1/2、Ctrl+=/-）                                                        | 未提交                                                |
| [#8](https://github.com/satt-hri/drawdb/issues/8)   | 功能 / 修复 | 选择与删除快捷键（Ctrl+A、Esc、Backspace、多选删除、Ctrl+Shift+Z），撤销时关系线重复的修复 | 未提交                                                |
| [#9](https://github.com/satt-hri/drawdb/issues/9)   | 功能        | 方向键移动选中元素、Shift+点击加选                                                         | 未提交                                                |
| [#10](https://github.com/satt-hri/drawdb/issues/10) | 功能        | 触控板左右滑动、捏合平滑缩放                                                               | 未提交                                                |
| [#11](https://github.com/satt-hri/drawdb/issues/11) | 功能        | 画布右键菜单                                                                               | 未提交                                                |
| [#12](https://github.com/satt-hri/drawdb/issues/12) | 功能        | 拖动区域时区域内的元素一起移动                                                             | 未提交                                                |
| [#13](https://github.com/satt-hri/drawdb/issues/13) | 功能        | 侧边栏选中表格时自动居中并高亮                                                             | 未提交                                                |
| [#14](https://github.com/satt-hri/drawdb/issues/14) | 修复 / 性能 | 平移时反复触发自动保存                                                                     | 未提交                                                |
| [#1](https://github.com/satt-hri/drawdb/issues/1)   | 性能        | 鼠标坐标改为 ref                                                                           | 未提交                                                |
| [#2](https://github.com/satt-hri/drawdb/issues/2)   | 性能        | 画布元素不再被无关的变化牵连重新渲染                                                       | 未提交                                                |
| [#3](https://github.com/satt-hri/drawdb/issues/3)   | 性能        | 按帧合并                                                                                   | **评估后不修改**                                      |
| [#4](https://github.com/satt-hri/drawdb/issues/4)   | 性能        | 问题面板防抖                                                                               | 未提交                                                |
| [#5](https://github.com/satt-hri/drawdb/issues/5)   | 功能        | 侧边栏折叠按钮                                                                             | **不是本对话修改的**，但改动也在工作区里（见第 4 节） |

---

## 1. 文件 × Issue 对照表

✔ = 该文件里有这个 issue 的修改。

| 文件                                                                                            | #7  | #8  | #9  | #10 | #11 | #12 | #13 | #14 | #1  | #2  | #4  | #5  | 仅格式化 |
| ----------------------------------------------------------------------------------------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | -------- |
| `src/components/EditorCanvas/Canvas.jsx`                                                        |     |     | ✔  | ✔  | ✔  | ✔  |     |     | ✔  | ✔  |     |     |          |
| `src/components/EditorHeader/ControlPanel.jsx`                                                  | ✔  | ✔  | ✔  |     | ✔  | ✔  |     |     |     | ✔  |     |     | ✔       |
| `src/components/EditorCanvas/Table.jsx`                                                         |     |     |     |     |     |     | ✔  |     |     | ✔  |     |     |          |
| `src/components/Workspace.jsx`                                                                  |     |     |     |     | ✔  |     |     | ✔  |     | ✔  |     | ✔  | ✔       |
| `src/components/EditorCanvas/ContextMenu.jsx`（新增）                                           |     |     |     |     | ✔  |     |     |     |     |     |     |     |          |
| `src/utils/elementBounds.js`（新增）                                                            |     |     |     |     |     | ✔  |     |     |     |     |     |     |          |
| `src/hooks/useFocusTable.js`（新增）                                                            |     |     |     |     |     |     | ✔  |     |     | ✔  |     |     |          |
| `src/hooks/useTransformRef.js`（新增）                                                          |     |     |     |     |     |     |     |     |     | ✔  |     |     |          |
| `src/hooks/useSetTransform.js`（新增）                                                          |     |     |     |     |     |     |     |     |     | ✔  |     |     |          |
| `src/hooks/index.js`                                                                            |     |     |     |     |     |     | ✔  |     |     | ✔  |     |     |          |
| `src/context/SelectContext.jsx`                                                                 |     |     |     |     |     |     | ✔  |     |     |     |     |     |          |
| `src/context/CanvasContext.jsx`                                                                 |     |     |     |     |     |     |     |     | ✔  |     |     |     | ✔       |
| `src/context/TransformContext.jsx`                                                              |     |     |     |     |     |     |     |     |     | ✔  |     |     |          |
| `src/context/DiagramContext.jsx` / `NotesContext.jsx` / `AreasContext.jsx` / `ViewsContext.jsx` |     |     |     |     |     |     |     |     |     | ✔  |     |     |          |
| `src/components/EditorCanvas/Relationship.jsx`                                                  |     |     |     |     |     |     |     |     |     | ✔  |     |     | ✔       |
| `src/components/EditorSidePanel/SidePanel.jsx`                                                  |     |     |     |     |     |     |     |     |     | ✔  |     | ✔  |          |
| `src/components/EditorSidePanel/Issues.jsx`                                                     |     |     |     |     |     |     |     |     |     |     | ✔  |     |          |
| `src/components/EditorSidePanel/TablesTab/TablesTab.jsx`                                        |     |     |     |     |     |     | ✔  |     |     |     |     |     |          |
| `src/components/EditorSidePanel/TablesTab/SearchBar.jsx`                                        |     |     |     |     |     |     | ✔  |     |     |     |     |     |          |
| `src/index.css`                                                                                 |     |     |     |     |     |     | ✔  |     |     |     |     |     |          |
| `src/i18n/locales/{en,zh,zh-tw,jp}.js`                                                          |     |     |     |     | ✔  |     |     |     |     |     |     | ✔  |          |

文档：

| 文件                                               | 对应 issue      |
| -------------------------------------------------- | --------------- |
| `docs/shortcuts-vs-figma.md` / `.ja.md` / `.en.md` | #6 #7 #8 #9 #10 |
| `docs/context-menu-and-area-move.md`               | #11 #12         |
| `docs/performance-analysis.md`                     | #1 #2 #3 #4     |
| `docs/changelog.md`、`docs/log.md`                 | 全部            |

---

## 2. 各 Issue 的详细记录

### #6 空格 + 拖动平移（已提交 `a52a2f1`）

- **问题**：不能像 Figma 那样按住空格拖动画布。上游 PR drawdb-io/drawdb#875 有三个问题：全局拦截空格（输入框里打不出空格）；在元素的手柄上按下时，仍会触发元素自身的操作；窗口失焦后空格状态不会复位。
- **思路**：用 `react-hotkeys-hook` 监听空格（输入框内自动忽略）；在捕获阶段（`onPointerDownCapture`）开始平移，抢在元素之前处理；窗口 `blur` 时复位。
- **修改对象**：`src/components/EditorCanvas/Canvas.jsx`（已在提交 `a52a2f1` 中）。

---

### #7 缩放快捷键

- **问题**：drawDB 的缩放快捷键（`Ctrl+↑/↓`、`Ctrl+Alt+W`）和 Figma 不同；没有「缩放到选中元素」；`fitToView` 在空图表上会算出 NaN。
- **思路**：只新增、不删除原有快捷键。快捷键按物理键（`KeyboardEvent.code`）匹配，所以额外绑定了 JIS 键盘上 `+` 所在的 `;` 键。
- **修改对象**：

| 文件               | 行            | 内容                                                                                                                    |
| ------------------ | ------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `ControlPanel.jsx` | 674           | `resetZoom`（Shift+0：只改缩放，保持位置）                                                                              |
| 同上               | 860–878       | `fitWindow` 改为 `fitToView()`；新增 `zoomToSelection`（Shift+2）；`fitToView` 改为接收 `{tables, views, areas, notes}` |
| 同上               | 898、913、920 | `views` / `areas` / `notes` 改为 `viewsToFit` / `areasToFit` / `notesToFit`                                             |
| 同上               | 930–932       | 没有元素时直接 return（修复 NaN）                                                                                       |
| 同上               | 983           | 自动排列改为 `fitToView({ tables: arrangedTables })`                                                                    |
| 同上               | 2102、2106    | 菜单提示改为 `Ctrl+(=/Up/Wheel)`、`Ctrl+(-/Down/Wheel)`                                                                 |
| 同上               | 2216–2225     | 快捷键：`mod+equal` / `mod+shift+equal` / `mod+semicolon` / `mod+add`、`mod+minus` / `mod+subtract`、`shift+0/1/2`      |
| 同上               | 2348          | 缩放下拉菜单中「适应窗口」的提示改为 `Shift+1`                                                                          |

- **依赖**：`zoomToSelection` 用到 #8 的 `getSelection`、`findElement`。
- **验证**：各快捷键都生效，并且阻止了浏览器自身的页面缩放；JIS 的 `Ctrl+;` 生效；`Shift+1` 显示全部；`Shift+2` 缩放到选中元素。

---

### #8 选择与删除快捷键、撤销修复

- **问题**：没有 `Ctrl+A` / `Esc`；`Delete` 只删除当前一个元素；只有 `Ctrl+Y` 能重做；同时删除两张有关系线的表后撤销，关系线会被重复添加。
- **思路**：
  - 「选中的元素」= 单选（`selectedElement`）和多选（`bulkSelectedElements`）的并集，和画布上高亮显示的一致。
  - 注释和区域的 id 是数组下标，删除后会重新编号，所以按 id 从大到小删除。
- **修改对象**：

| 文件               | 行        | 内容                                                                                                              |
| ------------------ | --------- | ----------------------------------------------------------------------------------------------------------------- |
| `ControlPanel.jsx` | 183–189   | `useSelect()` 额外取出 `bulkSelectedElements`、`setBulkSelectedElements`（**与 #2 混在同一个代码块**，见第 3 节） |
| 同上               | 282–288   | 撤销「删除表格」时，跳过已经存在的关系线                                                                          |
| 同上               | 676–751   | `findElement`、`getSelection`、`selectAll`、`deselect`、`deleteSelection`                                         |
| 同上               | 1877      | 菜单提示 `Ctrl+Y / Ctrl+Shift+Z`                                                                                  |
| 同上               | 1923–1924 | 菜单「删除」改为调用 `deleteSelection`，提示 `Del / Backspace`                                                    |
| 同上               | 2204      | `mod+y, mod+shift+z` → 重做                                                                                       |
| 同上               | 2212–2214 | `delete, backspace` → 删除；`mod+a` → 全选；`escape` → 取消选择                                                   |

- **验证**：多选两个注释后删除，剩下的是正确的那一个；撤销后两个都恢复原位；`Ctrl+Shift+Z` 和 `Ctrl+Y` 都能重做；焦点在输入框里时，`Backspace` / `Ctrl+A` 只作用于文字。

---

### #9 方向键移动、Shift 加选

- **问题**：方向键只能平移画布；加选只能用 `Ctrl+点击`。
- **思路**：有选中元素时，方向键移动元素（`Shift` 时移动 10px），并记入撤销历史；没有选中元素时保持原行为。`Shift` 和 `Ctrl` 都可以加选。
- **修改对象**：

| 文件               | 行        | 内容                                                                      |
| ------------------ | --------- | ------------------------------------------------------------------------- |
| `ControlPanel.jsx` | 775–832   | `nudgeOrPan`（**其中计算区域内元素的部分属于 #12**）                      |
| 同上               | 2234–2241 | 方向键和 `Shift+方向键` 改为调用 `nudgeOrPan`                             |
| `Canvas.jsx`       | 275–278   | 新增 `isAdditive`（包含 `shiftKey`）                                      |
| 同上               | 288、312  | 改用 `isAdditive`                                                         |
| 同上               | 559       | 框选时 `ctrlKey: e.ctrlKey \|\| e.shiftKey`（**与 #2 混在同一个代码块**） |

- **注意**：方向键的行为变了。
- **验证**：`Shift+点击` 选中两个注释后，按 `→` 只有这两个移动 1px，`Shift+↓` 移动 10px，画布不动；按 `Esc` 后方向键恢复为平移画布。

---

### #10 触控板与滚轮

- **问题**：触控板双指左右滑动无效（只读取 `deltaY`）；捏合缩放时每个事件固定 5%，太快、太跳。
- **思路**：鼠标滚轮会产生较大的整数 `deltaY`（≥ 50），保持每格 5%；触控板捏合产生很多很小的值，按 `exp(-delta × 0.01)` 平滑缩放；缩放时保持光标下的点不动；`Shift+滚轮` 在 `deltaX` 为 0 时改为横向滚动。
- **修改对象**：

| 文件         | 行      | 内容                                                                                                  |
| ------------ | ------- | ----------------------------------------------------------------------------------------------------- |
| `Canvas.jsx` | 846–854 | `deltaScale`：Firefox 的行 / 页单位换算成像素（**同一个代码块里还有 #11 的 `setContextMenu(null)`**） |
| 同上         | 857–874 | `isMouseWheel` 判断、`factor` 计算、以锚点为中心缩放（**锚点变量 `anchor` 属于 #1**）                 |
| 同上         | 877–885 | 平移同时使用 `deltaX` / `deltaY`；`Shift` 时横向                                                      |

- **验证**：触控板横向滑动、鼠标滚轮、`Shift+滚轮`、鼠标滚轮缩放（5%）、触控板捏合缩放的结果都正确，缩放时光标下的点不动。

---

### #11 右键菜单

- **问题**：右键单击显示的是浏览器菜单，对编辑没有帮助。
- **思路**：
  - 区分「右键单击」和「右键拖动」：沿用原有的 `rightClickPanned` 判断。
  - 菜单要调用的操作写在 `ControlPanel` 里。没有把这些操作全部搬出来，而是由 `ControlPanel` 把它们登记到 `Workspace` 创建的 `editorActionsRef`，菜单通过这个 ref 调用。这样改动小，并且与快捷键执行同一份代码。
- **修改对象**：

| 文件                                          | 行           | 内容                                                            |
| --------------------------------------------- | ------------ | --------------------------------------------------------------- |
| `src/components/EditorCanvas/ContextMenu.jsx` | 新增（全部） | 基于 Semi `Dropdown` 的菜单，三种菜单内容，`Esc` 或点击外部关闭 |
| `Canvas.jsx`                                  | 49           | `import ContextMenu`（**与 #12 的 import 在同一个代码块**）     |
| 同上                                          | 53           | `Canvas({ editorActions })`                                     |
| 同上                                          | 100–101      | `contextMenuTarget`、`contextMenu` 状态                         |
| 同上                                          | 567–571      | 右键按下时记住被点中的元素（**用到了 #2 的 `target` 变量**）    |
| 同上                                          | 782–839      | `handleContextMenu`                                             |
| 同上                                          | 844          | 滚动滚轮时关闭菜单                                              |
| 同上                                          | 950          | `onContextMenu={handleContextMenu}`                             |
| 同上                                          | 1056–1060    | 渲染 `<ContextMenu>`                                            |
| `ControlPanel.jsx`                            | 136          | 接收 `editorActions`                                            |
| 同上                                          | 753–773      | `updateElement`、`toggleLock`                                   |
| 同上                                          | 2182–2201    | 用 `useEffect` 把操作登记到 `editorActions.current`             |
| `Workspace.jsx`                               | 74–75        | `editorActionsRef`                                              |
| 同上                                          | 538、558–562 | 传给 `ControlPanel` 和 `Canvas`                                 |
| `src/i18n/locales/en.js`                      | 360–363      | `select_all`、`zoom_to_fit`、`zoom_to_selection`、`zoom_to_100` |
| `src/i18n/locales/zh.js`                      | 344–347      | 同上                                                            |
| `src/i18n/locales/zh-tw.js`                   | 354–357      | 同上                                                            |
| `src/i18n/locales/jp.js`                      | 356–359      | 同上                                                            |

- **依赖**：#7（`fitWindow`、`resetZoom`、`zoomToSelection`）、#8（`selectAll`、`deleteSelection`）。
- **验证**：三种菜单都正确弹出；右键拖动只平移、不弹菜单；`Esc` 能关闭；原地复制、锁定 / 解锁、多选删除（撤销后恢复）都正常。

---

### #12 区域整体移动

- **问题**：拖动主题区域时，区域里的表格不会跟着动。
- **思路**：不修改数据格式（与上游兼容）。每次拖动时按位置现算，"完全位于区域内"的元素跟着移动；这些元素不加入选择（否则之后按 Delete 会被一起删掉）；`Alt` 只移动区域本身；撤销时一次还原。
- **修改对象**：

| 文件                         | 行                 | 内容                                                                |
| ---------------------------- | ------------------ | ------------------------------------------------------------------- |
| `src/utils/elementBounds.js` | 新增（全部）       | `getElementBounds`、`getAreaContents`                               |
| `Canvas.jsx`                 | 48                 | `import { getAreaContents }`（**与 #11 的 import 在同一个代码块**） |
| 同上                         | 83                 | `notDragging.areaContents`                                          |
| 同上                         | 337、345–346       | 开始拖动时计算区域内的元素（`Alt` 时不计算）                        |
| 同上                         | 350–378            | `getDraggedAreaContents`                                            |
| 同上                         | 437–465            | 拖动时用 `moveBy` 同时移动选中元素和区域内的元素                    |
| 同上                         | 626–633            | 撤销记录包含区域内的元素                                            |
| `ControlPanel.jsx`           | 110                | `import { getAreaContents }`                                        |
| 同上                         | 775–832 中的一部分 | `nudgeOrPan` 里计算区域内元素的部分                                 |

- **验证**：拖动区域时，区域内的注释一起移动，部分重叠的表格不动；`Alt` 拖动时只移动区域；撤销一次全部还原；方向键移动区域时，区域内的元素也一起移动。

---

### #13 侧边栏选中表格时自动居中并高亮

- **问题**：在左侧选中一张表后，需要自己在画布上找它。
- **思路**：用 `requestAnimationFrame` 在约 0.3 秒内平滑平移，让表格中心与画面中心重合；显示橙色闪烁框，约 2 秒后消失；只在侧边栏或搜索框里选中时触发，在画布上点击时不触发。
- **修改对象**：

| 文件                            | 行            | 内容                                                                                               |
| ------------------------------- | ------------- | -------------------------------------------------------------------------------------------------- |
| `src/hooks/useFocusTable.js`    | 新增（全部）  | 计算表格中心、平滑平移、设置高亮（**当前版本使用了 #2 的 `useSetTransform` / `useTransformRef`**） |
| `src/hooks/index.js`            | 18            | 导出 `useFocusTable`                                                                               |
| `src/context/SelectContext.jsx` | 17–18、27–28  | `focusFlash` 状态                                                                                  |
| `Table.jsx`                     | 82、85–87     | 读取 `focusFlash`，计算 `isFlashing`                                                               |
| 同上                            | 571–582       | 高亮框 `<rect>`                                                                                    |
| `src/index.css`                 | 248–270       | `.table-focus-flash` 样式和动画                                                                    |
| `TablesTab.jsx`                 | 11、27、55–64 | 展开表格时调用 `focusTable`                                                                        |
| `SearchBar.jsx`                 | 2、10、52     | 搜索选中表格时调用 `focusTable`                                                                    |

- **验证**：点开表格后，画面中心与表格中心一致，显示高亮框，2 秒后消失。注意：浏览器面板隐藏时 `requestAnimationFrame` 会暂停，动画需要在面板显示时测试。

---

### #14 平移时反复触发自动保存（上游原有问题）

- **问题**：空格平移时很慢，并且一直在保存。
- **原因**：`save()` 的依赖包含 `transform`，平移时每一帧都会重新创建；保存的 effect 依赖 `save`，所以在「保存中」的状态下，每一帧都会再写一次 IndexedDB。
- **思路**：`save()` 改为通过 ref 读取 pan / zoom，并从依赖中去掉 `transform`。中途试过另一种做法：保存进行中时把新请求排队，写完再补存一次。结果拖动过程中仍然一直在写，所以撤回了。
- **修改对象**：

| 文件            | 行               | 内容                                                    |
| --------------- | ---------------- | ------------------------------------------------------- |
| `Workspace.jsx` | 83–87            | `transformRef`                                          |
| 同上            | 131–132          | `buildCloudPayload` 改用 `transformRef.current`         |
| 同上            | 144              | `buildCloudPayload` 的依赖中去掉 `transform`            |
| 同上            | 196–197、221–222 | `save` 的新增 / 更新两个分支改用 `transformRef.current` |
| 同上            | 245              | `save` 的依赖中去掉 `transform`                         |

- **验证**：连续拖动 3 次，只写入 3 次（每次松开时 1 次）；保存的 pan 与画面一致。

---

### #1 鼠标坐标改为 ref

- **问题**：画布上每一次 `pointermove` 都会执行 `setState`，80 张表 + 79 条关系线全部重新渲染（实测 178ms / 次）。
- **思路**：坐标存进 ref；`pointer.spaces.screen` / `pointer.spaces.diagram` 改为 getter，所以调用方（`Canvas.jsx` 里约 30 处）不用改；只有打开「调试坐标」面板时才重新渲染。
- **修改对象**：

| 文件                            | 行      | 内容                                                                   |
| ------------------------------- | ------- | ---------------------------------------------------------------------- |
| `src/context/CanvasContext.jsx` | 1–9     | 引入 `useSettings`、`useReducer`                                       |
| 同上                            | 118–135 | `pointerScreenRef`、`toDiagramSpaceRef`、getter 形式的 `pointerSpaces` |
| 同上                            | 148–153 | `detectPointerMovement` 改为写 ref；只有开启调试坐标时才重新渲染       |
| 同上                            | 171     | `spaces: pointerSpaces`                                                |
| 同上                            | 183     | 末尾补上分号（仅格式化）                                               |
| `Canvas.jsx`                    | 868–872 | 滚轮缩放时先取出 `anchor` 再更新（**与 #10 在同一个代码块**）          |

- **效果**：鼠标移动 178ms → 10ms，渲染次数 → 0。

---

### #2 画布元素不再被无关的变化牵连重新渲染

- **问题**：拖动一张表、平移画布时，所有表格、关系线、顶部工具栏和侧边栏都会重新渲染。
- **思路**：只加 `React.memo` 不够，用计数器追查后，找到 3 个牵连源：

  1. 4 个数据 context 只为了「新增元素时放到画面中央」读取 pan，却订阅了整个 transform；
  2. 顶部工具栏为了显示缩放百分比订阅了 transform；
  3. `IdContext` 的 value 每次渲染都是新对象。

  所以把 transform 拆成三种用法：值（`useTransform`）、ref（`useTransformRef`）、setter（`useSetTransform`）。表格的字段列表用 `useMemo` 缓存，事件回调通过 `latest` ref 调用，避免缓存住旧函数。

- **修改对象**：

| 文件                                                 | 行                          | 内容                                                                                          |
| ---------------------------------------------------- | --------------------------- | --------------------------------------------------------------------------------------------- |
| `src/context/TransformContext.jsx`                   | 1–8                         | `TransformRefContext`、`SetTransformContext`                                                  |
| 同上                                                 | 15–16                       | `transformRef`                                                                                |
| 同上                                                 | 50–54                       | 两个新的 Provider                                                                             |
| `src/hooks/useTransformRef.js`、`useSetTransform.js` | 新增（全部）                | 对应的 hook                                                                                   |
| `src/hooks/index.js`                                 | 19–20                       | 导出上面两个 hook                                                                             |
| `DiagramContext.jsx`                                 | 3、17–18、45                | 改用 `useTransformRef`                                                                        |
| `NotesContext.jsx`                                   | 8、18–19、38–41             | 同上                                                                                          |
| `AreasContext.jsx`                                   | 5、13–14、35–38             | 同上                                                                                          |
| `ViewsContext.jsx`                                   | 3、13–14、26–27             | 同上                                                                                          |
| `Table.jsx`                                          | 1、35、53、55、75           | 引入 `memo` / `useRef`；去掉 `useTransform`；props 新增 `zoom`                                |
| 同上                                                 | 287–322                     | `latest` ref、`referencesKey`、`useMemo` 的开头                                               |
| 同上                                                 | 325–566                     | 字段列表搬进 `useMemo`，回调改为 `latest.current.xxx`，以及依赖列表                           |
| 同上                                                 | 589、663、707、747–748      | `zoom={zoom}`、`latest.current.handleGripField` / `deleteField`、`export default memo(Table)` |
| `Relationship.jsx`                                   | 1、17、301–303              | `memo(Relationship)`（211 行附近仅格式化）                                                    |
| `SidePanel.jsx`                                      | 1、31、208–210              | `memo(SidePanel)`（**141–151 行属于 #5**）                                                    |
| `Canvas.jsx`                                         | 1                           | 引入 `useCallback`                                                                            |
| 同上                                                 | 153–159                     | `elementPointerDown` 改为 ref；`onTablePointerDown`                                           |
| 同上                                                 | 533–536                     | `handlePointerDown` 开头取出并清空 `target`                                                   |
| 同上                                                 | 558、562–563                | 改用 `target`（**558 行与 #9 在同一个代码块**）                                               |
| 同上                                                 | 700–710                     | `handleGripField` 改为 `useCallback`                                                          |
| 同上                                                 | 991、1005、1009、1017、1038 | `elementPointerDown.current = ...`；给 Table 传入 `zoom` 和稳定回调                           |
| `ControlPanel.jsx`                                   | 1、66–67                    | 引入 `memo`、`useTransformRef`、`useSetTransform`                                             |
| 同上                                                 | 124–130                     | `ZoomPercentage` 组件；`function ControlPanel`                                                |
| 同上                                                 | 183–191                     | 改用 `useSetTransform()` + `useTransformRef()`（**与 #8 在同一个代码块**）                    |
| 同上                                                 | 1266–1267、1326–1327        | 保存时从 `transformRef.current` 读取                                                          |
| 同上                                                 | 2382                        | `<ZoomPercentage />`                                                                          |
| 同上                                                 | 2737–2739                   | `export default memo(ControlPanel)`                                                           |
| `Workspace.jsx`                                      | 523–528、531                | `idContextValue` 改用 `useMemo`                                                               |
| `useFocusTable.js`                                   | 7–8、20–21、38              | 改用 `useSetTransform` / `useTransformRef`                                                    |

- **效果**：空格平移 198ms → 16ms，滚轮平移 223ms → 10ms，拖动表格 253ms → 80ms。平移时只有 Canvas 本身重新渲染。

---

### #3 按帧合并（评估后不修改）

- **理由**：现代浏览器本身就会把 `pointermove` / `wheel` 对齐到每一帧；应用层再合并，有可能让 pointerup 读到旧状态，导致撤销记录里的坐标差一帧；而 #2 之后平移已经只要 16ms。
- **修改对象**：无。issue 由你决定是否关闭。

---

### #4 问题面板防抖

- **问题**：每次修改都会执行一次全图校验 `getIssues()`；依赖中包含 `issues` 本身，更新问题列表后还会再多算一遍。
- **修改对象**：

| 文件         | 行    | 内容                                                                |
| ------------ | ----- | ------------------------------------------------------------------- |
| `Issues.jsx` | 14–15 | 常量 `issuesCheckDelay = 300`                                       |
| 同上         | 25–42 | `setTimeout` 防抖、cleanup、函数式 `setIssues`、依赖中去掉 `issues` |

- **验证**：改名为重复的表名后，100ms 时尚未计算，600ms 时显示 1 个问题；改回原名后恢复为 0。

---

## 3. 混在同一个代码块里的修改

下面这些地方，同一个代码块里包含多个 issue 的修改。用 `git add -p` 无法用 `s`（split）自动拆开，需要用 `e`（edit）手动编辑，或者把相关的 issue 合并成一个提交。

| 文件               | 行                     | 包含的 issue     | 内容                                                                                                                                                                                        |
| ------------------ | ---------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ControlPanel.jsx` | 674–833（新增 160 行） | #7 #8 #9 #11 #12 | `resetZoom`(#7)、`findElement` / `getSelection` / `selectAll` / `deselect` / `deleteSelection`(#8)、`updateElement` / `toggleLock`(#11)、`nudgeOrPan`(#9，其中计算区域内元素的部分属于 #12) |
| `ControlPanel.jsx` | 183–191                | #8 #2            | `bulkSelectedElements`(#8) 和 `useSetTransform` / `useTransformRef`(#2)                                                                                                                     |
| `Canvas.jsx`       | 48–49                  | #12 #11          | 两个 import                                                                                                                                                                                 |
| `Canvas.jsx`       | 558–559                | #2 #9            | `target`(#2) 和 `e.shiftKey`(#9)                                                                                                                                                            |
| `Canvas.jsx`       | 567–571                | #11 #2           | `contextMenuTarget.current = target` 用到了 #2 的 `target`                                                                                                                                  |
| `Canvas.jsx`       | 844–854                | #11 #10          | `setContextMenu(null)`(#11) 和 `deltaScale`(#10)                                                                                                                                            |
| `Canvas.jsx`       | 857–874                | #10 #1           | 缩放计算(#10) 和 `anchor`(#1)                                                                                                                                                               |
| `useFocusTable.js` | 全部                   | #13 #2           | 文件本身属于 #13，`useSetTransform` / `useTransformRef` 属于 #2                                                                                                                             |

---

## 4. 不是本对话修改的内容（提交时请注意）

工作区里还有下面这些改动，**不是本对话做的**（看起来是你或者另一个会话在做 [#5 侧边栏折叠](https://github.com/satt-hri/drawdb/issues/5)）：

| 文件                        | 行      | 内容                                           |
| --------------------------- | ------- | ---------------------------------------------- |
| `SidePanel.jsx`             | 141–151 | 收起侧边栏按钮                                 |
| `Workspace.jsx`             | 38      | `import { queryConfig }`                       |
| 同上                        | 565–586 | 侧边栏收起时，在画布左上角显示的展开按钮       |
| `src/i18n/locales/en.js`    | 377–378 | `collapse_sidebar`、`expand_sidebar`           |
| `src/i18n/locales/zh.js`    | 360–361 | 同上                                           |
| `src/i18n/locales/zh-tw.js` | 368–369 | 同上                                           |
| `src/i18n/locales/jp.js`    | 372–373 | 同上                                           |
| `.claude/launch.json`       | 新增    | dev server 的启动配置（2026-10-09 09:28 创建） |

仅格式化（prettier）的改动，可以放进任意一个提交，或者单独提交一个 `style:`：

- `Workspace.jsx` 276、617
- `ControlPanel.jsx` 2304、2551–2556
- `Relationship.jsx` 211–213
- `CanvasContext.jsx` 183

---

## 5. 提交建议

### 推荐顺序

按依赖关系从独立的开始。每一步提交前都可以先执行 `npx vite build` 确认能构建。

| 顺序 | 提交                                                                    | 包含                                                               | 能否用 `git add -p` 干净地拆出来     |
| ---- | ----------------------------------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------ |
| 1    | `fix: 平移时不再反复保存 (Fixes #14)`                                   | `Workspace.jsx` 的 83–87、131–132、144、196–197、221–222、245      | ✅                                   |
| 2    | `perf: 问题面板防抖 (Fixes #4)`                                         | `Issues.jsx` 全部                                                  | ✅                                   |
| 3    | `perf: 鼠标坐标改为 ref (Fixes #1)`                                     | `CanvasContext.jsx` 全部。`Canvas.jsx` 的 `anchor` 改动放到第 5 步 | ✅（只是没有 `anchor` 也能正常工作） |
| 4    | `feat: 侧边栏折叠 (#5)`                                                 | 第 4 节列出的 #5 相关部分                                          | ✅（如果这部分已经完成）             |
| 5    | `feat: Figma 风格的交互 + 渲染性能 (Fixes #2 #7 #8 #9 #10 #11 #12 #13)` | 剩下的全部（不含 #5）                                              | 合并成一个提交，无需拆分             |

### 如果第 5 步一定要按 issue 拆开

需要对第 3 节的代码块用 `e` 手动编辑，建议按这个顺序：

1. #2（性能主体：新的 hook、context、`memo`。`Canvas.jsx` 的 558 行先只提交 `target` 部分）
2. #7 → #8 → #9 → #11 → #12（`ControlPanel.jsx` 674–833 这一块需要每次只保留对应的函数）
3. #10（滚轮）
4. #13（定位高亮）
5. 文档

### 命令示例

```bash
git add -p src/components/Workspace.jsx
```

```bash
git commit -m "fix: 平移时不再反复保存 (Fixes #14)"
```

```bash
git add src/components/EditorSidePanel/Issues.jsx
```

```bash
git push origin feat/space-pan
```

提交信息里写上 `Fixes #N`，并合并到默认分支后，GitHub 会自动关闭对应的 issue。只推送到 `feat/space-pan` 分支时不会自动关闭。

---

## 6. 性能测量记录（参考）

测试数据：80 张表 × 每表 8 个字段，79 条关系线（内置浏览器中的「PERF TEST (80 tables)」）。表中是每帧的平均耗时，空任务的基准约 9ms。

| 操作               | 优化前 | #1 之后 | #1 + #2 + #4 之后 |
| ------------------ | ------ | ------- | ----------------- |
| 鼠标在画布上移动   | 178ms  | 10ms    | 10ms              |
| 空格平移           | 198ms  | 179ms   | 16ms              |
| 滚轮平移           | 223ms  | 220ms   | 10ms              |
| 拖动一张表         | 253ms  | —       | 80ms              |
| 输入表名（每个字） | 261ms  | 282ms   | 119ms             |

剩余开销：`tables` 一变化，所有使用 `useDiagram()` 的组件都要重新执行。下一步可以考虑拆分 `DiagramContext`，或者做视口裁剪（参考 drawdb-io/drawdb#1122）。
