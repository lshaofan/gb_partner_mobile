import { createSSRApp } from 'vue';
import App from './App.vue';
// @ts-ignore
import setupTobLess from '/@/uni_modules/tob-less/index.js';
import store from '/@/common/store';
// #ifdef H5

import { setupVant } from '/@/common/vant';
// #endif

export function createApp() {
  const app = createSSRApp(App);
  // 注意是 app，不是 Vue
  app.use(store);
  setupTobLess(app);
  // #ifdef H5
  setupVant(app);
  // #endif
  return {
    app,
  };
}
