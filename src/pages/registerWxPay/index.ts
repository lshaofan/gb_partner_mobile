import { reactive, ref } from 'vue';
import { Info } from '/@/pages/registerWxPay/types/types';
import {
  getBusinessLicenseInfo,
  getIdCardInfo,
  getIdCardNational,
  getIndoorPic,
  getStoreEntrancePic,
} from '/@/api/registerWxApp';
import type { uploadData } from '/@/api/util/upload';
import { upload } from '/@/api/util/upload';
import { isArray } from '/@/common/is';
export const infoData = reactive({
  img1: '../../static/img/wxinfo1.png',
  img2: '../../static/img/wxinfo2.png',
} as Info);

// 上传门店店内照片
export const setIndoorPic = async (e: any) => {
  // 取得缓存中企业id
  const corp_id = uni.getStorageSync('corp_id');
  const uploadData = reactive({
    url: '&upload=indoor_pic&corp_id=' + corp_id,
    filePath: e.tempFilePaths[0],
    name: 'indoor_pic',
  });
  uni.showLoading({
    title: '上传中',
  });
  await upload(uploadData as uploadData).then((r: any) => {
    uni.hideLoading();
    if (r.data.statusCode == 200) {
      return uni.showToast({
        title: JSON.parse(r.data).header,
      });
    } else {
      return uni.showToast({
        title: JSON.parse(r.data).header,
      });
    }
  });
  uni.showLoading({
    title: '上传中',
  });
  await getIndoorPic(corp_id).then((r: any) => {
    //关闭识别中弹框
    uni.hideLoading();
    // 判断是否识别成功
    if (!isArray(r.data.data)) {
      // 将识别结果写入缓存
      try {
        uni.removeStorageSync('indoor_pic');
        uni.setStorageSync('indoor_pic', r.data.data);
      } catch (e) {
        uni.showToast({
          title: '上传成功',
        });
      }
    } else {
      uni.showToast({
        title: '上传失败',
      });
    }
  });
};
// 上传门店门头
export const setStoreEntrancePic = async (e: any) => {
  // 取得缓存中企业id
  const corp_id = uni.getStorageSync('corp_id');
  const uploadData = reactive({
    url: '&upload=store_entrance_pic&corp_id=' + corp_id,
    filePath: e.tempFilePaths[0],
    name: 'store_entrance_pic',
  });
  uni.showLoading({
    title: '上传中',
  });
  await upload(uploadData as uploadData).then((r: any) => {
    uni.hideLoading();
    if (r.data.statusCode == 200) {
      return uni.showToast({
        title: JSON.parse(r.data).header,
      });
    } else {
      return uni.showToast({
        title: JSON.parse(r.data).header,
      });
    }
  });
  uni.showLoading({
    title: '上传中',
  });
  await getStoreEntrancePic(corp_id).then((r: any) => {
    //关闭识别中弹框
    uni.hideLoading();
    // 判断是否识别成功
    if (!isArray(r.data.data)) {
      // 将识别结果写入缓存
      try {
        uni.removeStorageSync('store_entrance_pic');
        uni.setStorageSync('store_entrance_pic', r.data.data);
      } catch (e) {
        uni.showToast({
          title: '上传成功',
        });
      }
    } else {
      uni.showToast({
        title: '上传失败',
      });
    }
  });
};

//上传营业执照
export const setBusinessLicenseInfo = async (e: any) => {
  const corpId = ref(0);
  const uploadData = reactive({
    url: '&upload=license_copy',
    filePath: e.tempFilePaths[0],
    name: 'license_copy',
  });
  uni.showLoading({
    title: '上传中',
  });
  await upload(uploadData as uploadData).then((r: any) => {
    uni.hideLoading();
    corpId.value = JSON.parse(r.data).data.id;
    try {
      uni.setStorageSync('corp_id', corpId.value);
      return uni.showToast({
        title: JSON.parse(r.data).header,
      });
    } catch (e) {
      uni.showToast({
        title: '上传失败，请重新上传',
      });
    }
  });
  uni.showLoading({
    title: '识别中',
  });
  await getBusinessLicenseInfo(corpId.value).then((r: any) => {
    //关闭识别中弹框
    uni.hideLoading();
    // 判断是否识别成功
    if (!isArray(r.data.data)) {
      // 将识别结果写入缓存
      try {
        uni.removeStorageSync('license_copy');
        uni.setStorageSync('license_copy', r.data.data);
      } catch (e) {}
      return uni.showToast({
        title: '识别失败请检查营业执照',
      });
    } else {
      return uni.showToast({
        title: '识别失败请检查营业执照',
      });
    }
  });
};
// 上传身份证正面
export const setIdCardInfo = async (e: any) => {
  // 取得缓存中企业id
  const corp_id = uni.getStorageSync('corp_id');
  const uploadData = reactive({
    url: '&upload=id_card_copy&corp_id=' + corp_id,
    filePath: e.tempFilePaths[0],
    name: 'id_card_copy',
  });
  uni.showLoading({
    title: '上传中',
  });
  await upload(uploadData as uploadData).then((r: any) => {
    uni.hideLoading();
    if (r.data.statusCode == 200) {
      return uni.showToast({
        title: JSON.parse(r.data).header,
      });
    } else {
      return uni.showToast({
        title: JSON.parse(r.data).header,
      });
    }
  });
  uni.showLoading({
    title: '识别中',
  });
  await getIdCardInfo(corp_id).then((r: any) => {
    //关闭识别中弹框
    uni.hideLoading();
    // 判断是否识别成功
    if (!isArray(r.data.data)) {
      // 将识别结果写入缓存
      try {
        uni.removeStorageSync('id_card_copy');

        uni.setStorageSync('id_card_copy', r.data.data);
      } catch (e) {
        uni.showToast({
          title: '上传成功',
        });
      }
    } else {
      uni.showToast({
        title: '识别失败请检查身份证照片',
      });
    }
  });
};
// 上传身份证国徽面
export const setIdCardNational = async (e: any) => {
  // 获取缓存中企业id
  const corp_id = uni.getStorageSync('corp_id');
  const uploadData = reactive({
    url: '&upload=id_card_national&corp_id=' + corp_id,
    filePath: e.tempFilePaths[0],
    name: 'id_card_national',
  });
  uni.showLoading({
    title: '上传中',
  });
  await upload(uploadData as uploadData).then((r: any) => {
    uni.hideLoading();
    return uni.showToast({
      title: JSON.parse(r.data).header,
    });
  });
  uni.showLoading({
    title: '识别中',
  });
  await getIdCardNational(corp_id).then((r: any) => {
    //关闭识别中弹框
    uni.hideLoading();
    // 判断是否识别成功  id_card_national
    if (r.data.statusCode == 200) {
      // 将识别结果写入缓存
      try {
        uni.removeStorageSync('id_card_national');
        uni.setStorageSync('id_card_national', r.data.data);
      } catch (e) {
        uni.showToast({
          title: '上传成功',
        });
      }
    } else {
      uni.removeStorageSync('id_card_national');

      uni.showToast({
        title: '识别失败请检查身份证照片',
      });
    }
  });
};
