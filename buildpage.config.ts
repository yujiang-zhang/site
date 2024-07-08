import { defineConfig } from './src/core/config'

export default defineConfig({
  input: {
    filepath: 'public/README.md',
    public: 'public',
    // ignore: ['README.md'],
  },
  output: {
    dist: 'public',
    filename: 'index.html',
    clean: false,
    overwrite: false,
  },
  head: {
    htmlAttrs: { lang: 'en' },
    link: [
      { rel: 'stylesheet', href: 'https://use.typekit.net/rzl1qcy.css' },
    ],
    meta: [
      { name: 'description', content: 'zyjared, a frontend engineer' },
      { name: 'keywords', content: 'Jared Zhang, zyjared' },
    ],
  },
})
