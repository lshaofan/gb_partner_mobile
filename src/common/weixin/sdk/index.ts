// @ts-ignore
import http from '/@/common/request/interface';
// #ifdef H5

// @ts-ignore
import wx from 'weixin-js-sdk';
import { shareFunc } from '/@/common/weixin/sdk/type';
const cid = uni.getStorageSync('_cid');

//初始化SDK
const init = async (callback: any) => {
  const cid = uni.getStorageSync('_cid');
  const url = window.location.href; // 获取页面url

  const { result } = await http.post('/mobile/officialAccount/wxSdk', {
    cid,
    url,
  });
  wx.config(result);
  wx.ready(() => {
    // window.alert('签名的URL：'+ signLink)
    callback && callback();
  });
};
// 设置全局分享
export const share: shareFunc = (shareParams) => {
  init(() => {
    const shareData = {
      title: shareParams?.title || '绿鸟服务商助手',
      desc: shareParams?.desc || '让您的经营更智慧',
      link: window.location.href + '?cid=' + cid,
      imgUrl: shareParams?.imgUrl || '',
      success: (res: any) => {
        console.log(res);
        //用户点击分享后的回调，这里可以进行统计，例如分享送金币之类的
      },
    };
    //分享给朋友接口
    wx.updateAppMessageShareData(shareData);
    //分享到朋友圈接口
    wx.updateTimelineShareData(shareData);
  }).then(() => {});
};
//隐藏所有非基础按钮接口
export const hideAllNonBaseMenuItem = () => {
  init(() => {
    wx.hideAllNonBaseMenuItem();
  }).then(() => {});
};

// #endif
