/*
 * @Description: file content
 * @Author: chenchen
 * @Date: 2019-04-12 20:07:01
 * @LastEditTime: 2019-04-22 17:30:58
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

    console.log(req.query);
    let { skip, count } = req.query;

    let articles,total;

    try {
        articles = await Article.find({},null, { skip: +skip, limit: +count });
        total    = await Article.count();

    } catch (error) {
        console.log(error);
        
    }

   

    res.json({
        success: false,
        data: {articles,total},
        errorCode: null,
        errorMsg: null,
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

        let data = await article.save();

        if (!data) {

            res.json({
                success: false,
                data: null,
                code: errorCode.ARTICEL_NOT_EXSIT,
                msg: errorMsg.ARTICEL_NOT_EXSIT
            })

        } else {

            res.json({
                success: true,
                data: null,
                code: null,
                msg: null
            })

        }

    } catch (error) {
        res.json({
            success: false,
            data: null,
            code: errorCode.DATABASE_ERROR,
            msg: errorMsg.DATABASE_ERROR
        })
    }


})

module.exports = router