<!--
 * @Description: 文章详情
 * @Author: chenchen
 * @Date: 2019-04-23 14:49:48
 * @LastEditTime: 2019-04-29 15:56:11
 -->
<template>
  <v-layout column>
    <v-flex
      xs12
      sm12
    >
      <v-card light>
        <v-img
          src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
          aspect-ratio="2.75"
        ></v-img>
        <v-card-title primary-title>
          <div class="ql-snow html">
            <h3 class="headline mb-0">{{article.title}}</h3>
            <div
              class="ql-editor "
              v-html="article.html"
            ></div>
          </div>
        </v-card-title>

        <v-card-actions>
          <v-btn
            flat
            color="orange"
          >分享</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
    <v-flex
      xs12
      sm12
    >
      <v-card light>
        <v-card-title>
          <v-btn
            class="sub"
            @click="subscribe"
          >关注</v-btn>
        </v-card-title>
        <v-card-actions>
          <v-list-tile class="grow">
            "222"
          </v-list-tile>
        </v-card-actions>
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

    <!-- 评论区 -->
    <v-flex
      xs12
      sm12
    >
      <v-card light>
        <v-card-title>
          <v-list-tile-avatar color="grey darken-3">
            <v-img
              class="elevation-6"
              :src="article.avatarUrl"
            ></v-img>
          </v-list-tile-avatar>

          <v-textarea
            solo
            name="input-7-4"
            label="留下些足迹？"
            :value="commentForm.textValue"
            @change="textchange()"
            @input="textinput($event)"
          ></v-textarea>

        </v-card-title>
        <v-card-actions v-if="commentForm.textValue">
          <v-list-tile class="submit">
            <v-btn
              color="error"
              @click="dismiss"
            >取消</v-btn>
            <v-btn
              color="info"
              @click="submit"
            >提交</v-btn>
          </v-list-tile>
        </v-card-actions>

        <v-card-actions>
          <v-list-tile class="c-b">
            <em class="c-count">2,455</em> <span>条评论</span>
          </v-list-tile>
        </v-card-actions>
        <v-card-actions>
          <v-divider></v-divider>
        </v-card-actions>
        <v-layout row>
          <v-flex
            xs12
            sm12
          >
            <v-card-actions>
              <v-list two-line>
                <div
                  v-for="(item, index) in commentList"
                  :key="index"
                >
                  <v-list-tile>
                    <v-list-tile-avatar>
                      <img :src="item.user.avatar">
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-list-tile-title v-html="item.user.userName"></v-list-tile-title>
                      <v-list-tile-sub-title
                        class="comment-text"
                        v-html="item.comment"
                      ></v-list-tile-sub-title>
                    </v-list-tile-content>

                  </v-list-tile>
                  <v-list-tile>

                    <div class="operate-b">
                      <div class="operate">
                        <i class="material-icons">
                          thumb_up

                        </i>
                        <span class="plus">+1</span>
                        <span>赞</span>
                      </div>
                      <div class="operate">
                        <i class="material-icons">
                          mode_comment
                        </i>
                        <span @click="reply(index,item)">回复</span>
                      </div>
                    </div>
                  </v-list-tile>
                  <v-card-actions
                    v-if="index===selectedIndex"
                    class="comment-box"
                  >
                    <v-textarea
                      solo
                      solo-inverted
                      auto-grow
                      autofocus
                      :prefix="replyForm.userName"
                      type='text'
                      validate-on-blur
                      name="input-7-4"
                      rows='3'
                      label="留下些足迹？"
                      :value="replyForm.comment"
                      @change="commentchange()"
                      @input="commentinput($event)"
                    ></v-textarea>

                  </v-card-actions>
                  <v-card-actions v-if="index===selectedIndex">
                    <v-btn
                      color="error"
                      @click="reply(null)"
                    >取消</v-btn>
                    <v-btn
                      color="info"
                      @click="Subsubmit(item)"
                    >提交</v-btn>
                  </v-card-actions>
                  <v-card-actions>
                    <v-divider></v-divider>
                  </v-card-actions>
                </div>
              </v-list>
            </v-card-actions>

          </v-flex>
        </v-layout>

      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  data() {
    return {
      card_text:
        "Lorem ipsum dolor sit amet, brute iriure accusata ne mea. Eos suavitate referrentur ad, te duo agam libris qualisque, utroque quaestio accommodare no qui. Et percipit laboramus usu, no invidunt verterem nominati mel. Dolorem ancillae an mei, ut putant invenire splendide mel, ea nec propriae adipisci. Ignota salutandi accusamus in sed, et per malis fuisset, qui id ludus appareat.",
      commentForm: {
        textValue: "",
        articleId: ""
      },
      commentList: [],
      selectedIndex: null,
      replyForm: {
        parentcommentid:'',
        user:{
          userId: "",
          userName: "",
          avatar: "",
        },
        comment: ""
      }
    };
  },
  methods: {
    async subscribe() {
      await this.$store.dispatch("user/toggelLike", {});
    },
    textchange(event) {},
    commentchange(event) {},
    commentinput(event) {
      this.replyForm.comment = event.trim();
    },
    textinput(event) {
      this.commentForm.textValue = event.trim();
    },
    async submit() {
      await this.$store.dispatch("comment/comments", this.commentForm);

      this.commentForm.textValue = "";

      this.loadComments();
    },
    dismiss() {
      this.commentForm.textValue = "";
    },
    async loadComments() {
      await this.$store.dispatch("comment/commentlist", {
        articleId: this.commentForm.articleId
      });

      if (this.$store.state.comment.commentListRes.success) {
        this.commentList = this.$store.state.comment.commentListRes.commentList;
      }
    },
    reply(index, item) {
      this.selectedIndex = index;
      this.replyForm.userName = item ? `@${item.user.userName}` : "";
    },
    async Subsubmit(item) {
     
      this.replyForm.replytouserid = item.user.userId
      this.replyForm.parentcommentid = item._id
      await this.$store.dispatch("comment/reply", {
        ...this.replyForm
      });

      // if (this.$store.state.comment.commentListRes.success) {
      //   this.commentList = this.$store.state.comment.commentListRes.commentList;
      // }
    }
  },
  async asyncData({ store, query }) {
    await store.dispatch("article/getSingleArticle", { id: query.id });

    return {
      article: store.state.article.article
    };
  },
  async fetch({ store }) {},
  mounted() {
    this.commentForm.articleId = this.$route.query.id;
    this.loadComments();
  }
};
</script>
<style scoped>
.sub {
  border-radius: 100px;
  color: #fff;
  background: red !important;
}
.html {
  width: 100%;
}

.submit {
  padding-left: 50px;
}

/deep/ textarea {
  resize: none;
}

.c-b /deep/ .v-list__tile {
  display: flex;
  align-items: baseline;
}

.c-count {
  font: 22px/24px Georgia;
  color: #f85959;
}
/deep/ .v-list__tile__sub-title.comment-text {
  white-space: inherit;
}

/deep/ .v-list--two-line .v-list__tile {
  height: auto !important;
}
.operate-b {
  padding-top: 20px;
  font-size: 14px;
  color: #969696;
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;
}
.operate {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  position: relative;
}

.operate .plus {
  position: absolute;
  opacity: 0;
  transition: all 1s;
}
.operate span {
  margin-left: 5px;
  user-select: none;
}
.operate .material-icons:hover {
  color: #f85959;
}
.operate span:hover {
  color: #000;
}
.comment-box /deep/ .v-text-field__prefix {
  white-space: nowrap;
  color: #3194d0;
}
</style>
