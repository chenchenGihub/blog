<!--
 * @Description: file content
 * @Author: chenchen
 * @Date: 2019-03-20 08:52:56
 * @LastEditTime: 2019-04-22 14:25:49
 -->
<template>
  <div>
    <div class="container">
      <div class="title">标题</div>
      <textarea
        class="textarea"
        name=""
        id=""
        cols="30"
        rows="1"
        v-model="contentForm.title"
      />
      </div>
       <div class="content">内容</div>
    <Quilleditor 
      ref="Quilleditor"
      @editorContent="editorContent"
      @editorContentText="editorContentText"
      
    ></Quilleditor>
    <div class="btn">
      <v-btn :disabled="!contentForm.title||!contentForm.html" color="info" @click="submit">提交</v-btn>
       <v-btn :disabled="!contentForm.title && !contentForm.html" color="error">重置</v-btn>
    </div>

</div>
</template>
<script>
import Quilleditor from "~/components/Quilleditor.vue";
export default {
  components: {
    Quilleditor
  },
  data() {
    return {
      contentForm:{
        title:'',
        text:'',
        html:''
      }
    }
  },
  methods: {
    editorContent(html){
      this.contentForm.html = html;
    },
    editorContentText(text){
      this.contentForm.text = text
    },
   async submit(){
    
    const data =  await this.$store.dispatch("article/publishArticle", {...this.contentForm,id:this.$store.state.user.userInfo.id});

    let success = this.$store.state.article.publishArticleRes.success;

    if (success) {
      this.$router.push('/inspire');
    }

    

    }
  },
  computed: {},
  async asyncData({ $axios }) {},
  async fetch({ store }) {}
};
</script>

<style scoped>
.title {
  color: black;
  margin-bottom: 12px;
}
.content {
  font-size: 20px !important;
  font-weight: 500;
  line-height: 1 !important;
  letter-spacing: 0.02em !important;
  font-family: "Roboto", sans-serif !important;
  color: #000;
}
.textarea {
  border: 1px solid #ccc;
  flex: 1 1 100%;
  margin: auto;
  padding: 24px;
  width: 100%;
  color: black;
}

textarea {
  outline: none;
  resize: none;
}
.btn{
  margin-top: 40px;
}
</style>
