<template>
  <div class="container">
    <h5>皮肤</h5>
    <div class="header-color">
      <span class="demonstration">顶部颜色：</span>
      <el-color-picker
        v-model="headerColor"></el-color-picker>
    </div>
    <div class="main-color">
      <span class="demonstration">主体背景颜色：</span>
      <el-color-picker v-model="mainColor"></el-color-picker>
    </div>
    <div class="aside-color">
      <span class="demonstration">导航栏背景颜色：</span>
      <el-color-picker v-model="asideColor"></el-color-picker>
    </div>
    <div class="footer-color">
      <span class="demonstration">底部颜色：</span>
      <el-color-picker v-model="footerColor"></el-color-picker>
    </div>
    <el-button type="primary" plain size="medium" @click="changeColor">确定</el-button>
  </div>
</template>

<script>
// import {hColor, mColor, aColor, fColor} from '../less/global.less'
export default {
  name: 'vueSkin',
  data () {
    return {
      headerColor: '#dcaf94',
      mainColor: '#fcede4',
      asideColor: '#f8dac8',
      footerColor: '#f9a7a7'
    }
  },
  methods: {
    changeColor: function () {
      // console.log(hColor)
      this.$store.state.headerColor = this.headerColor
      this.$store.state.asideColor = this.asideColor
      this.$store.state.mainColor = this.mainColor
      this.$store.state.footerColor = this.footerColor
      console.log(this.$store.state.footerColor)
    }
  }
}
</script>

<style scoped lang="less">
.container{
  height: 100%;
  h5{
    font-size: large;
  }
  .el-button {
    width: 150px;
    margin-top: 20px;
  }
}
</style>
