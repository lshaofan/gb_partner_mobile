// #ifdef H5

export default {
  state: {
    isLogin: uni.getStorageSync('_isLogin') ? uni.getStorageSync('_isLogin') : false,
    cid:
      null != window.sessionStorage.getItem('cid')
        ? // @ts-ignore
          window.sessionStorage.getItem('cid')
        : uni.getStorageSync('_cid'),
    info:
      null != window.sessionStorage.getItem('info')
        ? // @ts-ignore
          JSON.parse(window.sessionStorage.getItem('info'))
        : uni.getStorageSync('_user_info'),
  },
  //方法名全局唯一
  mutations: {
    setInfo: (state: any, value: any) => {
      state.info = value;
    },
    setCid: (state: any, value: any) => {
      state.cid = value;
    },
  },
};
// #endif
