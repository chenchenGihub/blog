/*
 * @Description: 路由守卫
 * @Author: chenchen
 * @Date: 2019-04-22 16:19:55
 * @LastEditTime: 2019-04-22 17:00:50
 */
export default (ctx) => {

    ctx.app.router.beforeEach((to, from,next) => {

        // ctx.store.dispatch("article/getArticle", {});

        next()
    })

    ctx.app.router.afterEach((to, from) => {
      
    })
}