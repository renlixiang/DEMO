<template>
  <div class="container">
    <div class="pubu">
      <div class="img img1" ref="img1">
        <img src="../assets/bgfengzheng.png" alt="">
        <p>图片1</p>
      </div>
      <div class="img img2" ref="img2">
        <img src="../assets/bghuang.jpg" alt="">
        <p>图片2</p>
      </div>
      <div class="img img3" ref="img3">
        <img src="../assets/bgyulan.png" alt="">
        <p>图片3</p>
      </div>
      <div class="img img4" ref="img4">
        <img src="../assets/logo.png" alt="">
        <p>图片4</p>
      </div>
      <div class="img img5" ref="img5" :style="{'top': this.height,'left':this.left}">
        <img src="../assets/logo.png" alt="">
        <p>图片5</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'vueWaterfall',
  data() {
    return {
      height: '',
      refName: ['img1', 'img2', 'img3', 'img4', 'img5'],
      place: 0,
      left: ''
    }
  },
  mounted() {
    this.getHeight()
    this.getPlace()
  },
  methods: {
    getHeight: function() {
      this.$store.state.imgElements[0] = this.$refs.img1.offsetHeight
      this.$store.state.imgElements[1] = this.$refs.img2.offsetHeight
      this.$store.state.imgElements[2] = this.$refs.img3.offsetHeight
      this.$store.state.imgElements[3] = this.$refs.img4.offsetHeight
      console.log(this.$store.state.imgElements[0])
    },
    getPlace: function() {
      let min = 0
      let i = 1
      while ( i < this.$store.state.imgElements.length) {
        if (this.$store.state.imgElements[min] > this.$store.state.imgElements[i]) {
          min = i
        } else {
          i++
        }
      }
      console.log('min--' + min)
      switch (min){
        case 0: this.left = '0'; break
        case 1: this.left = '25%'; break
        case 2: this.left = '50%'; break
        case 3: this.left = '75%'; break
      }
      this.height = this.$store.state.imgElements[min] + 20 + 'px'
      console.log('height---' + this.height)
      this.$store.state.imgElements[min] += this.$refs.img5.offsetHeight
      console.log('----' + this.$store.state.imgElements[min])
    }
  }
}
</script>

<style scoped lang="less">
.container{
  height: 100%;
  width: 100%;
  .pubu {
    position: relative;
    .img {
      position: absolute;
      border: 1px solid #666666;
      width: 270px;
      text-align: center;
      img {
        width: 240px;
        margin-top: 10px;
      }
    }
    .img1 {
      top: 0;
      left:0;
    }
    .img2 {
      top: 0;
      left: 25%;
    }
    .img3 {
      top: 0;
      left: 50%;
    }
    .img4 {
      top: 0;
      left: 75%;
    }
    .img5 {
      top: var(top);
      left: var(left);
    }
  }
}
</style>
