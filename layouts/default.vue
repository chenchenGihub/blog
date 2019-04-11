<!--
 * @Description: 布局
 * @Author: chenchen
 * @Date: 2019-03-10 01:08:09
 * @LastEditTime: 2019-04-11 15:58:31
 -->
<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" fixed app>
      <v-list v-for="(item,i) in items" :key="i">
        <v-expansion-panel v-if="item.children.length>0" focusable>
          <v-expansion-panel-content
            exact
            :value="item.children.length"
            :hide-actions="item.children.length===0||miniVariant"
          >
            <template v-slot:header>
              <div class="father-router">
                <div class="v-list__tile__action">
                  <v-icon>{{ item.icon }}</v-icon>
                </div>
                <span v-if="!miniVariant" class="title-text">{{item.title}}</span>
              </div>
            </template>
            <v-list v-if="item.children.length">
              <v-list-tile v-for="(it, i) in item.children" :key="i" :to="it.to" router exact>
                <v-list-tile-action>
                  <v-icon>{{ it.icon }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title v-text="it.title"/>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-list-tile v-else :to="item.to" router exact>
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"/>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar :clipped-left="clipped" fixed app>
      <v-toolbar-side-icon @click="drawer = !drawer"/>
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>{{ `chevron_${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>web</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed"></v-btn>
      <v-toolbar-title v-text="title"/>
      <em>-------人海茫茫,后会无期</em>
      <v-spacer/>
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>menu</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container class="m-ctn">
        <aside class="aside">
          <v-container fluid grid-list-lg>
            <v-layout row wrap>
              <v-flex xs12>
                <v-card>
                  <v-card-title>
                    <div>
                      <h5 class="headline mb-0">账号登录</h5>
                    </div>
                  </v-card-title>
                  <template>
                    <v-form v-model="valid">
                      <v-container fluid>
                        <v-layout wrap>
                          <v-flex xs12>
                            <v-combobox
                              v-model="loginForm.userName"
                              chips
                              :items="users"
                              :rules="lnameRules"
                              label="请输入用户名"
                              clearable
                            ></v-combobox>
                          </v-flex>
                          <v-flex xs12>
                            <v-combobox
                              v-model="loginForm.password"
                              chips
                              label="请输入密码"
                              clearable
                              :rules="passwordRules"
                            ></v-combobox>
                          </v-flex>
                          <v-flex xs12>
                            <!-- 注册 -->

                            <v-dialog v-model="dialog" width="500">
                              <template v-slot:activator="{ on }">
                                <a v-on="on" to="/register">注册</a>
                              </template>

                              <v-card>
                                <v-card-text class="headline grey lighten-2" primary-title>注册账号</v-card-text>

                                <v-card-text>
                                  <v-form v-model="valid">
                                    <v-container>
                                      <v-layout column>
                                        <v-flex xs12 md4>
                                          <v-text-field
                                            v-model="registerForm.userName"
                                            :rules="nameRules"
                                            :counter="10"
                                            label="账号"
                                            required
                                            @input="usernameChange"
                                          ></v-text-field>
                                        </v-flex>

                                        <v-flex xs12 md4>
                                          <v-text-field
                                            v-model="registerForm.email"
                                            :rules="emailRules"
                                            label="邮箱"
                                            required
                                          ></v-text-field>
                                        </v-flex>

                                        <v-flex xs12 md4>
                                          <v-text-field
                                            v-model="registerForm.password"
                                            :rules="passwordRules"
                                            :counter="18"
                                            label="密码"
                                            required
                                          ></v-text-field>
                                        </v-flex>
                                      </v-layout>
                                    </v-container>
                                  </v-form>
                                </v-card-text>

                                <v-divider></v-divider>

                                <v-card-actions>
                                  <v-spacer></v-spacer>
                                  <v-layout align-center center>
                                    <v-btn color="error" @click="dialog = false">取消</v-btn>
                                    <v-btn
                                      color="primary"
                                      @click="register"
                                      :disabled="!isRaValid || !isReValid || !isRpValid"
                                    >确定</v-btn>
                                  </v-layout>
                                </v-card-actions>
                              </v-card>
                            </v-dialog>
                            <!--  注册 -->
                          </v-flex>
                          <v-flex text-xs-center xs12>
                            <v-btn
                              color="info"
                              :disabled="!loginForm.password||!loginForm.userName"
                            >登录</v-btn>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-form>
                  </template>
                </v-card>
              </v-flex>
              <!--标题-->
              <v-flex align-center xs12>
                <v-card light>
                  <v-card-text>最近评论</v-card-text>
                </v-card>
              </v-flex>

              <!-- 评论内容 -->

              <v-flex xs12>
                <v-card color="cyan darken-2" class="white--text">
                  <v-list two-line>
                    <template v-for="(item, index) in contents">
                      <v-subheader v-if="item.header" :key="item.header">{{ item.header }}</v-subheader>
                      <v-divider v-else-if="item.divider" :key="index" :inset="item.inset"></v-divider>
                      <v-list-tile v-else :key="item.title" avatar @click="showDetail">
                        <v-list-tile-avatar>
                          <img :src="item.avatar">
                        </v-list-tile-avatar>

                        <v-list-tile-content>
                          <v-list-tile-title v-html="item.title"></v-list-tile-title>
                          <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </template>
                  </v-list>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </aside>

        <!-- 内容 -->
        <main class="content">
          <v-container grid-list-lg fluid text-xs-center>
            <v-layout row wrap>
              <v-flex xs12>
                <nuxt/>
              </v-flex>
            </v-layout>
          </v-container>
        </main>
        <!-- 内容  -->
      </v-container>
    </v-content>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-tile @click.native="right = !right">
          <v-list-tile-action>
            <v-icon light>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>消息列表</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import { async } from "q";
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      dialog: false,
      items: [
        {
          icon: "apps",
          title: "主页",
          to: "/",
          children: []
        },
        {
          icon: "bubble_chart",
          title: "javascript",
          to: "/",
          children: [
            {
              icon: "bubble_chart",
              title: "js",
              to: "/js/js"
            },
            {
              icon: "bubble_chart",
              title: "vue",
              to: "/js/vue"
            },
            {
              icon: "bubble_chart",
              title: "angular",
              to: "/js/angular"
            },
            {
              icon: "bubble_chart",
              title: "react",
              to: "/js/react"
            }
          ]
        }
      ],
      isRaValid: false,
      isRpValid: false,
      isReValid: false,
      registerForm: {
        userName: "",
        email: "",
        password: "",
        device: "",
        ip: ""
      },
      loginForm: {
        userName: "",
        password: ""
      },
      users: ["Programming", "Design", "Vue", "Vuetify"],
      valid: false,

      lnameRules: [
        v => {
          this.isRaValid = false;
          return !!v || "账号必填";
        },
        v => {
          if ((v && v.length <= 6) || (v && v.length > 10)) {
            this.isRaValid = false;
            return v.length > 10 ? "账号不能超过10位" : "账号必须超过6位";
          } else {
            return (this.isRaValid = true);
          }
        }
      ],
      passwordRules: [
        v => !!v || "密码必填",
        v => {
          let reg = /^(?![a-z]+$)(?![0-9]+$)[a-zA-Z0-9]{7,18}$/;
          if ((v && v.length <= 6) || (v && v.length > 18)) {
            this.isRpValid = false;
            return v.length > 18 ? "密码不能超过18位" : "密码必须超过6位";
          } else if (!reg.test(v)) {
            this.isRpValid = false;
            return "密码必须数字加字母";
          } else {
            return (this.isRpValid = true);
          }
        }
      ],
      emailRules: [
        v => {
          let reg = new RegExp(
            "^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"
          );
          if (!reg.test(v)) {
            this.isReValid = false;
            return "邮箱格式不正确";
          } else {
            return (this.isReValid = true);
          }
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "匆匆的博客",
      contents: [
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          title: "Brunch this weekend?",
          subtitle:
            "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
        },
        { divider: true, inset: true },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
          title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
          subtitle:
            "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend."
        },
        { divider: true, inset: true },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
          title: "Oui oui",
          subtitle:
            "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?"
        }
      ]
    };
  },
  computed: {
    getIcon() {
      this.items;
      return;
    },
    async login() {},
    nameRules() {
      return [
        v => {
          this.isRaValid = false;
          return !!v || "账号必填";
        },
        v => {
          if ((v && v.length <= 6) || (v && v.length > 10)) {
            this.isRaValid = false;
            return v.length > 10 ? "账号不能超过10位" : "账号必须超过6位";
          } else {
            return (this.isRaValid = true);
          }
        },
        // v => {
        //   console.log(this.$store.state.user.checknameState.success);
        //   if (this.$store.state.user.checknameState.success) {
        //      return (this.isRaValid = true);
        //   } else {
        //     return "用户名已存在";
        //   }
        // }
      ];
    }
  },
  methods: {
    showDetail() {},
    async register() {
      this.dialog = false;
      const data = await this.$store.dispatch(
        "user/register",
        this.registerForm
      );
    },
    async usernameChange(event) {
      console.log(event);

      if (event.trim().length >= 6 && event.trim().length < 10) {
        await this.$store.dispatch("user/checkname", {
          userName: event.trim()
        });
      }

      console.log("www",this.$store.state.user.checknameState.success);
      if (this.$store.state.user.checknameState.success===false) {
      let ele   = document.createElement('div');
        ele.classList = 'v-messages__message message-transition-enter-to err';
        ele.innerText = "用户已存在";
        ele.style = 'color:red'
        if ( document.querySelector(".v-label")) {
           document.querySelector(".v-label").style.cssText +="color:red!important;"
        }
         
        document.querySelector('.v-messages__wrapper').appendChild(ele);

        
     
      }else if (this.$store.state.user.checknameState.success===true) {
        
      if (document.querySelector('.err')) {
        document.querySelector('.v-messages__wrapper').removeChild(document.querySelector('.err'))
      
         document.querySelector(".v-label").style.color="rgba(255,255,255,0.7)"
          if (document.querySelector('.err')) {
           document.querySelector('.err').style.color="rgba(255,255,255,0.7)"
        }
      }
         
         document.querySelector(".v-text-field").classList.remove('error--text')
      }
      
    }
  },
  created() {
    let ua = window.navigator.userAgent.toLocaleLowerCase();

    let uaArr = ua.split(" ");

    let platform = "";

    if (window.navigator.platform === "Win32") {
      let pv = navigator.userAgent
        .slice(
          navigator.userAgent.indexOf("("),
          navigator.userAgent.indexOf(")")
        )
        .split(" ")
        .reverse()[1]
        .split(";")[0];

      platform = "windows" + pv;
    } else if (window.navigator.platform === "MacIntel") {
      let pv = navigator.userAgent
        .slice(
          navigator.userAgent.indexOf("("),
          navigator.userAgent.indexOf(")")
        )
        .split(" ")
        .reverse()[0];

      platform = "macos" + pv;
    } else if (ua.includes("iphone")) {
      platform = "iPhone";
    } else if (ua.includes("android")) {
      platform = "android";
    }

    let browser = "";

    if (uaArr.findIndex(e => e.includes("chrome")) > 0) {
      browser = uaArr[uaArr.findIndex(e => e.includes("chrome"))];
    } else if (uaArr.findIndex(e => e.includes("firefox")) > 0) {
      browser = uaArr[uaArr.findIndex(e => e.includes("firefox"))];
    } else if (uaArr.findIndex(e => e.includes("edge")) > 0) {
      browser = uaArr[uaArr.findIndex(e => e.includes("edge"))];
    } else if (uaArr.findIndex(e => e.includes("opr")) > 0) {
      browser = uaArr[uaArr.findIndex(e => e.includes("opr"))];
    } else if (uaArr.findIndex(e => e.includes("net4")) > 0) {
      browser = "ie" + uaArr.findIndex(e => e.includes("rv")).split(":")[1];
    } else if (
      !ua.includes("chrome") &&
      !ua.includes("opr") &&
      ua.includes("safari")
    ) {
      browser = uaArr[uaArr.findIndex(e => e.includes("safari"))];
    }

    this.registerForm.device = platform + " " + browser;
  }
};
</script>
<style scoped>
.title-text {
  margin-left: 1%;
}
.father-router {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
/deep/ .v-expansion-panel__header {
  padding-left: 16px !important;
}
/deep/ .container {
  max-width: none;
}
/deep/ .application--wrap {
  background: url("/bg.jpg");
}

/deep/ .v-card__title {
  padding-bottom: 0;
}

.m-ctn {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  height: 100%;
  width: 80%;
}

.aside {
  width: 30%;
  min-width: 110px;
  max-width: 400px;
  height: 100%;
  background: #eee;
}

.content {
  flex: 1;
  height: 100%;
  background: #eee;
  margin-left: 10px;
}
</style>

