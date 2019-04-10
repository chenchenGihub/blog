/*
 * @Description: 状态管理
 * @Author: chenchen
 * @Date: 2019-03-28 19:55:16
 * @LastEditTime: 2019-04-10 15:22:33
 */
export const state = () => ({
  list: []
})

export const mutations = {
  add(state, text) {
    state.list.push({
      text: text,
      done: false
    })
  },
  remove(state, {
    todo
  }) {
    state.list.splice(state.list.indexOf(todo), 1)
  },
  toggle(state, todo) {
    todo.done = !todo.done
  }
}

export const actions = {
  add({
    commit
  }, params) {
    commit('add', params)
  }
}
