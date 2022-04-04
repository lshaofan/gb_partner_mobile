import { createStore } from 'vuex';
import getters from './getter';
import actions from './action';
// #ifdef H5
import user from '/@/common/store/modules/user';
// #endif

export default createStore({
  modules: {
    // #ifdef H5
    user,
    // #endif
  },
  getters,
  actions,
});
