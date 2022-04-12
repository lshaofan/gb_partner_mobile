<!--suppress ALL -->
<template>
  <div class="swipe" :class="{ 'swipe-vertical': vertical }">
    <div class="swipe-wrap">
      <slot>{{ ids }}</slot>
      <van-button type="default" @click="loading = false">{{ name }}</van-button>
      <van-button type="primary">主要按钮</van-button>
      <van-button type="info">信息按钮</van-button>
      <van-button type="warning">警告按钮</van-button>
      <van-button type="danger">危险按钮</van-button>
    </div>
    <div class="swipe-pagination" v-if="showPagination">
      <span v-for="(item, index) in items" :class="{ 'swipe-active': index === active }"></span>
    </div>
  </div>
</template>

<script lang="ts" setup>
  defineProps<{ ids: number; name: string }>();
</script>

<style></style>
