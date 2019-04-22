/*
 * @Description: file content
 * @Author: chenchen
 * @Date: 2019-04-16 08:49:09
 * @LastEditTime: 2019-04-16 12:23:17
 */
const { decodedToken } = require('../utils/decodeToken');
const { secretKey } = require('../config');


const {
    errorCode,
    errorMsg
  } = require('../error.conf')

const UserModel = require('../db/model/user');

exports.auths = async (req, res, next) => {

    let token;

    let doc;

    console.log(req.headers.authorization);
    

    try {
        if (req.headers.authorization) {

            token = await decodedToken(req.headers.authorization.substring(1, req.headers.authorization.length - 1), secretKey);

            doc = await UserModel.findOne({
                userName: token.userName
            });

            if (!doc) {
                return res.json({
                    success: false,
                    data: null,
                    code: errorCode.NOT_EXSIT,
                    msg: errorMsg.NOT_EXSIT
                })
            }

        } else{
            return res.json({
                success: false,
                data: null,
                code: errorCode.OUT_OF_DATE,
                msg: errorMsg.OUT_OF_DATE
            })
        }

        next();

    } catch (error) {

        console.log(error);


        return res.json({
            success: false,
            data: null,
            code: errorCode.INVALID_TOEKN,
            msg: errorMsg.INVALID_TOEKN
        })

    }




}