import process from 'node:process'
import { program } from 'commander'
import { copyDir, path } from '../src/core/utils'

program
  .version('0.0.1')
  .usage('[options]')
  .option('-r, --rootDir <rootDir>', 'Path to the source directory')
  .option('-o, --outDir <outDir>', 'Path to the build directory')

program.parse(process.argv)

const { rootDir = 'src', outDir = 'build' } = program.opts()

function copyStyles() {
  const stylesDir = 'core/styles'
  copyDir(path(rootDir, stylesDir), path(outDir, stylesDir))
}

copyStyles()
