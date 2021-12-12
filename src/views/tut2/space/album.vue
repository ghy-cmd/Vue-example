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
      <div class="layout_page_ver" id="content-inner">
        <div class="upper_content" id="upper_content">
          <div class="card-widget card-info">
            <div class="card-content">
              <div class="upper_img">
                <img
                  class="avatar-img"
                  :src="userInformation.personalInformation.userImage"
                  alt="avatar"
                />
              </div>
              <div class="upper_username">
                <span class="upper_username_text"
                  >{{
                    userInformation.personalInformation.userName
                  }}
                  的相册</span
                >
                <br /><br />
                <span class="upper_intro">{{
                  userInformation.personalInformation.userIntroduction
                }}</span>
              </div>
              <div class="upper_weather">
                <iframe
                  allowtransparency="true"
                  frameborder="0"
                  width="255"
                  height="98"
                  scrolling="no"
                  src="//tianqi.2345.com/plugin/widget/index.htm?s=1&z=1&t=1&v=0&d=1&bd=0&k=000000&f=008040&ltf=009944&htf=cc0000&q=1&e=0&a=1&c=54511&w=255&h=98&align=center"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
        <div class="lower_content" id="lower_content">
          <div class="card-widget card-info">
            <div class="card-content" v-if="albumsPage">
              <el-row style="width: 100%">
                <el-col
                  :span="4"
                  v-for="(album, index) in albums"
                  :key="album.albumId"
                  :offset="index % 5 === 0 ? 0 : 1"
                >
                  <transition name="el-fade-in-linear">
                    <el-card
                      :body-style="{ padding: '0px' }"
                      class="album_container"
                    >
                      <div class="album_img">
                        <img
                          :src="album.albumCover"
                          class="image"
                          alt=""
                          @click="viewAlbum(album.albumId)"
                        />
                      </div>
                      <div class="album_content">
                        <div @click="viewAlbum(album.albumId)">
                          <span>{{ album.albumName }}</span>
                        </div>
                        <div class="bottom clearfix">
                          <i
                            class="el-icon-delete"
                            id="album_delete"
                            @click="click_del(album)"
                          ></i>
                        </div>
                      </div>
                      <el-dialog
                        title="提示"
                        :visible.sync="delAlbumBox"
                        width="30%"
                        center
                      >
                        <span>确定要删除么？</span>
                        <span slot="footer" class="dialog-footer">
                          <el-button @click="delAlbumBox = false"
                            >取 消</el-button
                          >
                          <el-button
                            type="primary"
                            @click="delAlbum(del_album.albumId)"
                            >确 定</el-button
                          >
                        </span>
                      </el-dialog>
                    </el-card>
                  </transition>
                </el-col>
              </el-row>
            </div>
            <div class="card-content" v-if="!albumsPage">
              <div class="view_album_container">
                <el-page-header
                  @back="albumsPage = true"
                  :content="view_album.albumName"
                >
                </el-page-header>
                <img
                  src="https://img.zcool.cn/community/01cdf85c10cb89a80121ab5d02c2cf.png@1280w_1l_2o_100sh.png"
                  class="album_null"
                  v-if="view_album.pictures.length === 0"
                  alt=""
                />
                <div
                  class="view_picture"
                  v-if="!(view_album.pictures.length === 0)"
                >
                  <el-row style="width: 100%">
                    <el-col
                      :span="4"
                      v-for="(picture, index) in view_album.pictures"
                      :key="picture.albumId"
                      :offset="0"
                    >
                      <transition name="el-fade-in-linear">
                        <div class="view_picture_container" v-if="!delMode">
                          <div class="view_picture_img_outer">
                            <img
                              :src="picture.picture"
                              class="view_picture_img"
                              alt=""
                              @click="open_drawer(index)"
                            />
                          </div>
                        </div>
                        <div
                          class="view_picture_container deldel"
                          v-if="delMode"
                        >
                          <div class="view_picture_img_outer">
                            <img
                              :src="picture.picture"
                              class="view_picture_img"
                              alt=""
                              @click="open_drawer(index)"
                            />
                          </div>
                          <div class="bottom clearfix">
                            <i
                              class="el-icon-delete"
                              id="picture_delete"
                              @click="
                                delAlbumBox = true;
                                delPictureId = picture.pictureId;
                                delPictureUrl = picture.picture;
                              "
                            ></i>
                            <el-dialog
                              title="提示"
                              :visible.sync="delAlbumBox"
                              width="30%"
                              center
                            >
                              <span>确定要删除么？</span>
                              <span slot="footer" class="dialog-footer">
                                <el-button @click="delAlbumBox = false"
                                  >取 消</el-button
                                >
                                <el-button
                                  type="primary"
                                  @click="
                                    delPicture(delPictureId, delPictureUrl)
                                  "
                                  >确 定</el-button
                                >
                              </span>
                            </el-dialog>
                          </div>
                        </div>
                      </transition>
                    </el-col>
                  </el-row>
                  <el-drawer
                    title=""
                    :visible.sync="picture_drawer"
                    :with-header="false"
                    direction="btt"
                    size="90%"
                    style="background-color: black"
                    v-if="!delMode"
                    :destroy-on-close="true"
                  >
                    <div class="picture_drawer_container">
                      <el-carousel
                        :interval="4000"
                        type="card"
                        height="40rem"
                        :autoplay="false"
                        style="width: 100%"
                        :loop="false"
                        :initial-index="view_picture"
                      >
                        <el-carousel-item
                          v-for="picture in view_album.pictures"
                          :key="picture.pictureId"
                        >
                          <img :src="picture.picture" class="image" alt="" />
                        </el-carousel-item>
                      </el-carousel>
                    </div>
                  </el-drawer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <footer id="footer">
      <div id="footer-wrap">
        <div class="copyright">&copy;2021 BY Hecate</div>
      </div>
    </footer>
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
    <el-backtop :bottom="60" :visibility-height="0" @click="pressNew()">
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
    <el-backtop
      :bottom="110"
      :visibility-height="0"
      @click="openDelMode()"
      v-if="!albumsPage & !delMode"
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
        DEL
      </div>
    </el-backtop>
    <el-backtop
      :bottom="110"
      :visibility-height="0"
      @click="closeDelMode()"
      v-if="!albumsPage & delMode"
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
        EXIT
      </div>
    </el-backtop>
    <el-dialog
      title="创建新相册"
      :visible.sync="newAlbumBox"
      width="30%"
      center
    >
      <el-form :model="newAlbumForm">
        <el-form-item label="相册名称" label-width="80px">
          <el-input
            v-model="newAlbumForm.albumName"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="newAlbumBox = false">取 消</el-button>
        <el-button type="primary" @click="newAlbum()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="添加新图片"
      :visible.sync="newPictureBox"
      width="30%"
      center
      :destroy-on-close="true"
    >
      <el-upload
        :action="addPictureUrl"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        name="upfile"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="" />
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import TopNavBar from "@/components/layout/TopNavBar";
import {
  album_delAlbum,
  album_delPicture,
  album_getAlbums,
  album_getPictures,
  album_newAlbum,
  space_loadUserInfo
} from "@/api/api";
import { errorCode } from "@/api/errorCode";

export default {
  name: "album",
  data() {
    return {
      albumsPage: true,
      delPictureId: null,
      delPictureUrl: null,
      dialogImageUrl: "",
      dialogVisible: false,
      newAlbumBox: false,
      delAlbumBox: false,
      userName: null,
      userId: null,
      userInformation: {
        personalInformation: {
          userId: null,
          userName: null,
          userImage: null,
          userIntroduction: null
        }
      },
      albums: [],
      newAlbumForm: {
        albumName: null
      },
      picture_drawer: false,
      del_picture: false,
      view_picture: 1,
      view_albumId: "1",
      delMode: false,
      newPictureBox: false,
      addPictureUrl:
        "http://192.168.223.159:8089/ssm_war_exploded/addNewPicture/",
      view_album: null,
      del_album: {
        albumName: ""
      }
    };
  },
  created() {
    this.userName = this.$cookies.get("userName");
    this.userId = this.$cookies.get("userId");
    space_loadUserInfo(this.userId).then(response => {
      if (errorCode(response.data.code)) {
        this.userInformation = response.data.userInformation;
      }
    });
    album_getAlbums(this.userId).then(response => {
      if (errorCode(response.data.code)) {
        this.albums = response.data.albums;
      }
    });
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    newAlbum() {
      album_newAlbum(this.userId, this.newAlbumForm.albumName).then(
        response => {
          if (errorCode(response.data.code)) {
            this.$message({
              message: "创建成功!",
              type: "success"
            });
            this.newAlbumForm.albumName = null;
            this.newAlbumBox = false;
            this.albumsPage = true;
            album_getAlbums(this.userId).then(response => {
              if (errorCode(response.data.code)) {
                this.albums = response.data.albums;
              }
            });
          } else {
            this.$message({
              message: "创建失败！",
              type: "warning"
            });
          }
        }
      );
    },
    viewAlbum(albumId) {
      this.view_albumId = albumId;
      this.addPictureUrl =
        "http://192.168.43.123:8089/ssm_war_exploded/addNewPicture/" +
        this.userId +
        "&" +
        albumId;
      this.albumsPage = false;
      album_getPictures(albumId).then(response => {
        if (errorCode(response.data.code)) {
          this.view_album = response.data.view_album;
        }
      });
    },
    delAlbum(albumId) {
      album_delAlbum(albumId).then(response => {
        if (errorCode(response.data.code)) {
          this.delAlbumBox = false;
          this.$router.go(0);
        } else {
          this.delAlbumBox = false;
          this.$message({
            message: "删除失败！",
            type: "warning"
          });
        }
      });
    },
    delPicture(pictureId, url) {
      album_delPicture(this.view_albumId, pictureId, url).then(response => {
        if (errorCode(response.data.code)) {
          this.delAlbumBox = false;
          album_getPictures(this.view_album.albumId).then(response => {
            if (errorCode(response.data.code)) {
              this.view_album = response.data.view_album;
            }
          });
        } else {
          this.delAlbumBox = false;
          this.$message({
            message: "删除失败！",
            type: "warning"
          });
        }
      });
    },
    open_drawer(index) {
      this.view_picture = index;
      this.picture_drawer = true;
    },
    openDelMode() {
      this.delMode = true;
    },
    closeDelMode() {
      this.delMode = false;
      this.picture_drawer = false;
    },
    pressNew() {
      if (this.albumsPage) {
        this.newAlbumBox = true;
      } else {
        this.newPictureBox = true;
      }
    },
    refreshPictures() {
      album_getPictures(this.view_album.albumId).then(response => {
        if (errorCode(response.data.code)) {
          this.view_album = response.data.view_album;
        }
      });
    },
    click_del(album) {
      this.del_album = album;
      this.delAlbumBox = true;
    }
  },
  components: {
    TopNavBar
  }
};
</script>

<style scoped>
@import "../../../assets/css/space/album.css";
::v-deep .el-drawer__body {
  background-color: black;
}
</style>
