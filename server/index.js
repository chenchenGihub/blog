/*
 * @Description: file content
 * @Author: chenchen
 * @Date: 2019-04-10 18:50:38
 * @LastEditTime: 2019-04-15 01:22:55
 */
const express = require('express')
const consola = require('consola')
const mongoose = require('mongoose')
const {
  Nuxt,
  Builder
} = require('nuxt')
const app = express()
const bodyParser = require('body-parser')

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

const jwt = require('jsonwebtoken');

const { DBURL } = require('./config')

const { secretKey } = require('./config');

const api = require('./api')

const { decodedToken } = require('./utils/decodeToken')

async function start() {

  mongoose.connect(DBURL)

  const con = mongoose.connection

  con.on("error", console.error.bind(console, "数据库连接失败"))

  con.once("open", () => {
    consola.ready({
      message: `数据库连接成功`,
      badge: true
    })
  })

  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host,
    port
  } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  //将前端json参数转换为json或者是urlencoded
  app.use(bodyParser.json())

  // app.use(checkToken)

  app.all('*', async (req, res, next) => {

    let token



    if (req.headers.authorization) {

      try {
        token = await decodedToken(req.headers.authorization.substring(1, req.headers.authorization.length - 1), secretKey)
      } catch (error) {

      }


    }


    next();



  });


  app.use('/api', api)



  // Give nuxt middleware to express
  app.use(nuxt.render)



  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
