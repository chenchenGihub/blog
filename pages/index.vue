<!--
 * @Description: 主页
 * @Author: chenchen
 * @Date: 2019-03-10 01:08:09
 * @LastEditTime: 2019-04-11 10:20:22
 -->
<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div class="text-xs-center">
        <logo/>
        <vuetify-logo/>
      </div>
      <v-card>
        <v-card-title class="headline">欢迎来到匆匆的博客</v-card-title>
        <v-card-text>
          <article>本站是使用nuxt.js开发完成的</article>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn color="primary" flat nuxt to="/inspire">继续</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import Logo from "~/components/Logo.vue";
import VuetifyLogo from "~/components/VuetifyLogo.vue";

export default {
  components: {
    Logo,
    VuetifyLogo
  },
  async fetch({ store }) {
    // await store.dispatch("user/add", 111);
  }
};
</script>
