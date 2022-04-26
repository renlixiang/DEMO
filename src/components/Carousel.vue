<template>
  <div class="container">
    <div class="carousel" @mouseleave="runTimer" @mouseenter="stopTimer">
      <div class="icon" v-show="showIcon">
      <i
        class="el-icon-arrow-left"
        @click="leftMove"></i>
      <i
        class="el-icon-arrow-right"
        @click="rightMove"></i>
      <div class="control">
        <li @click="changeImg(item.id)"
            v-for="(item) in imgArr"
            :key="item.id"
            :class="item.id===currentIndex? 'active': '' "
        ></li>
      </div>
      </div>
        <div class="image">
          <transition-group :name="name">
            <div class="jpg" v-if="flag === 1" :key="imgArr[0]">
              <img src="../assets/bgyulan.png" alt="" height="300px" width="500px">
            </div>
            <div class="jpg" v-if="flag === 2" :key="imgArr[1]">
              <img src="../assets/bghuang.jpg" alt="" height="300px" width="500px">
            </div>
            <div class="jpg" v-if="flag === 3" :key="imgArr[2]">
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
      flag: 1,
      timer: '',
      name: 'left',
      imgArr: [1, 2, 3],
      showIcon: false
    }
  },
  mounted() {
    this.change()
    //   this.timer = setInterval(() => {
    //     this.rightImg()
    //   }, 3000)
  },
  methods: {
    change: function () {
      this.timer = setInterval(() => {
        this.rightImg()

      }, 3000)
    },
    leftImg: function () {
      this.name = 'left'
      if (this.flag === 1) {
        this.flag = 3
      } else {
        this.flag --
      }
    },
    rightImg: function () {
      this.name = 'right'
      if (this.flag === 3) {
        this.flag = 1
      } else {
        this.flag ++
      }
    },
    rightMove: function () {
      clearInterval(this.timer)
      // this.stopTimer()
      // this.timer = null
      this.rightImg()
    },
    leftMove: function () {
      clearInterval(this.timer)
      // this.timer = null
      this.leftImg()
    },
    stopTimer: function () {
      clearInterval(this.timer)
      this.showIcon = true
    },
    runTimer: function () {
      this.change()
      this.showIcon = false
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
