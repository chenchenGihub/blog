
const { Router } = require('express');
const router = Router()

const article = require('./article')

router.use(article)


module.exports = router