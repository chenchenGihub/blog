const {
  Router
} = require('express');

const router = Router();

// const UserModel = require('../db/model/user');
const UserModel = require('../db/model/user');

const {
  errorCode,
  errorMsg
} = require('../error.conf')


router.put('/register', async (req, res, next) => {
  let User = new UserModel;
  console.log(req.body.userName);

  const doc = await UserModel.findOne({
    userName: req.body.userName
  });
  console.log(doc);
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
      success: false
    })


  }


  //   User.save((err, docs) => {
  //     if (err) {
  //       res.json({
  //         success: false
  //       })
  //       throw err
  //     }


  //     consola.ready(docs);

  //   })



})

router.put('/login', async (req, res, next) => {

  const {
    userName
  } = req.body;

  


  const doc = await UserModel.findOne({
    userName: userName
  });

  console.log(doc);

  if (doc) {
    res.json({
      success: true,
      data: doc
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
