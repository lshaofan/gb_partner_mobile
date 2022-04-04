<!--suppress ALL -->
<template>
  <view>
    <fab />
    <view class="steps"><uniSteps :stepsData="stepsData" /></view>
    <view class="container">
      <t-form ref="from">
        <!--        结算费率-->
        <t-field name="settlement_id" required label="入驻结算规则" shadow="base">
          <view>
            <uni-data-picker
              v-model="settlement_info.settlement_id"
              :localdata="settlementId"
              popup-title="入驻结算规则"
              @change="onchange"
            />
          </view>
        </t-field>
        <text class="note">
          请根据实际经营行业选择结算规则。结算费率可在最后表单提交时申请调整。
        </text>
        <!--        所属行业-->
        <t-field name="qualification_type" required label="所属行业" shadow="base">
          <view>
            <uni-data-picker
              v-model="settlement_info.qualification_type"
              :localdata="qualificationType"
              popup-title="入驻结算规则"
              @change="onchange"
            />
          </view>
        </t-field>
        <!--        账户类型-->
        <t-field name="bank_account_type" required label="账户类型" shadow="base">
          <t-radio-group v-model="settlement_info.bank_account_info.bank_account_type">
            <t-radio color="accent" value="BANK_ACCOUNT_TYPE_CORPORATE" class="mr-5">
              对公银行账户
            </t-radio>
            <t-radio
              color="accent"
              value="BANK_ACCOUNT_TYPE_PERSONAL"
              class="mr-5"
              :disabled="disabled"
            >
              经营者个人银行卡
            </t-radio>
          </t-radio-group>
        </t-field>

        <!--        开户名称-->
        <t-field name="account_name" label="开户名称" shadow="base" required>
          <t-input
            v-model="settlement_info.bank_account_info.account_name"
            placeholder="开户名称"
            color="success"
          />
        </t-field>
        <text class="note">
          1、选择“经营者个人银行卡”时，开户名称必须与“经营者证件姓名”一致。
          2、选择“对公银行账户”时，开户名称必须与营业执照/登记证书的“商户名称”一致。
        </text>

        <!--        开户银行-->
        <t-field name="account_bank" required label="开户银行" shadow="base">
          <view class="example-body">
            <uni-combox
              :candidates="account_bank"
              placeholder="选择开户银行"
              v-model="settlement_info.bank_account_info.account_bank"
              disabled
            />
            <view class="result-box">
              <text>所选银行为：{{ settlement_info.bank_account_info.account_bank }}</text>
            </view>
          </view>
        </t-field>
        <text class="note">如未在上方匹配到银行列表，请选择其他银行。</text>
        <!--        开户银行省市-->
        <t-field name="biz_address_code" required label="开户银行省市" shadow="base">
          <view>
            <uni-data-picker
              v-model="settlement_info.bank_account_info.bank_address_code"
              :localdata="area"
              popup-title="选择开户银行省市"
              @change="onchange"
            />
          </view>
        </t-field>
        <!--        开户银行全称（含支行）-->
        <t-field name="bank_name" label="开户银行全称" shadow="base">
          <t-input
            v-model="settlement_info.bank_account_info.bank_name"
            placeholder="开户银行全称"
            color="success"
          />
        </t-field>
        <text class="note">
          需填写银行全称，如"深圳农村商业银行XXX支行"，开户行选择为其他银行时需要填写，否则可以选填。
        </text>
        <!--        银行账号-->
        <t-field name="account_number" label="银行账号" required shadow="base">
          <t-input
            v-model="settlement_info.bank_account_info.account_number"
            placeholder="银行账号"
            color="success"
          />
        </t-field>
        <text class="note">
          需填写银行全称，如"深圳农村商业银行XXX支行"，开户行选择为其他银行时需要填写，否则可以选填。
        </text>
      </t-form>
    </view>
    <view class="flex justify-center">
      <t-btn class="mt-1 mb-2" color="success" rounded="xl" @click="next">下一步</t-btn>
    </view>
  </view>
</template>

<script lang="ts" setup>
  import { area } from '/@/api/util/area';
  import Fab from '../componnts/fab/index.vue';
  import uniSteps from '../componnts/steps/index.vue';
  import { getCurrentInstance, onMounted, reactive, ref } from 'vue';
  import { settlementInfo } from '/@/pages/registerWxPay/types/types';
  import {
    settlementId,
    qualificationType,
    account_bank,
  } from '/@/pages/registerWxPay/settlement_info';
  import { submitOrder } from '/@/api/order';
  const disabled = ref(false);
  // 获取组件实例
  const currentInstance: any = getCurrentInstance();
  onMounted(() => {
    const subject_type = uni.getStorageSync('subject_type');
    if (subject_type !== 'SUBJECT_TYPE_INDIVIDUAL') {
      disabled.value = true;
    } else {
      disabled.value = false;
    }
    const rules = reactive({
      account_name: [
        (field: any) => {
          if (!field.value) {
            return `${field.label}必填`;
          }
        },
      ],
      account_number: [
        (field: any) => {
          if (!field.value) {
            return `${field.label}必填`;
          }
          (field: any) => {
            if (field.value.length > 30 || field.value.length < 8) {
              return `请输入正确的银行账号`;
            }
          };
        },
      ],
    });
    currentInstance.ctx.$refs.from.setRules(rules);
  });
  const settlement_info = reactive({
    settlement_id: '',
    qualification_type: '',
    bank_account_info: {
      bank_account_type: 'BANK_ACCOUNT_TYPE_CORPORATE',
      account_name: '',
      account_bank: '',
      bank_name: '',
      bank_address_code: '',
      account_number: '',
    },
  } as settlementInfo);
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
    active: 2,
  });
  const next = async () => {
    if (settlement_info.bank_account_info.account_bank == '') {
      return uni.showToast({
        title: '开户银行必须填写',
        icon: 'error',
      });
    } else if (settlement_info.bank_account_info.bank_address_code == '') {
      return uni.showToast({
        title: '请选择开户银行省市',
        icon: 'error',
      });
    }
    console.log(settlement_info);
    const res = currentInstance.ctx.$refs.from.validateAll();
    res.then((s: any) => {
      console.log(s);
      if (s.status == 'success') {
        submitOrder(
          settlement_info,
          uni.getStorageSync('order_id'),
          uni.getStorageSync('corp_id')
        ).then((r: any) => {
          if (r.data.statusCode == 200) {
            uni.redirectTo({
              url:
                'index4?order_id=' +
                uni.getStorageSync('corp_id') +
                '&corp_id=' +
                uni.getStorageSync('corp_id'),
            });
          } else {
            return uni.showToast({
              title: '提交失败请稍后再试',
              icon: 'error',
            });
          }
        });
      }
    });
  };
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
