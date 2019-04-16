/*
 * @Description: file content
 * @Author: chenchen
 * @Date: 2019-04-12 20:07:01
 * @LastEditTime: 2019-04-16 09:03:03
 */

const { Router } = require('express');
const { auths } = require('../middleware/auth')
const router = Router()

router.all("/article",auths)

router.get('/article',(req,res,next)=>{

    
    
    res.json({
        articleList:[
            {
                title:''
            }
        ]
    })
})

module.exports = router