//登录功能
// @ts-ignore
import http from '/@/common/request/interface';
import store from '/@/common/store';

export const login = async () => {
  // #ifdef H5

  // 非静默授权，第一次有弹框
  const local = window.location.href; // 获取页面url
  const wxCode = await getParam().code; //获取code
  const cid = (await getParam().cid) ? getParam().cid : null;
  const agent = (await getParam().agent) ? getParam().agent : 0;
  const appid = (await getParam().appid) ? getParam().appid : '';

  // 获取之前的code 。 避免出现新旧code
  const oldCode = uni.getStorageSync('wechatCode');
  //判断链接是否正确
  if (cid == null || cid == '' || cid == 'undefined') {
    return uni.showModal({
      title: '错误',
      content: '链接错误请检查',
      success: function (res) {
        if (res.confirm) {
        } else if (res.cancel) {
        }
      },
    });
  }
  //没有code获取授权链接
  if (wxCode == null || wxCode == '' || wxCode == 'undefined' || wxCode == oldCode) {
    //设置旧code避免进入死循环
    uni.setStorageSync('wechatCode', 0);
    //后台获取授权链接
    const { code, result } = await http.post('/mobile/h5/auth', {
      cid,
      redirectUriPrefix: local,
      appid,
    });
    if (code === 200) {
      if (result.url) {
        window.location.href = result.url;
      }
    }
  } else {
    // 保存最新code
    uni.setStorageSync('wechatCode', wxCode);
    const { code, result } = await http.post('/mobile/h5/auth', {
      cid,
      code: wxCode,
      appid,
      agent,
      redirectUriPrefix: local,
    });
    uni.showLoading({
      title: '登陆中',
    });
    if (code === 200) {
      if (result.user) {
        await store.dispatch('handler', {
          type: 'setInfo',
          value: result.user,
        });
        uni.setStorageSync('_user_info', result.user);
        await store.dispatch('handler', {
          type: 'setCid',
          value: result.user.cid,
        });
        uni.setStorageSync('_cid', result.user.cid);
        uni.setStorageSync('_isLogin', true);
        uni.hideLoading();
        uni.reLaunch({
          url: '/pages/index/index',
          // success: function () {
          //   console.log('sad');
          //   hideAllNonBaseMenuItem();
          //   const shareParams = {
          //     title: '132456',
          //     desc: '4522',
          //     imgUrl: 'string',
          //   };
          //   share(shareParams);
          //   // 通过eventChannel向被打开页面传送数据
          // },
        });
      }
    }
  }
};
//获取url 参数
const getParam = () => {
  // 截取url中的code方法
  const url = location.search;
  const theRequest: any = {};
  if (url.indexOf('?') != -1) {
    const str = url.substr(1);
    const strs = str.split('&');
    for (let i = 0; i < strs.length; i++) {
      theRequest[strs[i].split('=')[0]] = strs[i].split('=')[1];
    }
  }
  return theRequest;
  // #endif
};
