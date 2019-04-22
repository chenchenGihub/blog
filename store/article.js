/*
 * @Description: 文章的状态管理
 * @Author: chenchen
 * @Date: 2019-03-28 19:55:16
 * @LastEditTime: 2019-04-22 17:01:25
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
    let data
    try {
      data = await this.$axios.$get('/api/article');
      commit('getArticle', data)
    } catch (error) {
     
    }
    

    
  },
  async publishArticle({ commit }, params) {
    const data = await this.$axios.$post('/api/publishArticle',params)
    commit('publishArticle', data)
  }
}
