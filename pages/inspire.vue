<!--
 * @Description: file content
 * @Author: chenchen
 * @Date: 2019-03-20 08:52:56
 * @LastEditTime: 2019-04-23 15:18:43
 -->
<template>

  <v-card>
    <v-container
      fluid
      grid-list-lg
    >
      <v-layout
        row
        wrap
      >
        <v-flex
          xs12
          v-for="(item, index) in articleList"
          :key="index"
        >
          <v-card
            @click="gotoArticle(item)"
            color="white darken-2"
            class="white--text"
          >
            <v-layout>
              <v-flex xs3>
                <v-img
                  src="https://cdn.vuetifyjs.com/images/cards/foster.jpg"
                  height="125px"
                  contain
                ></v-img>
              </v-flex>
              <v-flex xs9>
                <v-card-title primary-title>
                  <div class="body">
                    <div class="headline">{{item.title}}</div>
                    <div>{{item.text.length>150 ? item.text.slice(0,100)+'...' : item.text }}</div>

                  </div>
                </v-card-title>
                <v-card-actions>
                  <!-- <v-btn
                    flat
                    color="orange"
                  >分享</v-btn> -->
                  <v-btn
                    v-if="item.text.length>150"
                    flat
                    color="orange"
                  >查看全部</v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
            <v-divider light></v-divider>

            <v-card-actions>
              <v-list-tile class="grow">
                <v-list-tile-avatar color="grey darken-3">
                  <v-img
                    class="elevation-6"
                    src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                  ></v-img>
                </v-list-tile-avatar>

                <v-list-tile-content>
                  <v-list-tile-title>匆匆</v-list-tile-title>
                </v-list-tile-content>

                <v-layout
                  align-center
                  justify-end
                >
                  <v-icon class="mr-1">favorite</v-icon>
                  <span class="subheading mr-2">256</span>
                  <span class="mr-1">·</span>
                  <v-icon class="mr-1">feedback</v-icon>
                  <span class="subheading">45</span>
                </v-layout>
              </v-list-tile>
            </v-card-actions>

          </v-card>
        </v-flex>

      </v-layout>
      <Pagination
        :pages="pages"
        @pagination="onPageChange"
      ></Pagination>
    </v-container>

  </v-card>
</template>
<script>
import Pagination from "~/components/Pagination.vue";

export default {
  components: {
    Pagination
  },
  data() {
    return {
      searchParams: {
        skip: 0,
        count: 5
      },
      articleList: []
    };
  },
  methods: {
    async loadData() {},
    async onPageChange(page) {
      await this.$store.dispatch("article/getArticle", {
        skip: page * 5,
        count: 5
      });

      this.articleList = [
        ...this.$store.state.article.articelListRes.articelList
      ];
    },
    gotoArticle(article) {
      this.$router.push({
        path: "./article",
        query: {
          id: article._id
        }
      });
    }
  },
  async asyncData({ store }) {
    await store.dispatch("article/getArticle", { skip: 0, count: 5 });

    return {
      articleList: [...store.state.article.articelListRes.articelList],
      pages: Math.ceil(store.state.article.articelListRes.total / 5)
    };
  },
  async fetch({ store }) {},
  async created() {}
};
</script>
<style scoped>
.white--text,
.pa-3 {
  color: #333 !important;
}
.text-xs-center {
  text-align: left !important;
}
.body {
  text-align: left;
}
.container.grid-list-lg *:not(:only-child) .layout:last-child {
  margin-bottom: 8px !important;
}
.theme--dark.v-icon {
  color: red;
  cursor: pointer;
}
</style>
