import fs from 'fs'
import path, { join } from 'path'
import { name, version, repository } from '../package.json'

export function copy(source: string, dist: string) {
  if (!fs.existsSync(source)) {
    throw new Error(`Source file or directory "${source}" does not exist.`)
  }

  if (fs.statSync(source).isDirectory()) {
    copyDirRecursive(source, dist)
  } else {
    const distDir = path.dirname(dist)
    if (!fs.existsSync(distDir)) {
      fs.mkdirSync(distDir, { recursive: true })
    }
    fs.copyFileSync(source, dist)
  }
}

export function copyDirRecursive(source: string, dist: string) {
  if (!fs.existsSync(dist)) {
    fs.mkdirSync(dist)
  }

  const files = fs.readdirSync(source)

  files.forEach(file => {
    const sourcePath = path.join(source, file)
    const distPath = path.join(dist, file)

    if (fs.statSync(sourcePath).isDirectory()) {
      copyDirRecursive(sourcePath, distPath)
    } else {
      if (!fs.existsSync(distPath)) {
        fs.copyFileSync(sourcePath, distPath)
      }
    }
  })
}

export function copyPackageJSON(dist: string): void {
  const packageJson = JSON.parse(
    fs.readFileSync('package.json', { encoding: 'utf8' })
  )
  packageJson.main = './cjs/index.js'
  packageJson.module = './es/index.js'
  packageJson.types = './es/index.d.ts'
  packageJson.exports = {
    '.': {
      import: './es/index.js',
      require: './cjs/index.cjs',
      types: './es/index.d.ts'
    },
    './*': './*'
  }
  delete packageJson.scripts
  fs.writeFileSync(dist, JSON.stringify(packageJson, null, 2))
}

export function rmrf(path: string): void {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach((file, index) => {
      const curPath = join(path, file)
      if (fs.lstatSync(curPath).isDirectory()) {
        rmrf(curPath)
      } else {
        fs.unlinkSync(curPath)
      }
    })
    fs.rmdirSync(path)
  }
}

export function flushPackageInfo(module: string) {
  const path = `dist/${name}/${module}/index.js`
  if (!fs.existsSync(path)) {
    throw new Error(`File "${path}" does not exist.`)
  }
  let content = fs.readFileSync(path, { encoding: 'utf8' })
  content = content.replace(/\{\{PACKAGE_NAME\}\}/g, name)
  content = content.replace(/\{\{PACKAGE_VERSION\}\}/g, version)
  content = content.replace(/\{\{PACKAGE_REPOSITORY\}\}/g, repository)
  fs.writeFileSync(path, content, { encoding: 'utf8' })
}
