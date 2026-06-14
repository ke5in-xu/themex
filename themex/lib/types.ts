export type ThemexItem = {
    frontMatter: {
        date?: string
        title?: string
        category?: string
        tags?: string[]
        description?: string
        hero?: string
    }
    regularPath: string
}

export type ThemexItemGroup = Record<string, ThemexItem[]>
