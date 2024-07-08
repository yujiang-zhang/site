import * as cheerio from 'cheerio'
import type { Head, SchemaAugmentations, Unhead } from '@unhead/schema'
import type { Dict } from './types'
import { path } from './utils'
import { pushStyleToHeadByFile } from './css'

export type Theme<T = any> = T extends keyof Themes
  ? { name: T } & Themes[T]
  : { name: string } & Dict

interface Themes {
  zyjared: {
    description: string
    avatar: string
    link: string
  }
}

const themes: Dict<(theme: Theme, body: string) => string> = {
  zyjared(theme: Theme<'zyjared'>, body) {
    const { description, avatar, link } = theme
    const p = `
<p>
<small>${description || 'welcome'}</small>
<a href="${link || '#'}" title="github link"><img src="${avatar || 'favicon.ico'}" alt="avatar"></a>
</p>`

    const $ = cheerio.load(body)

    $('h1').first().after(p)
    return $.html()
  },
}

export async function renderHtmlBodyByTheme(options: {
  theme: Theme
  body: string
  head: Unhead<Head<SchemaAugmentations>>
}) {
  const { theme, body, head } = options
  if (!theme?.name || !themes[theme.name]) {
    return body
  }

  const stylepath = path(__dirname, 'styles/', `${theme.name}.css`)
  await pushStyleToHeadByFile(head, stylepath)

  return themes[theme.name](theme, body)
}
