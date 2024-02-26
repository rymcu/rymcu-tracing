import typescript from '@rollup/plugin-typescript'
import { ModuleFormat, OutputOptions, RollupOptions, rollup } from 'rollup'
import { copyPackageJSON, flushPackageInfo, rmrf } from './util'
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
      babel({
        babelHelpers: 'bundled',
        presets: [
          [
            '@babel/preset-env',
            {
              useBuiltIns: 'usage',
              corejs: 3,
              targets: {
                browsers: [
                  'last 50 Chrome versions',
                  'not Chrome < 60',
                  'last 50 Safari versions',
                  'not Safari < 10.1',
                  'last 50 iOS versions',
                  'not iOS < 10.3',
                  'last 50 Firefox versions',
                  'not Firefox < 54',
                  'last 50 Edge versions',
                  'not Edge < 8'
                ]
              }
            }
          ]
        ]
      }),
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
  console.log('flush package info to dist index.js...')
  flushPackageInfo('umd')
  flushPackageInfo('es')
  flushPackageInfo('cjs')
  console.log('flush package info to dist index.js over...')
}

buildAll().then(() => {
  console.log('copy package.json to dist......')
  copyPackageJSON('dist/@rymcu/tracing/package.json')
  console.log('copy files to dist over......')
})
