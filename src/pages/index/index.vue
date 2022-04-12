<!--suppress ALL -->
<template>
  <view id="diy">
    <swipe :ids="555200" :name="name" />
  </view>
</template>

<script setup lang="ts">
  import { onBeforeMount, reactive, ref } from 'vue';
  import { onLaunch, onLoad, onReady, onShow } from '@dcloudio/uni-app';
  import { API_URL } from '/@/env';
  import store from '/@/common/store';
  import type banner from './types';
  import WebView from '/@/pages/componnts/webView/webView.vue';
  import DiyNavBar from '/@/pages/componnts/diy-nav-bar/index.vue';
  import Swipe from '/@/diycompoents/coms/swipe/index.vue';

  // #ifdef H5
  import { hideAllNonBaseMenuItem, share } from '/@/common/weixin/sdk';
  import { getBanner } from '/@/api/system/diy';
  // #endif
  import { list } from 'postcss';
  const loading = ref(true);

  const name = '自定义组件';

  // #ifdef H5
  // #endif

  onShow(async () => {});
  onLoad(async () => {});
  //跳转商品页
</script>

<style lang="scss" scoped>
  .scroll-view {
    white-space: nowrap;
    .scroll-view-item {
      display: inline-block;
    }
  }
</style>
