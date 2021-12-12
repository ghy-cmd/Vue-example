<template>
  <div id="place-album-content" v-if="!albumsPage" style="margin-top: 60px">
    <TopNavBar id="navgation"></TopNavBar>
    <div style="margin-bottom: 13px;position: relative">
      <div
        style="vertical-align: middle;display: inline-block;margin-left: 16px"
      >
        <h4 style="font-size: 24px;margin-bottom: 2px;margin-top: 0">
          {{ tagName }}
        </h4>
        <h4 style="font-size: 14px;color: #9195A3;display: block;margin: 0">
          共
          <span style="margin: 0 3px">{{ pictures.length }}</span>
          张图片
        </h4>
      </div>
    </div>
    <div class="view_album_container" id="aaaaa">
      <img
        src="https://img.zcool.cn/community/01cdf85c10cb89a80121ab5d02c2cf.png@1280w_1l_2o_100sh.png"
        class="album_null"
        v-if="pictures.length === 0"
        alt=""
      />
      <div
        class="view_picture"
        v-if="!(pictures.length === 0)"
        style="margin-top: 0"
      >
        <el-row style="width: 100%;display: block">
          <el-col
            :span="4"
            v-for="(picture, index) in pictures"
            :key="picture.albumId"
            :offset="0"
          >
            <transition name="el-fade-in-linear">
              <div class="view_picture_container" v-if="!delMode">
                <div class="view_picture_img_outer">
                  <img
                    :src="picture.pictureURL"
                    class="view_picture_img"
                    alt=""
                    @click="open_drawer(index)"
                  />
                </div>
              </div>
            </transition>
          </el-col>
        </el-row>
        <el-drawer
          title=""
          :visible.sync="picture_drawer"
          :with-header="false"
          direction="ttb"
          size="90%"
          style="background-color: transparent"
          v-if="!delMode"
          :destroy-on-close="true"
        >
          <div class="picture_drawer_container">
            <el-carousel
              :interval="4000"
              type="card"
              height="40rem"
              :autoplay="false"
              style="width: 100%;height:100%"
              :loop="false"
              :initial-index="view_picture"
            >
              <el-carousel-item
                v-for="picture in pictures"
                :key="picture.pictureId"
              >
                <img :src="picture.picture" class="image" alt="" />
              </el-carousel-item>
            </el-carousel>
          </div>
        </el-drawer>
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
  </div>
</template>

<script>
import TopNavBar from "@/components/layout/TopNavBar";

export default {
  name: "place_album",
  created() {
    this.spotId = this.$route.query.id;
    console.log(this.$route.query);
    this.axios
      .post("http://192.168.43.123:8089/ssm_war_exploded/getSpotData", {
        spotId: this.spotId
      })
      .then(res => {
        this.pictures = res.data.pictures;
        this.tagName = res.data.spotContent;
      });
  },
  data() {
    return {
      spotId: "",
      pictures: [
        {
          pictureURL:
            "http://192.168.43.123:8089/ssm_war_exploded/albums/1639230133558/.default_1639230133558\\1639234316483_004BF3A87DE697288FB25D1EA270267D.jpg",
          uploadId: "1639230133558"
        }
      ],
      delMode: false,
      view_picture: 1,
      picture_drawer: false,
      tagName: null,
      picNum: 0
    };
  },
  methods: {
    open_drawer(index) {
      this.view_picture = index;
      this.picture_drawer = true;
    }
  },
  components: {
    TopNavBar
  }
};
</script>

<style scoped>
@import "../../../assets/css/space/album.css";

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

::v-deep .el-drawer__body {
  background-color: darkgrey;
}

#place-album-content {
  margin-top: 70px;
}
</style>
