<!--suppress ALL -->
<template>
  <view>
    <uni-steps :options="stepsData.list" :active="stepsData.active" />
  </view>
</template>

<script lang="ts" setup>
  import uniSteps from '@dcloudio/uni-ui/lib/uni-steps/uni-steps.vue';
  import { PropType } from 'vue';
  type stepsData = {
    list: any;
    active: number;
  };
  defineProps({
    stepsData: {
      type: Object as PropType<stepsData>,
      require: true,
    },
  });
</script>

<style scoped></style>
