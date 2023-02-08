<template>
  <div class="container">
    <el-header :style="{'--headColor': this.$store.state.headerColor}">
        <i @click="goHome" class="el-icon-s-home"></i>
        <el-dropdown class="el-dropdown"  placement="bottom">
            <span class="el-dropdown-link">
                {{this.currentUser}}<i class="el-icon-user-solid"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="dialogFormVisible = true">用户信息</el-dropdown-item>
<!--                :append-to-body="true" 显示表格-->
                <el-dialog title="用户信息"
                           :visible.sync="dialogFormVisible"
                           :append-to-body="true"
                           :close-on-click-modal="false">
                    <el-form :model="this.currentUser">
                        <el-row>
                            <el-col :span="10">
                                <el-form-item label="用户名称" :label-width="formLabelWidth">
                                     <el-input v-model="this.currentUser" autocomplete="off"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10">
                                <el-form-item label="手机号" :label-width="formLabelWidth">
                                    <el-input v-model="this.phone" autocomplete="off"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
<!--                        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>-->
                    </div>
                </el-dialog>
                <el-dropdown-item @click.native="dialogPasswordVisible = true">修改密码</el-dropdown-item>
                <el-dialog title="修改密码"
                           :visible.sync="dialogPasswordVisible"
                           :append-to-body="true"
                           :close-on-click-modal="false">
                    <el-form :model="this.currentUser">
                        <el-row>
                            <el-col :span="10">
                                <el-form-item label="新密码" :label-width="formLabelWidth">
                                    <el-input v-model="newPassword" placeholder="请输入密码" show-password></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10">
                                <el-form-item label="确认密码" :label-width="formLabelWidth" >
                                    <el-input v-model="verifyPassword" placeholder="请再次输入密码" show-password></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogPasswordVisible = false">取 消</el-button>
                        <el-button type="primary" @click="alterPassword" :plain="true">确 定</el-button>
                    </div>
                </el-dialog>
                <el-dropdown-item @click.native="goBack">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
<!--      <i @click="goHome" class="el-icon-s-home"></i>-->
<!--        <i class="el-icon-user-solid" @click="goBack"></i>-->
    </el-header>
    <el-container :style="{'--mainColor': this.$store.state.mainColor}">
      <el-aside width="205px"
                class="aside"
                :style="{'--asideColor': this.$store.state.asideColor}">
          <vueNavigation></vueNavigation>
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
// import Watermark from '../js/watermark'
import vueNavigation from './Navigation'

export default {
  name: 'vueMain',
    components: {
        vueNavigation,
    },
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
      tabIndex: 2,
        // 读取当前登录用户名
        // currentUser: window.sessionStorage.getItem('currentUser'),
        // phone: this.$store.state.users[123].phone,
        currentUser: '',
        phone: '',
        dialogFormVisible: false,
        dialogPasswordVisible: false,
        formLabelWidth: '120px',
        newPassword: '',
        verifyPassword: '',
    }
  },
  mounted () {
    this.$router.push({path: '/main/home'})
      this.currentUser = window.sessionStorage.getItem('currentUser')
      this.phone = this.$store.state.users[this.currentUser].phone
      // Watermark.set(this.$store.state.currentUser)  // 水印
  },
  methods: {

    goHome: function () {
      this.$router.push({path: 'home'})
      this.$store.state.activeTab = ''
    },
    goBack: function () {
        this.$router.push({path: '/'})
        this.$store.state.activeTab = ''
        // 清除本地缓存
        window.sessionStorage.removeItem('currentUser')
    },

      alterPassword: function () {
          this.dialogPasswordVisible = false
          let parameter = {
              newPassword: this.newPassword,
              verifyPassword: this.verifyPassword,
              currentUser: this.currentUser
          }
          console.log(parameter)
        this.$store.dispatch('resetPassword', parameter)
        this.$message({ message: '修改成功',
                                type: 'success'});
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

      .el-dropdown {
          margin-left: 87%;

          .el-dropdown-link {
              cursor: pointer;
              font-size: 1.6em;
              margin-top: 15px;

              .el-icon-user-solid {
                  font-size: 1.5em;
                  padding-left: 15px;
              }
          }
      }

    .el-icon-s-home {
      font-size: 2.6em;
      margin-top: 13px;
      margin-left: 20px;
      cursor: pointer;
    }
      //.el-icon-user-solid {
      //    cursor: pointer;
      //    font-size: 2em;
      //    margin-top: 10px;
      //    margin-left: 90%;
      //}
    .el-color-picker {
      margin-top: 10px;
      margin-left: 90%;
    }
  }
  .el-container {
    background-color: var(--mainColor);
    overflow: auto;
    flex: 1;
    .aside {
      border-right: #999999 solid 1px;
      background-color: var(--asideColor);
        ::-webkit-scrollbar {
            display: none;
        }
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
