<!--suppress ALL -->
<template></template>
<script setup lang="ts">
  import { onLaunch, onShow, onHide } from '@dcloudio/uni-app';
  import store from '/@/common/store';
  import { onMounted } from 'vue';
  // #ifdef H5
  import { login } from '/@/common/login/';
  import { hideAllNonBaseMenuItem, share } from '/@/common/weixin/sdk';
  const saveState = () => {
    window.sessionStorage.setItem('info', JSON.stringify(store.getters.userInfo));
    window.sessionStorage.setItem('cid', store.getters.cid);
    window.sessionStorage.setItem('wxSdkConfig', JSON.stringify(store.getters.WxSdkConfig));
  };
  onShow(async () => {
    if (!store.getters.isLogin) {
      await login();
    }
  });
  onLaunch(() => {});
  onMounted(() => {
    window.addEventListener('unload', saveState);
  });
  // #ednif

  onHide(() => {});
</script>
<style lang="less">
  @import '/@/uni_modules/tob-less/index.less';
  @import '/@/wxcomponents/vant/common/index.wxss';
</style>
