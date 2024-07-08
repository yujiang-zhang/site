# buildpage

根据 markdown 文件生成特定主题的 html。

## 使用

会依据根目录的 `README.md` 生成 `index.html`。

```sh
npx @zyjared/buildpage
```

或者：

```sh
pnpm add -D @zyjared/buildpage
pnpm buildpage
```

## 主题

可以在 `.md` 文件中进行主题选择，目前也只有 `zyjared` 一种主题。

```md
---
title: 我的主页
theme:
  name: zyjared
  description: 这是简短的介绍,
  avatar: avatar.png
  link: https://github.com
---

# title
```

## 配置

如果不需要默认行为，也可以创建 `buildpage.config.ts` 进行配置。

```ts
import { defineConfig } from '@zyjared/genpage'

export default defineConfig({
  input: {
    filepath: 'public/README.md',
    public: 'public',
    // ignore: ['README.md'],
  },
  output: {
    dist: 'public',
    filename: 'index.html',
    filepath: 'public/index.html', // 这会覆盖 filename
    clean: false,
    overwrite: false,
  },
  head: {},
})
```

> [!TIP]
>
> 如果 `public` 目录中存在 `style.css` 文件，这将会自动添加到 `<head>` 中。

## 其他

```sh
$ pnpm genpage -h

# Usage: buildpage [options]
#
# Options:
#   -V, --version          output the version number
#   -c, --config <config>  Path to the configuration file
#   -o, --output <output>  Path to the output HTML file
#   -i, --input <input>    Path to the input Markdown file
#   -p, --public <public>  Directory containing public resources
#   -d, --dist <dist>      Output directory for the generated files
#   -h, --help             display help for command
```
