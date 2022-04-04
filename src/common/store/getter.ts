// 状态进行处理

export default {
  // 获取方式  this.$store.getters.<func>
  // #ifdef H5

  isLogin: (state: any) => state.user.isLogin,
  userInfo: (state: any) => state.user.info,
  cid: (state: any) => state.user.cid,
  // #endif
};
