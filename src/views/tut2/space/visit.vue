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

              <div class="visit_follow">
                <el-button
                  type="success"
                  v-if="followed === false"
                  @click.stop="follow()"
                  >关 注</el-button
                >
                <el-button
                  type="success"
                  plain
                  v-if="followed === true"
                  @click.stop="uniFollow()"
                  >已关注</el-button
                >
              </div>
              <div class="visit_space"></div>
              <div class="visit_follow" v-if="adminTo === true">
                <el-button
                  type="danger"
                  v-if="frozen === false"
                  @click.stop="freeze()"
                  >冻 结</el-button
                >
                <el-button
                  type="danger"
                  plain
                  v-if="frozen === true"
                  @click.stop="unFreeze()"
                  >已冻结</el-button
                >
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

        <article id="page">
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
            <infinite-loading @infinite="infiniteHandler">
              <div slot="no-more" class="noMore">我也是有底线的</div>
            </infinite-loading>
          </v-col>
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
  space_loadUserInfo,
  space_loadArticles,
  visit_followed,
  visit_watch,
  account_delFriend,
  isAdmin,
  isFrozen,
  freeze,
  unFreeze
} from "@/api/api";
import TopNavBar from "@/components/layout/TopNavBar";
import { errorCode } from "@/api/errorCode";

export default {
  name: "space",
  data() {
    return {
      adminTo: false,
      frozen: false,
      realUserId: null,
      realUserName: null,
      followed: false,
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
      articleId: null,
      tagId: null,
      keyWords: null,
      activeIndex: "1",
      articles: []
    };
  },
  created() {
    this.realUserName = this.$cookies.get("userName");
    this.realUserId = this.$cookies.get("userId");
    this.username = this.$cookies.get("visitUserName");
    this.userId = this.$cookies.get("visitUserId");
    space_loadUserInfo(this.userId).then(response => {
      if (errorCode(response.data.code)) {
        this.userInformation = response.data.userInformation;
        this.username = this.userInformation.personalInformation.username;
        isAdmin(this.realUserId).then(response => {
          if (errorCode(response.data.code)) {
            isAdmin(this.userId).then(response => {
              if (!errorCode(response.data.code)) {
                this.adminTo = true;
                isFrozen(this.userId).then(response => {
                  if (errorCode(response.data.code)) {
                    this.frozen = true;
                  }
                });
              }
            });
          }
        });
      }
    });
    visit_followed(this.realUserId, this.userId).then(response => {
      if (errorCode(response.data.code)) {
        this.followed = response.data.followed;
      }
    });
  },
  methods: {
    infiniteHandler($state) {
      space_loadArticles(this.userId, this.lastArticleId).then(response => {
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
      // router
    },
    aboutTag(tagId) {
      this.$cookies.set("tagId", tagId, "7d", "/");
      // router
    },
    follow() {
      if (this.realUserId === this.userId) {
        this.$message.error("您时刻都在关注自己~");
      } else {
        visit_watch(this.realUserId, this.userId).then(response => {
          if (errorCode(response.data.code)) {
            this.followed = true;
            this.$message.success("关注成功！");
          } else {
            this.$message.error("关注失败！");
          }
        });
      }
    },
    uniFollow() {
      account_delFriend(this.realUserId, this.userId).then(response => {
        if (errorCode(response.data.code)) {
          this.followed = false;
        }
      });
    },
    freeze() {
      if (this.realUserId === this.userId) {
        this.$message.error("您无法冻结自己~");
      } else {
        freeze(this.userId, this.realUserId).then(response => {
          if (errorCode(response.data.code)) {
            this.frozen = true;
            this.$message.success("冻结成功！");
          } else {
            this.$message.error("冻结失败！");
          }
        });
      }
    },
    unFreeze() {
      unFreeze(this.userId, this.realUserId).then(response => {
        if (errorCode(response.data.code)) {
          this.frozen = false;
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
.visit_space {
  min-height: 1rem;
}
</style>
