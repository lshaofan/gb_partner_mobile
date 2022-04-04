import { http } from '/@/common/http';
import { ref } from 'vue';
export const swiperData = ref({});

try {
  const value = uni.getStorageSync('swiperData');
  if (value) {
    swiperData.value = value;
  }
} catch (e) {
  uni.showToast({
    title: '加载数据失败',
  });
}
export const getSwiper = () => {
  return http({
    url: '&do=index',
  });
};
