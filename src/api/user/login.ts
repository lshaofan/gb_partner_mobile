// @ts-ignore
import http from '/@/common/request/interface';

//获取用户信息
export const getInfo = () => {
  return http.get('/mobile/user/show');
};
