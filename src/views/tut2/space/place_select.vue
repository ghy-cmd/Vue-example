<template>
  <div>
    <div
      id="mapChart"
      ref="mapChart"
      style="position: absolute; width: 100%; height: 100%"
    ></div>
    <div id="tip">
      <input
        type="text"
        id="keyword"
        name="keyword"
        :value="value"
        onfocus='this.value=""'
        autocomplete="off"
      />
    </div>
    <div id="panel"></div>
    <el-button type="primary" @click="search" id="search" size="mini"
      >搜索
    </el-button>
    <el-button
      type="primary"
      size="mini"
      id="confirm"
      v-if="queren"
      @click="test"
      >确认
    </el-button>
  </div>
</template>

<script>
export default {
  name: "place_select",
  data() {
    return {
      autoOptions: {
        input: "keyword"
      },
      value: "请输入关键字",
      queren: false,
      deteail: null,
      username: null,
      userId: null,
      spotId: 9
    };
  },
  created() {
    this.username = this.$cookies.get("username");
    this.userId = this.$cookies.get("userId");
    this.spotId = this.$cookies.get("scenicSpotId");
    this.value = '输入"' + this.$cookies.get("spotContent") + '"试试吧~';
    var url =
      "https://webapi.amap.com/maps?v=1.4.15&key=8b58238c3c16bade33fba0e03f631dc8&callback=onLoad";
    var jsapi = document.createElement("script");
    jsapi.charset = "utf-8";
    jsapi.src = url;
    document.head.appendChild(jsapi);
    // this.mapFn();
  },
  mounted() {
    // this.$nextTick(()=>{
    //   this.mapFn();
    // })
    // let _this=this;
    // setTimeout(function (){
    //   _this.mapFn()
    // },20)
    this.mapFn();
  },
  methods: {
    mapFn() {
      var _this = this;
      window.onload = function() {
        // eslint-disable-next-line no-undef
        _this.map = new AMap.Map("mapChart", {
          resizeEnable: true,
          // center: [116.397428, 39.90923],
          viewMode: "3D", //使用3D视图
          zoom: 14
          // mapStyle: "amap://styles/darkblue",
        });
        // eslint-disable-next-line no-undef
        _this.infoWindow = new AMap.InfoWindow({
          anchor: "top-left",
          content: "hbdh" //传入 dom 对象，或者 html 字符串
        });
        // // eslint-disable-next-line no-undef
        // _this.marker = new AMap.Marker({
        //   map: _this.map,
        //   visible: false
        // });
        // eslint-disable-next-line no-undef
        AMap.plugin(["AMap.Autocomplete", "AMap.PlaceSearch"], function() {
          var autoOptions = {
            input: "keyword" //使用联想输入的input的id
          };
          // eslint-disable-next-line no-undef
          _this.autocomplete = new AMap.Autocomplete(autoOptions);

          // eslint-disable-next-line no-undef
          _this.placeSearch = new AMap.PlaceSearch({
            map: _this.map,
            // zoom: 14,
            pageSize: 5, // 单页显示结果条数
            pageIndex: 1, // 页码
            panel: "panel", // 结果列表将在此容器中进行展示。
            autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
          });

          // eslint-disable-next-line no-undef
          AMap.event.addListener(_this.autocomplete, "select", function(e) {
            //TODO 针对选中的poi实现自己的功能
            console.log(e);
            _this.placeSearch.setCity(e.poi.adcode);
            _this.placeSearch.search(e.poi.name);
            // _this.placeSearch.getDetails(e.poi.id, function (status, result) {
            //   function createContent(poi) {  //信息窗体内容
            //     var s = [];
            //     s.push("<b>名称：" + poi.name + "</b>");
            //     s.push("地址：" + poi.address);
            //     s.push("电话：" + poi.tel);
            //     s.push("类型：" + poi.type);
            //     return s.join("<br>");
            //   }
            // function selectP() {
            //   console.log("ggg")
            // }
            //
            // if (status === 'complete' && result.info === 'OK') {
            //   _this.poiArr = result.poiList.pois;
            //   //添加marker
            //   // eslint-disable-next-line no-undef
            //   _this.marker = new AMap.Marker({
            //     map: _this.map,
            //     position: _this.poiArr[0].location
            //   });
            //   _this.map.setCenter(_this.marker.getPosition());
            //   _this.infoWindow.setContent(createContent(_this.poiArr[0]));
            //   _this.infoWindow.open(_this.map, _this.marker.getPosition());
            //   _this.marker.on('click', selectP)
            // }
          });

          // eslint-disable-next-line no-undef
          AMap.event.addListener(_this.placeSearch, "selectChanged", function(
            e
          ) {
            console.log(e);
            _this.detail = e;
            _this.queren = true;
          });
        });
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
    },
    search() {
      let _this = this;
      console.log(document.getElementById("keyword").value);
      _this.placeSearch.search(document.getElementById("keyword").value);
    },
    test() {
      console.log(this.detail);
      console.log(this.detail.selected.data.location.lng);
      this.$confirm("确定选择该地点作为标签地点？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.axios.post(
          "http://192.168.43.123:8089/ssm_war_exploded/updateXY",
          {
            spotId: this.spotId,
            // modifyId: this.userId,
            x: this.detail.selected.data.location.lng,
            y: this.detail.selected.data.location.lat
          }
        );
        this.$message({
          type: "success",
          message: "成功!"
        });
        this.$router.push("/place");
        // console.log("aa");
        window.location.reload();
      });
    }
  }
};
</script>

<style>
#tip {
  background-color: #ddf;
  color: #333;
  border: 1px solid silver;
  box-shadow: 3px 4px 3px 0px silver;
  position: absolute;
  top: 10px;
  left: 10px;
  border-radius: 5px;
  overflow: hidden;
  line-height: 20px;
}

#tip input[type="text"] {
  height: 25px;
  border: 0;
  padding-left: 5px;
  width: 280px;
  border-radius: 3px;
  outline: none;
}

#panel {
  position: absolute;
  background-color: white;
  max-height: 90%;
  overflow-y: auto;
  top: 50px;
  left: 10px;
  width: 280px;
}

#search {
  border: 1px solid silver;
  box-shadow: 3px 4px 3px 0px silver;
  position: absolute;
  top: 10px;
  left: 295px;
  overflow: hidden;
  border-radius: 5px;
  background-color: #00aaee;
  /*line-height: 20px;*/
  /*height: 25px;*/
}

#confirm {
  border: 1px solid silver;
  box-shadow: 3px 4px 3px 0px silver;
  position: absolute;
  top: 10px;
  left: 344px;
  overflow: hidden;
  border-radius: 5px;
  background-color: #22c233;
}
</style>
