import { globby } from 'globby'
import matter from 'gray-matter'
import { readFile } from 'fs/promises'
import type { ThemexItem } from './types'

export async function getItems(pattern: string | string[], contentDir = 'src') {
    const paths = await globby(pattern)
    const prefix = contentDir.replace(/\\/g, '/') + '/'

    const items = await Promise.all(
        paths.map(async (rawPath): Promise<ThemexItem> => {
            const path = rawPath.replace(/\\/g, '/')
            const raw = await readFile(rawPath, 'utf-8')
            const { data, content } = matter(raw)

            const { title, description } = extractFromBody(content)

            return {
                frontMatter: {
                    date: formatDate(data.date),
                    title: data.title ?? title,
                    description: data.description ?? description,
                    category: data.category,
                    tags: data.tags,
                    hero: data.hero,
                },
                regularPath: `/${path.replace(prefix, '').replace(/\.md$/, '.html')}`
            }
        })
    )

    return items.sort(compareDate)
}

function extractFromBody(content: string): { title?: string; description?: string } {
    const lines = content.trim().split('\n')
    let title: string | undefined
    let description: string | undefined

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim()

        // First h1 (either # or === style)
        if (!title) {
            const h1Match = line.match(/^#\s+(.+)/)
            if (h1Match) {
                title = h1Match[1].replace(/[`*_~\[\]]/g, '').trim()
                continue
            }
            // setext-style h1 (next line is ===)
            if (i + 1 < lines.length && lines[i + 1].trim().match(/^=+\s*$/) && line) {
                title = line.replace(/[`*_~\[\]]/g, '').trim()
                i++
                continue
            }
        }

        // First non-empty paragraph after title as description
        if (title && !description && line && !line.startsWith('#') && !line.startsWith('```') && !line.startsWith('>') && !line.startsWith('-') && !line.startsWith('|') && !line.startsWith('!')) {
            const cleaned = line.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/[`*_~\[\]]/g, '').trim()
            if (cleaned) {
                description = cleaned
                break
            }
        }
    }

    return { title, description }
}

function formatDate(date = new Date()) {
    return new Date(date).toISOString().split('T')[0]
}

function compareDate(a: ThemexItem, b: ThemexItem) {
    return (a.frontMatter.date ?? '') < (b.frontMatter.date ?? '') ? 1 : -1
}
