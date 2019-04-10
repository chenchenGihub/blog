const mongoose = require('mongoose')

const {
  Schema
} = mongoose

const { USER_SCHEMA } = require('./schema.conf')

const UserSchema = new Schema({
  avatarUrl:USER_SCHEMA.avatarUrlType,
  userName: USER_SCHEMA.userNameType,
  password: USER_SCHEMA.passwordType,
  token: USER_SCHEMA.tokenType,
  device: USER_SCHEMA.deviceType,
  ip: USER_SCHEMA.ipType
}, {
  versionKey: 'v1.0',
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
})


module.exports = UserSchema
