import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import checker from 'vite-plugin-checker';
import markdown from 'vite-plugin-markdown';

// ----------------------------------------------------------------------

export default defineConfig({
  plugins: [
    react(),
    markdown(),
    checker({
      eslint: {
        lintCommand: 'eslint "./src/**/*.{js,jsx,ts,tsx}"',
      },
    }),
  ],
  assetsInclude: ['**/*.md'],
  resolve: {
    alias: [
      {
        find: /^~(.+)/,
        replacement: path.join(process.cwd(), 'node_modules/$1'),
      },
      {
        find: /^src(.+)/,
        replacement: path.join(process.cwd(), 'src/$1'),
      },
      {
        find: /^components(.*)/,
        replacement: path.join(process.cwd(), 'src/components/$1'),
      },
      {
        find: /^constants(.*)/,
        replacement: path.join(process.cwd(), 'src/constants/$1'),
      },
      {
        find: /^configs(.*)/,
        replacement: path.join(process.cwd(), 'src/configs/$1'),
      },
      {
        find: /^hooks(.*)/,
        replacement: path.join(process.cwd(), 'src/hooks/$1'),
      },
      {
        find: /^layouts(.*)/,
        replacement: path.join(process.cwd(), 'src/layouts/$1'),
      },
      {
        find: /^pages(.*)/,
        replacement: path.join(process.cwd(), 'src/pages/$1'),
      },
      {
        find: /^reduxes(.*)/,
        replacement: path.join(process.cwd(), 'src/reduxes/$1'),
      },
      {
        find: /^routes(.*)/,
        replacement: path.join(process.cwd(), 'src/routes/$1'),
      },
      {
        find: /^schemas(.*)/,
        replacement: path.join(process.cwd(), 'src/schemas/$1'),
      },
      {
        find: /^sections(.*)/,
        replacement: path.join(process.cwd(), 'src/sections/$1'),
      },
      {
        find: /^themes(.*)/,
        replacement: path.join(process.cwd(), 'src/themes/$1'),
      },
      {
        find: /^utils(.*)/,
        replacement: path.join(process.cwd(), 'src/utils/$1'),
      },
    ],
  },
  server: {
    host: true,
    port: 3030,
    strictPort: true,
    hmr: {},
    watch: {
      usePolling: process.env.VITE_USE_POLLING ?? false,
      interval: 1000,
    },
  },
  preview: {
    port: 3030,
  },
});
