import { defineConfig } from 'vitepress'
import { getItems } from '../themex/lib/items'
import mdItCustomAttrs from "markdown-it-custom-attrs"


export default defineConfig({
    srcDir: 'src',
    head: [
      ['link', { rel: 'icon', href: '/favicon/favicon.svg' }],
    ],
    title: 'Themex',
    base: '/',
    description: 'A VitePress theme demo — blog, docs, lightbox, dark mode',
    ignoreDeadLinks: true,

    themeConfig: {
        items: await getItems('src/posts/*/index.md'),
        itemsPath: '/posts/',
        heroDir: '/post-hero',
        siteTitle: 'Themex',
        brandColor: '#ff8000',
        showAvatar: true,
        logo: '/logo/logo.svg',
        nav: [
            { text: 'Home', link: '/'},
            { text: 'Collection', link: '/posts/', activeMatch:'/posts/'},
            { text: 'Docs', activeMatch:'/documents/', items: [
              { text: 'Getting Started', link: '/documents/getting-started/' },
              { text: 'Markdown Examples', link: '/documents/markdown-examples/' }
            ]}
        ],
        sidebar: {
          '/documents/getting-started/': [
            { text: 'Getting Started', link: '/documents/getting-started/' }
          ],
          '/documents/markdown-examples/': [
            { text: 'Markdown Examples', link: '/documents/markdown-examples/' }
          ]
        },
        search: {
            provider: 'local',
        },
        outlineTitle: '目录',
        outline: [2,3]
    },

    vite: {
        server: { port: 5173 }
    },

    markdown: {
        image: {
          lazyLoading: true
        },
        config: (md) => {
          md.use(mdItCustomAttrs, "image", {
            "data-fancybox": "gallery",
          });
        },
    }
    
})
