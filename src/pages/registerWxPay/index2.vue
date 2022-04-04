<!--suppress ALL -->
<template>
  <view>
    <fab />
    <view class="steps"><uniSteps :stepsData="stepsData" /></view>
    <view class="container">
      <t-form ref="from">
        <!--        商户简称-->
        <t-field name="merchant_shortname" required label="商户简称" shadow="base">
          <t-input
            v-model="business_info.merchant_shortname"
            placeholder="商户简称"
            color="success"
          />
        </t-field>
        <text class="note">
          1、请输入2-30个字符，支持中文/字母/数字/特殊符号
          2、在支付完成页向买家展示，需与微信经营类目相关； 3、简称要求
          （1）不支持单纯以人名来命名，若为个体户经营，可用“个体户+经营者名称”或“经营者名称+业务”命名，如“个体户张三”或“张三餐饮店”；
          （2）不支持无实际意义的文案，如“XX特约商户”、“800”、“XX客服电话XXX”； 示例值：张三餐饮店
        </text>
        <!--        客服电话-->
        <t-field name="service_phone" required label="客服电话" shadow="base">
          <t-input
            v-model="business_info.service_phone"
            placeholder="客服电话"
            type="number"
            color="success"
          />
        </t-field>
        <text class="note">
          1、请填写真实有效的客服电话，将在交易记录中向买家展示，提供咨询服务；
          2、请确保电话畅通，以便入驻后平台回拨确认。 示例值：0758XXXXX,13XXXX....
        </text>
        <!--        经营场景-->
        <t-field name="sales_scenes_type" required label="经营场景类型" shadow="base">
          <t-checkbox-group v-model="business_info.sales_info.sales_scenes_type">
            <t-checkbox color="success" value="SALES_SCENES_STORE" size="sm">线下门店</t-checkbox>
            <t-checkbox color="success" value="SALES_SCENES_MP" size="sm" disabled>
              公众号
            </t-checkbox>
            <t-checkbox color="success" value="SALES_SCENES_MINI_PROGRAM" size="sm">
              小程序
            </t-checkbox>
            <t-checkbox color="success" value="SALES_SCENES_WEB" size="sm" disabled>
              PC网站
            </t-checkbox>
            <t-checkbox color="success" value="SALES_SCENES_APP" size="sm" disabled>APP</t-checkbox>
            <t-checkbox color="success" value="SALES_SCENES_WEWORK" size="sm" disabled>
              企业微信
            </t-checkbox>
          </t-checkbox-group>
        </t-field>
        <text class="note">
          1、请勾选实际售卖商品/提供服务场景（至少一项），以便为你开通需要的支付权限。
          2、建议只勾选目前必须的场景，以便尽快通过入驻审核，其他支付权限可在入驻后再根据实际需要发起申请。
          3、目前线下门店与小程序场景可以快速提高申请速度，故先支持此两项。
        </text>
        <view v-if="sales_scenes.biz_store_info">
          <view>
            <view class="text-white bg-success text-center text-sm border rounded-2xl">
              —— 线下门店 ——
            </view>
            <text class="note">
              你选择了“线下门店”场景，审核通过后，服务商可帮商户发起付款码支付、JSAPI支付
            </text>
          </view>

          <!--        门店名称-->
          <t-field name="biz_store_name" required label="门店名称" shadow="base">
            <t-input
              v-model="business_info.sales_info.biz_store_info.biz_store_name"
              placeholder="门店名称"
              color="success"
            />
          </t-field>
          <text class="note">请填写门店名称。 示例值：大郎烧饼</text>
          <!--        门店省市-->
          <t-field name="biz_address_code" required label="门店省市" shadow="base">
            <view>
              <uni-data-picker
                v-model="business_info.sales_info.biz_store_info.biz_address_code"
                :localdata="area"
                popup-title="选择省市"
                @change="onchange"
              />
            </view>
          </t-field>
          <!--        街道地址-->
          <t-field name="biz_store_address" required label="门店地址" shadow="base">
            <t-input
              v-model="business_info.sales_info.biz_store_info.biz_store_address"
              placeholder="门店地址"
              color="success"
            />
          </t-field>
          <text class="note">
            请填写详细的经营场所信息，如有多个场所，选择一个主要场所填写即可。
          </text>
          <!--上传门头照片-->
          <t-field name="store_entrance_pic" required label="门店门头照片">
            <view class="example-body custom-image-box">
              <uni-file-picker
                v-model="img.img1"
                limit="1"
                :del-icon="true"
                file-mediatype="image"
                @select="uploadStoreEntrancePic"
              >
                上传
              </uni-file-picker>
            </view>
          </t-field>
          <text class="note">
            请上传门店照片（要求门店招牌清晰可见）。若为停车场、售卖机等无固定门头照片
            的经营场所，请提供真实的经营现场照片即可；
          </text>
          <!--          店内环境照片-->
          <t-field name="indoor_pic" required label="店内环境照片">
            <view class="example-body custom-image-box">
              <uni-file-picker
                v-model="img.img2"
                limit="1"
                :del-icon="true"
                file-mediatype="image"
                @select="uploadIndoorPic"
              >
                上传
              </uni-file-picker>
            </view>
          </t-field>
          <text class="note">
            1、请上传门店内部环境照片。若为停车场、售卖机等无固定门头照片的经营场所，请提
            供真实的经营现场照片即可；
          </text>
          <!--        商家APPID-->
          <t-field name="biz_sub_appid" label="（选填）商家APPID" shadow="base">
            <t-input
              v-model="business_info.sales_info.biz_store_info.biz_sub_appid"
              placeholder="商家APPID"
              color="success"
            />
          </t-field>
          <text class="note">
            可填写已认证的公众号、小程序、应用的APPID，其中公众号APPID需是已认证的服务
            号、政府或媒体类型的订阅号。
          </text>
        </view>
        <!--        小程序-->
        <view v-if="sales_scenes.mini_program_info">
          <view class="">
            <view class="text-white bg-success text-center text-sm border rounded-2xl">
              —— 小程序 ——
            </view>
          </view>

          <!--        商家小程序APPID-->
          <t-field name="mini_program_sub_appid" required label="小程序APPID" shadow="base">
            <t-input
              v-model="business_info.sales_info.mini_program_info.mini_program_sub_appid"
              placeholder="小程序APPID"
              color="success"
            />
          </t-field>
          <text class="note">请填写已认证的小程序APPID</text>
        </view>
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
  import { getCurrentInstance, onMounted, reactive, ref, watch } from 'vue';
  import type { businessInfo } from '/@/pages/registerWxPay/types/types';
  import { submitOrder } from '/@/api/order';
  import { isArray } from '/@/common/is';
  import { setIndoorPic, setStoreEntrancePic } from '/@/pages/registerWxPay/index';
  //经营场景选择框信息展示
  const sales_scenes = reactive({
    biz_store_info: false,
    mini_program_info: false,
  });
  // 获取组件实例
  const currentInstance: any = getCurrentInstance();
  onMounted(() => {
    const rules = reactive({
      mini_program_sub_appid: [
        (field: any) => {
          if (sales_scenes.mini_program_info == true) {
            if (!field.value) {
              return `${field.label}必填`;
            }
          }
        },
      ],
      biz_store_address: [
        (field: any) => {
          if (sales_scenes.biz_store_info == true) {
            if (!field.value) {
              return `${field.label}必填`;
            }
          }
        },
      ],
      biz_store_name: [
        (field: any) => {
          if (sales_scenes.biz_store_info == true) {
            if (!field.value) {
              return `${field.label}必填`;
            }
          }
          (field: any) => {
            if (field.value.length < 3) {
              return `${field.label}最少3个字符`;
            }
          };
        },
      ],
      merchant_shortname: [
        // 校验步骤
        (field: any) => {
          // field 将提供校验信息
          if (!field.value) {
            // 返回字符串将作为失败的提示信息
            return `${field.label}必填`;
          }
        },
        // 校验步骤2(如果校验步骤1不通过，该步骤将不会执行到)
        (field: any) => {
          if (field.value.length < 2 || field.value.length > 30) {
            return '请输入2-30个字符';
          }
        },
      ],
      service_phone: [
        // 校验步骤
        (field: any) => {
          // field 将提供校验信息
          if (!field.value) {
            // 返回字符串将作为失败的提示信息
            return `${field.label}必填`;
          }
        },
        // 校验步骤2(如果校验步骤1不通过，该步骤将不会执行到)
        (field: any) => {
          if (field.value.length < 6 || field.value.length > 16) {
            return '请输入正确的客服电话';
          }
        },
      ],
      //经营场景
      sales_scenes_type: [
        // 校验步骤
        (field: any) => {
          if (field.value.length < 1) {
            return `${field.label}至少选择一项`;
          }
        },
      ],
    });
    currentInstance.ctx.$refs.from.setRules(rules);
  });
  // 表单
  const business_info = reactive({
    merchant_shortname: '',
    service_phone: '',
    sales_info: {
      sales_scenes_type: [],
      biz_store_info: {
        biz_store_name: '',
        biz_address_code: '',
        biz_store_address: '',
        store_entrance_pic: '',
        indoor_pic: '',
        biz_sub_appid: '',
      },
      mini_program_info: {
        mini_program_sub_appid: '',
      },
    },
  } as businessInfo);

  //监听场景类型
  watch(
    () => [...business_info.sales_info.sales_scenes_type],
    (n, o) => {
      sales_scenes.mini_program_info = false;
      sales_scenes.biz_store_info = false;
      n.forEach(function (value) {
        if (value == 'SALES_SCENES_STORE') {
          sales_scenes.biz_store_info = true;
        }
        if (value == 'SALES_SCENES_MINI_PROGRAM') {
          sales_scenes.mini_program_info = true;
        }
      });
    },
    {
      // 首次渲染组件就触发一次
      immediate: true,
      // 开启深度监听,对象里面的数据如果发生变化也会被侦听到
      // 如果监听的数据是一个比较长的表达式，那么需要用一个函数的方式
      // 但是写成函数形式之后，里层的数据变化不到，所以需要添加deep选项
      deep: true,
    }
  );
  const next = async () => {
    if (sales_scenes.biz_store_info == true) {
      if (business_info.sales_info.biz_store_info.biz_address_code == '') {
        return uni.showToast({
          title: '请选择门店位置',
          icon: 'error',
        });
      } else if (business_info.sales_info.biz_store_info.indoor_pic == '') {
        return uni.showToast({
          title: '门店店内照片必传',
          icon: 'error',
        });
      } else if (business_info.sales_info.biz_store_info.store_entrance_pic == '') {
        return uni.showToast({
          title: '门店门头照片必传',
          icon: 'error',
        });
      }
    }
    const res = currentInstance.ctx.$refs.from.validateAll();
    res.then((s: any) => {
      if (s.status == 'success') {
        submitOrder(
          business_info,
          uni.getStorageSync('order_id'),
          uni.getStorageSync('corp_id')
        ).then((r: any) => {
          if (r.data.statusCode == 200) {
            uni.setStorageSync('subject_type', r.data.data.subject_type);
            uni.redirectTo({
              url:
                'index3?order_id=' +
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
    active: 1,
  });
  // 门头照上传
  const uploadStoreEntrancePic = async (e: any) => {
    await setStoreEntrancePic(e);
    try {
      const value = uni.getStorageSync('store_entrance_pic');
      if (value.store_entrance_pic) {
        business_info.sales_info.biz_store_info.store_entrance_pic = value.store_entrance_pic;
        uni.showToast({
          title: '上传成功',
        });
      } else {
        return uni.showToast({
          title: '上传失败',
        });
      }
    } catch (e) {
      uni.showToast({
        title: '上传失败',
      });
    }
  };
  //店内照上传
  const uploadIndoorPic = async (e: any) => {
    await setIndoorPic(e);
    try {
      const value = uni.getStorageSync('indoor_pic');
      if (value.indoor_pic) {
        business_info.sales_info.biz_store_info.indoor_pic = value.indoor_pic;
        uni.showToast({
          title: '上传成功',
        });
      } else {
        return uni.showToast({
          title: '上传失败',
        });
      }
    } catch (e) {
      uni.showToast({
        title: '上传失败',
      });
    }
  };
  //声明一个无用变量用于上传组件加载图片
  const img = reactive({
    img1: [],
    img2: [],
    img3: [],
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
