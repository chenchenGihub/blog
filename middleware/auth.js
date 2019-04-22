/*
 * @Description: file content
 * @Author: chenchen
 * @Date: 2019-03-11 21:58:57
 * @LastEditTime: 2019-04-22 17:00:38
 */
export default function (context) {
    context.userAgent = process.server ? context.req.headers['user-agent'] : navigator.userAgent
  }