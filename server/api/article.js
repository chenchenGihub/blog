/*
 * @Description: file content
 * @Author: chenchen
 * @Date: 2019-04-12 20:07:01
 * @LastEditTime: 2019-04-22 14:35:48
 */

const { Router } = require('express');
const router = Router()
const { auths } = require('../middleware/auth')
const Article = require('../db/model/article');
const User = require('../db/model/user');

const {
    errorCode,
    errorMsg
} = require('../error.conf')

router.all("/article", auths)

router.get('/article', async (req, res, next) => {

    let articles;

    articles = await Article.find({})

    res.json({
        success: false,
        data:articles,
        errorCode:null,
        errorMsg:null,
    })

})

router.post("/publishArticle", async (req, res, next) => {
    let user, article;
    try {

        user = await User.findById(req.body.id);

        if (!user) {
            res.json({
                success: false,
                data: null,
                code: errorCode.NOT_EXSIT,
                msg: errorMsg.NOT_EXSIT
            })
        }

    } catch (error) {
        res.json({
            success: false,
            data: null,
            code: errorCode.NOT_EXSIT,
            msg: errorMsg.NOT_EXSIT
        })
    }

    article = new Article;
    article.authorId = req.body.id;
    article.title = req.body.title;
    article.text = req.body.text;
    article.html = req.body.html;

    try {

     let data =  await article.save();

     if (!data) {

         res.json({
             success:false,
             data:null,
             code:errorCode.ARTICEL_NOT_EXSIT,
             msg:errorMsg.ARTICEL_NOT_EXSIT
         })
         
     }else{

        res.json({
            success:true,
            data:null,
            code:null,
            msg:null
        })

     }

    } catch (error) {
        res.json({
            success:false,
            data:null,
            code:errorCode.DATABASE_ERROR,
            msg:errorMsg.DATABASE_ERROR
        })
    }


})

module.exports = router