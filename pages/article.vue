<!--
 * @Description: 文章详情
 * @Author: chenchen
 * @Date: 2019-04-23 14:49:48
 * @LastEditTime: 2019-04-23 16:25:23
 -->
<template>
    <v-layout column>
    <v-flex xs12 sm12>
      <v-card light>
        <v-img
          src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
          aspect-ratio="2.75"
        ></v-img>

        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">{{article.title}}</h3>
            <div v-html="article.html"></div>
          </div>
        </v-card-title>

        <v-card-actions>
          <v-btn flat color="orange">分享</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  <v-flex xs12 sm12>
<v-card
   
    light
  >
    <v-card-title>
      <span class="sub">关注</span>
    </v-card-title>
    <v-card-text >
      "222"
    </v-card-text>
    <v-card-actions>
      <v-list-tile class="grow">
        <v-list-tile-avatar color="grey darken-3">
          <v-img
            class="elevation-6"
            :src="article.avatarUrl"
          ></v-img>
        </v-list-tile-avatar>

        <v-list-tile-content>
          <v-list-tile-title>{{article.author}}</v-list-tile-title>
          <v-list-tile-title>
              <span class="subheading mr-2">256</span>
              <span class="subheading">256</span>
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-card-actions>
  </v-card>
  </v-flex>
  </v-layout>
</template>
<script>
export default {
     data () {
      return {
        card_text: 'Lorem ipsum dolor sit amet, brute iriure accusata ne mea. Eos suavitate referrentur ad, te duo agam libris qualisque, utroque quaestio accommodare no qui. Et percipit laboramus usu, no invidunt verterem nominati mel. Dolorem ancillae an mei, ut putant invenire splendide mel, ea nec propriae adipisci. Ignota salutandi accusamus in sed, et per malis fuisset, qui id ludus appareat.'
      }
    },
    async asyncData({store,query}) {

    await store.dispatch("article/getSingleArticle", { id: query.id });

    return {
      article: store.state.article.article
    };
  },
  async fetch({ store }) {},
}
</script>
<style scoped>
.sub{
    height: 30px;
    width: 80px;
    border-radius: 15px;
    background: rgba(255, 0, 0,1);
    text-align: center;
    line-height: 30px;
    font-size: 18px;
    cursor: pointer;
    border: 1px solid red;
    color: #eee;
}
</style>
