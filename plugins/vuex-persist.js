/*
 * @Description: state 持久化
 * @Author: chenchen
 * @Date: 2019-04-22 13:31:43
 * @LastEditTime: 2019-04-22 13:32:01
 */
// ~/plugins/vuex-persist.js
import VuexPersistence from 'vuex-persist'

export default ({ store }) => {
  window.onNuxtReady(() => {
    new VuexPersistence({
    /* your options */
    }).plugin(store);
  });
}