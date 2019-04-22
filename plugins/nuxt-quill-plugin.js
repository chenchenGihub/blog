/*
 * @Description: file content
 * @Author: chenchen
 * @Date: 2019-04-15 21:20:19
 * @LastEditTime: 2019-04-21 20:17:07
 */
import Vue from 'vue'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
if (process.browser) {
// 加一个浏览器端判断，只在浏览器端才渲染就不会报错了
  const VueQuillEditor = require('vue-quill-editor/dist/ssr')
  Vue.use(VueQuillEditor)
}