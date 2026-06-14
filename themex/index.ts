import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'

import xArticle from './templates/xArticle/xArticle.vue'
import xHome from './templates/xHome/xHome.vue'
import Collection from './templates/xCollection/xCollection.vue'
import Badge from './components/xBadge/xBadge.vue'
import { initLightbox } from './components/xLightbox/lightbox'

import './style/style.css'

const theme: Theme = {
    ...DefaultTheme,
    Layout: xArticle,
    enhanceApp(ctx) {
        DefaultTheme.enhanceApp?.(ctx)
        ctx.app.component('xHome', xHome)
        ctx.app.component('Collection', Collection)
        ctx.app.component('Badge', Badge)
        initLightbox()
    }
}

export default theme
