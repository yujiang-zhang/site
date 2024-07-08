import Path from 'node:path'
import process from 'node:process'
import _ from 'lodash'
import fs from 'fs-extra'

export function path(...p: string[]) {
  if (Path.isAbsolute(p[0])) {
    return Path.resolve(...p)
  }
  return Path.resolve(process.cwd(), ...p)
}

export function pathEqual(path1: string, path2: string) {
  return path(path1) === path(path2)
}

export function merge<T = any, U = any>(...args: U[]): T {
  args = args.filter(Boolean)
  return (_.mergeWith({}, ...args, (objValue: any, srcValue: any) => {
    if (_.isArray(objValue)) {
      return objValue.concat(srcValue)
    }
  }))
}

export function copyDir(src: string, dest: string, options: {
  clean?: boolean
  overwrite?: boolean
  ignore?: string[]
  include?: string[]
} = { clean: false }) {
  src = path(src)
  dest = path(dest)

  if (src === dest)
    return

  const { clean, overwrite, ignore, include } = options

  if (clean) {
    fs.removeSync(dest)
  }

  fs.ensureDirSync(dest)

  let filterFn
  if (include) {
    filterFn = (s: string) => {
      return include.some(i => pathEqual(s, path(src, i)))
    }
  }
  else if (ignore) {
    filterFn = (s: string) => {
      return !ignore.some(i => pathEqual(s, path(src, i)))
    }
  }
  else {
    filterFn = () => true
  }

  fs.copySync(src, dest, { overwrite, filter: filterFn })
}

export function copyFiles(files: string[], toDir: string, options: { overwrite?: boolean } = {}) {
  toDir = path(toDir)
  files = files.map(file => path(file))

  fs.ensureDirSync(toDir)

  const { overwrite } = options

  files.forEach((file) => {
    const topath = path(toDir, Path.basename(file))
    if (overwrite || !fs.existsSync(topath)) {
      fs.copyFileSync(file, topath)
    }
  })
}
