/*
 * @Description: 文章的状态管理
 * @Author: chenchen
 * @Date: 2019-03-28 19:55:16
 * @LastEditTime: 2019-04-22 14:47:50
 */
export const state = () => ({
  articelListRes: {
    articelList:[],
    success:false
  },
  publishArticleRes:{
    success:false
  }
})

export const mutations = {
  getArticle(state, pl) {
    state.articelListRes.articelList = [...pl.data];
    state.articelListRes.success = true;
  },
  publishArticle(state,payload){
    state.publishArticleRes.success = payload.success
  }
}

export const actions = {
  async getArticle({
    commit
  }, params) {

    const data = await this.$axios.$get('/api/article');

    console.log(data);
    

    commit('getArticle', data)
  },
  async publishArticle({ commit }, params) {
    const data = await this.$axios.$post('/api/publishArticle',params)
    commit('publishArticle', data)
  }
}
