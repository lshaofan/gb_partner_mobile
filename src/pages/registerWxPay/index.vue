<!--suppress ALL -->

<template>
  <view>
    <fab />
    <view class="steps"><uniSteps :stepsData="stepsData" /></view>
    <view class="container">
      <t-form ref="from">
        <t-field
          name="subject_type"
          required
          label="主体类型"
          shadow="base"
          @click="subjectTypeShow"
        >
          <text>{{ subjectTypeValue }}</text>
        </t-field>
        <text class="note">主体类型不可为空</text>
        <!--        营业执照照片上传-->
        <t-field name="business_license_info" required label="营业执照">
          <view class="example-body custom-image-box">
            <text class="text">选择营业执照</text>
            <uni-file-picker
              v-model="img.img3"
              limit="1"
              :del-icon="true"
              file-mediatype="image"
              return-type="object"
              @select="uploadLicenseCopy"
            >
              上传
            </uni-file-picker>
          </view>
        </t-field>
        <text class="note">上传营业执照照片，自动识别执照信息。</text>
        <!--商户名称-->
        <t-field name="merchant_name" required label="商户名称" shadow="base">
          <t-input
            v-model="subject_info.business_license_info.merchant_name"
            placeholder="营业执照商主体名称"
            color="success"
          />
        </t-field>
        <text class="note">请填写营业执照上的商户名称，2~110个字符，支持括号。</text>
        <!--        统一社会信用代码-->
        <t-field name="license_number" required label="统一社会信用代码" shadow="base">
          <t-input
            v-model="subject_info.business_license_info.license_number"
            placeholder="注册号/统一社会信用代码"
            color="success"
            type="text"
          />
        </t-field>
        <text class="note">营业执照商主体名称，请仔细核对识别结果</text>
        <!--        法人姓名-->
        <t-field name="legal_person" required label="法人姓名" shadow="base">
          <t-input
            v-model="subject_info.business_license_info.legal_person"
            placeholder="法人姓名"
            color="success"
          />
        </t-field>
        <text class="note">请填写营业执照的经营者/法定代表人姓名。</text>
        <!--        身份类型-->

        <t-field name="id_card_type" required label="证件类型" shadow="base" @click="idDocTypeShow">
          <text>{{ idDocTypeValue }}</text>
        </t-field>

        <!--        身份证照片-->
        <t-field name="id_card" required label="法人信息">
          <view class="example-body custom-image-box">
            <text class="text">身份证人像面照片</text>
            <uni-file-picker
              v-model="img.img2"
              limit="1"
              :del-icon="true"
              file-mediatype="image"
              @select="uploadIdCardInfo"
            >
              上传
            </uni-file-picker>
            <text class="text">身份证国徽面照片</text>
            <uni-file-picker
              v-model="img.img1"
              limit="1"
              :del-icon="true"
              file-mediatype="image"
              @select="uploadIdCardNational"
            >
              上传
            </uni-file-picker>
          </view>
        </t-field>
        <!--        身份证姓名-->
        <t-field name="id_card_name" required label="身份证姓名" shadow="base">
          <t-input
            v-model="subject_info.identity_info.id_card_info.id_card_name"
            placeholder="身份证姓名"
            color="success"
          />
        </t-field>
        <text class="note">
          请填写个体户经营者/法定代表人对应身份证的姓名，2~30个中文字符、英文字符、符号。
        </text>
        <!--        身份证号码-->
        <t-field name="id_card_number" required label="身份证号码" shadow="base">
          <t-input
            v-model="subject_info.identity_info.id_card_info.id_card_number"
            placeholder="身份证号码"
            color="success"
          />
        </t-field>
        <text class="note">请填写个体户经营者/法定代表人对应身份证的号码。</text>
        <!--        身份证有效期开始时间-->
        <t-field name="card_period_begin" required label="身份证有效期开始时间" shadow="base">
          <t-input
            v-model="subject_info.identity_info.id_card_info.card_period_begin"
            placeholder="身份证有效期开始时间"
            color="success"
          />
        </t-field>
        <text class="note">
          1、必填，请按照示例值填写。 2、结束时间大于开始时间。 示例值：2026-06-06
        </text>
        <!--        身份证有效期结束时间-->
        <t-field name="card_period_end" required label="身份证有效期结束时间" shadow="base">
          <t-input
            v-model="subject_info.identity_info.id_card_info.card_period_end"
            placeholder="身份证有效期结束时间"
            color="success"
          />
        </t-field>
        <text class="note">
          1、必填，请按照示例值填写。 2、若证件有效期为长期，请填写：长期。
          3、结束时间大于开始时间。 4、证件有效期需大于60天。 示例值：2036-06-06
        </text>
      </t-form>
    </view>

    <view class="flex justify-center">
      <t-btn class="mt-1 mb-2" color="success" rounded="xl" @click="next">下一步</t-btn>
      <!--      企业类型动作选择框-->
      <t-action-sheet
        :actions="subjectType"
        ref="subject_type"
        cancelText="取消"
        @actionClick="setSubjectType"
      />
      <!--      身份类型动作选择器-->
      <t-action-sheet
        :actions="idDocType"
        ref="id_doc_type"
        cancelText="取消"
        @actionClick="setIdDocType"
      />
    </view>
  </view>
</template>
<script lang="ts" setup>
  import { onLoad, onReady } from '@dcloudio/uni-app';
  import Fab from '../componnts/fab/index.vue';
  import uniSteps from '../componnts/steps/index.vue';
  import NavBar from '../componnts/diy-nav-bar/index.vue';
  import { computed, getCurrentInstance, onMounted, reactive, ref } from 'vue';
  import type { subjectInfo } from '/@/pages/registerWxPay/types/types';
  import {
    setBusinessLicenseInfo,
    setIdCardInfo,
    setIdCardNational,
  } from '/@/pages/registerWxPay/index';
  import { getBusinessLicenseInfo } from '/@/api/registerWxApp';
  import { submitOrder } from '/@/api/order';
  const currentInstance: any = getCurrentInstance();
  //声明一个无用变量用于上传组件加载图片
  const img = reactive({
    img1: [],
    img2: [],
    img3: [],
  });
  onMounted(() => {
    const rules = reactive({
      merchant_name: [
        (field: any) => {
          if (!field.value) {
            return `${field.label}必填`;
          }
        },
      ],
      license_number: [
        (field: any) => {
          if (!field.value) {
            return `${field.label}必填`;
          }
        },
      ],
      legal_person: [
        (field: any) => {
          if (!field.value) {
            return `${field.label}必填`;
          }
        },
      ],
      id_doc_type: [
        (field: any) => {
          if (!field.value) {
            return `${field.label}必填`;
          }
        },
      ],
      id_card_name: [
        (field: any) => {
          if (!field.value) {
            return `${field.label}必填`;
          }
        },
      ],
      id_card_number: [
        (field: any) => {
          if (!field.value) {
            return `${field.label}必填`;
          }
        },
      ],
      card_period_begin: [
        (field: any) => {
          if (!field.value) {
            return `${field.label}必填`;
          }
        },
      ],
      card_period_end: [
        (field: any) => {
          if (!field.value) {
            return `${field.label}必填`;
          }
        },
      ],
    });
    currentInstance.ctx.$refs.from.setRules(rules);
  });
  onLoad(async () => {
    if (!props.order_id) {
      uni.redirectTo({
        url: 'info',
      });
    } else if (props.subject_type == 1) {
      subject_info.subject_type = 'SUBJECT_TYPE_ENTERPRISE';
      subjectTypeValue.value = '企业';
    } else if (props.subject_type == 2) {
      subject_info.subject_type = 'SUBJECT_TYPE_INDIVIDUAL';
      subjectTypeValue.value = '个体工商户';
    }
  });
  // 表单
  const subject_info = reactive({
    // 主体类型
    subject_type: '',
    // 营业执照
    business_license_info: {
      license_copy: '',
      license_number: '',
      merchant_name: '',
      legal_person: '',
    },
    identity_info: {
      id_doc_type: 'IDENTIFICATION_TYPE_IDCARD',
      id_card_info: {
        id_card_copy: '',
        id_card_national: '',
        id_card_name: '',
        id_card_number: '',
        card_period_begin: '',
        card_period_end: '',
      },
    },
  } as subjectInfo);

  //上传身份证正面
  const uploadIdCardInfo = async (e: any) => {
    // 判断是否上传了营业执照并缓存的企业id
    const value = uni.getStorageSync('corp_id');
    if (!value) {
      return uni.showToast({
        title: '请先上传识别营业执照信息',
      });
    }
    await setIdCardInfo(e);
    //将识别结果填入
    try {
      const value = uni.getStorageSync('id_card_copy');
      if (value.legal_person) {
        subject_info.identity_info.id_card_info.id_card_name = value.legal_person;
        subject_info.identity_info.id_card_info.id_card_number = value.id_card_number;
        subject_info.identity_info.id_card_info.id_card_copy = value.id_card_copy;
        uni.showToast({
          title: '识别成功请核对身份信息',
        });
      } else {
        return uni.showToast({
          title: '识别失败请检查身份证照片',
        });
      }
    } catch (e) {
      uni.showToast({
        title: '识别失败请检查身份证照片',
      });
    }
  };
  //上传身份证国徽面
  const uploadIdCardNational = async (e: any) => {
    // 判断是否上传了营业执照并缓存的企业id
    const value = uni.getStorageSync('corp_id');
    if (!value) {
      return uni.showToast({
        title: '请先上传识别营业执照信息',
      });
    }
    await setIdCardNational(e);
    //将识别结果填入
    try {
      const value = uni.getStorageSync('id_card_national');
      if (value.card_period_begin) {
        subject_info.identity_info.id_card_info.card_period_begin = value.card_period_begin;
        subject_info.identity_info.id_card_info.card_period_end = value.card_period_end;
        subject_info.identity_info.id_card_info.id_card_national = value.id_card_national;
        uni.showToast({
          title: '识别成功请核对身份信息',
        });
      } else {
        uni.showToast({
          title: '识别失败请检查身份证照片',
        });
      }
    } catch (e) {
      uni.showToast({
        title: '识别失败请检查身份证照片',
      });
    }
  };
  //上传营业执照
  const uploadLicenseCopy = async (e: any) => {
    await setBusinessLicenseInfo(e);
    try {
      const value = uni.getStorageSync('license_copy');
      if (value.name) {
        subject_info.business_license_info.license_number = value.license_number;
        subject_info.business_license_info.merchant_name = value.name;
        subject_info.business_license_info.legal_person = value.legal_person;
        subject_info.business_license_info.license_copy = value.license_copy;
        if (value.type !== '个体工商户') {
          subject_info.subject_type = 'SUBJECT_TYPE_ENTERPRISE';
        }
        uni.showToast({
          title: '识别成功请核对企业信息',
        });
      }
    } catch (e) {
      uni.showToast({
        title: '识别失败，请检查',
      });
    }
  };

  // 企业类型选择
  const subjectTypeValue = ref('');
  const subjectType = ref([
    {
      name: '企业',
    },
    {
      name: '个体工商户',
    },
  ]);
  // 选择主体类型
  const subjectTypeShow = () => {
    currentInstance.ctx.$refs.subject_type.show();
  };
  //设置主体类型
  const setSubjectType = (e: any) => {
    if (e.name == '') {
      currentInstance.ctx.$refs.subject_type.show();
    } else if (e.name == '企业') {
      subject_info.subject_type = 'SUBJECT_TYPE_ENTERPRISE';
      subjectTypeValue.value = '企业';
    } else if (e.name == '个体工商户') {
      subject_info.subject_type = 'SUBJECT_TYPE_INDIVIDUAL';
      subjectTypeValue.value = '个体工商户';
    }
  };

  //身份类型选择
  const idDocTypeValue = ref('中国大陆居民-身份证');
  const idDocType = ref([
    {
      name: '中国大陆居民-身份证',
    },
    {
      name: '其他国家或地区居民-护照',
      disabled: true,
    },
    {
      name: '中国香港居民-来往内地通行证',
      disabled: true,
    },
    {
      name: '中国澳门居民-来往内地通行证',
      disabled: true,
    },
    {
      name: '中国台湾居民-来往大陆通行证',
      disabled: true,
    },
  ]);
  // 选择身份类型
  const idDocTypeShow = () => {
    currentInstance.ctx.$refs.id_doc_type.show();
  };
  //设置身份类型
  const setIdDocType = (e: any) => {
    if (e.name == '中国大陆居民-身份证') {
      subject_info.identity_info.id_doc_type = 'IDENTIFICATION_TYPE_IDCARD';
      idDocTypeValue.value = '中国大陆居民-身份证';
    } else if (e.name == '其他国家或地区居民-护照') {
      subject_info.identity_info.id_doc_type = 'IDENTIFICATION_TYPE_OVERSEA_PASSPORT';
      idDocTypeValue.value = '其他国家或地区居民-护照';
    } else if (e.name == '中国香港居民-来往内地通行证') {
      subject_info.identity_info.id_doc_type = 'IDENTIFICATION_TYPE_HONGKONG_PASSPORT';
      idDocTypeValue.value = '中国香港居民-来往内地通行证';
    } else if (e.name == '中国澳门居民-来往内地通行证') {
      subject_info.identity_info.id_doc_type = 'IDENTIFICATION_TYPE_MACAO_PASSPORT';
      idDocTypeValue.value = '中国澳门居民-来往内地通行证';
    } else if (e.name == '中国台湾居民-来往大陆通行证') {
      subject_info.identity_info.id_doc_type = 'IDENTIFICATION_TYPE_TAIWAN_PASSPORT';
      idDocTypeValue.value = '中国台湾居民-来往大陆通行证';
    }
  };

  const props: any = defineProps({
    order_id: {
      type: Number,
    },
    subject_type: {
      type: Number,
    },
  });
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
    active: 0,
  });
  const next = async () => {
    if (subject_info.business_license_info.license_copy == '') {
      return uni.showToast({
        title: '请重新上传营业执照照片',
        icon: 'error',
      });
    } else if (subject_info.identity_info.id_card_info.id_card_copy == '') {
      return uni.showToast({
        title: '请重新上传身份证正面照片',
        icon: 'error',
      });
    } else if (subject_info.identity_info.id_card_info.id_card_national == '') {
      return uni.showToast({
        title: '请重新上传身份证国徽面照片',
        icon: 'error',
      });
    } else if (subject_info.subject_type == '') {
      subjectTypeShow();
      return uni.showToast({
        title: '选择企业类型',
        icon: 'error',
      });
    } else if (
      subject_info.identity_info.id_card_info.id_card_name !=
      subject_info.business_license_info.legal_person
    ) {
      return uni.showToast({
        title: '法人信息与上传的身份证信息不一致，请检查',
        icon: 'error',
      });
    }
    const value = uni.getStorageSync('license_copy');
    if (value.type !== '个体工商户' && subject_info.subject_type !== 'SUBJECT_TYPE_ENTERPRISE') {
      subject_info.subject_type = 'SUBJECT_TYPE_ENTERPRISE';
      uni.showToast({
        title: '主体类型已识别为企业',
      });
    } else if (value.type == '个体工商户') {
      subject_info.subject_type = 'SUBJECT_TYPE_INDIVIDUAL';
    }
    const res = currentInstance.ctx.$refs.from.validateAll();
    res.then((s: any) => {
      if (s.status == 'success') {
        submitOrder(subject_info, props.order_id, uni.getStorageSync('corp_id')).then((r: any) => {
          if (r.data.statusCode == 200) {
            uni.redirectTo({
              url:
                'index2?order_id=' + props.order_id + '&corp_id=' + uni.getStorageSync('corp_id'),
            });
          } else {
            uni.showToast({
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
