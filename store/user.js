/*
 * @Description: 状态管理
 * @Author: chenchen
 * @Date: 2019-03-28 19:55:16
 * @LastEditTime: 2019-04-14 23:55:05
 */
const defaultUserinfo = {
  success: false,
  avatarUrl: '',
  userName: ''
}
export const state = () => ({
  registerState: {
    success: null
  },
  checknameState: {
    success: null
  },
  userInfo: defaultUserinfo
})

export const mutations = {
  register(state, text) {
    state.registerState.success = text.success
  },
  checkname(state, text) {

    state.checknameState.success = text.success
  },
  login(state, payload) {
console.log(payload);

    state.userInfo.success = payload.success;
    if (state.userInfo.success) {
      state.userInfo.avatarUrl = payload.data.avatarUrl;
      state.userInfo.userName = payload.data.userName;
      sessionStorage.setItem('token',JSON.stringify(payload.data.token))
    } else {
      state.userInfo = {
        ...defaultUserinfo
      }
    }

  },
  logout(state, payload) {
    
  }
}

export const actions = {
  async register({
    commit
  }, params) {

    const ip = await this.$axios.$get("http://icanhazip.com");

    params.ip = ip;

    const data = await this.$axios.$put('/api/register', params);
    
    commit('register', data);

  },
  async checkname({
    commit
  }, q) {

    const data = await this.$axios.$get('/api/checkname', {
      params: q
    });

    commit("checkname", data);

  },
  async login({
    commit
  }, q) {

    const data = await this.$axios.$put('/api/login', q);

    commit("login", data);

  },
  async logout({
    commit
  }, payload) {

    const data  = await this.$axios.$put('/api/logout',payload);

    commit("logout",data)

  }

}
