
const { Router } = require('express');

const router = Router()

router.get('/register',(req,res,next)=>{

    console.log(req);
    
    
    res.json({
        success:true
    })
})

module.exports = router