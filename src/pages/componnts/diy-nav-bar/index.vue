<!--suppress ALL -->
<template>
  <view>
    <van-nav-bar title="标题" left-text="返回" left-arrow @click-left="onClickLeft" class="bar" />
  </view>
</template>

<script lang="ts" setup>
  const onClickLeft = () => {
    console.log('zuo');
  };
</script>

<style scoped>
  .bar {
  }
</style>
