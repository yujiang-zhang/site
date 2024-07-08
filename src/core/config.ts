import type { Head } from '@unhead/schema'
import { merge, path } from './utils'
import type { Dict } from './types'

export interface DefaultConfig {
  input: {
    filepath: string
    public: string
    ignore?: string[]
    include?: string[]
  }
  output: {
    dist: string
    filename: string
    filepath: string
    clean: boolean
    overwrite: boolean
  }
  head: Head
}

export type Config = {
  [k in keyof DefaultConfig]?: DefaultConfig[k] extends Dict ? Partial<DefaultConfig[k]> : DefaultConfig[k]
}

const defaultConfig: DefaultConfig = {
  input: {
    filepath: 'README.md',
    public: '.',
    ignore: ['style.css'],
  },
  output: {
    dist: '.',
    filename: 'index.html',
    filepath: '',
    clean: false,
    overwrite: false,
  },
  head: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
    ],
    link: [
      { rel: 'icon', href: '/favicon.ico' },
    ],
  },
}

export function mergeConfig(...configs: Config[]) {
  const config = merge({}, ...configs) as DefaultConfig
  if (!config.output.filepath) {
    config.output.filepath = path(config.output.dist, config.output.filename)
  }
  return config
}

export function defineConfig(config: Config) {
  return config
}

export async function getRootConfig(configPath = 'buildpage.config.ts') {
  try {
    const config = await import(path(configPath))
    return config.default
  }
  catch (error) {
    return {}
  }
}

export function formateConfig(rootConfig: Config, config: Config) {
  return mergeConfig(defaultConfig, rootConfig, config)
}
