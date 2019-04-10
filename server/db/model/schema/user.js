const mongoose = require('mongoose')
const {
  Schema
} = mongoose

const UserSchema = new Schema({
  userName: String,
  password: String,
  token: String,
  device: String,
  ip: String
}, {
  versionKey: 'v1.0',
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
})


module.exports = UserSchema
