/*
 * @Description: 评论api
 * @Author: chenchen
 * @Date: 2019-04-24 22:15:40
 * @LastEditTime: 2019-04-27 12:09:59
 */
const { Router } = require('express');
const router = Router()
const { auths } = require('../middleware/auth')
const Article = require('../db/model/article');
const User = require('../db/model/user');
const Comment = require('../db/model/comment');


const {
    errorCode,
    errorMsg
} = require('../error.conf')

router.all("/comment", auths)

router.post('/comment', async (req, res, next) => {


    let { textValue, articleId, userId } = req.body;
    let data, user;

    try {
        const comment = new Comment;
        comment.articleId = articleId;
        comment.comment = textValue;
        comment.user.userId = userId;

        if (userId) {
            user = await User.findById({ _id: userId })
        }

        if (user) {
            comment.user.userName = user.userName;
            comment.user.avatar = user.avatarUrl;
        }

        data = await comment.save();
        
    } catch (error) {
        res.json({
            success: false,
            data: null,
            code: errorCode.DATABASE_ERROR,
            msg: errorMsg.DATABASE_ERROR
        })
    }


    res.json({
        success: true,
        data: null,
        code: null,
        msg: null
    })
})


router.get('/commentlist', async (req, res, next) => {
    let { articleId } = req.query;
   
    let doc;
    try {
        doc = await Comment.find({ articleId: articleId });

        if (!doc) {
            return res.json({
                success: false,
                data: doc,
                code: errorCode.NOT_EXSIT,
                msg: errorMsg.NOT_EXSIT
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


    res.json({
        success: true,
        data: doc,
        code: null,
        msg: null
    })

})

module.exports = router