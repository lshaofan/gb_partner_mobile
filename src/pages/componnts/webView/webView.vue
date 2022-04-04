<template>
  <web-view :src="url" />
</template>

<script lang="ts" setup>
  import { onLoad } from '@dcloudio/uni-app';
  import { ref } from 'vue';
  const url = ref('');
  onLoad((val) => {
    url.value = val.url as string;
  });
</script>

<style></style>
