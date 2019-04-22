/*
 * @Description: file content
 * @Author: chenchen
 * @Date: 2019-04-12 20:07:01
 * @LastEditTime: 2019-04-22 13:06:08
 */
const {
  Schema
} = require('mongoose');

exports.ARTICEL_SCHEMA = {
    authorIdType: {
      type:String
    },
    titleType: {
      type: String,
      trim: true,
      require: true,
      minlength: [6, "标题长度必须大于等于6位"],
      maxlength: [30, "标题长度必须小于等于100位"],
      alias: 't'
    },
    contentType: {
      type: String,
      trim: true,
      require: true,
      minlength: [1, "文本内容必填"],
      maxlength: [1000, "文本内容不能超过1000"],
      alias: 'c'
    },
    htmlType:{
      type: String,
      trim: true,
      require: true,
      minlength: [1, "html内容必填"],
      maxlength: [1000, "html内容不能超过1000"],
      alias: 'h'
    }
  };

//  const articleSchema = new Schema({
//     authorIdType: ARTICEL_SCHEMA.authorIdType,
//     titleType:ARTICEL_SCHEMA.titleType,
//     contentType: ARTICEL_SCHEMA.contentType,
//     htmlType: ARTICEL_SCHEMA.htmlType,
//   }, {
//     timestamps: {
//       createdAt: 'createdAt',
//       updatedAt: 'updatedAt'
//     }
//   });

exports.USER_SCHEMA = {
  userNameType: {
    type: String,
    trim: true,
    require: true,
    minlength: [6, "账号长度必须大于等于6位"],
    maxlength: [10, "账号长度必须小于等于10位"]
  },
  avatarUrlType: {
    type: String,
    trim: true,
    default: 'https://cdn.vuetifyjs.com/images/lists/1.jpg'
  },
  emailType: {
    type: String,
    trim: true
  },
  passwordType: {
    type: String,
    trim: true,
    require: true,
    minlength: [6, "密码长度必须大于等于6位"],
    maxlength: [18, "密码长度必须小于等于18位"],
    set: v => v.trim(),
    get: v => v.trim(),
    validate: (v) => {
      if (v.length < 6) {
        return '长度过小'
      }
    },
    alias: 'p'
  },
  tokenType: {
    type: String
  },
  deviceType: [String],
  ipType: [String],
  articleType: [
    // articleSchema
  ]
}




exports.ARTICEL_SCHEMA
exports.articleSchema
