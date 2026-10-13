# 修改记录（`feat/space-pan` 分支）

- 基准：`upstream/main` 的 `6053240`（Add husky #1160）
- 行号对应当前工作区的文件（未提交状态），以后再修改代码，行号可能会变化
- 第 0 次已提交；第 1、2 次尚未提交

---

## 第 0 次：空格 + 拖动平移（已提交 `a52a2f1`）

| 文件                                     | 位置 | 修改内容                                                                        |
| ---------------------------------------- | ---- | ------------------------------------------------------------------------------- |
| `src/components/EditorCanvas/Canvas.jsx` | 36   | 引入 `useHotkeys`                                                               |
| 同上                                     | 135  | 新增状态 `spacePressed`                                                         |
| 同上                                     | 654  | 松开鼠标时，如果空格仍按住，光标恢复为 `grab`                                   |
| 同上                                     | 885  | 用 `useHotkeys("space")` 监听空格的按下 / 松开；输入框内不触发                  |
| 同上                                     | 900  | 窗口失焦时重置空格状态，避免空格"卡住"                                          |
| 同上                                     | 910  | 新增 `handlePointerDownCapture`：空格按住时，在捕获阶段开始平移，元素不会被拖动 |
| 同上                                     | 935  | svg 上绑定 `onPointerDownCapture`                                               |

---

## 第 1 次：对齐 Figma 的快捷键（A + B 组）

### `src/components/EditorHeader/ControlPanel.jsx`

| 位置       | 修改内容                                                                                                  |
| ---------- | --------------------------------------------------------------------------------------------------------- |
| 178        | `useSelect()` 额外取出 `bulkSelectedElements`、`setBulkSelectedElements`                                  |
| 273        | 撤销"删除表格"时，跳过已经恢复的关系，避免关系被重复添加                                                  |
| 664        | 新增 `resetZoom`：缩放回 100%，不改变位置（`Shift+0`）                                                    |
| 666        | 新增 `findElement`：按 `{ id, type }` 查找表格 / 视图 / 区域 / 注释                                       |
| 682        | 新增 `getSelection`：当前选中的元素（单选 + 多选的并集）                                                  |
| 697        | 新增 `selectAll`：全选未锁定的元素（`Ctrl+A`）                                                            |
| 713        | 新增 `deselect`：取消选择（`Esc`）                                                                        |
| 723        | 新增 `deleteSelection`：删除所有选中元素；注释和区域按 id 从大到小删除                                    |
| 765        | 新增 `nudgeOrPan`：有选中元素时移动 1px / 10px 并记入撤销，否则平移画布；替换原来的 `panLeft` 等 4 个函数 |
| 850        | `fitWindow` 改为调用新的 `fitToView()`                                                                    |
| 851        | 新增 `zoomToSelection`：缩放到选中元素（`Shift+2`）                                                       |
| 863        | `fitToView` 改为可传入要显示的表格 / 视图 / 区域 / 注释，默认是全部                                       |
| 920        | `fitToView` 没有元素时直接返回，不再算出 NaN                                                              |
| 973        | 自动排列改为 `fitToView({ tables: arrangedTables })`                                                      |
| 1867       | 菜单提示：重做 `Ctrl+Y / Ctrl+Shift+Z`                                                                    |
| 1914       | 菜单「删除」改为调用 `deleteSelection`，提示 `Del / Backspace`                                            |
| 2092、2096 | 菜单提示：放大 `Ctrl+(=/Up/Wheel)`、缩小 `Ctrl+(-/Down/Wheel)`                                            |
| 2338       | 缩放下拉菜单中「适应窗口」的提示改为 `Shift+1`                                                            |
| 2194       | 快捷键：`mod+y, mod+shift+z` → 重做                                                                       |
| 2202–2204  | 快捷键：`delete, backspace` → 删除；`mod+a` → 全选；`escape` → 取消选择                                   |
| 2208–2212  | 快捷键：放大 / 缩小，增加 `=`、`-`、JIS 键盘的 `;` 和数字键盘 `+` / `-`                                   |
| 2213–2215  | 快捷键：`shift+0` / `shift+1` / `shift+2`                                                                 |
| 2224–2231  | 快捷键：方向键和 `Shift+方向键` 改为调用 `nudgeOrPan`                                                     |

prettier 顺带重新格式化了文件里原本格式不对的 2 处，与本次功能无关。

### `src/components/EditorCanvas/Canvas.jsx`

| 位置    | 修改内容                                                                                                                                                             |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 271     | 新增 `isAdditive`：`Shift+点击` 和 `Ctrl+点击` 一样可以加选                                                                                                          |
| 550     | 框选时按住 `Shift` 也会追加到现有选择                                                                                                                                |
| 826–880 | 滚轮处理：支持触控板左右滑动（`deltaX`）；触控板捏合按幅度平滑缩放（`isMouseWheel` 用来区分鼠标和触控板）；Firefox 的行 / 页单位换算成像素；缩放时光标下的点保持不动 |

### 文档

| 文件                            | 内容                     |
| ------------------------------- | ------------------------ |
| `docs/shortcuts-vs-figma.md`    | 快捷键对照表（简体中文） |
| `docs/shortcuts-vs-figma.ja.md` | 快捷键对照表（日语）     |
| `docs/shortcuts-vs-figma.en.md` | 快捷键对照表（英语）     |

---

## 第 2 次：右键菜单 + 区域整体移动

### 新增文件

| 文件                                                    | 内容                                                                                                  |
| ------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `src/components/EditorCanvas/ContextMenu.jsx`（116 行） | 右键菜单组件，基于 Semi UI `Dropdown`；按空白处 / 单个元素 / 多选显示不同菜单项；`Esc` 或点击外部关闭 |
| `src/utils/elementBounds.js`（82 行）                   | `getElementBounds`：计算所有元素的矩形；`getAreaContents`：找出完全位于指定区域内的元素               |
| `docs/context-menu-and-area-move.md`                    | 设计思路文档                                                                                          |

### `src/components/EditorCanvas/Canvas.jsx`

| 位置    | 修改内容                                                                                             |
| ------- | ---------------------------------------------------------------------------------------------------- |
| 48–49   | 引入 `getAreaContents`、`ContextMenu`                                                                |
| 53      | 组件接收 `editorActions` 参数                                                                        |
| 83      | `notDragging` 新增 `areaContents: []`                                                                |
| 100–101 | 新增 `contextMenuTarget`（被右键点中的元素）和 `contextMenu`（菜单位置和目标）                       |
| 341     | 开始拖动时，计算被拖动区域里的元素；按住 `Alt` 时不计算                                              |
| 349     | 新增 `getDraggedAreaContents`                                                                        |
| 432–459 | 拖动时，用同一个位移量移动选中元素和区域内的元素（`moveBy`）                                         |
| 561     | 右键按下时记住点中的元素                                                                             |
| 617     | 松开时的撤销记录包含区域内的元素，一次撤销就能全部还原                                               |
| 772     | 新增 `handleContextMenu`：右键拖动后不弹菜单；输入框里保留浏览器菜单；其他情况先选中元素，再打开菜单 |
| 826     | 滚动滚轮时关闭菜单                                                                                   |
| 938     | svg 的 `onContextMenu` 改为 `handleContextMenu`                                                      |
| 1048    | 渲染 `<ContextMenu>`                                                                                 |

### `src/components/EditorHeader/ControlPanel.jsx`

| 位置 | 修改内容                                                                                                                      |
| ---- | ----------------------------------------------------------------------------------------------------------------------------- |
| 108  | 引入 `getAreaContents`                                                                                                        |
| 128  | 组件接收 `editorActions` 参数                                                                                                 |
| 743  | 新增 `updateElement`：按类型调用对应的 update 函数                                                                            |
| 753  | 新增 `toggleLock`：锁定或解锁；锁定后取消选择                                                                                 |
| 765  | `nudgeOrPan` 改为：移动选中的区域时，区域里的元素一起移动                                                                     |
| 2175 | 用 `useEffect` 把编辑、复制、剪切、粘贴、原地复制、删除、锁定、全选、缩放等操作登记到 `editorActions.current`，供右键菜单调用 |

### `src/components/Workspace.jsx`

| 位置 | 修改内容                |
| ---- | ----------------------- |
| 74   | 新增 `editorActionsRef` |
| 528  | 传给 `ControlPanel`     |
| 551  | 传给 `Canvas`           |

prettier 顺带重新格式化了文件里原本格式不对的 2 处，与本次功能无关。

### 翻译文件

新增 4 个 key：`select_all`、`zoom_to_fit`、`zoom_to_selection`、`zoom_to_100`。

| 文件                        | 位置    |
| --------------------------- | ------- |
| `src/i18n/locales/en.js`    | 360–363 |
| `src/i18n/locales/zh.js`    | 344–347 |
| `src/i18n/locales/zh-tw.js` | 354–357 |
| `src/i18n/locales/jp.js`    | 356–359 |

---

## 第 3 次：在侧边栏选中表格时，画布自动定位并高亮

在左侧「表格」列表中点开一张表，或者用搜索框选中一张表时：画布平滑移动（约 0.3 秒），让这张表位于画面正中；同时显示橙色光框，闪烁后约 2 秒消失。缩放比例不变。

在画布上直接点击表格时**不会**触发，避免画面乱跳。

| 文件                                                     | 位置       | 修改内容                                                                           |
| -------------------------------------------------------- | ---------- | ---------------------------------------------------------------------------------- |
| `src/hooks/useFocusTable.js`                             | 新增文件   | 计算表格中心，用 `requestAnimationFrame` 平滑平移画布；设置高亮状态，2 秒后清除    |
| `src/hooks/index.js`                                     | 18         | 导出 `useFocusTable`                                                               |
| `src/context/SelectContext.jsx`                          | 18、27     | 新增状态 `focusFlash`（当前要高亮的元素）                                          |
| `src/components/EditorCanvas/Table.jsx`                  | 83–87      | 判断这张表是否需要高亮                                                             |
| 同上                                                     | 536 附近   | 在表格外围绘制高亮框；以 `focusFlash.key` 为 key，重复选中同一张表时动画会重新播放 |
| `src/index.css`                                          | 250–270    | 高亮样式（橙色描边 + 半透明填充）和闪烁动画                                        |
| `src/components/EditorSidePanel/TablesTab/TablesTab.jsx` | 11、27、63 | 展开表格时调用 `focusTable`                                                        |
| `src/components/EditorSidePanel/TablesTab/SearchBar.jsx` | 2、10、52  | 搜索选中表格时调用 `focusTable`                                                    |

---

## 第 4 次：修复平移时反复触发保存导致卡顿

**现象**：用空格平移时很慢，并且好像一直在自动保存。

**原因**（drawDB 原有问题，用空格平移的频率更高，所以更明显）：

1. `save()` 的依赖里包含 `transform`，所以平移时每移动一帧，`save` 都会被重新创建。
2. 保存的 effect 依赖 `[saveState, layout, save]`：只要状态还是「保存中」，`save` 一变就会再调用一次。
3. 上一次保存还没写完就开始下一次拖动时，**每一帧都会触发一次完整的 IndexedDB 写入**。图表越大写得越慢，写入越堆越多，拖动就越卡。

**修复**：`save()` 和 `buildCloudPayload()` 改为通过 `transformRef` 读取 pan / zoom，并从依赖里去掉 `transform`。这样平移不会再让 `save` 变化；松开鼠标时照常保存一次，写入的是最新位置。

| 文件                           | 位置                                     | 修改内容                                                |
| ------------------------------ | ---------------------------------------- | ------------------------------------------------------- |
| `src/components/Workspace.jsx` | 82–86                                    | 新增 `transformRef`，每次渲染时同步为最新的 `transform` |
| 同上                           | 130–131                                  | `buildCloudPayload` 改用 `transformRef.current`         |
| 同上                           | 195–196、220–221                         | `save` 的新增 / 更新两个分支改用 `transformRef.current` |
| 同上                           | `buildCloudPayload` 与 `save` 的依赖数组 | 去掉 `transform`                                        |

缩放（`transform.zoom`）仍然会触发自动保存，这是原有行为，没有改动。

**验证**：连续拖动 3 次，修复前拖动过程中也会写入数据库，修复后一共只写入 3 次（每次松开时 1 次），并且保存的 pan 与画面一致。

---

## 第 5 次：性能优化（对应 issue #1–#4）

Issue：[#1](https://github.com/satt-hri/drawdb/issues/1)、[#2](https://github.com/satt-hri/drawdb/issues/2)、[#3](https://github.com/satt-hri/drawdb/issues/3)、[#4](https://github.com/satt-hri/drawdb/issues/4)。分析过程见 `docs/performance-analysis.md`。

### 效果（80 张表 / 79 条关系线，每帧耗时；空任务的基准约 9ms）

| 操作                       | 优化前 | 优化后    |
| -------------------------- | ------ | --------- |
| 鼠标在画布上移动           | 178ms  | **10ms**  |
| 空格平移                   | 198ms  | **16ms**  |
| 滚轮平移                   | 223ms  | **10ms**  |
| 拖动一张表                 | 253ms  | **80ms**  |
| 在侧边栏输入表名（每个字） | 261ms  | **119ms** |

平移时重新渲染的组件：优化前是全部 80 张表 + 79 条关系线 + 顶部工具栏 + 侧边栏；优化后**只剩画布组件本身**。

### #1 鼠标坐标改为 ref

| 文件                                     | 位置    | 修改内容                                                                                                                  |
| ---------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------- |
| `src/context/CanvasContext.jsx`          | 116–145 | 鼠标坐标存入 `pointerScreenRef`；`pointer.spaces` 改为 getter，读取时计算最新值；只有打开「调试坐标」面板时才触发重新渲染 |
| `src/components/EditorCanvas/Canvas.jsx` | 868     | 滚轮缩放时，先取出光标坐标再更新 transform                                                                                |

### #2 画布元素不再被无关的变化牵连重新渲染

光加 `React.memo` 不够：表格组件读取的 context 在平移时每一帧都会变化。所以同时做了以下几处：

| 文件                                                                                         | 位置                    | 修改内容                                                                                                                                              |
| -------------------------------------------------------------------------------------------- | ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/context/TransformContext.jsx`                                                           | 6–8、50–54              | 新增 `TransformRefContext`（始终保存最新 transform 的 ref）和 `SetTransformContext`（只提供 `setTransform`），两者的值都不会变化                      |
| `src/hooks/useTransformRef.js`、`useSetTransform.js`                                         | 新增文件                | 对应的两个 hook                                                                                                                                       |
| `src/context/DiagramContext.jsx`、`NotesContext.jsx`、`AreasContext.jsx`、`ViewsContext.jsx` | `useTransformRef` 一行  | 原来只在「新增元素时放到画面中央」用到 pan，却因此订阅了 transform，平移的每一帧都让所有表格和关系线重新渲染；改为新增时才从 ref 读取                 |
| `src/components/EditorCanvas/Table.jsx`                                                      | 290–330                 | 字段列表（含每个字段的 Popover）用 `useMemo` 缓存，只依赖这张表自身的数据、选中状态和显示设置；删除、锁定等回调通过 `latest` ref 调用，避免读到旧数据 |
| 同上                                                                                         | 565、748                | 不再订阅 `useTransform`，改为从 props 接收 `zoom`；导出 `memo(Table)`                                                                                 |
| `src/components/EditorCanvas/Relationship.jsx`                                               | 303                     | 导出 `memo(Relationship)`                                                                                                                             |
| `src/components/EditorCanvas/Canvas.jsx`                                                     | 155–160、534、701、1005 | `elementPointerDown` 改为 ref；给表格传入稳定的 `onTablePointerDown`、`handleGripField`，以及 `zoom`                                                  |
| `src/components/EditorHeader/ControlPanel.jsx`                                               | 125、190–191、2739      | 不再订阅 transform：缩放百分比拆成 `ZoomPercentage` 小组件，保存时从 ref 读取；导出 `memo(ControlPanel)`                                              |
| `src/components/EditorSidePanel/SidePanel.jsx`                                               | 210                     | 导出 `memo(SidePanel)`                                                                                                                                |
| `src/components/Workspace.jsx`                                                               | 524                     | `IdContext` 的 value 用 `useMemo` 固定（原来每次渲染都是新对象，导致顶部工具栏跟着重新渲染）                                                          |
| `src/hooks/useFocusTable.js`                                                                 | 18–21                   | 改用 `useSetTransform` + `useTransformRef`，表格列表不再随平移重新渲染                                                                                |

### #3 按帧合并：评估后暂不修改

现代浏览器（Chrome / Edge / Firefox / Safari）本身就会把 `pointermove`、`wheel` 等连续事件对齐到每一帧，应用层再用 `requestAnimationFrame` 合并收益很小。反而有风险：松开鼠标时，如果最后一次移动还在排队、没有处理，撤销记录里的最终坐标可能差一帧。另外经过 #2，平移时每帧只剩画布组件本身在渲染。

### #4 问题面板防抖

| 文件                                        | 位置      | 修改内容                                                                                                                     |
| ------------------------------------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `src/components/EditorSidePanel/Issues.jsx` | 14、22–42 | 停止修改 300ms 后才执行 `getIssues()`；依赖中去掉 `issues`，比较改为函数式 `setIssues`（原来每次更新问题列表后还会多算一遍） |

### 回归测试（全部通过）

拖动表格（位移正确，撤销能还原）、从字段拖出连线（新增关系，撤销能删除）、悬停字段显示删除按钮、锁定 / 解锁、双击打开编辑、缩放百分比随缩放更新、问题面板（修改约 300ms 后更新）、在侧边栏选中表格时自动居中 + 高亮、右键菜单。

### 剩余的开销

拖动表格和输入表名仍需 80～120ms。原因是 `tables` 一变，所有读取 `useDiagram()` 的组件（80 个表格外层、79 条关系线的路径计算、侧边栏列表）都要重新执行。要进一步优化，需要拆分 `DiagramContext`，或者做视口裁剪（参考上游 drawdb-io/drawdb#1122）。

---

## 查看完整差异

```bash
git diff
```

```bash
git status
```
