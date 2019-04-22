/*
 * @Description: file content
 * @Author: chenchen
 * @Date: 2019-04-12 20:07:01
 * @LastEditTime: 2019-04-22 14:12:25
 */
const {
  Router
} = require('express');

const router = Router();

const { createToken } = require('../utils/createToken');
const { decodedToken } = require('../utils/decodeToken');

const UserModel = require('../db/model/user');

const {
  errorCode,
  errorMsg
} = require('../error.conf')

const { secretKey } = require('../config');


router.put('/register', async (req, res, next) => {

  let User = new UserModel;
  
  const doc = await UserModel.findOne({
    userName: req.body.userName
  });
 
  if (doc) {
    return res.json({
      success: false,
      data: null,
      code: errorCode.NOT_EXSIT,
      msg: errorMsg.NOT_EXSIT
    })
  }

  User.userName = req.body.userName;
  User.email = req.body.email;
  User.password = req.body.password;
  User.token = req.body.token;
  User.device.push(req.body.device);
  User.ip.push(req.body.ip);

  try {
    data = await User.save();
    res.json({
      success: true,
      data: null,
      code: null
    })
  } catch (error) {

    res.json({
      success: false,
      data: null,
      code: errorCode.DATABASE_ERROR,
      msg: errorMsg.DATABASE_ERROR
    })

  }

})

router.put('/login', async (req, res, next) => {

  const {
    userName,
    password
  } = req.body;


/**
 * 生成客户端的token
 */
  let clientToken = await createToken({
    userName,
    password
  }, secretKey, 1, "h");

  /**
   * 生成服务端的token
   */

   let serverToken = await createToken({
     userName,
     password
   },secretKey,7,"d")


 

  const doc = await UserModel.findOne({
    userName: userName
  });

  if (doc) {

    const ress = await UserModel.updateOne({ userName: userName }, { token: serverToken })

    console.log(ress);


    res.json({
      success: true,
      data: {...doc._doc,token:clientToken}
    })
  } else {
    res.json({
      success: false,
      data: null,
      code: errorCode.NOT_EXSIT,
      msg: errorMsg.NOT_EXSIT,
    })
  }




})

router.get('/checkname', async (req, res, next) => {

  let userName = req.query.userName

  if (!userName) {
    return res.json({
      success: false,
      data: null,
      code: errorCode.UNKHOWN,
      msg: errorMsg.UNKHOWN
    })
  }

  const doc = await UserModel.findOne({
    userName: userName
  });



  if (doc) {
    res.json({
      success: false,
      data: null,
      code: errorCode.USER_EXSIT,
      msg: errorMsg.USER_EXSIT
    })
  } else {
    res.json({
      success: true,
      data: null,
      code: null,
      msg: null
    })
  }

})

module.exports = router
