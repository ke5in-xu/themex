import type { ThemexItem, ThemexItemGroup } from './types'

export function initTags(items: ThemexItem[] = []) {
    const data: ThemexItemGroup = { all: [] }

    items.forEach((item) => {
        data.all.push(item)

        item.frontMatter.tags?.forEach((tag) => {
            data[tag] ??= []
            data[tag].push(item)
        })
    })

    return data
}

export function getHeroSrc(hero: string, heroDir = '/post-hero') {
    const filename = /\.[a-z0-9]+$/i.test(hero) ? hero : `${hero}.png`
    return `${heroDir}/${filename}`
}
