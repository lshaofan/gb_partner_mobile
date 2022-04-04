// @ts-ignore
import { http } from '/@/common/http';

export const getIndoorPic = (cid: number) => {
  return http({
    url: '&do=order_info&type=indoor_pic&corp_id=' + cid,
  });
};
export const getStoreEntrancePic = (cid: number) => {
  return http({
    url: '&do=order_info&type=store_entrance_pic&corp_id=' + cid,
  });
};
export const getBusinessLicenseInfo = (cid: number) => {
  return http({
    url: '&do=order_info&type=license_copy&corp_id=' + cid,
  });
};
export const getIdCardInfo = (cid: number) => {
  return http({
    url: '&do=order_info&type=id_card_copy&corp_id=' + cid,
  });
};
export const getIdCardNational = (cid: number) => {
  return http({
    url: '&do=order_info&type=id_card_national&corp_id=' + cid,
  });
};
