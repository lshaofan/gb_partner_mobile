import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import { resolve } from 'path';

import styleImport, { VantResolve } from 'vite-plugin-style-import';

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uni(),

    styleImport({
      resolves: [VantResolve()],
    }),
  ],
  resolve: {
    alias: [{ find: /\/@\//, replacement: pathResolve('src') + '/' }],
  },
});
