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
          <div v-if="!detailsPanel">
            <div class="world_search">
              <el-input
                placeholder="请输入内容"
                v-model="inputbox"
                class="input-with-select"
              >
                <el-select
                  v-model="searchSubject"
                  slot="prepend"
                  placeholder="请选择"
                >
                  <el-option label="全部" value="1"></el-option>
                  <el-option label="动态" value="2"></el-option>
                  <el-option label="文章" value="3"></el-option>
                  <el-option label="地点" value="4"></el-option>
                </el-select>
                <el-button
                  slot="append"
                  icon="el-icon-search"
                  @click="searchSubmit()"
                ></el-button>
              </el-input>
            </div>
            <div v-if="searchHistory.searchFlag === 'false'">
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
                <infinite-loading @infinite="infiniteHandler">
                  <div slot="no-more" class="post_noMore">我也是有底线的</div>
                </infinite-loading>
              </v-col>
            </div>
            <div v-if="searchHistory.searchFlag === 'true'">
              <div class="search_all" v-if="lastSearchSubject === '1'">
                <el-collapse v-model="activeName" accordion>
                  <el-collapse-item name="1">
                    <template slot="title">
                      <div class="searchSubjectTitle">
                        地点
                      </div>
                    </template>
                    <div>
                      <v-col md="12" cols="12">
                        <v-card
                          class="animated zoomIn article-card"
                          style="border-radius: 12px 8px 8px 12px"
                          v-for="spot of spots"
                          :key="spot.spotId"
                        >
                          <div class="article-card-container">
                            <!-- 文章封面图 -->
                            <div class="article-cover left-radius">
                              <router-link to="">
                                <v-img
                                  class="on-hover"
                                  width="100%"
                                  height="100%"
                                  :src="spot.spotImg"
                                  @click="visitSpot(spot.spotId)"
                                />
                              </router-link>
                            </div>

                            <!-- 文章信息 -->
                            <div class="article-wrapper">
                              <div
                                style="line-height:1.4"
                                @click="visitSpot(spot.spotId)"
                              >
                                <router-link to="">
                                  {{ spot.spotName }}
                                </router-link>
                              </div>
                              <div class="article-content">
                                <i class="el-icon-location-outline"></i>
                                {{ spot.spotAddress }}
                              </div>
                              <div class="article-info">
                                <router-link
                                  style="display:inline-block"
                                  to=""
                                  class="mr-1"
                                  v-for="tag of spot.tags"
                                  :key="tag.tagId"
                                  @click="aboutTag(tag.tagId)"
                                >
                                  <v-icon size="14">mdi-tag-multiple</v-icon>
                                  {{ tag.tagName }}
                                </router-link>
                              </div>
                              <!-- 文章内容 -->
                              <div class="article-content">
                                {{ spot.spotIntro }}
                              </div>
                              <div class="article-info">
                                <i class="el-icon-view"></i>
                                {{ spot.spotHot }}
                              </div>
                            </div>
                          </div>
                        </v-card>
                      </v-col>
                    </div>
                  </el-collapse-item>
                  <el-collapse-item name="2">
                    <template slot="title">
                      <div class="searchSubjectTitle">
                        动态
                      </div>
                    </template>
                    <div>
                      <v-col md="12" cols="12">
                        <v-card
                          class="animated zoomIn post-card"
                          v-for="post in posts"
                          :key="post.postId"
                        >
                          <div
                            class="post_container"
                            @click="readDetails(post)"
                          >
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
                                      <div
                                        class="post_picture_container"
                                        @click.stop
                                      >
                                        <div class="post_picture">
                                          <a
                                            :href="picture.url"
                                            target="_blank"
                                          >
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
                          <div slot="no-more" class="post_noMore">
                            我也是有底线的
                          </div>
                        </infinite-loading>
                      </v-col>
                    </div>
                  </el-collapse-item>
                  <el-collapse-item name="3">
                    <template slot="title">
                      <div class="searchSubjectTitle">
                        文章
                      </div>
                    </template>
                    <div>
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
                              <v-img
                                class="on-hover"
                                width="100%"
                                height="100%"
                                :src="article.articleCover"
                                @click="readArticle(article.articleId)"
                              />
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
                                <v-icon size="14"
                                  >mdi-calendar-month-outline</v-icon
                                >
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
                          <div slot="no-more" class="noMore">
                            我也是有底线的
                          </div>
                        </infinite-loading>
                      </v-col>
                    </div>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </div>
          </div>
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
  </div>
</template>

<script>
import {
  circle_commentComment,
  circle_commentPost,
  circle_delPost,
  circle_loadComments,
  world_loadPosts,
  circle_newPost,
  circle_starComment,
  circle_starPost,
  space_loadUserInfo,
  search_posts,
  search_articles,
  search_spots
} from "@/api/api";
import TopNavBar from "@/components/layout/TopNavBar";
import { errorCode } from "@/api/errorCode";

export default {
  name: "world",
  data() {
    return {
      activeName: "1",
      searchSubject: "1",
      lastSearchSubject: "1",
      searchHistory: {
        searchFlag: false,
        searchSubject: "",
        searchInput: ""
      },
      newPostPanel: false,
      tempPictures: [],
      tempVideo: [],
      inputbox: null,
      newPost: {
        tags: [],
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
      inputValue: "",
      detailsPanel: false,
      picture_drawer: false,
      username: null,
      userId: null,
      userInformation: {},
      posts: [],
      articles: [],
      spots: [],
      lastArticleId: "",
      lastPostId: "",
      readPost: {},
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
    this.searchHistory.searchFlag = this.$cookies.get("searchFlag");
    if (this.searchHistory.searchFlag === "true") {
      console.log("*");
      this.$cookies.remove("searchFlag", "/");
      this.$cookies.set("searchFlag", false, "7d", "/");
      this.searchHistory.searchInput = this.$cookies.get("searchInput");
      this.searchHistory.searchSubject = this.$cookies.get("searchSubject");
      if (
        this.searchHistory.searchSubject === "1" ||
        this.searchHistory.searchSubject === "4"
      ) {
        search_spots(this.searchHistory.searchInput).then(response => {
          if (errorCode(response.data.code)) {
            this.spots = response.data.spots;
          }
        });
      }
    } else {
      world_loadPosts(this.userId, this.lastPostId).then(response => {
        if (errorCode(response.data.code)) {
          this.posts = response.data.posts;
          this.lastPostId = response.data.lastPostId;
        }
      });
    }
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
      this.$cookies.set("visitUserId", userId, "7d", "/");
      this.$router.push("/visit");
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
      world_loadPosts(this.userId, this.lastPostId).then(response => {
        if (errorCode(response.data.code)) {
          this.posts.push(...response.data.posts);
          this.lastPostId = response.data.lastPostId;
          $state.loaded();
        } else {
          $state.complete();
        }
      });
    },
    infiniteHandler_posts($state) {
      search_posts(this.searchHistory.searchInput, this.lastPostId).then(
        response => {
          if (errorCode(response.data.code)) {
            this.posts.push(...response.data.posts);
            this.lastPostId = response.data.lastPostId;
            $state.loaded();
          } else {
            $state.complete();
          }
        }
      );
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
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.newPost.tags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
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
        tags: this.newPost.tags,
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
      if (errorCode(res.data.code)) {
        this.newPost.pictures.push({
          url: res.data.url
        });
      }
    },
    // eslint-disable-next-line no-unused-vars
    addVideoSuccess(res, file) {
      if (errorCode(res.data.code)) {
        this.newPost.video = res.data.video;
      }
    },
    delPost(postId) {
      circle_delPost(postId).then(response => {
        if (errorCode(response.data.code)) {
          this.$message.success("删除成功");
          this.$router.go(0);
        }
      });
    },
    searchSubmit() {
      this.$cookies.set("searchFlag", true, "7d", "/");
      this.$cookies.set("searchSubject", this.searchSubject, "7d", "/");
      this.$cookies.set("searchInput", this.inputbox, "7d", "/");
      this.$router.go(0);
    },
    infiniteHandler_article($state) {
      search_articles(this.searchHistory.searchInput, this.lastArticleId).then(
        response => {
          if (errorCode(response.data.code)) {
            this.articles.push(...response.data.articles);
            this.lastArticleId = response.data.lastArticleId;
            $state.loaded();
          } else {
            $state.complete();
          }
        }
      );
    },
    readArticle(articleId) {
      this.$cookies.set("articleId", articleId, "7d", "/");
      this.$router.push("/article");
    },
    visitSpot(spotId) {
      this.$cookies.set("scenicSpotId", spotId, "7d", "/");
      this.$router.push("/place");
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
::v-deep .el-input__inner {
  min-width: 120px;
}
</style>
