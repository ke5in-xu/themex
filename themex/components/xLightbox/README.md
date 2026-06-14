# xLightbox

零依赖图片灯箱。点击任意带 `data-fancybox` 属性的 `<img>` 可放大查看。相同 `data-fancybox` 值的图片自动编组，支持箭头键导航。

以独立 Vue 实例挂载到 `document.body`。需配合 `markdown-it-custom-attrs` 插件为 Markdown 图片注入 `data-fancybox` 属性。
