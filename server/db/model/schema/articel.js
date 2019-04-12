const mongoose = require('mongoose')

const {
  Schema
} = mongoose

const {
  ARTICEL_SCHEMA
} = require('./schema.conf')

const ArticelSchema = new Schema({
  authorId: ARTICEL_SCHEMA.authorId,
  titleType: ARTICEL_SCHEMA.titleType,
  contentType: ARTICEL_SCHEMA.contentType,
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
})


module.exports = ArticelSchema
