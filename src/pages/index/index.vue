<!--suppress ALL -->
<template>
  <view>
    <van-skeleton title avatar row="3" :loading="loading">
      <!--    公告-->
      <view class="mx-2">
        123146545646546546
        <t-notice-bar rounded="md" color="warning" size="xs" duration="15s">
          {{ pageData.noticeBar }}
        </t-notice-bar>
      </view>
    </van-skeleton>

    <!--    商品卡片-->
    <view>
      <t-card size="w-68 ml-4" direction="row">
        <!-- 封面，注意t-img要放在有具体宽度的view下，同时设置宽高为100% -->
        <view class="w-25">
          <t-img size="w-full h-full" mode="aspectFill" :src="card[0].src" />
        </view>

        <t-card-body>
          <!-- 卡片标题 -->
          <t-card-title size="sm">{{ card[0].title }}</t-card-title>

          <!-- 卡片内容 -->
          <text class="text-sm" style="text-indent: 30rpx">
            {{ card[0].text }}
          </text>

          <!-- 卡片动作区 -->
          <t-card-action justify="end" size="xs">
            <t-btn color="warning" size="sm" outline>更多</t-btn>
          </t-card-action>
        </t-card-body>
      </t-card>
    </view>

    <van-button type="default" @click="loading = false">默认按钮</van-button>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
    <!--    <view>{{ user }}</view>-->
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
  // #ifdef H5
  import { hideAllNonBaseMenuItem, share } from '/@/common/weixin/sdk';
  import { getBanner } from '/@/api/system/diy';
  // #endif
  import { list } from 'postcss';

  const loading = ref(true);

  //商品卡片
  const card = reactive([
    {
      title: '秋夜',
      src: 'https://images.pexels.com/photos/1590551/pexels-photo-1590551.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
      text: '我家有两颗树,一颗是枣树,另一颗还是枣树',
    },
  ]);
  //轮播图
  const bannerList = ref([]);
  const bannerImg: banner = reactive({ rounded: 'lg' });
  const bannerClick = (e: any) => {
    console.log(e);
  };
  // #ifdef H5

  onShow(async () => {
    if (store.getters.isLogin) {
      const { result } = await getBanner();
      bannerList.value = result.indexBanner;
      hideAllNonBaseMenuItem();
      const shareParams = {
        title: '1245646545646546546',
        desc: '4522',
        imgUrl:
          'https://images.pexels.com/photos/10080749/pexels-photo-10080749.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
      };
      share(shareParams);
    }
  });
  // #endif

  const pageData = reactive({
    title: '首页',
    leftIcon: 'home',
    noticeBar:
      '这里是滚动公告这里是滚动公告这里，是滚动公告这里是，，滚动公告这里是滚动公告这里是滚动公告这里是滚动公告这里是滚动公告这里是滚动公告',
  });
  // const user = ref(store.getters.userInfo.name);
  const demo = () => {
    console.log(bannerList);
  };
  onLoad(async () => {
    uni.setNavigationBarTitle({
      title: pageData.title,
    });
  });
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
