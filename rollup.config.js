// Import rollup plugins
import { rollupPluginHTML as html } from '@web/rollup-plugin-html';
import { copy } from '@web/rollup-plugin-copy';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import summary from 'rollup-plugin-summary';
import url from '@rollup/plugin-url';

export default {
  plugins: [
    // Entry point for application build; can specify a glob to build multiple
    // HTML files for non-SPA app
    html({
      input: 'index.html',
    }),
    // Resolve bare module specifiers to relative paths
    resolve(),
    // Minify JS
    terser({
      ecma: 2020,
      module: true,
      warnings: true,
    }),
    // Print bundle summary
    summary(),
    // Copy any static assets to build directory
    url({
      include: ['**/*.woff', '**/*.woff2', '**/*.ttf', '**/*.svg'],
      limit: 0,
      fileName: 'assets/[name][extname]',
    }),
    copy({
      targets: [
        {
          src: 'node_modules/@fortawesome/fontawesome-free/sprites/*.svg',
          dest: 'dist/sprites',
        },
        {
          src: 'node_modules/@fortawesome/fontawesome-free/webfonts/*',
          dest: 'dist/',
        },
        {
          src: 'node_modules/@fortawesome/fontawesome-free/css/all.min.css',
          dest: 'dist/css',
        },
      ],
    }),
  ],
  output: {
    dir: 'dist',
    sourcemap: true,
  },
  preserveEntrySignatures: 'strict',
};
