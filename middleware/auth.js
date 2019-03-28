/*
 * @Description: file content
 * @Author: chenchen
 * @Date: 2019-03-11 21:58:57
 * @LastEditTime: 2019-03-11 21:59:11
 */
export default function (context) {
    console.log(context);
    
    context.userAgent = process.server ? context.req.headers['user-agent'] : navigator.userAgent
  }