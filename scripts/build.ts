import typescript from '@rollup/plugin-typescript'
import { ModuleFormat, OutputOptions, RollupOptions, rollup } from 'rollup'
import { copyPackageJSON, rmrf } from './util'
import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import commonjs from 'rollup-plugin-commonjs'

function format(format: ModuleFormat): RollupOptions {
  return {
    input: 'src/index.ts',
    external: ['ua-parser-js', 'rxjs'],
    output: {
      minifyInternalExports: true,
      sourcemap: true,
      dir: `dist/@rymcu/tracing/${format}`,
      format: format,
      name: 'RYMCUTracing',
      esModule: true,
      globals: {
        'ua-parser-js': 'uaParserJs'
      }
    },
    plugins: [
      typescript({
        tsconfig: `./tsconfig.${format}.json`
      }),
      resolve(),
      commonjs(),
      babel({ babelHelpers: 'bundled' }),
      terser()
    ]
  }
}

async function buildModule(module: ModuleFormat) {
  console.log(`build ${module} module......`)
  const bundle = await rollup(format(module))
  await bundle.write(format(module).output as OutputOptions)
  console.log(`build ${module} module over......`)
}

async function buildAll() {
  console.log('rm -rf dist......')
  rmrf('dist')
  console.log('rm -rf dist over......')
  await buildModule('umd')
  await buildModule('es')
  await buildModule('cjs')
  console.log('build modules finished......')
}

buildAll().then(() => {
  console.log('copy package.json to dist......')
  copyPackageJSON('dist/@rymcu/tracing/package.json')
  console.log('copy files to dist over......')
})