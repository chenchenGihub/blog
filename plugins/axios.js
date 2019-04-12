/*
 * @Description: 集中配置http请求
 * @Author: chenchen
 * @Date: 2019-03-27 21:17:23
 * @LastEditTime: 2019-04-12 15:57:57
 */
const querystring  = require('querystring')

export default function (ctx) {
   

    const { $axios, redirect } = ctx;

    $axios.onRequest(config => {
     
    });


    $axios.onResponse(response => {
       console.log(response);

       if (response.data && response.data.success===false) {
           alert(response.data.msg)
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
