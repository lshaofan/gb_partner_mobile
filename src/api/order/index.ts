// @ts-ignore
import http from '/@/common/request/interface';
export type createId = {
  type: number;
};
export type submitOrder = {};
export const createOrder = (options: createId) => {
  return http({
    method: 'POST',
    url: '&do=create_order&type=creat',
    data: options,
  });
};
// 分布提交订单
export const submitOrder = (options: submitOrder, id: number, corp_id: number) => {
  return http({
    method: 'POST',
    url: '&do=create_order&type=next&order_id=' + id + '&corp_id=' + corp_id,
    data: options,
  });
};
// 最后提交订单
export const orderSubmit = (id: number) => {
  return http({
    url: '&do=submit_order&type=1&order_id=' + id,
  });
};
// 查询订单
export const queryOrder = (id: number) => {
  return http({
    url: '&do=submit_order&f=query&order_id=' + id,
  });
};
