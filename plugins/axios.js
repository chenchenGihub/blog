/*
 * @Description: 集中配置http请求
 * @Author: chenchen
 * @Date: 2019-03-27 21:17:23
 * @LastEditTime: 2019-04-22 15:19:10
 */
const querystring  = require('querystring')

export default function (ctx) {
   
    const { $axios, redirect,store } = ctx;

   console.log(store.state.user);
   

    $axios.onRequest(config => {
        
       
            config.headers.Authorization = store.state.user.userInfo.token || '';
       
        
    });

    $axios.onResponse(response => {
       
       if (response.data && response.data.success===false) {
       
           if ( response.data.code===10004 || response.data.code===10005) {

            console.log(response.data.code);
            
              
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
