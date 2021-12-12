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
    <main id="content-outer">
      <div class="layout_page" id="content-inner">
        <div class="aside_content" id="aside_content">
          <!-- 个人信息 -->
          <div class="card-widget card-info">
            <div class="card-content">
              <div class="card-info-avatar is-center">
                <img
                  class="avatar-img"
                  :src="userInformation.personalInformation.userImage"
                  alt="avatar"
                />
                <div class="author-info__name">
                  {{ userInformation.personalInformation.username }}
                </div>
                <div class="author-info__description">
                  {{ userInformation.personalInformation.userIntroduction }}
                </div>
                <div
                  class="otherInformation"
                  v-for="info in userInformation.personalInformation
                    .otherInformation"
                  :key="info.infoItem"
                >
                  <div class="author-info__description">
                    {{ info.infoValue }}
                  </div>
                </div>
              </div>

              <div
                class="card-info-social-icons is-center"
                v-for="info in userInformation.personalInformation.contact"
                :key="info.icon"
              >
                <a class="social-icon" :href="info.link" target="_blank">
                  <img :src="info.icon" alt="avatar" />
                </a>
              </div>
            </div>
          </div>

          <!-- api -->
          <div class="card-widget card-announcement">
            <div class="card-content">
              <div class="item-headline">
                <i class="fa fa-bullhorn" aria-hidden="true"></i>
                <iframe
                  allowtransparency="true"
                  frameborder="0"
                  width="255"
                  height="98"
                  scrolling="no"
                  src="//tianqi.2345.com/plugin/widget/index.htm?s=1&z=1&t=1&v=0&d=1&bd=0&k=000000&f=008040&ltf=009944&htf=cc0000&q=1&e=0&a=1&c=54511&w=255&h=98&align=center"
                ></iframe>
              </div>
              <div id="weather"></div>
            </div>
          </div>
        </div>
        <article class="circle_page">
          <v-col md="12" cols="12" v-if="!detailsPanel">
            <v-card
              class="animated zoomIn post-card"
              v-for="post in posts"
              :key="post.postId"
            >
              <div class="post_container" @click="readDetails(post)">
                <div class="post_header">
                  <div class="post_userImg">
                    <img
                      :src="post.userImg"
                      alt="avatar"
                      @click.stop="visitUser(post.userId)"
                    />
                  </div>
                  <div
                    class="post_userInfo"
                    @click.stop="visitUser(post.userId)"
                  >
                    <span class="post_userInfo_username_text">{{
                      post.userName
                    }}</span>
                  </div>
                  <div class="post_time">
                    <span class="post_time_text">{{ post.postTime }}</span>
                  </div>
                  <div
                    class="post_delete_container"
                    @click.stop="delPost(post.postId)"
                  >
                    <i class="el-icon-delete"></i>
                  </div>
                </div>
                <div class="post_cutLine"></div>
                <div class="post_lowerPart">
                  <div class="post_tags">
                    <el-tag
                      class="post_tag"
                      v-for="tag of post.tags"
                      :key="tag.tagId"
                      effect="dark"
                      size="mini"
                      @click.stop="aboutTag(tag.tagId)"
                    >
                      {{ tag.tagName }}
                    </el-tag>
                  </div>
                  <div class="post_message">
                    <pre>{{ post.message }}</pre>
                  </div>
                  <div class="post_mediaContainer">
                    <div
                      class="post_media_pictures"
                      v-if="post.mediaType === 1"
                    >
                      <el-row style="width: 100%">
                        <el-col
                          :span="8"
                          v-for="picture in post.pictures"
                          :key="picture.url"
                          offset="0"
                        >
                          <div class="post_picture_container" @click.stop>
                            <div class="post_picture">
                              <a :href="picture.url" target="_blank">
                                <img
                                  :src="picture.url"
                                  class="post_picture_img"
                                  alt=""
                                />
                              </a>
                            </div>
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                    <div class="post_media_video" v-if="post.mediaType === 2">
                      <iframe
                        class="post_video"
                        :src="post.video"
                        scrolling="no"
                        border="0"
                        frameborder="no"
                        framespacing="0"
                        allowfullscreen="true"
                      >
                      </iframe>
                      <!--video width="320" height="240" controls="controls">
                        <source src="movie.mp4" type="video/mp4" />
                        <source src="movie.ogg" type="video/ogg" />
                        <source src="movie.webm" type="video/webm" />
                        <object data="movie.mp4" width="320" height="240">
                          <embed src="movie.swf" width="320" height="240" />
                        </object>
                      </video-->
                    </div>
                  </div>
                  <hr class="post_hr" />
                  <div class="post_statistics">
                    <i class="el-icon-edit-outline"></i>
                    {{ post.commentsNum }}
                    <span class="separator">|</span>
                    <i
                      class="el-icon-star-off"
                      @click.stop="starPost(post)"
                      v-if="!post.star"
                    ></i>
                    <i class="el-icon-star-on" v-if="post.star"></i>
                    {{ post.likesNum }}
                  </div>
                </div>
              </div>
            </v-card>
            <infinite-loading @infinite="infiniteHandler">
              <div slot="no-more" class="post_noMore">我也是有底线的</div>
            </infinite-loading>
          </v-col>
          <div class="post_detailsContainer" v-if="detailsPanel">
            <el-page-header
              @back="detailsPanel = false"
              content="详情"
              class="post_details_header"
            >
            </el-page-header>
            <div class="post_cutLine"></div>
            <div class="post_content">
              <v-card class="animated zoomIn post-card">
                <div class="post_container">
                  <div class="post_header">
                    <div class="post_userImg">
                      <img
                        :src="readPost.userImg"
                        alt="avatar"
                        @click.stop="visitUser(readPost.userId)"
                      />
                    </div>
                    <div
                      class="post_userInfo"
                      @click.stop="visitUser(readPost.userId)"
                    >
                      <span class="post_userInfo_username_text">{{
                        readPost.userName
                      }}</span>
                    </div>
                    <div class="post_time">
                      <span class="post_time_text">{{
                        readPost.postTime
                      }}</span>
                    </div>
                  </div>
                  <div class="post_cutLine"></div>
                  <div class="post_lowerPart">
                    <div class="post_tags">
                      <el-tag
                        class="post_tag"
                        v-for="tag of readPost.tags"
                        :key="tag.tagId"
                        effect="dark"
                        size="mini"
                        @click.stop="aboutTag(tag.tagId)"
                      >
                        {{ tag.tagName }}
                      </el-tag>
                    </div>
                    <div class="post_message">
                      <pre>{{ readPost.message }}</pre>
                    </div>
                    <div class="post_mediaContainer">
                      <div
                        class="post_media_pictures"
                        v-if="readPost.mediaType === 1"
                      >
                        <el-row style="width: 100%">
                          <el-col
                            :span="8"
                            v-for="picture in readPost.pictures"
                            :key="picture.url"
                            offset="0"
                          >
                            <div class="post_picture_container" @click.stop>
                              <div class="post_picture">
                                <a :href="picture.url" target="_blank">
                                  <img
                                    :src="picture.url"
                                    class="post_picture_img"
                                    alt=""
                                  />
                                </a>
                              </div>
                            </div>
                          </el-col>
                        </el-row>
                      </div>
                      <div
                        class="post_media_video"
                        v-if="readPost.mediaType === 2"
                      >
                        <iframe
                          class="post_video"
                          :src="readPost.video"
                          scrolling="no"
                          border="0"
                          frameborder="no"
                          framespacing="0"
                          allowfullscreen="true"
                        >
                        </iframe>
                        <!--video width="320" height="240" controls="controls">
                          <source src="movie.mp4" type="video/mp4" />
                          <source src="movie.ogg" type="video/ogg" />
                          <source src="movie.webm" type="video/webm" />
                          <object data="movie.mp4" width="320" height="240">
                            <embed src="movie.swf" width="320" height="240" />
                          </object>
                        </video-->
                      </div>
                    </div>
                    <hr class="post_hr" />
                    <div class="post_statistics">
                      <i class="el-icon-edit-outline"></i>
                      {{ readPost.commentsNum }}
                      <span class="separator">|</span>
                      <i
                        class="el-icon-star-off"
                        @click="starPost(readPost)"
                        v-if="!readPost.star"
                      ></i>
                      <i class="el-icon-star-on" v-if="readPost.star"></i>
                      {{ readPost.likesNum }}
                    </div>
                  </div>
                </div>
              </v-card>
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
                      >发送</el-button
                    >
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
                            <div class="post_details_comment_commentBox_header">
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
                            @click="sendCommentToComment(comment)"
                            >发送</el-button
                          >
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
        </article>
      </div>
    </main>
    <footer id="footer">
      <div id="footer-wrap">
        <div class="copyright">&copy;2021 BY Hecate</div>
      </div>
    </footer>
    <el-backtop :bottom="10" :visibility-height="5">
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
    <el-backtop
      :bottom="60"
      :visibility-height="0"
      @click="newPostPanel = true"
      v-if="!detailsPanel"
    >
      <div
        style="{
        height: 100%;
        width: 100%;
        background-color: #f2f5f6;
        box-shadow: 0 0 6px rgba(0,0,0, .12);
        text-align: center;
        line-height: 40px;
        color: #ce7bc2;
        border-radius: 20px;
        font-size: medium;
      }"
      >
        NEW
      </div>
    </el-backtop>
    <el-dialog title="发布新动态" :visible.sync="newPostPanel">
      <div class="newPost_container">
        <div class="newPost_tags">
          <el-tag
            :key="tag"
            v-for="tag in newPost.interestTags"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)"
          >
            {{ tag }}
          </el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible2"
            v-model="inputValue2"
            ref="saveTagInput2"
            size="small"
            @keyup.enter.native="handleInputConfirm2"
            @blur="handleInputConfirm2"
          >
          </el-input>
          <el-button
            v-else
            class="button-new-tag"
            size="small"
            @click="showInput2"
            >+ 新标签</el-button
          >
        </div>
        <div class="newPost_tags">
          <el-tag
            :key="tag"
            v-for="tag in newPost.spotTags"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)"
          >
            {{ tag }}
          </el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          >
          </el-input>
          <el-button
            v-else
            class="button-new-tag"
            size="small"
            @click="showInput"
            >+ 新地点</el-button
          >
        </div>

        <div class="newPost_textarea">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2 }"
            placeholder="说点什么吧"
            v-model="newPost.message"
          >
          </el-input>
        </div>
        <div class="newPost_mediaArea">
          <div class="newPost_mediaArea_typeSelector">
            <el-select v-model="newPost.mediaType" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div class="newPost_mediaArea_picture" v-if="newPost.mediaType === 1">
            <el-upload
              class="upload-demo"
              :action="picUrl"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="tempPictures"
              :on-success="addPictureSuccess"
              name="upfile"
              list-type="picture"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">
                只能上传jpg/png文件，且不超过500kb
              </div>
            </el-upload>
          </div>
          <div class="newPost_mediaArea_video" v-if="newPost.mediaType === 2">
            <el-upload
              class="upload-demo"
              :action="videoUrl"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :limit="1"
              :on-exceed="handleExceed"
              :on-success="addVideoSuccess"
              :file-list="tempVideo"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </div>
        </div>
        <div class="newPost_footer">
          <el-button type="primary" @click="sendPost()" class="newPost_button"
            >发 布</el-button
          >
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  circle_commentComment,
  circle_commentPost,
  circle_delPost,
  circle_loadComments,
  circle_loadPosts,
  circle_newPost,
  circle_starComment,
  circle_starPost,
  space_loadUserInfo
} from "@/api/api";
import TopNavBar from "@/components/layout/TopNavBar";
import { errorCode } from "@/api/errorCode";

export default {
  name: "circle",
  data() {
    return {
      newPostPanel: false,
      tempPictures: [],
      tempVideo: [],
      picUrl: null,
      videoUrl: null,
      newPost: {
        interestTags: [],
        spotTags: [],
        message: "",
        mediaType: 0,
        pictures: [],
        video: ""
      },
      options: [
        {
          value: 0,
          label: "无"
        },
        {
          value: 1,
          label: "图片"
        },
        {
          value: 2,
          label: "视频"
        }
      ],
      inputVisible: false,
      inputVisible2: false,
      inputValue: "",
      inputValue2: "",
      detailsPanel: false,
      picture_drawer: false,
      username: null,
      userId: null,
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
      posts: [],
      lastPostId: "",
      readPost: null,
      comments: [],
      lastCommentId: "",
      newComment: "",
      commentObjId: "",
      commentPop: false,
      newCommentInfo: {
        reply: null,
        replyUserId: null
      }
    };
  },
  created() {
    this.username = this.$cookies.get("username");
    this.userId = this.$cookies.get("userId");
    this.picUrl =
      "http://192.168.43.123:8089/ssm_war_exploded/addNewPicture/" +
      this.userId +
      "&";
    this.videoUrl =
      "http://192.168.43.123:8089/ssm_war_exploded/addNewVideo/" + this.userId;
    space_loadUserInfo(this.userId).then(response => {
      if (errorCode(response.data.code)) {
        this.userInformation = response.data.userInformation;
      }
    });
  },
  methods: {
    aboutTag(tagId) {
      this.$cookies.set("tagId", tagId, "7d", "/");
      // router
    },
    visitUser(userId) {
      console.log(userId);
    },
    readDetails(post) {
      this.readPost = post;
      circle_loadComments(this.readPost.postId, this.lastCommentId).then(
        response => {
          if (errorCode(response.data.code)) {
            this.comments = response.data.comments;
            this.lastCommentId = response.data.lastCommentId;
          }
        }
      );
      this.detailsPanel = true;
    },
    infiniteHandler($state) {
      circle_loadPosts(this.userId, this.lastPostId).then(response => {
        if (errorCode(response.data.code)) {
          this.posts.push(...response.data.posts);
          this.lastPostId = response.data.lastPostId;
          $state.loaded();
        } else {
          $state.complete();
        }
      });
    },
    infiniteHandler2($state) {
      circle_loadComments(this.readPost.postId, this.lastCommentId).then(
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
      circle_commentPost(
        this.userInformation.personalInformation.userId,
        this.readPost.postId,
        {
          message: this.newComment,
          reply: null,
          replyUserId: null
        }
      ).then(response => {
        if (errorCode(response.data.code)) {
          this.newComment = null;
          this.readPost.commentsNum++;
          this.comments.push(response.data.newComment);
        }
      });
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
    starPost(post) {
      circle_starPost(
        this.userInformation.personalInformation.userId,
        post.postId
      ).then(response => {
        if (errorCode(response.data.code)) {
          post.star = true;
          post.likesNum++;
        }
      });
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
    handleClose(tag) {
      this.newPost.tags.splice(this.newPost.tags.indexOf(tag), 1);
    },
    showInput() {
      this.inputVisible = true;
      // eslint-disable-next-line no-unused-vars
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    showInput2() {
      this.inputVisible2 = true;
      // eslint-disable-next-line no-unused-vars
      this.$nextTick(_ => {
        this.$refs.saveTagInput2.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.newPost.spotTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    handleInputConfirm2() {
      let inputValue2 = this.inputValue2;
      if (inputValue2) {
        this.newPost.interestTags.push(inputValue2);
      }
      this.inputVisible2 = false;
      this.inputValue2 = "";
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    sendPost() {
      circle_newPost(this.userInformation.personalInformation.userId, {
        interestTags: this.newPost.interestTags,
        spotTags: this.newPost.spotTags,
        message: this.newPost.message,
        mediaType: this.newPost.mediaType,
        pictures: this.newPost.pictures,
        video: this.newPost.video
      }).then(response => {
        if (response.data.code) {
          this.$message.success("发布成功");
          this.$router.go(0);
        } else {
          this.$message.warning("发布失败！");
        }
      });
    },
    // eslint-disable-next-line no-unused-vars
    addPictureSuccess(res, file) {
      if (errorCode(res.code)) {
        this.newPost.pictures.push({
          url: res.url
        });
      }
    },
    // eslint-disable-next-line no-unused-vars
    addVideoSuccess(res, file) {
      if (errorCode(res.code)) {
        this.newPost.video = res.video;
      }
    },
    delPost(postId) {
      circle_delPost(postId).then(response => {
        if (errorCode(response.data.code)) {
          this.$message.success("删除成功");
          this.$router.go(0);
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
@import "../../../assets/css/space/space.css";
@import "../../../assets/css/space/circle.css";
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
::v-deep .el-dialog__body {
  padding: 10px 20px;
}
</style>
