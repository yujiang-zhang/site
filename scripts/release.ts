import { execSync } from 'node:child_process'
import fs from 'fs-extra'
import { path } from '../src/core/utils'

function release() {
  execSync('npm version patch -m "chore(release): %s"', { stdio: 'inherit' })

  const packageJson = JSON.parse(fs.readFileSync(path('package.json'), 'utf-8'))
  const newVersion = packageJson.version

  execSync('git add .', { stdio: 'inherit' })
  execSync(`git commit -m "chore(release): bump version to ${newVersion}"`, { stdio: 'inherit' })
  execSync(`git tag v${newVersion}`, { stdio: 'inherit' })

  execSync('git push', { stdio: 'inherit' })
  execSync('git push --tags', { stdio: 'inherit' })

  execSync('npm publish --access public', { stdio: 'inherit' })
}

release()
