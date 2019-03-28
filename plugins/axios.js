/*
 * @Description: file content
 * @Author: chenchen
 * @Date: 2019-03-27 21:17:23
 * @LastEditTime: 2019-03-27 22:49:08
 */
export default function ({ $axios, redirect }) {
    $axios.onRequest(config => {
        console.log('Making request to ', config)
    });


    $axios.onResponse(response => {
        console.log('Making response to ', response)
    });

    $axios.onRequestError(err => {
        console.log(err);
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
