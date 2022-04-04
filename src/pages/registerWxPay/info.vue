<!--suppress ALL -->
<template>
  <view class="flex flex-col">
    <t-row class="block h-15">
      <text class="text-white mt-5 text-xl">准备资料</text>
      <text class="text">-- 请准备好一下资料 --</text>
    </t-row>
    <t-row class="block">
      <t-divider text="01-营业执照" />
      <text class="text">需要年检齐全，经营到期时间大于当前时间至少三个月</text>
      <img :src="infoData.img1" mode="scaleToFill" class="img" />
    </t-row>
    <t-row class="block">
      <t-divider text="02-法人身份证" />
      <text class="text">身份证有效期需要大于当前时间至少三个月</text>
      <img :src="infoData.img2" mode="scaleToFill" class="img" />
    </t-row>
    <t-row class="block">
      <t-divider text="03-资金结算账号" />
      <text class="text">
        个体工商户准备法人名下银行卡或对公账户 \n 企业类型公司的必须提供对公账户
      </text>
    </t-row>
    <t-row class="block">
      <t-divider text="04-其他可选" />
      <text class="text">
        经营范围有特殊类目需提供特殊经营资质\n 例如食品零售提供《食品经营许可证》或食品流通许可证\n
        申请用途为线下门店的需提供三张门店照片
      </text>
    </t-row>
    <view class="container flex justify-center">
      <t-btn class="mt-1 mb-2" color="success" rounded="xl" shadow="base" @click="typeShow">
        立即申请
      </t-btn>
      <t-action-sheet :actions="subjectType" ref="base" cancelText="取消" @actionClick="next" />
    </view>
  </view>
</template>
<script lang="ts" setup>
  import { infoData } from '/@/pages/registerWxPay/index';
  import { getCurrentInstance, reactive, ref } from 'vue';
  import { createOrder } from '/@/api/order';
  import type { createId } from '/@/api/order';
  import { resOrder } from '/@/pages/registerWxPay/types/types';
  const currentInstance: any = getCurrentInstance();
  const subjectType = ref([
    {
      name: '企业',
    },
    {
      name: '个体工商户',
    },
  ]);
  const typeShow = () => {
    currentInstance.ctx.$refs.base.show();
  };
  const next = async (e: any) => {
    const subject_type = ref();
    if (e.name == '企业') {
      subject_type.value = 1;
    } else if (e.name == '个体工商户') {
      subject_type.value = 2;
    }
    // 创建订单
    const order = reactive({ type: 1 } as createId);
    await createOrder(order).then((r: any): void => {
      try {
        uni.setStorageSync('order_id', r.data.data.order_id);
        uni.showToast({
          title: r.data.header,
        });
      } catch (e) {
        uni.showToast({
          title: '上传成功',
        });
      }
      uni.redirectTo({
        url: 'index?subject_type=' + subject_type.value + '&order_id=' + r.data.data.order_id,
      });
    });
  };
</script>

<style scoped lang="less">
  @import (reference) '@/uni_modules/tob-less/index.less';
  /** 块 **/
  .text {
    .text-sm;
    .text-white;
    .text-center;
    .my-3;
  }
  .block {
    .bg-success;
    .text-center;
    .w-full;
    .flex-col;
    .flex;
    .h-full;
  }
  .img {
    .ml-10;
    .w-55;
  }
</style>
