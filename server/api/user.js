
const { Router } = require('express');

const router = Router()

const UserModel = require('../db/model/user')

router.put('/register',(req,res,next)=>{

    console.log(req.body);

    // let {  }
    
    let User = new UserModel({
        userName:req.body
    })

    
    res.json({
        success:true
    })
})

module.exports = router