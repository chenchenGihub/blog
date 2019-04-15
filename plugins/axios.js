/*
 * @Description: 集中配置http请求
 * @Author: chenchen
 * @Date: 2019-03-27 21:17:23
 * @LastEditTime: 2019-04-15 10:29:26
 */
const querystring  = require('querystring')

export default function (ctx) {
   
    const { $axios, redirect } = ctx;

    $axios.onRequest(config => {
        config.headers.Authorization = sessionStorage.getItem('token') || '';
    });

    $axios.onResponse(response => {
       
       if (response.data && response.data.success===false) {
       
           if ( response.data.code===10004 || response.data.code===10005) {
               sessionStorage.getItem('token') && sessionStorage.removeItem('token');
               redirect('/');
           }
       }
       
    });

    $axios.onRequestError(err => {
     
    });

    $axios.onResponseError(err => {
       console.log(err);
       
    });

    $axios.onError(error => {
        const code = parseInt(error.response && error.response.status)
        if (code === 400) {
            redirect('/400')
        }
    })

}
