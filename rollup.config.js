import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import { rollupPluginHTML } from '@web/rollup-plugin-html';

export default {
  input: 'src/index.js',
  output: {
    dir: 'dist',
    format: 'es',
    sourcemap: true,
  },
  plugins: [
    rollupPluginHTML({
      input: 'index.html',
    }),
    resolve({
      browser: true,
      preferBuiltins: false,
    }),
    terser(),
  ],
};
