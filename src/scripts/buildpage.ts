import process from 'node:process'
import { program } from 'commander'
import { generate } from '..'
import { defineConfig } from '../core/config'
import { path } from '../core/utils'

program
  .version('0.0.1')
  .usage('[options]')
  .option('-c, --config <config>', 'Path to the configuration file')
  .option('-o, --output <output>', 'Path to the output HTML file')
  .option('-i, --input <input>', 'Path to the input Markdown file')
  .option('-p, --public <public>', 'Directory containing public resources')
  .option('-d, --dist <dist>', 'Output directory for the generated files')

function run() {
  program.parse(process.argv)

  const { config, ...args } = program.opts()
  const options = defineConfig({
    input: {
      filepath: args.input,
      public: args.public,
    },
    output: {
      dist: args.dist,
      filepath: args.output,
    },
  })

  if (config) {
    import(path(config)).then((m) => {
      generate(m.default)
    })
  }
  else {
    generate(options)
  }

  // eslint-disable-next-line no-console
  console.log('build success')
}

run()
