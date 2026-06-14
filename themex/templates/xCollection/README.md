# xCollection

带标签筛选的响应式卡片网格。全局注册为 `<Collection />`。从 `themeConfig.items` 读取数据，渲染可筛选的卡片列表。

**展示的 frontmatter 字段：**
- `date` — 日期，显示在标题上方
- `title` — 卡片标题
- `description` — 卡片描述（支持 HTML）
- `hero` — 可选的标题图片

标签云根据所有条目的 `tags` 数组自动生成。
