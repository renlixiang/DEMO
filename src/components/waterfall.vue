<template>
  <div class="container">
  <div class="waterfull">
    <h2>瀑布流布局</h2>
    <div class="v-waterfall-content" id="v-waterfall">
      <div v-for="(img, index) in waterfallList"
           :key="index" class="v-waterfall-item"
           :style="{top:img.top+'px',left:img.left+'px',width:waterfallImgWidth+'px',height:img.height}">
        <img :src="img.src" alt="">
        <!--说明文字-->
        <p style="font-size: small;color: #666;margin: 4px;">{{img.title}}</p>
        <p style="font-size: x-small;color: #9e9e9e;margin: 4px;padding-bottom: 6px;">{{img.info}}</p>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: "vueWaterfall",
  data() {
    return {
      waterfallList: [],
      // imgArr: [
      //   require('../assets/bgfengzheng.png'),
      //   require('../assets/bghuang.jpg'),
      //   require('../assets/bgyulan.png'),
      //   require('../assets/1.jpg'),
      //   require('../assets/2.jpg'),
      //   require('../assets/3.png'),
      //   require('../assets/4.jpg'),
      //   require('../assets/5.jpg'),
      //   require('../assets/6.jpg')
      // ],
      imgArr: [
        {
          src: require('../assets/bgfengzheng.png'),
          title: '111',
          info: '111111'
        },
        {
          src: require('../assets/bghuang.jpg'),
          title: '222',
          info: '22222'
        },
        {
          src: require('../assets/bgyulan.png'),
          title: '333',
          info: '33333'
        },
        {
          src: require('../assets/1.jpg'),
          title: '444',
          info: '44444'
        },
        {
          src: require('../assets/2.jpg'),
          title: '555',
          info: '55555'
        },
        {
          src: require('../assets/3.png'),
          title: '666',
          info: '666666'
        },
        {
          src: require('../assets/4.jpg'),
          title: '777',
          info: '77777'
        },
        {
          src: require('../assets/5.jpg'),
          title: '888',
          info: '88888'
        },
        {
          src: require('../assets/6.jpg'),
          title: '999',
          info: '99999'
        }],
      waterfallImgWidth: '',// 每个盒子的宽度
      waterfallImgCol: 4,// 瀑布流的列数
      waterfallImgRight: 10,// 每个盒子的右padding
      waterfallImgBottom: 10,// 每个盒子的下padding
      waterfallDeviationHeight: [],
      imgList: []
    }
  },
  created() {
    // 触发入口
    for (let i = 0; i < this.imgArr.length; i++) {
      // this.imgList.push(this.imgArr[Math.round(Math.random() * 8)]);// 图片随机显示
      this.imgList.push(this.imgArr[i]);
    }
  },
  mounted() {
    this.calculationWidth();
  },
  methods: {
    //计算每个图片的宽度或者是列数
    calculationWidth() {
      let domWidth = document.getElementById("v-waterfall").offsetWidth;
      if (!this.waterfallImgWidth && this.waterfallImgCol) {
        // 列宽未设置，求出每列的宽度
        this.waterfallImgWidth = (domWidth - this.waterfallImgRight * this.waterfallImgCol) / this.waterfallImgCol;
      } else if (this.waterfallImgWidth && !this.waterfallImgCol) {
        // 未确定列数时，按照宽度计算出可放几列，向下取整
        this.waterfallImgCol = Math.floor(domWidth / (this.waterfallImgWidth + this.waterfallImgRight))
      }
      // 初始化偏移高度数组
      this.waterfallDeviationHeight = new Array(this.waterfallImgCol);
      for (let i = 0; i < this.waterfallDeviationHeight.length; i++) {
        this.waterfallDeviationHeight[i] = 0;
      }
      this.imgPreloading()
    },
    // 图片预加载
    imgPreloading() {
      for (let i = 0; i < this.imgList.length; i++) {
        let aImg = new Image();
        // aImg.src = this.imgList[i];
        aImg.src = this.imgList[i].src;
        // onload读取文件
        aImg.onload = aImg.onerror = () => {
          let imgData = {};
          // 按照宽度缩放比例算出图片现在的高度
          imgData.height = this.waterfallImgWidth / aImg.width * aImg.height;
          // imgData.src = this.imgList[i];
          // imgData.title = '标题';// 说明文字
          // imgData.info = '详情说明：啦啦啦啦啦';// 说明文字
          imgData.src = this.imgList[i].src;
          imgData.title = this.imgList[i].title;// 说明文字
          imgData.info = this.imgList[i].info;// 说明文字
          this.waterfallList.push(imgData);
          this.rankImg(imgData);
        }
      }
    },
    //瀑布流布局
    rankImg(imgData) {
      let {
        waterfallImgWidth,
        waterfallImgRight,
        waterfallImgBottom,
        waterfallDeviationHeight,
      } = this;
      let minIndex = this.filterMin();
      imgData.top = waterfallDeviationHeight[minIndex];
      imgData.left = minIndex * (waterfallImgRight + waterfallImgWidth);
      // waterfallDeviationHeight[minIndex] += imgData.height + waterfallImgBottom;// 不加文字的盒子高度
      waterfallDeviationHeight[minIndex] += imgData.height + waterfallImgBottom + 56;// 加了文字的盒子高度，留出文字的地方（这里设置56px）
      console.log(imgData);
    },
    /**
     * 找到最短的列并返回下标
     * @returns {number} 下标
     */
    filterMin() {
      const min = Math.min.apply(null, this.waterfallDeviationHeight);
      return this.waterfallDeviationHeight.indexOf(min);
    }
  }
}
</script>

<style scoped>
.container{
  /*width: 100%;*/
  height: 100%;
}
.waterfull{
  width: 100%;
  height: 100%;
}
.v-waterfall-content {
  /* 主要 */
  width: 100%;
  /*height: 450px;*/
  height: 100%;
  position: relative;
  top: 32px;
  /* 次要：设置滚动条，要求固定高度 */
  /*overflow-y: auto;*/
}

.v-waterfall-item {
  /* 主要 */
  float: left;
  position: absolute;
}

.v-waterfall-item img {
  /* 主要 */
  /* width: auto;height: auto; */
  width: 90%;
  height: auto;
  /* 次要 */
  border-radius: 6px;
}
</style>

