<!--
 * @Description: file content
 * @Author: chenchen
 * @Date: 2019-03-20 08:52:56
 * @LastEditTime: 2019-04-15 15:38:02
 -->
<template>
  
    <v-container fluid grid-list-lg>
     <Quilleditor></Quilleditor>
    </v-container>
 
</template>
<script>
import Quilleditor from "~/components/Quilleditor.vue";
export default {
  components: {
    Quilleditor
  },
  data() {
    return {
        content: '<p>I am Example</p>',
        editorOption: {
          // some quill options
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block']
            ]
          }
        }
      }
  },
  methods: {
    onEditorBlur(editor) {
        console.log('editor blur!', editor)
      },
      onEditorFocus(editor) {
        console.log('editor focus!', editor)
      },
      onEditorReady(editor) {
        console.log('editor ready!', editor)
      },
      onEditorChange({ editor, html, text }) {
        console.log('editor change!', editor, html, text)
        this.content = html
      }
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  },
  async asyncData({ $axios }) {},
  async fetch({ store }) {
       console.log('app init, my quill insrance object is:', this.myQuillEditor)
      setTimeout(() => {
        this.content = 'i am changed'
      }, 3000)
  }
};
</script>
<style scoped>
</style>
