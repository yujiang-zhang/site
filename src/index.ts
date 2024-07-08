import { createHead } from 'unhead'
import fs from 'fs-extra'
import type { Config } from './core/config'
import { formateConfig, getRootConfig } from './core/config'
import { parseMd } from './core/md'
import { autoPushHeadFromPublic } from './core/assets'
import { copyDir, merge, path } from './core/utils'
import { saveHtml } from './core/html'
import { renderHtmlBodyByTheme } from './core/theme'

export { defineConfig } from './core/config'

export async function generate(options: Config = {}) {
  const rootConfig = await getRootConfig()
  const config = formateConfig(rootConfig, options)

  const content = fs.readFileSync(path(config.input.filepath), 'utf-8')
  const { frontMatter: { theme, ...mdHead }, body } = parseMd(content)

  copyDir(config.input.public, config.output.dist, {
    clean: config.output.clean,
    overwrite: config.output.overwrite,
    ignore: config.input.ignore,
  })

  const head = createHead()
  head.push(merge(config.head, mdHead))

  await autoPushHeadFromPublic(head, config.input.public)

  const themeBody = await renderHtmlBodyByTheme({ theme, body, head })

  saveHtml(config.output.filepath, head, themeBody)
}
