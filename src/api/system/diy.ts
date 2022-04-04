// @ts-ignore
import http from '/@/common/request/interface';
import store from '/@/common/store';
const api = '/mobile';
const cid = store.getters.cid;
//轮播图
export const getBanner = () => {
  return http.get(api + '/banner/show?cid=' + cid);
};
