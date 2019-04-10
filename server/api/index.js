const { Router } = require('express');
const router = Router()

const article = require('./article')
const user = require('./user')

router.use(article)
router.use(user)


module.exports = router