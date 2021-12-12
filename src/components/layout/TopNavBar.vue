<!-- used -->
<template>
  <v-app-bar app :class="navClass" hide-on-scroll flat height="60">
    <div class="d-md-block d-none nav-container">
      <div class="float-right nav-title">
        <div class="menus-item">
          <router-link to="/world">
            <i class="iconfont iconsousuo" /> 发现
          </router-link>
        </div>
        <div class="menus-item">
          <router-link to="/space">
            <i class="iconfont iconfuzhi" /> 文章
          </router-link>
        </div>
        <div class="menus-item">
          <router-link to="/edit">
            <i class="iconfont iconfenlei" /> 创作
          </router-link>
        </div>
        <div class="menus-item">
          <router-link to="/circle">
            <i class="iconfont iconbiaoqian" /> 动态
          </router-link>
        </div>
        <div class="menus-item">
          <router-link to="/album">
            <i class="iconfont iconlianjie" /> 相册
          </router-link>
        </div>
        <div class="menus-item">
          <router-link to="/chat">
            <i class="iconfont iconpinglunzu" /> 消息
          </router-link>
        </div>
        <div class="menus-item">
          <router-link to="/account">
            <i class="iconfont iconzhuye" /> 个人中心
          </router-link>
        </div>
        <div class="menus-item" @click="logout()">
          <router-link to=" ">
            <i class="iconfont iconguidang" /> 退出登录
          </router-link>
        </div>
      </div>
    </div>
  </v-app-bar>
</template>

<script>
export default {
  mounted() {
    window.addEventListener("scroll", this.scroll);
  },
  data: function() {
    return {
      navClass: ""
    };
  },
  methods: {
    scroll() {
      const that = this;
      that.scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (that.scrollTop > 60) {
        that.navClass = "nav-fixed";
      } else {
        that.navClass = "nav";
      }
    },
    logout() {
      this.$cookies.remove("userName", "/");
      this.$cookies.remove("userId", "/");
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped>
@import "../../assets/css/components/topNavBar.css";
</style>
