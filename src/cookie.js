import Vue from "vue";
import VueCookies from "vue-cookies";

Vue.use(VueCookies);

/*

cookies 结构：

根目录
  |
  |-- username (String) 登录后生成，记录登录的用户名
  |
  |-- articleId (String) 点击文章后生成，记录所阅览的文章的ID
  |
  |-- scenicSpotId (String) 点击地点后生成，记录所查询的地点的Id
  |
  |-- keyWords (String) 点击搜索生成，记录搜索的关键词
  |
  |-- tagId (String) 点击标签生成，记录查阅的标签的Id

 */
