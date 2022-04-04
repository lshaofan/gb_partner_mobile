// 他只能去操作mutations 并不能去直接改变state
// 调用方法 只能这么用this.$store.dispatch('handler', {type: '<mutationsName>', value: <value>})
export default {
  handler(context: any, data: any) {
    // data.type 是mutations里面的func
    // data.value 状态参数
    // #ifdef H5
    context.commit(data.type, data.value);
    // #endif
  },
};
