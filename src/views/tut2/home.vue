<template>
  <div :style="conTop" class="homeTitle">
    <main id="home-main">
      <div class="home-name">
        新&nbsp;&nbsp;青&nbsp;&nbsp;年&nbsp;&nbsp;·&nbsp;&nbsp;逍&nbsp;&nbsp;遥&nbsp;&nbsp;游
      </div>
      <div class="home-description">「其生若浮，其死若休」</div>
      <div class="home-tr"></div>
      <a
        class="mdui-btn mdui-btn-raised home-btn mdui-text-capitalize"
        href="/login"
        >登录</a
      >
      <!--div class="home-tr"></div>
      <a
        class="mdui-btn mdui-btn-raised home-btn mdui-text-capitalize"
        href="/noRegister"
        >游客参观</a
      >
      <div class="home-tr"></div-->
    </main>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      conTop: {
        backgroundImage: "url(https://tu.ltyuanfang.cn/api/fengjing.php)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
      }
    };
  }
};
</script>

<style scoped>
@import "../../assets/css/home.css";
</style>
