/*
 * @Description: file content
 * @Author: chenchen
 * @Date: 2019-04-12 20:07:01
 * @LastEditTime: 2019-04-22 13:56:15
 */
const mongoose = require('mongoose')

const {
  Schema
} = mongoose

const {
  ARTICEL_SCHEMA
} = require('./schema.conf')

const ArticelSchema = new Schema({
  authorId: {type:String},
  title: ARTICEL_SCHEMA.titleType,
  text: ARTICEL_SCHEMA.contentType,
  html:ARTICEL_SCHEMA.htmlType
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
})


module.exports = ArticelSchema
