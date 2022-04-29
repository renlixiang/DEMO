<template>
  <div class="container">
    <div class="carousel" @mouseleave="runTimer" @mouseenter="stopTimer">
      <div class="icon" v-show="showIcon">
      <i
        class="el-icon-arrow-left"
        @click="rightMove"></i>
      <i
        class="el-icon-arrow-right"
        @click="leftMove"></i>
      <ul class="control">
        <li @click="showImg1"
            :class="1 === flag? 'slider-active': 'slider'">
        </li>
        <li @click="showImg2"
            :class="2 === flag? 'slider-active': 'slider'">
        </li>
        <li @click="showImg3"
            :class="3 === flag? 'slider-active': 'slider'">
        </li>
      </ul>
      </div>
        <div class="image">
          <transition-group :name="name">
            <div class="jpg" v-show="currentIndex === imgArr[0]? flag = imgArr[0] : false" :key="imgArr[0]">
              <img src="../assets/bgyulan.png" alt="" height="300px" width="500px">
            </div>
            <div class="jpg" v-show="currentIndex === imgArr[1]? flag = imgArr[1] : false" :key="imgArr[1]">
              <img src="../assets/bghuang.jpg" alt="" height="300px" width="500px">
            </div>
            <div class="jpg" v-show="currentIndex === imgArr[2]? flag = imgArr[2] : false" :key="imgArr[2]">
              <img src="../assets/bgfengzheng.png" alt="" height="300px" width="500px">
            </div>
          </transition-group>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "vueCarousel",
  data () {
    return {
      timer: '',
      name: 'left',
      imgArr: [1, 2, 3],
      showIcon: false,
      currentIndex: 1,
      flag: 1
    }
  },
  mounted() {
    this.change()
  },
  methods: {
    change: function () {
      this.timer = setInterval(() => {
        this.rightImg()

      }, 2000)
    },
    leftImg: function () {
      this.name = 'left'
      if (this.currentIndex === 1) {
        this.currentIndex = 3
      } else {
        this.currentIndex --
      }
    },
    rightImg: function () {
      this.name = 'right'
      if (this.currentIndex === 3) {
        this.currentIndex = 1
      } else {
        this.currentIndex ++
      }
    },
    rightMove: function () {
      clearInterval(this.timer)
      this.rightImg()
    },
    leftMove: function () {
      clearInterval(this.timer)
      this.leftImg()
    },
    stopTimer: function () {
      clearInterval(this.timer)
      this.showIcon = true
    },
    runTimer: function () {
      this.change()
      this.showIcon = false
    },
    showImg1: function () {
      while (this.currentIndex !== 1) {
        this.leftImg()
      }
    },
    showImg2: function () {
      if (this.currentIndex > 2) {
        while (this.currentIndex !== 2) {
          this.leftImg()
        }
      } else {
        while (this.currentIndex !== 2) {
          this.rightImg()
        }
      }
    },
    showImg3: function () {
      if (this.currentIndex < 2) {
        this.leftImg()
        this.currentIndex = 3
      } else {
        this.rightImg()
        this.currentIndex = 3
      }
    }
  }
}
</script>

<style scoped lang="less">
.container{
  width: 100%;
  height: 100%;
  .carousel {
    width: 500px;
    height: 300px;
    position: relative;
    overflow: hidden;
    //top: 210px;
    .image {
      position: relative;
      width: 500px;
      height: 300px;
      overflow: hidden;
      display: inline;
      .jpg {
        position: absolute;
        top: 0;
        left: 0;
      }
      .left-enter-active, .left-leave-active {
        //transform: translateY(-100%);
        transition: all 1s linear;
      }
      .left-leave-to {
        transform: translateX(100%);
      }
      .left-enter {
        transform: translateX(-100%);
      }
      .right-enter-active, .right-leave-active {
        //transform: translateY(-100%);
        transition: all 1s linear;
      }
      .right-leave-to {
        transform: translateX(-100%);
      }
      .right-enter {
        transform: translateX(100%);
      }
    }
    .icon {
      position: absolute;
      top: 135px;
      z-index: 5;
      .el-icon-arrow-left {
        //top: 50px;
        font-size: 30px;
        color: black;
        top: 100px;
        //z-index: 99;
        padding-left: 15px;
      }
      .el-icon-arrow-right {
        top: 100px;
        font-size: 30px;
        color: black;
        padding-left: 410px;
      }
    }
    .control {
      margin: 96px auto;
      width: 60px;
      .slider {
        display: inline-block;
        list-style: none;
        width: 10px;
        height: 10px;
        border-radius: 5px;
        background-color: #fcede4;
        opacity: .5;
        margin-right: 10px;
      }
      .slider-active {
        display: inline-block;
        list-style: none;
        width: 10px;
        height: 10px;
        border-radius: 5px;
        background-color: #fcede4;
        margin-right: 10px;
      }
    }
  }
}
</style>
