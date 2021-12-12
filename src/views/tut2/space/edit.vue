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
        <div class="edit" id="edit">
          <div id="t1">
            <h3 class="wenzi1">标题：</h3>
            <div class="t">
              <el-input v-model="title" placeholder="请输入文章标题"></el-input>
            </div>
            <h3 class="wenzi1">文章简介：</h3>
            <div class="t">
              <el-input
                v-model="articleIntro"
                placeholder="请输入文章简介"
              ></el-input>
            </div>
            <div class="newPost_tags" id="t2">
              <h3 class="wenzi2" style="display: inline-block">兴趣标签：</h3>
              <el-tag
                :key="tag"
                v-for="tag in interestTags"
                closable
                :disable-transitions="false"
                @close="interestHandleClose(tag)"
              >
                {{ tag.tagContent }}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="interestInputVisible"
                v-model="interestInputValue"
                ref="interestSaveTagInput"
                size="small"
                @keyup.enter.native="interestHandleInputConfirm"
                @blur="interestHandleInputConfirm"
              >
              </el-input>
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="interestShowInput"
                >+ 新标签
              </el-button>
            </div>
            <div class="newPost_tags" id="t3">
              <h3 class="wenzi2" style="display: inline-block">地点标签：</h3>
              <el-tag
                :key="tag"
                v-for="tag in spotTags"
                closable
                :disable-transitions="false"
                @close="spotHandleClose(tag)"
              >
                {{ tag.tagContent }}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="spotInputVisible"
                v-model="spotInputValue"
                ref="spotSaveTagInput"
                size="small"
                @keyup.enter.native="spotHandleInputConfirm"
                @blur="spotHandleInputConfirm"
              >
              </el-input>
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="spotShowInput"
                >+ 新标签
              </el-button>
            </div>
            <div>
              <h3 class="wenzi2" style="display: inline-block">文章封面：</h3>
              <div
                class="edit_mediaArea_typeSelector"
                style="display: inline-block"
              >
                <el-select v-model="mediaType" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
              <div class="newPost_mediaArea_picture" v-if="mediaType === 1">
                <el-upload
                  class="upload-demo"
                  :action="picUrl"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :file-list="tempPictures"
                  :on-success="addPictureSuccess"
                  name="upfile"
                  list-type="picture"
                  multiple
                  :limit="1"
                  :on-exceed="handleExceed"
                  :before-remove="beforeRemove"
                >
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
              </div>
            </div>
            <vue-tinymce v-model="content" :setting="setting" />
            <div id="buttons">
              <el-button @click="publish(content)">发布</el-button>
              <el-button @click="clear()">清空</el-button>
            </div>
          </div>
        </div>
      </div>
    </main>
    <footer id="footer2">
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
      }"
      >
        TOP
      </div>
    </el-backtop>
  </div>
</template>

<script>
import { space_loadUserInfo } from "@/api/api";
import TopNavBar from "@/components/layout/TopNavBar";
import { errorCode } from "@/api/errorCode";

export default {
  // 个人空间
  name: "edit",
  data() {
    return {
      articleIntro: "",
      pictures: null,
      tempPictures: null,
      picUrl: null,
      mediaType: 0,
      interestTags: [],
      interestInputVisible: false,
      interestInputValue: null,
      spotTags: [],
      spotInputVisible: false,
      spotInputValue: null,
      options: [
        {
          value: 0,
          label: "无"
        },
        {
          value: 1,
          label: "图片"
        }
      ],
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
      imgs: [],
      imgData: {
        accept: "image/gif, image/jpeg, image/png, image/jpg"
      },
      // content: '<h1 style="text-align: center;">长恨歌</h1><p style="text-align: center;">汉皇重色思倾国，御宇多年求不得。<br />杨家有女初长成，养在深闺人未识。<br />天生丽质难自弃，一朝选在君王侧。<br />回眸一笑百媚生，六宫粉黛无颜色。<br />春寒赐浴华清池，温泉水滑洗凝脂。<br />侍儿扶起娇无力，始是新承恩泽时。<br />云鬓花颜金步摇，芙蓉帐暖度春宵。<br />春宵苦短日高起，从此君王不早朝。<br />承欢侍宴无闲暇，春从春游夜专夜。<br />后宫佳丽三千人，三千宠爱在一身。<br />金屋妆成娇侍夜，玉楼宴罢醉和春。<br />姊妹弟兄皆列土，可怜光彩生门户。<br />遂令天下父母心，不重生男重生女。<br />骊宫高处入青云，仙乐风飘处处闻。<br />缓歌慢舞凝丝竹，尽日君王看不足。<br />渔阳鼙鼓动地来，惊破霓裳羽衣曲。</p><p style="text-align: center;">九重城阙烟尘生，千乘万骑西南行。<br />翠华摇摇行复止，西出都门百余里。<br />六军不发无奈何，宛转蛾眉马前死。<br />花钿委地无人收，翠翘金雀玉搔头。<br />君王掩面救不得，回看血泪相和流。<br />黄埃散漫风萧索，云栈萦纡登剑阁。<br />峨嵋山下少人行，旌旗无光日色薄。<br />蜀江水碧蜀山青，圣主朝朝暮暮情。<br />行宫见月伤心色，夜雨闻铃肠断声。<br />天旋日转回龙驭，到此踌躇不能去。<br />马嵬坡下泥土中，不见玉颜空死处。<br />君臣相顾尽沾衣，东望都门信马归。<br />归来池苑皆依旧，太液芙蓉未央柳。<br />芙蓉如面柳如眉，对此如何不泪垂。<br />春风桃李花开夜，秋雨梧桐叶落时。<br />西宫南苑多秋草，落叶满阶红不扫。<br />梨园弟子白发新，椒房阿监青娥老。<br />夕殿萤飞思悄然，孤灯挑尽未成眠。<br />迟迟钟鼓初长夜，耿耿星河欲曙天。<br />鸳鸯瓦冷霜华重，翡翠衾寒谁与共。<br />悠悠生死别经年，魂魄不曾来入梦。</p><p style="text-align: center;">临邛道士鸿都客，能以精诚致魂魄。<br />为感君王辗转思，遂教方士殷勤觅。<br />排空驭气奔如电，升天入地求之遍。<br />上穷碧落下黄泉，两处茫茫皆不见。<br />忽闻海上有仙山，山在虚无缥缈间。<br />楼阁玲珑五云起，其中绰约多仙子。<br />中有一人字太真，雪肤花貌参差是。<br />金阙西厢叩玉扃，转教小玉报双成。<br />闻道汉家天子使，九华帐里梦魂惊。<br />揽衣推枕起徘徊，珠箔银屏迤逦开。<br />云鬓半偏新睡觉，花冠不整下堂来。</p><p style="text-align: center;">风吹仙袂飘飖举，犹似霓裳羽衣舞。<br />玉容寂寞泪阑干，梨花一枝春带雨。<br />含情凝睇谢君王，一别音容两渺茫。<br />昭阳殿里恩爱绝，蓬莱宫中日月长。<br />回头下望人寰处，不见长安见尘雾。<br />惟将旧物表深情，钿合金钗寄将去。<br />钗留一股合一扇，钗擘黄金合分钿。<br />但令心似金钿坚，天上人间会相见。</p><p style="text-align: center;">临别殷勤重寄词，词中有誓两心知。<br />七月七日长生殿，夜半无人私语时。<br />在天愿作比翼鸟，在地愿为连理枝。<br />天长地久有时尽，此恨绵绵无绝期。</p>',
      content: "",
      title: "",
      setting: {
        menubar: false,
        toolbar:
          "undo redo | fullscreen | formatselect alignleft aligncenter alignright alignjustify | link unlink | numlist bullist | image media table | fontselect fontsizeselect forecolor backcolor | bold italic underline strikethrough | indent outdent | superscript subscript | removeformat |",
        toolbar_drawer: "sliding",
        quickbars_selection_toolbar:
          "removeformat | bold italic underline strikethrough | fontsizeselect forecolor backcolor",
        plugins: "link image media table lists fullscreen quickbars",
        language: "zh_CN", //本地化设置
        height: 600,
        images_upload_handler: (blobInfo, success, failure) => {
          if (blobInfo.blob().size > self.maxSize) {
            console.log("文件体积过大");
            failure("文件体积过大");
          }
          console.log(blobInfo.blob());
          console.log(blobInfo.blob().type);
          console.log(this.imgData.accept.indexOf(blobInfo.blob().type));
          if (this.imgData.accept.indexOf(blobInfo.blob().type) !== -1) {
            let formData = new FormData();
            // 服务端接收文件的参数名，文件数据，文件名
            formData.append("upfile", blobInfo.blob(), blobInfo.filename());
            console.log(formData);
            this.axios
              .post(
                "http://192.168.43.123:8089/ssm_war_exploded/addNewPicture/" +
                  this.userId +
                  "&",
                formData,
                {
                  headers: { "Content-Type": "multipart/form-data" }
                }
              )
              .then(res => {
                // 这里返回的是你图片的地址
                console.log("1");
                console.log(res.data.url);
                success(res.data.url);
              })
              .catch(() => {
                failure("上传失败");
              });
          } else {
            console.log("图片格式错误");
            failure("图片格式错误");
          }
        }
        // images_upload_handler: (blobInfo, success) => {
        //   let base64 = "data:image/png;base64," + blobInfo.base64();
        //   //编辑器的上传图片内容被处理为<img src="success方法里面的参数" />
        //   success(base64);
        // }
      }
    };
  },
  created() {
    this.username = this.$cookies.get("username");
    this.userId = this.$cookies.get("userId");
    space_loadUserInfo(this.userId).then(response => {
      if (errorCode(response.data.code)) {
        this.userInformation = response.data.userInformation;
      }
    });
    this.spotInputValue = "";
    this.interestInputValue = "";
    this.picUrl =
      "http://192.168.43.123:8089/ssm_war_exploded/addNewPicture/" +
      this.userId +
      "&";
  },
  methods: {
    publish(content) {
      console.log(this.title);
      console.log(this.content);
      this.axios
        .post("http://192.168.43.123:8089/ssm_war_exploded/releaseArticle", {
          userId: this.userId,
          articleCover: this.pictures,
          articleTitle: this.title,
          articleContent: content,
          interestTags: this.interestTags,
          spotTags: this.spotTags,
          articleIntro: this.articleIntro
        })
        .then(res => {
          console.log(res);
          this.$cookies.set("articleId", res.data.articleId, "7d", "/");
          console.log(this.$cookies.get("articleId"));
          this.$router.push("./article");
        });
    },
    clear() {
      this.content = "";
    },
    interestHandleClose(tag) {
      this.interestTags.splice(this.interestTags.indexOf(tag), 1);
    },
    spotHandleClose(tag) {
      this.spotTags.splice(this.spotTags.indexOf(tag), 1);
    },
    interestHandleInputConfirm() {
      let interestInputValue = { tagContent: this.interestInputValue };
      if (interestInputValue.tagContent) {
        this.interestTags.push(interestInputValue);
      }
      this.interestInputVisible = false;
      this.interestInputValue = "";
    },
    spotHandleInputConfirm() {
      let spotInputValue = { tagContent: this.spotInputValue };
      if (spotInputValue.tagContent) {
        this.spotTags.push(spotInputValue);
      }
      this.spotInputVisible = false;
      this.spotInputValue = "";
    },
    interestShowInput() {
      this.interestInputVisible = true;
      // eslint-disable-next-line no-unused-vars
      this.$nextTick(_ => {
        this.$refs.interestSaveTagInput.$refs.input.focus();
      });
    },
    spotShowInput() {
      this.spotInputVisible = true;
      // eslint-disable-next-line no-unused-vars
      this.$nextTick(_ => {
        this.$refs.spotSaveTagInput.$refs.input.focus();
      });
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
        this.pictures = res.url;
        console.log(this.pictures);
      }
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file) {
      return this.$confirm(`确定移除 ${file.name}？`);
    }
  },
  watch: {
    content(newContent) {
      this.content = newContent;
    }
  },
  components: {
    TopNavBar
  }
};
</script>

<style scoped>
.edit_mediaArea_typeSelector {
  margin-bottom: 10px;
  margin-left: 10px;
}

.wenzi1 {
  background-color: #b3d4fc;
  padding-left: 15px;
  margin-bottom: 0.2rem;
  margin-top: 0;
}

.wenzi2 {
  background-color: #b3d4fc;
  padding-left: 15px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
  margin: 0 0 0 0;
}

.edit {
  width: 1000px;
  margin-top: 10px;
  /*background-color: #dddddd;*/
}

#buttons {
  padding-top: 10px;
}

.t {
  height: 40px;
  margin-bottom: 0.4rem;
  margin-top: 0;
}

#t2 {
  height: 35px;
  margin-bottom: 0.4rem;
  margin-top: 0;
}

#t3 {
  height: 35px;
  margin-bottom: 0.4rem;
}

#t1 {
  height: 1000px;
}

.el-tag + .el-tag {
  margin-left: 10px;
}

.el-tag {
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

#footer2 {
  position: relative;
  margin-top: 100px;
  background-attachment: local;
  background-position: bottom;
  background-size: cover;
}
</style>
