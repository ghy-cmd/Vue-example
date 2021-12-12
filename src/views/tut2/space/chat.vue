<template>
  <div id="body-wrap">
    <TopNavBar></TopNavBar>
    <nav
      class="not_index_bg_thin"
      id="nav"
      style="background-image:url(https://tu.ltyuanfang.cn/api/fengjing.php)"
    >
      <div id="page_site-info">
        <div id="site-title">
          <span class="blogtitle"></span>
        </div>
      </div>
    </nav>
    <main id="content-outer">
      <div class="layout_page" id="content-inner">
        <div class="aside_content" id="aside_content">
          <div class="card-widget card-announcement">
            <div class="card-content">
              <div class="item-headline">
                <span class="aside_content_header_text">消息中心</span>
              </div>
            </div>
          </div>

          <div class="card-widget card-announcement">
            <div class="card-content">
              <div class="item-headline">
                <i class="fa fa-bullhorn" aria-hidden="true"></i>
                <span>好友列表</span>
                <div class="friendListBox">
                  <div
                    v-for="friend in friends"
                    :key="friend.userId"
                    class="friendInfo"
                    @click="chatWithFriend(friend.userId, friend.userName)"
                  >
                    <el-avatar
                      :src="friend.userImg"
                      class="friendInfo_left"
                      :size="60"
                    ></el-avatar>
                    <p class="friendInfo_right">
                      <strong>{{ friend.userName }}</strong> <br />
                      <span>{{ friend.latestMessage }}</span>
                    </p>
                  </div>
                  <infinite-loading
                    @infinite="infiniteHandler_friend"
                    v-if="moreFriends"
                  >
                    <div slot="no-more" class="noMore">我也是有底线的</div>
                  </infinite-loading>
                  <div v-if="!moreFriends" class="chat_notice">
                    已经到底部咯~
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <article id="chat_page">
          <el-menu
            class="el-menu-demo"
            mode="horizontal"
            background-color="rgb(144,129,241)"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-menu-item index="1" v-if="choseFriend">{{
              chatter.userName
            }}</el-menu-item>
            <el-menu-item index="2" v-if="!choseFriend"
              >未选择联系人</el-menu-item
            >
            <el-submenu index="3" v-if="choseFriend">
              <template slot="title">选项</template>
              <el-menu-item index="3-1" @click="blacklist()"
                >加入黑名单</el-menu-item
              >
              <el-menu-item index="3-2" @click="clearChatMessage()"
                >清空消息记录</el-menu-item
              >
            </el-submenu>
          </el-menu>

          <div id="chatBox">
            <infinite-loading
              @infinite="infiniteHandler_message"
              direction="top"
              v-if="moreMessage"
            >
            </infinite-loading>
            <ul
              v-for="chatMessage in message"
              :key="chatMessage.chatMessage"
              class="chatMessageContent"
            >
              <li class="singleChatMessage">
                <el-avatar
                  :src="chatMessage.userImg"
                  class="friendInfo_left"
                  :size="30"
                ></el-avatar>
                <div class="bubble">
                  {{ chatMessage.chatMessage }}
                </div>
              </li>
            </ul>
          </div>
          <div id="sendBox">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="textarea"
            >
            </el-input>
            <div id="sendButton">
              <el-button type="success" size="mini" @click="sendChatMessage()"
                >发送</el-button
              >
            </div>
          </div>
        </article>
      </div>
    </main>
  </div>
</template>

<script>
import TopNavBar from "@/components/layout/TopNavBar";
import {
  chat_loadChatMessage,
  chat_loadFriendList,
  chat_sendChatMessage,
  chat_blacklist,
  chat_clearChatMessage
} from "@/api/api";
import { errorCode } from "@/api/errorCode";

export default {
  name: "chat",
  data() {
    return {
      choseFriend: false,
      textarea: null,
      username: null,
      userId: null,
      friends: [],
      friendListPage: 0,
      moreFriends: true,
      message: [],
      lastMessageId: "",
      moreMessage: false,
      chatter: {
        userId: null,
        userName: null
      }
    };
  },
  created() {
    this.username = this.$cookies.get("username");
    this.userId = this.$cookies.get("userId");
    this.chatter.userId = this.$cookies.get("chatUserId");
    this.chatter.userName = this.$cookies.get("chatUserName");
    if (this.chatter.userId) {
      this.choseFriend = true;
    }
    this.scrollChatBox();
  },
  methods: {
    blacklist() {
      chat_blacklist(this.userId, this.chatter.userId).then(response => {
        if (errorCode(response.data.code)) {
          this.$message({
            message: "添加黑名单成功!",
            type: "success"
          });
          this.$router.go(0); // 刷新界面
        }
      });
    },
    clearChatMessage() {
      chat_clearChatMessage(this.userId, this.chatter.userId).then(response => {
        if (errorCode(response.data.code)) {
          this.$message({
            message: "聊天记录已清除!",
            type: "success"
          });
          this.$router.go(0); // 刷新界面
        }
      });
    },
    sendChatMessage() {
      if (!this.textarea) {
        this.$message({
          message: "无法发送空消息",
          type: "warning"
        });
      } else {
        chat_sendChatMessage(
          this.userId,
          this.chatter.userId,
          this.textarea
        ).then(response => {
          if (errorCode(response.data.code)) {
            this.$message({
              message: "发送成功!",
              type: "success"
            });
            this.message.push(response.data.message);
            this.textarea = "";
          } else {
            this.$message({
              message: "发送失败",
              type: "warning"
            });
          }
        });
      }
    },
    chatWithFriend(thatUserId, thatUserName) {
      this.lastMessageId = "";
      this.chatter.userId = thatUserId;
      this.chatter.userName = thatUserName;
      this.choseFriend = true;
      this.message = [];
      this.moreMessage = false;
      this.moreMessage = true;
    },
    infiniteHandler_friend($state) {
      chat_loadFriendList(this.userId, this.friendListPage).then(response => {
        if (errorCode(response.data.code)) {
          this.friends.push(...response.data.friends);
          this.friendListPage = this.friendListPage + 1;
          $state.loaded();
        } else {
          $state.complete();
        }
      });
    },
    infiniteHandler_message($state) {
      let div = document.getElementById("chatBox");
      let position = div.scrollHeight;
      chat_loadChatMessage(
        this.userId,
        this.chatter.userId,
        this.lastMessageId
      ).then(request => {
        if (errorCode(request.data.code)) {
          this.message.unshift(...request.data.message);
          this.lastMessageId = request.data.lastMessageId;
          div.scrollTop = div.scrollHeight - position;
          $state.loaded();
        } else {
          $state.complete();
        }
      });
    },
    scrollChatBox() {
      let div = document.getElementById("chatBox");
      div.scrollTop = div.scrollHeight;
    }
  },
  components: {
    TopNavBar
  }
};
</script>

<style scoped>
@import "../../../assets/css/space/space.css";
@import "../../../assets/css/space/chat.css";
</style>
