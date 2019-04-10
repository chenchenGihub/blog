
const { Router } = require('express');

const router = Router()

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