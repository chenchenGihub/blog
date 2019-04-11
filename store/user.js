/*
 * @Description: 状态管理
 * @Author: chenchen
 * @Date: 2019-03-28 19:55:16
 * @LastEditTime: 2019-04-11 15:52:33
 */

export const state = () => ({
  list: [],
  checknameState: {
    success: false
  }
})

export const mutations = {
  register(state, text) {
    state.list.push({
      text: text,
      done: false
    })
  },
  checkname(state, text) {

    state.checknameState.success = text.success
  }
}

export const actions = {
  async register({
    commit
  }, params) {

    const ip = await this.$axios.$get("http://icanhazip.com");

    params.ip = ip;

    const data = await this.$axios.$put('/api/register', params);

    console.log(data);

    commit('register', params);

  },
  async checkname({
    commit
  }, q) {
    
    const data = await this.$axios.$get('/api/checkname',{params: q});

    commit("checkname", data);

  }

}
