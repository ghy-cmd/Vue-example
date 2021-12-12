<template>
  <div>
    <div>
      <TopNavBar id="navgation"></TopNavBar>
    </div>
    <div class="article-detail">
      <div class="article-container">
        <div class="article-container_content">
          <div class="title-container">
            <h1 class="title">
              {{ title }}
            </h1>
            <div class="article-read-panel">
              <div class="article-read-info">
                <span class="publish-text">{{ time }}</span>
                <el-tag
                  class="post_tag"
                  id="aaa"
                  v-for="tag of interestTags"
                  :key="tag.tagId"
                  effect="dark"
                  size="mini"
                  @click.stop="aboutTag(tag.tagId)"
                >
                  {{ tag.tagName }}
                </el-tag>
              </div>
            </div>
          </div>
          <div class="article-up-info">
            <div class="up-left">
              <div class="avatar-container">
                <a>
                  <div class="bili-avatar">
                    <img
                      class="bili-avatar-img bili-avatar-img-radius bili-avatar-face"
                      :src="imageUp"
                      alt=""
                    />
                    <span
                      class="bili-avatar-icon bili-avatar-icon--business"
                    ></span>
                  </div>
                </a>
              </div>
              <div>
                <div class="up-name-pannel">
                  <a class="up-name">{{ upName }}</a>
                </div>
              </div>
            </div>

            <div
              class="up-btn"
              style="width: 128px ;height: 32px"
              v-if="guanzhu === false"
              @click="addGuanzhu()"
            >
              <span class="follow-btn unfollow">
                <i class="iconfont icon-add"> </i>
                关注
              </span>
            </div>

            <div
              class="up-btn"
              style="width: 128px ;height: 32px"
              v-if="guanzhu === true"
            >
              <div>
                <span class="follow-btn followed" tabindex="0">已关注</span>
              </div>
            </div>
          </div>
          <div class="title-line"></div>
          <div class="article-content" id="article-content">
            <div
              id="read-article-holder"
              class="normal-article-holder read-article-holder"
            >
              <div v-html="content"></div>
            </div>
          </div>
          <hr class="post_hr" />
          <div id="comment-wrapper" class="comment-wrapper">
            <div class="comment-m">
              <div class="common">
                <div class="b-head">
                  <span class="b-head-t results">{{ comments.length }}</span>
                  <span class="b-head-t">评论</span>
                </div>
                <v-card class="animated zoomIn post-card">
                  <div class="post_details_newComment">
                    <div class="post_details_newComment_avatar">
                      <el-avatar
                        :src="userInformation.personalInformation.userImage"
                        size="48"
                        class="post_details_newComment_avatar_img"
                      ></el-avatar>
                    </div>
                    <div class="post_details_newComment_commentBox">
                      <el-input
                        type="textarea"
                        :autosize="{ minRows: 2 }"
                        placeholder="发一条友善的评论~"
                        class="post_details_newComment_commentBox_textarea"
                        v-model="newComment"
                      >
                      </el-input>
                      <el-button
                        type="primary"
                        class="post_details_newComment_commentBox_sendButton"
                        size="small"
                        @click="sendComment()"
                        >发送
                      </el-button>
                    </div>
                  </div>
                </v-card>
                <v-card
                  class="animated zoomIn post-card"
                  v-for="comment in comments"
                  :key="comment.commentId"
                >
                  <div class="post_comment_container">
                    <div
                      class="post_details_comment_avatar"
                      @click.stop="visitUser(comment.commentUserId)"
                    >
                      <el-avatar
                        :src="comment.commentUserImg"
                        size="48"
                        class="post_details_comment_avatar_img"
                      ></el-avatar>
                    </div>
                    <div class="post_details_comment_commentBox">
                      <div class="post_details_comment_commentBox_header">
                        <div
                          class="post_userInfo"
                          @click.stop="visitUser(comment.commentUserId)"
                        >
                          <span class="post_userInfo_username_text">{{
                            comment.commentUserName
                          }}</span>
                        </div>
                        <div class="post_time">
                          <span class="post_time_text">{{
                            comment.commentTime
                          }}</span>
                        </div>
                      </div>
                      <div class="post_details_comment_commentBox_content">
                        <pre>{{ comment.message }}</pre>
                      </div>
                      <div class="post_details_comment_commentBox_statistics">
                        <i
                          class="el-icon-edit-outline"
                          @click="commentIt(comment)"
                        ></i>
                        {{ comment.commentsNum }}
                        <span class="separator">|</span>
                        <i
                          class="el-icon-star-off"
                          @click="starComment(comment)"
                          v-if="!comment.star"
                        ></i>
                        <i class="el-icon-star-on" v-if="comment.star"></i>
                        {{ comment.likesNum }}
                      </div>
                      <div class="post_cutLine"></div>
                      <div class="post_details_comment_commentBox_comments">
                        <div
                          v-for="subComment in comment.comments"
                          :key="subComment.commentId"
                          class="post_details_comment_commentBox_comments_container"
                        >
                          <div class="post_comment_container">
                            <div
                              class="post_details_comment_avatar"
                              @click.stop="visitUser(subComment.commentUserId)"
                            >
                              <el-avatar
                                :src="subComment.commentUserImg"
                                size="48"
                                class="post_details_comment_avatar_img"
                              ></el-avatar>
                            </div>
                            <div class="post_details_comment_commentBox">
                              <div
                                class="post_details_comment_commentBox_header"
                              >
                                <div
                                  class="post_userInfo"
                                  @click.stop="
                                    visitUser(subComment.commentUserId)
                                  "
                                >
                                  <span class="post_userInfo_username_text">{{
                                    subComment.commentUserName
                                  }}</span>
                                </div>
                                <div class="post_time">
                                  <span class="post_time_text">{{
                                    subComment.commentTime
                                  }}</span>
                                </div>
                              </div>
                              <div
                                class="post_details_comment_commentBox_reply"
                                v-if="subComment.reply"
                              >
                                回复<span
                                  class="post_details_comment_commentBox_reply_username"
                                  @click="visitUser(subComment.replyUserId)"
                                  >@{{ subComment.reply }}</span
                                >
                              </div>
                              <div
                                class="post_details_comment_commentBox_content"
                              >
                                <pre>{{ subComment.message }}</pre>
                              </div>
                              <div
                                class="post_details_comment_commentBox_statistics"
                              >
                                <i
                                  class="el-icon-star-off"
                                  @click="starComment(subComment)"
                                  v-if="!subComment.star"
                                ></i>
                                <i
                                  class="el-icon-star-on"
                                  v-if="subComment.star"
                                ></i>
                                {{ subComment.likesNum }}
                                <span class="separator">|</span>
                                <i
                                  class="el-icon-edit-outline"
                                  @click="
                                    commentItSub(comment.commentId, subComment)
                                  "
                                ></i>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <el-dialog title="评论" :visible.sync="commentPop">
                        <div class="post_details_newComment">
                          <div class="post_details_newComment_avatar">
                            <el-avatar
                              :src="
                                userInformation.personalInformation.userImage
                              "
                              size="48"
                              class="post_details_newComment_avatar_img"
                            ></el-avatar>
                          </div>
                          <div class="post_details_newComment_commentBox">
                            <el-input
                              type="textarea"
                              :autosize="{ minRows: 2 }"
                              placeholder="发一条友善的评论~"
                              class="post_details_newComment_commentBox_textarea"
                              v-model="newComment"
                            >
                            </el-input>
                            <el-button
                              type="primary"
                              class="post_details_newComment_commentBox_sendButton"
                              size="small"
                              @click="sendCommentToComment(comment)"
                              >发送
                            </el-button>
                          </div>
                        </div>
                      </el-dialog>
                    </div>
                  </div>
                </v-card>
                <infinite-loading @infinite="infiniteHandler2">
                  <div slot="no-more" class="post_noMore">我也是有底线的</div>
                </infinite-loading>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TopNavBar from "@/components/layout/TopNavBar";
import {
  article_commentArticle,
  article_loadComments,
  circle_commentComment,
  circle_starComment,
  space_loadUserInfo,
  visit_followed,
  visit_watch
} from "@/api/api";
import { errorCode } from "@/api/errorCode";

export default {
  name: "article",
  components: {
    TopNavBar
  },
  data() {
    return {
      interestTags: [],
      spotTags: [],
      guanzhu: false,
      userId: null,
      articleId: null,
      commentPop: false,
      newCommentInfo: {
        reply: null,
        replyUserId: null
      },
      comments: [],
      newComment: "",
      userInformation: {
        personalInformation: {
          userId: null,
          username: null,
          userImage: null,
          userIntroduction: null,
          otherInformation: [],
          contact: []
        }
      },
      title: null,
      time: null,
      fans: null,
      viewNum: null,
      upName: null,
      imageUp: null,
      content: null,
      lastCommentId: "",
      upId: null
    };
  },
  created() {
    this.username = this.$cookies.get("username");
    this.userId = this.$cookies.get("userId");
    this.articleId = this.$cookies.get("articleId");
    console.log(this.articleId);
    this.axios
      .post("http://192.168.43.123:8089/ssm_war_exploded/showArticle", {
        articleId: this.articleId
      })
      .then(response => {
        if (errorCode(response.data.code)) {
          this.content = response.data.articleContent;
          this.title = response.data.articleTitle;
          this.time = response.data.articleTime;
          this.upName = response.data.userName;
          // this.fans = response.data.fans;
          this.viewNum = response.data.viewNum;
          this.imageUp = response.data.userImg;
          this.interestTags = response.data.interestTags;
          this.spotTags = response.data.spotTags;
          this.upId = response.data.userId;
          visit_followed(this.userId, this.upId).then(response => {
            if (errorCode(response.data.code)) {
              this.guanzhu = response.data.followed;
            }
          });
        }
      });
    space_loadUserInfo(this.userId).then(response => {
      if (errorCode(response.data.code)) {
        this.userInformation = response.data.userInformation;
      }
    });
  },
  methods: {
    addGuanzhu() {
      if (this.upId === this.userId) {
        this.$message.error("您时刻都在关注自己~");
      } else {
        visit_watch(this.userId, this.upId).then(response => {
          if (errorCode(response.data.code)) {
            this.guanzhu = true;
            this.$message.success("关注成功！");
          } else {
            this.$message.error("关注失败！");
          }
        });
      }
    },
    visitUser(userId) {
      console.log(userId);
    },
    starComment(comment) {
      circle_starComment(
        this.userInformation.personalInformation.userId,
        comment.commentId
      ).then(response => {
        if (errorCode(response.data.code)) {
          comment.star = true;
          comment.likesNum++;
        }
      });
    },
    commentIt(comment) {
      this.commentObjId = comment.commentId;
      this.newCommentInfo.reply = null;
      this.newCommentInfo.replyUserId = null;
      this.commentPop = true;
    },
    commentItSub(commentId, subComment) {
      this.commentObjId = commentId;
      this.newCommentInfo.reply = subComment.userName;
      this.newCommentInfo.replyUserId = subComment.userId;
      this.commentPop = true;
    },
    sendCommentToComment(comment) {
      circle_commentComment(
        this.userInformation.personalInformation.userId,
        comment.commentId,
        {
          message: this.newComment,
          reply: this.newCommentInfo.reply,
          replyUserId: this.newCommentInfo.replyUserId
        }
      ).then(response => {
        if (errorCode(response.data.code)) {
          this.newComment = null;
          comment.commentsNum++;
          comment.comments.push(response.data.newComment);
          this.commentPop = false;
        }
      });
    },
    infiniteHandler2($state) {
      article_loadComments(this.articleId, this.lastCommentId).then(
        response => {
          if (errorCode(response.data.code)) {
            this.comments.push(...response.data.comments);
            this.lastCommentId = response.data.lastCommentId;
            $state.loaded();
          } else {
            $state.complete();
          }
        }
      );
    },
    sendComment() {
      article_commentArticle(
        this.userInformation.personalInformation.userId,
        this.articleId,
        {
          message: this.newComment,
          reply: null,
          replyUserId: null
        }
      ).then(response => {
        if (errorCode(response.data.code)) {
          this.newComment = null;
          this.comments.push(response.data.newComment);
        }
      });
    },
    aboutTag(tagId) {
      this.$cookies.set("tagId", tagId, "7d", "/");
      // router
    }
  }
};
</script>

<style scoped>
#aaa {
  color: white;
}

.post_tag {
  margin: 10px 5px;
}

.followed {
  color: #999;
  border: 1px solid #e7e7e7;
  background: #e7e7e7;
}

.icon-add:before {
  content: "+";
}

.icon-add {
  color: #fff;
  margin-right: 6px;
}

.iconfont {
  font-family: iconfont !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.follow-btn {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  font-size: 12px;
  transition: 0.3s;
}

.unfollow {
  background: #00a1d6;
  color: #fff;
}

.article-up-info .fans-num {
  margin-right: 12px;
}

.avatar-info-pannel {
  font-size: 13px;
  color: #999;
  line-height: 20px;
}

.up-name {
  font-size: 14px;
  max-width: 155px;
  color: #212121;
  line-height: 23px;
  height: 23px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  display: inline-block;
  vertical-align: middle;
}

.up-name-pannel {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
}

.bili-avatar-icon--business {
  background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTk0Mjk2OTA0NjU3IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjQ4ODQiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iNjQiIGhlaWdodD0iNjQiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTUxMiA1MTJtLTUxMiAwYTUxMiA1MTIgMCAxIDAgMTAyNCAwIDUxMiA1MTIgMCAxIDAtMTAyNCAwWiIgZmlsbD0iI0ZGRkZGRiIgcC1pZD0iNDg4NSI+PC9wYXRoPjxwYXRoIGQ9Ik01MTIgNTEybS00MTguOTA5MDkxIDBhNDE4LjkwOTA5MSA0MTguOTA5MDkxIDAgMSAwIDgzNy44MTgxODIgMCA0MTguOTA5MDkxIDQxOC45MDkwOTEgMCAxIDAtODM3LjgxODE4MiAwWiIgZmlsbD0iIzRBQzdGRiIgcC1pZD0iNDg4NiI+PC9wYXRoPjxwYXRoIGQ9Ik00NzQuMTEyIDc2My45NTA1NDVhMzMuMjggMzMuMjggMCAwIDEtMTQuMDU2NzI3IDQuMDQ5NDU1IDIxLjAzODU0NSAyMS4wMzg1NDUgMCAwIDEtMjEuMzE3ODE4LTIwLjgwNTgxOCAxOS41NDkwOTEgMTkuNTQ5MDkxIDAgMCAxIDEuMjEwMTgxLTUuODY0NzI3bDQwLjQ5NDU0Ni0xODcuNDM4NTQ2LTE2Ny42NTY3MjcgMC4zMjU4MThhMjEuMjI0NzI3IDIxLjIyNDcyNyAwIDAgMS0yMS44NzYzNjQtMjAuODA1ODE4IDIwLjQzMzQ1NSAyMC40MzM0NTUgMCAwIDEgOS40OTUyNzMtMTYuODQ5NDU0bDI1MC4xODE4MTgtMjU1Ljc2NzI3M2M0LjYwOC0yLjc5MjcyNyA5LjU0MTgxOC00Ljc0NzYzNiAxNC42NjE4MTgtNC43OTQxODJhMjEuMTMxNjM2IDIxLjEzMTYzNiAwIDAgMSAyMS4zNjQzNjQgMjAuODUyMzY0IDE5Ljk2OCAxOS45NjggMCAwIDEtMi43OTI3MjggOS43NzQ1NDVsLTQwLjIxNTI3MiAxODQuMzJoMTY3Ljg0MjkwOWEyMS4xNzgxODIgMjEuMTc4MTgyIDAgMCAxIDIxLjY0MzYzNiAyMC44NTIzNjQgMjAuMjkzODE4IDIwLjI5MzgxOCAwIDAgMS05LjQ5NTI3MyAxNi45NDI1NDVsLTI0OS40ODM2MzYgMjU1LjIwODcyN3oiIGZpbGw9IiNGRkZGRkYiIHAtaWQ9IjQ4ODciPjwvcGF0aD48L3N2Zz4=);
}

.bili-avatar-icon {
  width: 33.33333%;
  height: 33.33333%;
  width: -webkit-calc(33.33333333%);
  width: -moz-calc(33.33333333%);
  width: calc(100% * 1 / 3);
  height: -webkit-calc(33.33333333%);
  height: -moz-calc(33.33333333%);
  height: calc(100% * 1 / 3);
  position: absolute;
  right: 0;
  bottom: 0;
  background-size: cover;
  image-rendering: -webkit-optimize-contrast;
}

.bili-avatar-face {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
}

.bili-avatar-img-radius {
  border-radius: 50%;
}

.bili-avatar-img {
  border: none;
  display: block;
  -o-object-fit: cover;
  object-fit: cover;
  image-rendering: -webkit-optimize-contrast;
}

.bili-avatar {
  display: block;
  width: 100%;
  height: 100%;
  position: relative;
  background-image: url(data:image/gif;base64,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);
  background-size: cover;
  border-radius: 50%;
  margin: 0;
  padding: 0;
}

.avatar-container {
  -ms-flex-negative: 0;
  flex-shrink: 0;
  display: block;
  position: relative;
  width: 44px;
  height: 44px;
  margin-right: 12px;
}

.article-up-info,
.article-up-info .up-left {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
}

.article-up-info {
  background: #fff;
  width: 660px;
  height: 44px;
  -ms-flex-pack: justify;
  justify-content: space-between;
  margin: 0 auto 20px;
}

.article-read-info {
  font-weight: 400;
  font-size: 13px;
}

.article-read-panel {
  margin-bottom: 20px;
  color: #999;
}

.publish-text {
  display: inline-block;
  margin-right: 14px;
}

.article-read-info > span {
  margin: 0 3px;
  color: #999;
  transition: 0.3s;
}

.article-detail {
  width: 900px;
  /*height: 100%;*/
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  margin: 0 auto 99px;
  position: relative;
}

#navgation {
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 8%);
}

.article-container {
  background-color: #fff;
  border-radius: 4px;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  padding: 30px 40px 40px;
  margin-bottom: 12px;
  margin-top: 100px;
}

.article-container_content {
  border-bottom: 1px solid #e5e9ef;
  margin-bottom: 30px;
}

.article-container .title-container {
  padding: 0 80px;
}

.article-container .title-line {
  height: 1px;
  width: 100%;
  background: hsla(0, 0%, 59.2%, 0.21);
  margin-bottom: 40px;
}

.article-content {
  padding: 0 80px;
  margin-bottom: 50px;
}

.normal-article-holder {
  margin-top: 10px;
  max-width: 100%;
  min-height: 200px;
  line-height: 1.6;
  font-size: 17px;
  font-weight: 400;
  color: #212121;
  text-align: left;
  letter-spacing: 0;
  word-wrap: break-word;
  overflow: hidden;
  border: none;
}

.comment-wrapper {
  box-sizing: border-box;
  width: 100%;
  background-color: #fff;
  border-radius: 4px;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  padding: 30px 30px 30px;
  margin-bottom: 12px;
  /*margin-top: 100px;*/
}

.comment-m {
  padding: 20px 40px;
  background: #fff;
}

.b-head {
  font-size: 18px;
  line-height: 24px;
  color: #222;
  margin: 0 0 20px;
}

.results {
  margin-right: 10px;
}

.bb-comment {
  font-family: "Microsoft YaHei", Arial, Helvetica, sans-serif;
  font-size: 0;
  zoom: 1;
  min-height: 100px;
  background: #fff;
}

.post_details_newComment_avatar {
  padding-top: 5px;
}

.post_details_newComment_commentBox {
  display: block;
  margin-left: 20px;
  width: inherit;
}

.post_details_newComment_commentBox_textarea {
  margin-bottom: 10px;
}

.post_details_newComment_commentBox_sendButton {
  float: right;
}

.circle_page {
  margin-left: 3rem;
  margin-top: 10px;
  width: 60%;
  border-radius: 3px;
  background: #fff;
  box-shadow: 0 4px 8px 6px rgba(7 17 27 0.6);
  transition: all 0.3s;
  padding: 5px 44px 20px;
  display: block;
}

.post-card {
  border-radius: 12px 8px 8px 12px;
}

@media (max-width: 759px) {
  .post-card {
    margin-top: 1rem;
  }
}

@media (min-width: 760px) {
  .post-card {
    display: flex;
    align-items: center;
    width: 100%;
    margin-top: 20px;
    padding: 10px;
    height: auto;
  }

  .on-hover {
    transition: all 0.6s;
  }

  .post-card:hover .on-hover {
    transform: scale(1.1);
  }
}

.post_container {
  width: 100%;
}

.post_header {
  display: flex;
  height: auto;
  width: inherit;
  align-items: center;
}

.post_userImg img {
  display: inline-block;
  padding: 5px;
  width: 48px;
  height: 48px;
  border-radius: 70px;
  vertical-align: top;
  transition: all 0.3s;
}

.post_userInfo {
  margin-left: 10px;
}

.post_userInfo_username_text {
  font-size: 12px;
  font-weight: bold;
  line-height: 18px;
  word-wrap: break-word;
  margin: 0;
  padding: 0;
  color: #6d757a;
}

.post_time {
  margin-left: 10px;
}

.post_time_text {
  margin: 0;
  padding: 0;
  letter-spacing: 0;
  color: #99a2aa;
  font-size: 12px;
}

.post_cutLine {
  width: 100%;
  height: 2px;
  background: #e5e9ef;
  margin-top: 5px;
  margin-bottom: 5px;
}

.post_lowerPart {
  display: block;
  margin-left: 48px;
  margin-right: 48px;
}

.post_tags {
  display: flex;
}

.post_tag {
  margin: 10px 5px;
}

.post_message {
  margin-left: 5px;
  word-break: break-word;
  word-wrap: break-word;
  display: block;
  padding: 0;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: 1px;
  margin-bottom: 20px;
}

.post_video {
  width: 600px;
  height: 500px;
}

.post_picture_img {
  border-radius: 10px;
  width: 100%;
  height: 100%;
  position: absolute;
  display: block;
}

.post_picture {
  width: 100%;
  height: 0;
  padding-bottom: 100%;
}

.post_picture_container {
  width: 90%;
  height: 0;
  padding-bottom: 90%;
  margin: 5%;
  position: relative;
  float: left;
  display: block;
}

.post_media_pictures {
  width: 50%;
}

.post_picture_drawer_container_image {
  max-width: 90%;
  max-height: 90%;
}

.separator {
  margin: 0 6px;
}

.post_hr {
  margin-top: 10px;
  margin-bottom: 10px;
}

.post_noMore {
  color: #4c4948;
  font-size: 14px;
  line-height: 2;
  margin-top: 20px;
}

.post_detailsContainer {
  display: block;
  margin-top: 10px;
}

.post_details_header {
  margin-bottom: 10px;
}

.post_details_newComment {
  display: flex;
  padding: 5px 20px 5px;
  width: 100%;
}

.post_details_comment {
  display: flex;
  padding: 5px 20px 5px;
  width: 100%;
}

.post_details_newComment_avatar {
  padding-top: 5px;
}

.post_details_comment_avatar {
  padding-top: 5px;
}

.post_details_newComment_commentBox {
  display: block;
  margin-left: 20px;
  width: inherit;
}

.post_details_comment_commentBox {
  display: block;
  margin-left: 10px;
  width: inherit;
}

.post_details_newComment_commentBox_textarea {
  margin-bottom: 10px;
}

.post_details_newComment_commentBox_sendButton {
  float: right;
}

.post_comment_container {
  display: flex;
  width: inherit;
}

.post_details_comment_commentBox_header {
  display: flex;
}

.post_details_comment_commentBox_reply_username {
  color: #00a1d6;
}

.post_details_comment_commentBox_content {
  margin-left: 10px;
}

.post_details_comment_commentBox_statistics {
  margin-left: 10px;
}

.post_details_comment_commentBox_reply {
  margin-left: 10px;
}

.title {
  min-height: 39px;
  font-size: 28px;
  /*color: #222;*/
  margin-bottom: 16px;
  font-weight: 700;
  line-height: 1.4;
}

.newPost_tags {
  margin-bottom: 20px;
}

.newPost_textarea {
  margin-left: 10px;
  margin-bottom: 20px;
}

.newPost_mediaArea_typeSelector {
  margin-left: 10px;
  margin-bottom: 20px;
}

.newPost_mediaArea_picture {
  margin-left: 10px;
  margin-bottom: 20px;
}

.newPost_mediaArea_video {
  margin-left: 10px;
  margin-bottom: 20px;
}

.newPost_footer {
  height: fit-content;
  min-height: 40px;
}

.newPost_button {
  float: right;
}

.post_delete_container {
  position: absolute;
  right: 3%;
}

.post_hr {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
