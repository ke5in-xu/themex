import { defineConfig } from 'vitepress'
import { getItems } from '@ke5in-xu/themex/lib/items'
import mdItCustomAttrs from "markdown-it-custom-attrs"


export default defineConfig({
    srcDir: 'src',
    head: [
      ['link', { rel: 'icon', href: '/favicon/favicon.svg' }],
    ],
    title: 'ThemeX',
    base: '/',
    description: 'A VitePress theme demo — blog, docs, lightbox, dark mode',
    ignoreDeadLinks: true,

    themeConfig: {
        items: await getItems('src/posts/*/index.md'),
        itemsPath: '/posts/',
        heroDir: '/post-hero',
        siteTitle: 'ThemeX',
        brandColor: '#ff8000',
        showAvatar: true,
        logo: '/logo/logo.svg',
        nav: [
            { text: 'Home', link: '/'},
            { text: 'Collection', link: '/posts/', activeMatch:'/posts/'},
            { text: 'Docs', activeMatch:'/docs/', items: [
              { text: 'What is ThemeX', link: '/docs/what-is-themex/' },
              { text: 'Getting Started', link: '/docs/getting-started/' },
              { text: 'Markdown Examples', link: '/docs/markdown-examples/' }
            ]}
        ],
        sidebar: {
          '/docs/': [
            {
              text: 'Introduction',
              items: [
                { text: 'What is ThemeX', link: '/docs/what-is-themex/' },
                { text: 'Getting Started', link: '/docs/getting-started/' }
              ]
            },
            {
              text: 'Writing',
              items: [
                { text: 'Markdown Examples', link: '/docs/markdown-examples/' }
              ]
            }
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
