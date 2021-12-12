<template>
  <div id="body-wrap">
    <TopNavBar></TopNavBar>
    <nav
      class="not_index_bg"
      id="nav"
      style="background-image:url(https://tu.ltyuanfang.cn/api/fengjing.php)"
    >
      <!-- 随机风景图片 -->
      <div id="page_site-info">
        <div id="site-title">
          <span class="blogtitle"></span>
        </div>
      </div>
    </nav>
    <main id="content-outer" class="account_main">
      <div class="aside_content" id="account_aside_content">
        <div class="card-widget card-announcement">
          <div class="card-content">
            <div class="item-headline">
              <span class="aside_content_header_text">个人中心</span>
            </div>
          </div>
        </div>

        <div class="card-widget card-announcement">
          <div class="card-content">
            <div
              class="account_item-headline item-headline"
              v-if="index !== 1"
              @click="index = 1"
            >
              <i class="fa fa-bullhorn" aria-hidden="true"></i>
              <span class="account_index_text">个人资料</span>
            </div>
            <div
              class="account_item-headline item-headline selected_index_box"
              v-if="index === 1"
            >
              <i class="fa fa-bullhorn" aria-hidden="true"></i>
              <span class="account_index_text_selected">个人资料</span>
            </div>
            <div
              class="account_item-headline item-headline"
              v-if="index !== 2"
              @click="index = 2"
            >
              <i class="fa fa-bullhorn" aria-hidden="true"></i>
              <span class="account_index_text">我的头像</span>
            </div>
            <div
              class="account_item-headline item-headline selected_index_box"
              v-if="index === 2"
            >
              <i class="fa fa-bullhorn" aria-hidden="true"></i>
              <span class="account_index_text_selected">我的头像</span>
            </div>
            <div
              class="account_item-headline item-headline"
              v-if="index !== 3"
              @click="index = 3"
            >
              <i class="fa fa-bullhorn" aria-hidden="true"></i>
              <span class="account_index_text">联系方式</span>
            </div>
            <div
              class="account_item-headline item-headline selected_index_box"
              v-if="index === 3"
            >
              <i class="fa fa-bullhorn" aria-hidden="true"></i>
              <span class="account_index_text_selected">联系方式</span>
            </div>
            <div
              class="account_item-headline item-headline"
              v-if="index !== 4"
              @click="index = 4"
            >
              <i class="fa fa-bullhorn" aria-hidden="true"></i>
              <span class="account_index_text">关注列表</span>
            </div>
            <div
              class="account_item-headline item-headline selected_index_box"
              v-if="index === 4"
            >
              <i class="fa fa-bullhorn" aria-hidden="true"></i>
              <span class="account_index_text_selected">关注列表</span>
            </div>
            <div
              class="account_item-headline item-headline"
              v-if="index !== 5"
              @click="index = 5"
            >
              <i class="fa fa-bullhorn" aria-hidden="true"></i>
              <span class="account_index_text">小黑屋</span>
            </div>
            <div
              class="account_item-headline item-headline selected_index_box"
              v-if="index === 5"
            >
              <i class="fa fa-bullhorn" aria-hidden="true"></i>
              <span class="account_index_text_selected">小黑屋</span>
            </div>
            <div
              class="account_item-headline item-headline"
              v-if="index !== 6"
              @click="index = 6"
            >
              <i class="fa fa-bullhorn" aria-hidden="true"></i>
              <span class="account_index_text">账号安全</span>
            </div>
            <div
              class="account_item-headline item-headline selected_index_box"
              v-if="index === 6"
            >
              <i class="fa fa-bullhorn" aria-hidden="true"></i>
              <span class="account_index_text_selected">账号安全</span>
            </div>
          </div>
        </div>
      </div>
      <article id="account_page">
        <div class="account_items_default" v-if="index === 0">
          <img
            id="account_items_default_img"
            src="../../../assets/img/null.jpg"
          />
        </div>
        <div class="account_items_container" v-if="index !== 0">
          <el-page-header
            @back="index = 0"
            :content="indexItems[index]"
            title="收起"
          >
          </el-page-header>
          <div class="account_cutLine"></div>
          <div class="account_personalInfo" v-if="index === 1">
            <el-form
              ref="personalInformationForm"
              :model="personalInformationForm"
              label-width="80px"
              label-position="left"
            >
              <el-form-item label="用户名">
                <el-input
                  v-model="personalInformationForm.userName"
                  :disabled="true"
                ></el-input>
              </el-form-item>
              <el-form-item label="个人简介">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 2 }"
                  placeholder="介绍一下自己吧"
                  v-model="personalInformationForm.userIntro"
                >
                </el-input>
              </el-form-item>
              <el-form-item label="性别">
                <el-radio-group v-model="personalInformationForm.sex">
                  <el-radio-button label="男"></el-radio-button>
                  <el-radio-button label="女"></el-radio-button>
                  <el-radio-button label="保密"></el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="出生日期">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="personalInformationForm.birthday"
                  value-format="yyyy-MM-dd"
                  format="yyyy-MM-dd"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="血型">
                <el-select
                  v-model="personalInformationForm.blood"
                  placeholder="请选择"
                >
                  <el-option label="A" value="A"></el-option>
                  <el-option label="B" value="B"></el-option>
                  <el-option label="AB" value="AB"></el-option>
                  <el-option label="O" value="O"></el-option>
                  <el-option label="其他" value="其他"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="所在地">
                <el-input v-model="personalInformationForm.place"></el-input>
              </el-form-item>
              <div class="account_personalInfo_submit">
                <el-button type="primary" @click="submitPersonalInfo()"
                  >保 存</el-button
                >
              </div>
            </el-form>
          </div>
          <div class="account_avatar" v-if="index === 2">
            <div class="account_avatar_container">
              <div class="account_avatar_new">
                <el-upload
                  class="avatar-uploader"
                  :action="addAvatarUrl"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  name="upfile"
                >
                  <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </div>
              <div class="account_avatar_old">
                <img :src="userImg" class="account_avatar_old_img" />
              </div>
            </div>
          </div>
          <div class="account_contact" v-if="index === 3">
            <el-form
              ref="contact"
              :model="contact"
              label-width="80px"
              label-position="left"
            >
              <el-form-item label="email">
                <el-input
                  v-model="contact.email"
                  placeholder="请输入完整的电子邮箱地址"
                ></el-input>
                <a :href="contactLinks.email + contact.email" target="_blank"
                  ><el-button type="primary" class="account_contact_try"
                    >try</el-button
                  ></a
                >
              </el-form-item>
              <el-form-item label="QQ">
                <el-input
                  v-model="contact.QQ"
                  placeholder="请输入QQ号"
                ></el-input>
                <a
                  :href="contactLinks.QQ_pre + contact.QQ + contactLinks.QQ_suf"
                  target="_blank"
                  ><el-button type="primary" class="account_contact_try"
                    >try</el-button
                  ></a
                >
              </el-form-item>
              <el-form-item label="bilibili">
                <el-input
                  v-model="contact.bilibili"
                  placeholder="请输入UID"
                ></el-input>
                <a
                  :href="contactLinks.bilibili + contact.bilibili"
                  target="_blank"
                  ><el-button type="primary" class="account_contact_try"
                    >try</el-button
                  ></a
                >
              </el-form-item>
              <el-form-item label="微博">
                <el-input
                  v-model="contact.weibo"
                  placeholder="请输入域名"
                ></el-input>
                <a :href="contactLinks.weibo + contact.weibo" target="_blank"
                  ><el-button type="primary" class="account_contact_try"
                    >try</el-button
                  ></a
                >
              </el-form-item>
              <el-form-item label="github">
                <el-input
                  v-model="contact.github"
                  placeholder="请输入用户名"
                ></el-input>
                <a :href="contactLinks.github + contact.github" target="_blank"
                  ><el-button type="primary" class="account_contact_try"
                    >try</el-button
                  ></a
                >
              </el-form-item>
            </el-form>
            <div class="account_personalInfo_submit">
              <el-button type="primary" @click="submitContact()"
                >保 存</el-button
              >
            </div>
          </div>
          <div class="account_friendList" v-if="index === 4">
            <v-card
              class="animated zoomIn friend-card"
              v-for="friend in friendList"
              :key="friend.userId"
            >
              <div
                class="account_friend-card_container"
                @click="visitFriend(friend.userId, friend.userName)"
              >
                <div class="account_friend-card_avatar">
                  <el-avatar :src="friend.userImg" :size="60"></el-avatar>
                </div>
                <div class="account_friend-card_userInfo">
                  <span class="account_friend-card_userInfo_userName">{{
                    friend.userName
                  }}</span>
                  <br />
                  <span class="account_friend-card_userInfo_userIntro">{{
                    friend.userIntro
                  }}</span>
                </div>
                <div class="account_friend-card_menu">
                  <el-button
                    type="primary"
                    size="mini"
                    @click.stop="chatWith(friend.userId, friend.userName)"
                    >发消息</el-button
                  >
                  <el-button
                    type="danger"
                    size="mini"
                    @click.stop="delFriend(friend.userId)"
                    >取消关注</el-button
                  >
                </div>
              </div>
            </v-card>
          </div>
          <div class="account_blackList" v-if="index === 5">
            <v-card
              class="animated zoomIn black-card"
              v-for="user in blackList"
              :key="user.userId"
            >
              <div class="account_blackList_container">
                <div class="account_blackList_avatar">
                  <el-avatar :src="user.userImg" :size="60"></el-avatar>
                </div>
              </div>
              <div class="account_blackList_userName">
                <span class="account_blackList_content_userName">{{
                  user.userName
                }}</span>
              </div>
              <div class="account_blackList_remove">
                <el-button
                  type="success"
                  size="mini"
                  @click.stop="removeFromBlacklist(user.userId)"
                  >移出小黑屋</el-button
                >
              </div>
            </v-card>
          </div>
          <div class="account_question" v-if="index === 6">
            <el-form
              ref="contact"
              :model="question"
              label-width="80px"
              label-position="left"
            >
              <el-form-item label="密保问题">
                <el-input
                  v-model="question.question"
                  placeholder="请输入密保问题"
                ></el-input>
              </el-form-item>
              <div class="account_question_space"></div>
              <el-form-item label="答案">
                <el-input
                  v-model="question.answer"
                  placeholder="请输入密保问题的答案"
                ></el-input>
              </el-form-item>
              <div class="account_question_space"></div>
            </el-form>
            <div class="account_question_submit">
              <el-button type="primary" @click="submitQuestion()"
                >保 存</el-button
              >
            </div>
          </div>
        </div>
      </article>
    </main>
    <footer id="footer">
      <div id="footer-wrap">
        <div class="copyright">&copy;2021 BY Hecate</div>
      </div>
    </footer>
    <el-backtop :bottom="10" :visibility-height="0">
      <div
        style="{
        height: 100%;
        width: 100%;
        background-color: #f2f5f6;
        box-shadow: 0 0 6px rgba(0,0,0, .12);
        text-align: center;
        line-height: 40px;
        color: #1989fa;
        border-radius: 20px;
        font-size: medium;
      }"
      >
        TOP
      </div>
    </el-backtop>
  </div>
</template>

<script>
import TopNavBar from "@/components/layout/TopNavBar";
import {
  account_delFriend,
  account_getUserImg,
  account_loadBlackList,
  account_loadContact,
  account_loadFriends,
  account_loadUserInfo,
  account_removeFromBlackList,
  account_submitUserContact,
  account_submitUserInfo,
  login_setQuestion
} from "@/api/api";
import { errorCode } from "@/api/errorCode";

export default {
  name: "account",
  data() {
    return {
      userId: null,
      username: null,
      userImg: null,
      avatars: [],
      avatarFile: null,
      index: 0,
      addAvatarUrl: "http://192.168.43.123:8089/ssm_war_exploded/newAvatar",
      indexItems: [
        "",
        "个人资料",
        "我的头像",
        "联系方式",
        "关注列表",
        "小黑屋",
        "账号安全"
      ],
      personalInformationForm: {
        userName: null,
        userIntro: null,
        sex: null,
        birthday: null,
        blood: null,
        place: null
      },
      contact: {
        email: null,
        QQ: null,
        bilibili: null,
        weibo: null,
        github: null
      },
      contactLinks: {
        email: "mailto:",
        QQ_pre: "tencent://AddContact/?fromId=45&fromSubId=1&subcmd=all&uin=",
        QQ_suf: "&website=www.oicqzone.com",
        bilibili: "https://space.bilibili.com/",
        weibo: "https://weibo.com/",
        github: "https://github.com/"
      },
      friendList: [],
      blackList: [],
      imageUrl: null,
      question: {
        question: "",
        answer: ""
      }
    };
  },
  created() {
    this.username = this.$cookies.get("username");
    this.userId = this.$cookies.get("userId");
    this.addAvatarUrl =
      "http://192.168.43.123:8089/ssm_war_exploded/newAvatar/" + this.userId;
    account_getUserImg(this.userId).then(response => {
      if (errorCode(response.data.code)) {
        this.userImg = response.data.userImg;
      }
    });
    account_loadUserInfo(this.userId).then(response => {
      if (errorCode(response.data.code)) {
        this.personalInformationForm = response.data.personalInformationForm;
      }
    });
    account_loadContact(this.userId).then(response => {
      if (errorCode(response.data.code)) {
        this.contact = response.data.contact;
      }
    });
    account_loadFriends(this.userId).then(response => {
      if (errorCode(response.data.code)) {
        this.friendList = response.data.friendList;
      }
    });
    account_loadBlackList(this.userId).then(response => {
      if (errorCode(response.data.code)) {
        this.blackList = response.data.blackList;
      }
    });
  },
  methods: {
    submitPersonalInfo() {
      account_submitUserInfo(this.userId, this.personalInformationForm).then(
        response => {
          if (errorCode(response.data.code)) {
            this.$message.success("修改成功！");
          } else {
            this.$message.error("修改失败！");
          }
        }
      );
    },
    submitContact() {
      account_submitUserContact(this.userId, this.contact).then(response => {
        if (errorCode(response.data.code)) {
          this.$message.success("修改成功！");
        } else {
          this.$message.error("修改失败！");
        }
      });
    },
    visitFriend(userId, userName) {
      this.$cookies.set("visitUserName", userName, "7d", "/");
      this.$cookies.set("visitUserId", userId, "7d", "/");
      this.$router.push("/visit");
    },
    chatWith(userId, userName) {
      this.$cookies.set("chatUserId", userId, "7d", "/");
      this.$cookies.set("userName", userName, "7d", "/");
      this.$router.push("/chat");
    },
    delFriend(userId) {
      account_delFriend(this.userId, userId).then(response => {
        if (errorCode(response.data.code)) {
          account_loadFriends(this.userId).then(response => {
            if (errorCode(response.data.code)) {
              this.friendList = response.data.friendList;
            }
          });
        } else {
          this.$message.error("取消关注失败！");
        }
      });
    },
    removeFromBlacklist(userId) {
      console.log(userId);
      account_removeFromBlackList(this.userId, userId).then(response => {
        if (errorCode(response.data.code)) {
          account_loadBlackList(this.userId).then(response => {
            if (errorCode(response.data.code)) {
              this.blackList = response.data.blackList;
            }
          });
          account_loadFriends(this.userId).then(response => {
            if (errorCode(response.data.code)) {
              this.friendList = response.data.friendList;
            }
          });
        } else {
          this.$message.error("移出小黑屋失败！");
        }
      });
    },
    // eslint-disable-next-line no-unused-vars
    handleAvatarSuccess(res, file) {
      account_getUserImg(this.userId).then(response => {
        if (errorCode(response.data.code)) {
          this.userImg = response.data.userImg;
        }
      });
    },
    submitQuestion() {
      login_setQuestion(
        this.userId,
        this.question.question,
        this.question.answer
      ).then(response => {
        if (errorCode(response.data.code)) {
          this.question.question = "";
          this.question.answer = "";
          this.$message.success("设置成功！");
        } else {
          this.$message.error("设置失败！");
        }
      });
    }
  },
  components: {
    TopNavBar
  }
};
</script>

<style scoped>
@import "../../../assets/css/space/account.css";
</style>
