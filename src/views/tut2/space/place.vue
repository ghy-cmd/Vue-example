<template>
  <div>
    <div>
      <TopNavBar id="navgation"></TopNavBar>
    </div>
    <div class="row_place">
      <div class="photo wrapper">
        <router-link
          target="_blank"
          :to="{ path: '/place_album', query: { id: spotId } }"
          class="big"
          style="display: block"
        >
          <img v-bind:src="pictures[0].picture" alt="鼓浪屿" class="img1" />
          <div class="mask-coat">
            <div class="mask">
              <h1 class="signal">{{ spotContent }}</h1>
              <p id="amount">有{{ picNum }}张图</p>
            </div>
          </div>
        </router-link>
        <router-link
          target="_blank"
          :to="{ path: '/place_album', query: { id: spotId } }"
          class="small"
          style="display: block"
        >
          <img v-bind:src="pictures[1].picture" alt="鼓浪屿" class="img1" />
        </router-link>
        <router-link
          target="_blank"
          :to="{ path: '/place_album', query: { id: spotId } }"
          class="small1"
          style="display: block"
        >
          <img v-bind:src="pictures[2].picture" alt="鼓浪屿" class="img1" />
        </router-link>
      </div>
    </div>
    <div class="row_place1">
      <div class="desc1">
        <span class="colon pre"></span>
        <div class="inner">
          <p class="p1">
            {{ description }}
          </p>
          <el-tag
            class="post_tag"
            id="aaa"
            v-for="tag of interestTags"
            :key="tag.tagId"
            effect="dark"
            size="mini"
          >
            {{ tag.tagName }}
          </el-tag>
        </div>
        <span class="after"></span>
      </div>
    </div>
    <div class="row_place1">
      <div class="wrapper">
        <div class="details">
          <div class="route">
            <div class="content">
              <div class="left">地址</div>
              <div class="right">{{ address }}</div>
            </div>
            <div class="content" style="height: fit-content" v-if="location">
              <div class="left">位置</div>
              <div
                id="mapChart"
                ref="mapChart"
                style="width: 900px; height: 450px"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row_place1">
      <div style="margin-bottom:8px;float: right;margin-right: 200px">
        <div class="new_btn" @click="test1">
          <i class="el-icon-edit"></i>
          <span>完善信息</span>
        </div>
      </div>
    </div>
    <div class="row_place1" style="border-bottom:  1px solid #e4e4e4">
      <div style="margin-bottom:8px;float: right;margin-right: 200px">
        <div class="new_btn1" @click="test2">
          <i class="el-icon-edit"></i>
          <span>选择位置</span>
        </div>
      </div>
    </div>
    <div class="row_place1" v-if="!detailsPanel">
      <div class="wrapper">
        <div class="details">
          <el-collapse v-model="activeName" accordion>
            <el-collapse-item name="1" @click="changeNameD">
              <template slot="title">
                <h3 class="h">动态</h3>
              </template>
              <div class="aaaaa">
                <v-col md="12" cols="12">
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
                          <span class="post_time_text">{{
                            post.postTime
                          }}</span>
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
                          <div
                            class="post_media_video"
                            v-if="post.mediaType === 2"
                          >
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
                  <infinite-loading @infinite="infiniteHandler_posts">
                    <div slot="no-more" class="post_noMore">我也是有底线的</div>
                  </infinite-loading>
                </v-col>
              </div>
            </el-collapse-item>
            <el-collapse-item name="2" @click="changeNameA">
              <template slot="title">
                <h3 class="h">文章</h3>
              </template>
              <div class="aaaaa">
                <v-col md="12" cols="12">
                  <v-card
                    class="animated zoomIn article-card"
                    style="border-radius: 12px 8px 8px 12px"
                    v-for="article of articles"
                    :key="article.articleId"
                  >
                    <div class="article-card-container">
                      <!-- 文章封面图 -->
                      <div class="article-cover left-radius">
                        <router-link to="">
                          <v-img
                            class="on-hover"
                            width="100%"
                            height="100%"
                            :src="article.articleCover"
                            @click="readArticle(article.articleId)"
                          />
                        </router-link>
                      </div>

                      <!-- 文章信息 -->
                      <div class="article-wrapper">
                        <div
                          style="line-height:1.4"
                          @click="readArticle(article.articleId)"
                        >
                          <router-link to="">
                            {{ article.articleTitle }}
                          </router-link>
                        </div>
                        <div class="article-info">
                          <!-- 发表时间 -->
                          <v-icon size="14">mdi-calendar-month-outline</v-icon>
                          {{ article.createTime | date }}
                          <span class="separator">|</span>
                          <!-- 文章标签 -->
                          <router-link
                            style="display:inline-block"
                            to=""
                            class="mr-1"
                            v-for="tag of article.tags"
                            :key="tag.tagId"
                            @click="aboutTag(tag.tagId)"
                          >
                            <v-icon size="14">mdi-tag-multiple</v-icon>
                            {{ tag.tagName }}
                          </router-link>
                        </div>
                        <!-- 文章内容 -->
                        <div class="article-content">
                          {{ article.articleIntro }}
                        </div>
                        <div class="article-info">
                          <i class="el-icon-view"></i>
                          {{ article.readingVolume }}
                          <span class="separator">|</span>
                          <i class="el-icon-star-on"></i>
                          {{ article.likes }}
                          <span class="separator">|</span>
                          <i class="el-icon-edit-outline"></i>
                          {{ article.comments }}
                        </div>
                        <div class="article-info">
                          <!-- 文章标签 -->
                          <router-link
                            style="display:inline-block"
                            to=""
                            class="mr-1"
                            v-for="tag of article.scenicSpot"
                            :key="tag.scenicSpotId"
                          >
                            <v-icon size="14">mdi-tag-multiple</v-icon>
                            {{ tag.scenicSpotName }}
                          </router-link>
                        </div>
                      </div>
                    </div>
                  </v-card>
                  <!-- 无限加载 -->
                  <infinite-loading @infinite="infiniteHandler_article">
                    <div slot="no-more" class="noMore">我也是有底线的</div>
                  </infinite-loading>
                </v-col>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
    </div>
    <div class="row_place1" v-if="detailsPanel">
      <hr class="post_hr" />
    </div>
    <div class="row_place1">
      <div class="aaaa" v-if="detailsPanel">
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
                  <span class="post_time_text">{{ readPost.postTime }}</span>
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
                  <div class="post_media_video" v-if="readPost.mediaType === 2">
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
                        <div class="post_details_comment_commentBox_header">
                          <div
                            class="post_userInfo"
                            @click.stop="visitUser(subComment.commentUserId)"
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
                        <div class="post_details_comment_commentBox_content">
                          <pre>{{ subComment.message }}</pre>
                        </div>
                        <div class="post_details_comment_commentBox_statistics">
                          <i
                            class="el-icon-star-off"
                            @click="starComment(subComment)"
                            v-if="!subComment.star"
                          ></i>
                          <i class="el-icon-star-on" v-if="subComment.star"></i>
                          {{ subComment.likesNum }}
                          <span class="separator">|</span>
                          <i
                            class="el-icon-edit-outline"
                            @click="commentItSub(comment.commentId, subComment)"
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
    <el-dialog
      :visible.sync="dialogFormVisible"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <h2 slot="title">{{ spotContent }}</h2>
      <el-form>
        <el-form-item label="简介">
          <el-input v-model="descriptionTemp" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="addressTemp" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="为该地点添加图片">
          <el-upload
            class="upload-demo"
            :action="picUrl"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="tempPictures"
            :on-success="addPictureSuccess"
            name="upfile"
            list-type="picture"
            :before-remove="beforeRemove"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelUpdate()">取 消</el-button>
        <el-button
          type="primary"
          @click="confirmUpdate(addressTemp, descriptionTemp)"
          >确 定
        </el-button>
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
  circle_starComment,
  circle_starPost,
  space_loadUserInfo,
  // eslint-disable-next-line no-unused-vars
  spot_articles,
  // eslint-disable-next-line no-unused-vars
  spot_posts,
  circle_loadPosts,
  search_posts,
  search_articles
} from "@/api/api";
import TopNavBar from "@/components/layout/TopNavBar";
import { errorCode } from "@/api/errorCode";

export default {
  name: "place",
  data() {
    return {
      address: null,
      descriptionTemp: "",
      addressTemp: "",
      activeName: "0",
      description: null,
      spotContent: null,
      picNum: 0,
      interestTags: [],
      posts: [],
      articles: [],
      detailsPanel: false,
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
      lastArticleId: "",
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
      },
      spotId: 9,
      pictures: [
        {
          picture:
            "https://img2.baidu.com/it/u=43788283,4141783306&fm=26&fmt=auto"
        },
        {
          picture:
            "https://img0.baidu.com/it/u=3690731276,3613710781&fm=26&fmt=auto"
        },
        {
          picture:
            "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fphoto.tuchong.com%2F1344989%2Ff%2F19940070.jpg&refer=http%3A%2F%2Fphoto.tuchong.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1641831527&t=1c4b166b52fdf690813a5fae4edce18f"
        }
      ],
      dialogFormVisible: false,
      picUrl: null,
      tempPictures: null,
      addPictures: [],
      location: false,
      y: "24.444695",
      x: "118.06702"
    };
  },
  created() {
    this.username = this.$cookies.get("username");
    this.userId = this.$cookies.get("userId");
    this.spotId = this.$cookies.get("scenicSpotId");
    /*
    spot_posts(this.spotId, this.lastPostId).then(response => {
      if (errorCode(response.data.code)) {
        this.posts = response.data.posts;
        this.lastPostId = response.data.lastPostId;
      }
    });
    spot_articles(this.spotId, this.lastArticleId).then(response => {
      if (response.data.code) {
        this.articles = response.data.articles;
        this.lastPostId = response.data.lastPostId;
      }
    });

     */
    space_loadUserInfo(this.userId).then(response => {
      if (errorCode(response.data.code)) {
        this.userInformation = response.data.userInformation;
      }
    });
    this.axios
      .post("http://192.168.43.123:8089/ssm_war_exploded/getSpotData", {
        spotId: this.spotId
      })
      .then(res => {
        this.spotContent = res.data.spotContent;
        this.picNum = res.data.pictures.length;
        this.address = res.data.address;
        this.description = res.data.intro;
        if (res.data.pictures.length >= 3) {
          this.pictures = res.data.pictures;
        }
        if (
          res.data.x !== null &&
          res.data.y !== null &&
          res.data.x !== 0 &&
          res.data.y !== 0
        ) {
          this.location = true;
          this.x = res.data.x;
          this.y = res.data.y;
        }
      });
    this.addressTemp = this.address;
    this.descriptionTemp = this.description;
    this.picUrl =
      "http://192.168.43.123:8089/ssm_war_exploded/addNewPicture/" +
      this.userId +
      "&";
    var url =
      "https://webapi.amap.com/maps?v=1.4.15&key=8b58238c3c16bade33fba0e03f631dc8&callback=onLoad";
    var jsapi = document.createElement("script");
    jsapi.charset = "utf-8";
    jsapi.src = url;
    document.head.appendChild(jsapi);
    // this.location = true;
    // this.x = "118.06702";
    // this.y = "24.444695";
  },
  mounted() {
    this.mapFn();
  },
  methods: {
    cancelUpdate() {
      this.dialogFormVisible = false;
      this.descriptionTemp = this.description;
      this.addressTemp = this.address;
    },
    confirmUpdate(addTemp, dsrTemp) {
      this.$confirm("此操作将永久修改该词条, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios.post(
            "http://192.168.43.123:8089/ssm_war_exploded/updateSpotData",
            {
              spotId: this.spotId,
              intro: this.descriptionTemp,
              address: this.addressTemp,
              modifyId: this.userId,
              picture: this.addPictures
            }
          );
          this.address = addTemp;
          this.description = dsrTemp;
          console.log(this.addressTemp);
          this.dialogFormVisible = false;
          this.$message({
            type: "success",
            message: "修改成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消修改"
          });
        });
    },
    test1() {
      console.log("success");
      this.dialogFormVisible = true;
    },
    test2() {
      this.$cookies.set("scenicSpotId", this.spotId, "7d", "/");
      this.$cookies.set("spotContent", this.spotContent, "7d", "/");
      console.log("test2");
      let text = this.$router.resolve({
        path: "/place_select"
      });
      window.open(text.href, "_blank");
      // this.$router.push("/place_select");
      // window.location.reload();
    },
    changeNameA() {
      this.activeName = "2";
    },
    changeNameD() {
      this.activeName = "1";
    },
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
          this.posts.push(response.data.posts);
          this.lastPostId = response.data.lastPostId;
          $state.loaded();
        } else {
          $state.complete();
        }
      });
    },
    infiniteHandler_posts($state) {
      search_posts(this.spotContent, this.lastPostId).then(response => {
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
            this.comments.push(response.data.comments);
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
          this.comments.unshift(response.data.newComment);
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
    showInput() {
      this.inputVisible = true;
      // eslint-disable-next-line no-unused-vars
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    delPost(postId) {
      circle_delPost(postId).then(response => {
        if (errorCode(response.data.code)) {
          this.$message.success("删除成功");
          this.$router.go(0);
        }
      });
    },
    infiniteHandler_article($state) {
      search_articles(this.spotContent, this.lastArticleId).then(response => {
        if (errorCode(response.data.code)) {
          this.articles.push(...response.data.articles);
          this.lastArticleId = response.data.lastArticleId;
          $state.loaded();
        } else {
          $state.complete();
        }
      });
    },
    readArticle(articleId) {
      this.$cookies.set("articleId", articleId, "7d", "/");
      this.$router.push("/article");
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    addPictureSuccess(res) {
      console.log(res);
      if (errorCode(res.code)) {
        // this.pictures.push({
        //   url: res.url
        // });
        this.addPictures.push({
          pictureURL: res.url
        });
        console.log(this.pictures);
      }
    },
    beforeRemove(file) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    mapFn() {
      var _this = this;
      window.onload = function() {
        // eslint-disable-next-line no-undef
        _this.map = new AMap.Map("mapChart", {
          resizeEnable: true,
          center: [_this.x, _this.y],
          viewMode: "3D", //使用3D视图
          zoom: 15
          // mapStyle: "amap://styles/darkblue",
        });
        // eslint-disable-next-line no-undef
        _this.marker = new AMap.Marker({
          map: _this.map,

          // eslint-disable-next-line no-undef
          position: new AMap.LngLat(_this.x, _this.y)
        });
        // eslint-disable-next-line no-undef
      };

      // function clickHandler(e) {
      //   // alert('您在[ ' + e.lnglat.getLng() + ',' + e.lnglat.getLat() + ' ]的位置点击了地图！');
      //   console.log(e);
      //   // _this.infoWindow.open(_this.map, _this.map.getCenter());
      //   _this.marker.setPosition(e.lnglat)
      //   _this.marker.show()
      //   // _this.infoWindow.open(_this.map, _this.marker.getPosition());
      //   console.log(_this.map.getZoom())
      // }

      // _this.map.on('click', clickHandler);
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
@import "../../../assets/css/space/world.css";

#mapChart {
  margin-left: 145px;
}

.row_place {
  float: left;
  width: 100%;
  /*margin-top: 50px;*/
  background-color: white;
}

.row_place1 {
  float: left;
  width: 100%;
  background-color: white;
}

.photo {
  height: 420px;
  position: relative;
  margin-top: 15px;
}

.wrapper {
  margin: 0 auto;
  width: 1190px;
}

.big {
  width: 885px;
  height: 419px;
  float: left;
  position: relative;
  text-align: center;
}

.img1 {
  vertical-align: bottom;
  width: 100%;
  height: 100%;
}

.small {
  margin-bottom: 3px;
  width: 302px;
  height: 208px;
  float: right;
}

.small1 {
  width: 302px;
  height: 208px;
  float: right;
}

.mask-coat {
  border: 1px solid #fff;
  position: relative;
  top: -300px;
  margin: 0 auto;
  display: inline-block;
  text-align: center;
}

.mask {
  padding: 45px 107px 30px;
  margin: 10px;
  font-size: 28px;
  line-height: 48px;
  text-align: center;
  color: #111;
  filter: progid:DXImageTransform.Microsoft.Gradient(gradientType=1, startColorStr=#50ffffff, endColorStr=#50ffffff);
  background: rgba(255, 255, 255, 0.5);
  display: inline-block;
}

.signal {
  height: 48px;
  padding-bottom: 15px;
  font-size: 48px;
  font-weight: 400;
  line-height: 48px;
  margin-top: 0;
  margin-bottom: 15px;
}

#amount {
  font-size: 18px;
  line-height: 18px;
  margin-bottom: 0;
}

.desc1 {
  padding: 20px 250px 30px 200px;
  color: #666;
  line-height: 24px;
  position: relative;
}

.colon {
  width: 25px;
  height: 23px;
  display: inline-block;
  background-image: url(https://img1.tuniucdn.com/apps/web/guide/images/board/sprite.png);
  position: absolute;
  background-position: 0 -81px;
}

.inner {
  width: 800px;
  margin: 0 auto;
}

.p1 {
  font-size: 16px;
}

.after {
  right: 250px;
  /*margin-right: 0;*/
  bottom: 30px;
  background-position: -29px -81px;
  width: 25px;
  height: 23px;
  display: inline-block;
  background-image: url(https://img1.tuniucdn.com/apps/web/guide/images/board/sprite.png);
  position: absolute;
}

.details {
  position: relative;
}

.description {
  font-size: 16px;
  line-height: 24px;
  color: #666;
  padding: 13px 16px 0px 16px;
}

.route {
  margin-top: 7px;
  /*padding-bottom: 30px;*/
  position: relative;
  padding: 20px 0 35px 0;
}

.left {
  width: 105px;
  height: 30px;
  display: inline-block;
  font-size: 16px;
  color: #999;
  text-align: right;
  line-height: 30px;
  vertical-align: top;
}

.right {
  width: 1000px;
  font-size: 16px;
  display: inline-block;
  text-align: left;
  margin-left: 40px;
  line-height: 30px;
}

.h {
  font-size: 14px;
  color: #22c233;
  font-weight: bold;
}

.aaaa {
  padding-top: 30px;
  margin-left: 300px;
  margin-right: 300px;
}

.aaaaa {
  margin-left: 200px;
  margin-right: 200px;
}

.new_btn {
  padding-left: 10px;
  width: 103px;
  display: inline-block;
  line-height: 33px;
  font-size: 16px;
  color: #fff;
  background: #ffa238;
  border-radius: 3px;
}

.new_btn1 {
  padding-left: 10px;
  width: 103px;
  display: inline-block;
  line-height: 33px;
  font-size: 16px;
  color: #fff;
  background: greenyellow;
  border-radius: 3px;
}
</style>
