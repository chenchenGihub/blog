/*
 * @Description: file content
 * @Author: chenchen
 * @Date: 2019-04-10 18:50:38
 * @LastEditTime: 2019-04-13 13:13:44
 */
const { Router } = require('express');
const router = Router()

const article = require('./article')
const user = require('./user')


router.use(article)
router.use(user)


module.exports = router