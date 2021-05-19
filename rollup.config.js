import typescript from 'rollup-plugin-typescript2'
import nodeResolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import { author, description, homepage, license, version } from './package.json'
import json from '@rollup/plugin-json'

export default {
  input: 'libs/index.ts',
  output: {
    file: 'bin/index.js',
    format: 'commonjs',
    indent: false,
    name: 'ioArcPresetSetupFiles',
    sourcemap: false,
    banner: `#!/usr/bin/env node
/*!
@io-arc/preset-setup-files
${description}

Version: ${version}
License: ${license}
Documents: ${homepage}

Copyright (c) 2021 ${author}
*/`
  },

  external: ['update-notifier', 'commander', 'cpx', 'kleur'],

  plugins: [
    nodeResolve(),
    json({
      preferConst: true,
      indent: ' ',
      compact: true
    }),
    typescript({
      useTsconfigDeclarationDir: true
    }),
    terser()
  ]
}
