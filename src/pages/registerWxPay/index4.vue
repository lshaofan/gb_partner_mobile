<!--suppress ALL -->
<template>
  <view>
    <fab />
    <view class="steps"><uniSteps :stepsData="stepsData" /></view>
    <view class="container">
      <t-form ref="from">
        <!--        超级管理员类型-->
        <t-field name="contact_type" required label="管理员类型" shadow="base">
          <t-radio-group v-model="order_info.contact_type">
            <t-radio color="accent" value="1" class="mr-5">负责人</t-radio>
            <t-radio color="accent" value="0" class="mr-5">法人</t-radio>
          </t-radio-group>
        </t-field>
        <view v-if="order_info.contact_type == '1'">
          <!--        超级管理员姓名-->
          <t-field name="contact_name" required label="超级管理员姓名" shadow="base">
            <t-input
              v-model="order_info.contact_info.contact_name"
              placeholder="超级管理员姓名"
              color="success"
              type="text"
            />
          </t-field>
          <!--        超级管理员姓名-->
          <t-field name="contact_id_number" required label="管理员姓名身份证号" shadow="base">
            <t-input
              v-model="order_info.contact_info.contact_id_number"
              placeholder="超级管理员身份证号码"
              color="success"
              type="text"
            />
          </t-field>
        </view>
        <!--        电话-->
        <t-field name="mobile_phone" required label="电话" shadow="base">
          <t-input
            v-model="order_info.contact_info.mobile_phone"
            placeholder="电话"
            color="success"
            type="number"
          />
        </t-field>
        <!--        管理员邮箱-->
        <t-field name="contact_email" required label="邮箱" shadow="base">
          <t-input
            v-model="order_info.contact_info.contact_email"
            placeholder="邮箱"
            color="success"
            type="text"
          />
        </t-field>
      </t-form>
    </view>

    <view class="flex justify-center">
      <t-btn class="mt-1 mb-2" color="success" rounded="xl" @click="submit">提交</t-btn>
      <t-btn class="mt-1 mb-2" color="success" rounded="xl" @click="next">提交2</t-btn>
    </view>
  </view>
</template>

<script lang="ts" setup>
  import Fab from '../componnts/fab/index.vue';
  import uniSteps from '../componnts/steps/index.vue';
  import { getCurrentInstance, onMounted, reactive } from 'vue';
  import { orderInfo } from '/@/pages/registerWxPay/types/types';
  import { orderSubmit, queryOrder, submitOrder } from '/@/api/order';
  const next = () => {
    queryOrder(uni.getStorageSync('order_id')).then((r) => {
      console.log(r);
    });
  };
  // 获取组件实例
  const currentInstance: any = getCurrentInstance();
  onMounted(() => {
    const rules = reactive({
      contact_email: [
        (field: any) => {
          if (!field.value) {
            return `${field.label}必填`;
          }
        },
      ],
      mobile_phone: [
        // 校验步骤1
        (field: any) => {
          if (!field.value) {
            return `${field.label}必填`;
          }
        },
        // 校验步骤2(如果校验步骤1不通过，该步骤将不会执行到)
        (field: any) => {
          if (field.value.length < 11 || field.value.length > 11) {
            return '请输入正确的手机号';
          }
        },
      ],
    });
    currentInstance.ctx.$refs.from.setRules(rules);
  });
  const submit = async () => {
    if (order_info.contact_type == '1') {
      if (order_info.contact_info.contact_name == '') {
        return uni.showToast({
          title: '请填写管理员姓名',
          icon: 'error',
        });
      }
      if (
        order_info.contact_info.contact_id_number == '' ||
        order_info.contact_info.contact_id_number.length < 15 ||
        order_info.contact_info.contact_id_number.length > 22
      ) {
        return uni.showToast({
          title: '请填写正确的管理员身份证号码',
          icon: 'error',
        });
      }
    }
    const res = currentInstance.ctx.$refs.from.validateAll();
    await res.then((s: any) => {
      console.log(s);
      if (s.status == 'success') {
        submitOrder(order_info, uni.getStorageSync('order_id'), uni.getStorageSync('corp_id')).then(
          (r: any) => {
            console.log(r);
            if (r.data.statusCode == 200) {
              orderSubmit(uni.getStorageSync('order_id')).then((r) => {
                console.log(r);
              });
              // uni.setStorageSync('subject_type', r.data.data.subject_type);
              // uni.redirectTo({
              //   url:
              //     'index3?order_id=' +
              //     uni.getStorageSync('corp_id') +
              //     '&corp_id=' +
              //     uni.getStorageSync('corp_id'),
              // });
            } else {
              return uni.showToast({
                title: '提交失败请稍后再试',
                icon: 'error',
              });
            }
          }
        );
      }
    });
  };
  const order_info = reactive({
    contact_type: '0',
    contact_info: {
      contact_email: '',
      contact_name: '',
      contact_id_number: '',
      mobile_phone: '',
    },
  } as orderInfo);

  const stepsData = reactive({
    list: [
      {
        title: '主体信息',
      },
      {
        title: '经营信息',
      },
      {
        title: '结算信息',
      },
      {
        title: '补充材料',
      },
    ],
    active: 3,
  });
</script>
<style lang="less" scoped>
  @import (reference) '@/uni_modules/tob-less/index.less';
  /** 块 **/
  .note {
    .text-sm;
    .ml-5;
    .text-base;
  }
  .block {
  }
  .forms-item {
    background-color: white;
    .w-60;
  }
  /** 容器**/
  .container {
    background-color: #f8f8f8;
    .px-1;
    .py-2;
    .mt-4;
  }
</style>
