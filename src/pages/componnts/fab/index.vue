<!--suppress ALL -->
<template>
  <view>
    <uni-fab
      ref="fab"
      :pattern="fab.pattern"
      :content="fab.content"
      :horizontal="fab.horizontal"
      :vertical="fab.vertical"
      :direction="fab.direction"
      @trigger="trigger"
      @fabClick="fabClick"
    />
  </view>
</template>

<script lang="ts" setup>
  import { reactive } from 'vue';

  const fab = reactive({
    horizontal: 'left',
    vertical: 'bottom',
    direction: 'horizontal',
    pattern: {
      color: '#7A7E83',
      backgroundColor: '#fff',
      selectedColor: '#007AFF',
      buttonColor: '#007AFF',
      iconColor: '#fff',
    },
    content: [
      {
        iconPath: '/static/tabBar/home.png',
        selectedIconPath: '/static/tabBar/home-fill.png',
        url: '/pages/index/index',
        text: '首页',
        active: false,
      },
      {
        iconPath: '/static/tabBar/user.png',
        selectedIconPath: '/static/tabBar/user-fill.png',
        url: './pages/user/user',
        text: '个人中心',
        active: false,
      },
    ],
  });
  const trigger = (e: any) => {
    fab.content[e.index].active = true;
    uni.switchTab({
      url: fab.content[e.index].url,
    });
  };
</script>

<style></style>
