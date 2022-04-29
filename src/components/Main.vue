<template>
  <div class="container">
    <el-header :style="{'--headColor': this.$store.state.headerColor}">
      <i @click="goHome" class="el-icon-s-home"></i>
    </el-header>
    <el-container :style="{'--mainColor': this.$store.state.mainColor}">
      <el-aside width="250px" :style="{'--asideColor': this.$store.state.asideColor}">
        <el-row class="tac">
          <el-menu
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              :default-active= "$store.state.activeTab">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>导航一</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="skin" @click="changeSkin">皮肤</el-menu-item>
                <el-menu-item index="carousel" @click="changeCarousel">轮播图</el-menu-item>
                <el-menu-item index="waterfall" @click="changeWaterfall">瀑布流</el-menu-item>
                <el-menu-item index="pubuliu" @click="changePubuliu">pubuliu</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-row>
      </el-aside>
      <el-main>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </el-main>
    </el-container>
    <el-footer :style="{'--footerColor': this.$store.state.footerColor}"></el-footer>
  </div>
</template>

<script>
export default {
  name: 'vueMain',
  data () {
    return {
      editableTabsValue: '2',
      editableTabs: [{
        title: 'Tab 1',
        name: '1',
        content: 'Tab 1 content'
      }, {
        title: 'Tab 2',
        name: '2',
        content: 'Tab 2 content'
      }],
      tabIndex: 2
    }
  },
  mounted () {
    this.$router.push({path: '/main/home'})
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    changeSkin: function () {
      this.$router.push({path: 'skin'})
      this.$store.state.activeTab = 'skin'
    },
    changeCarousel: function () {
      this.$router.push({path: 'carousel'})
      this.$store.state.activeTab = 'carousel'
    },
    changeWaterfall: function () {
      this.$router.push({path: 'waterfall'})
      this.$store.state.activeTab = 'waterfall'
    },
    changePubuliu: function () {
      this.$router.push({path: 'pubuliu'})
      this.$store.state.activeTab = 'pubuliu'
    },
    goHome: function () {
      this.$router.push({path: 'home'})
      this.$store.state.activeTab = ''
    }
  }
}
</script>

<style scoped lang="less">

.container {
  height: 100vh;// 页面高度
  display: flex;
  flex-wrap: wrap;// 自动换行
  flex-direction: column;// 容器属性 垂直方向
  .el-header /deep/ {
    background-color: var(--headColor);
    height: 100px;
    width: 100%;
    .el-icon-s-home {
      font-size: 2em;
      margin-top: 10px;
      margin-left: 20px;
      cursor: pointer;
    }
    .el-color-picker {
      margin-top: 10px;
      margin-left: 90%;
    }
  }
  .el-container {
    background-color: var(--mainColor);
    overflow: auto;
    flex: 1;
    .el-aside {
      border-right: #999999 solid 1px;
      background-color: var(--asideColor);
      .el-row {
        width: 200px;
        /deep/ .el-menu {
          border-right: none;
          background-color: transparent;
        }
      }
    }
    .el-main {
      .el-tabs {
        .el-icon-plus{
          display: none;
        }
      }
    }
  }
  .el-footer {
    width: 100%;
    background-color: var(--footerColor);
    height: 100px;
    margin-bottom: 0;
  }
}
</style>
