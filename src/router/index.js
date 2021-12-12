import Vue from "vue";
import VueRouter from "vue-router";
import login from "@/views/tut2/login/login";
import register from "@/views/tut2/login/register";
import space from "@/views/tut2/space/space";
import chat from "@/views/tut2/space/chat";
import album from "@/views/tut2/space/album";
import circle from "@/views/tut2/space/circle";
import account from "@/views/tut2/space/account";
import world from "@/views/tut2/space/world";
import edit from "@/views/tut2/space/edit";
import article from "@/views/tut2/space/article";
import visit from "@/views/tut2/space/visit";
import noRegister from "@/views/tut2/noRegister";
import home from "@/views/tut2/home";
import place from "@/views/tut2/space/place";
import place_album from "@/views/tut2/space/place_album";
import place_select from "@/views/tut2/space/place_select";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: home,
    meta: {
      title: "新青年 · 逍遥游"
    }
  },
  {
    path: "/login",
    component: login,
    meta: {
      title: "登录 - 新青年 · 逍遥游"
    }
  },
  {
    path: "/register",
    component: register,
    meta: {
      title: "注册 - 新青年 · 逍遥游"
    }
  },
  {
    path: "/space",
    component: space,
    meta: {
      title: "个人空间 - 新青年 · 逍遥游"
    }
  },
  {
    path: "/chat",
    component: chat,
    meta: {
      title: "私信 - 新青年 · 逍遥游"
    }
  },
  {
    path: "/album",
    component: album,
    meta: {
      title: "相册 - 新青年 · 逍遥游"
    }
  },
  {
    path: "/circle",
    component: circle,
    meta: {
      title: "动态 - 新青年 · 逍遥游"
    }
  },
  {
    path: "/account",
    component: account,
    meta: {
      title: "个人中心 - 新青年 · 逍遥游"
    }
  },
  {
    path: "/world",
    component: world,
    meta: {
      title: "发现 - 新青年 · 逍遥游"
    }
  },
  {
    path: "/edit",
    component: edit,
    meta: {
      title: "创作 - 新青年 · 逍遥游"
    }
  },
  {
    path: "/article",
    component: article,
    meta: {
      title: "文章 - 新青年 · 逍遥游"
    }
  },
  {
    path: "/visit",
    component: visit,
    meta: {
      title: "个人空间 - 新青年 · 逍遥游"
    }
  },
  {
    path: "/place",
    component: place,
    meta: {
      title: "地点 - 新青年 · 逍遥游"
    }
  },
  {
    path: "/place_album",
    component: place_album,
    meta: {
      title: "地点相册 - 新青年 · 逍遥游"
    }
  },
  {
    path: "/noRegister",
    component: noRegister,
    meta: {
      title: "发现 - 新青年 · 逍遥游"
    }
  },
  {
    path: "/place_select",
    component: place_select,
    meta: {
      title: "新青年 · 逍遥游"
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
