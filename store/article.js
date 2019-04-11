/*
 * @Description: 文章的状态管理
 * @Author: chenchen
 * @Date: 2019-03-28 19:55:16
 * @LastEditTime: 2019-04-11 14:38:28
 */
export const state = () => ({
  articelList: []
})

export const mutations = {
  getArticle(state, text) {
    state.articelList.push({
      text: text,
      done: false
    })
  }
}

export const actions = {
  async getArticle({
    commit
  }, params) {

    const data = await this.$axios.$get('/api/article')

    console.log(data);



    commit('getArticle', params)
  }
}
