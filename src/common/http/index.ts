import RequestOptions = UniApp.RequestOptions;
import RequestSuccessCallbackResult = UniApp.RequestSuccessCallbackResult;
import UploadFileOption = UniApp.UploadFileOption;
// #ifdef H5
// @ts-ignore
const BASE_URL = '/mobile/h5';
// #endif

// #ifdef MP
// @ts-ignore
const BASE_URL = '/mobile/h5';
// #endif

const http = (options: RequestOptions) => {
  return new Promise((resolve, reject) => {
    uni.request({
      url: BASE_URL + options.url,
      method: options.method || 'GET',
      data: options.data || {},
      header: {
        'Content-Type': 'application/json',
      },
      success: (r: RequestSuccessCallbackResult) => {
        if (r.statusCode !== 200) {
          return uni.showToast({
            title: '获取数据失败',
          });
        }
        resolve(r);
      },
      fail: (e) => {
        return (
          uni.showToast({
            title: '请求接口失败',
          }),
          reject(e)
        );
      },
    });
  });
};
const uploadFile = (option: UploadFileOption) => {
  return new Promise((resolve, reject) => {
    uni.uploadFile({
      url: BASE_URL + '&do=upload' + option.url, //上传文件接口地址
      filePath: option.filePath,
      name: option.name,
      formData: option.formData || {},
      fileType: option.fileType || 'image',
      success: (uploadFileRes) => {
        if (uploadFileRes.statusCode !== 200) {
          return uni.showToast({
            title: '上传失败',
          });
        }
        resolve(uploadFileRes);
      },
      fail: (e) => {
        return (
          uni.showToast({
            title: '请求接口失败',
          }),
          reject(e)
        );
      },
    });
  });
};
export { http, uploadFile };
