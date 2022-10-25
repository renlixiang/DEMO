<template>
    <div id="login">
      <div class="container">
        <div class="head-sculpture">
          <img src="../assets/logo.png">
        </div>
        <div class="content">
            <div class="userName">
                <i class="el-icon-user"></i>
                <el-input
                    class="user"
                    size="small"
                    placeholder="请输入账户名"
                    v-model="inputAccount"
                    @blur="isAccountNull"
                    clearable>
                </el-input>
                <span
                  class="account-null"
                  v-if="accountFlag">请输入您的账户名</span>
            </div>
            <div class="password">
                <i class="el-icon-lock"></i>
                <el-input
                    class="password"
                    size="small"
                    placeholder="请输入密码"
                    v-model="inputPassword"
                    @blur="isPasswordNull"
                    show-password></el-input>
                <span
                  class="password-null"
                  v-if="passwordFlag">请输入您的密码</span>
            </div>
        </div>
          <div class="login">
            <div class="forget">
              <el-link
                class="forget"
                label="ltr"
                :underline="false"
                type="primary"
                style="margin-left: 16px;"
                @click="forgetPassword">忘记密码</el-link>
            </div>
            <div class="forget">
              <el-link
                class="forget"
                label="rtr"
                :underline="false"
                @click="createAccount">没有账号？去注册</el-link>
            </div>
            <el-drawer
              v-if="changeFlag"
              title="身份验证"
              :visible.sync="drawer"
              size="50%">
              <vueForget></vueForget>
            </el-drawer>
            <el-drawer
              v-if="!changeFlag"
              title="注册账号"
              :visible.sync="drawer"
              :direction="direction"
              size="30%">
              <vueEnroll></vueEnroll>
            </el-drawer>
          </div>
          <el-button
            class="entry"
            type="primary"
            @click="checkUser">登录</el-button>
      </div>
    </div>
</template>

<script>
import vueForget from './Forget'
import vueEnroll from './Enroll'
export default {
  name: 'vueLogin',
  components: {
    vueForget,
    vueEnroll
  },
  data () {
    return {
      inputAccount: '',
      inputPassword: '',
      accountFlag: false,
      passwordFlag: false,
      drawer: false,
      direction: 'rtl',
      innerDrawer: false,
      // loginFlag: true,
      // forgetFlag: true,
      changeFlag: true
    }
  },
  // 自定义指令
  directives: {
    focus: {
      inserted: function (el) {
        el.children[0].focus()
      }
    }
  },
  methods: {
    // 用户名为空
    isAccountNull: function () {
      if (this.inputAccount === '') {
        this.accountFlag = true
      } else {
        this.accountFlag = false
      }
    },
    // 密码为空
    isPasswordNull: function () {
      if (this.inputPassword === '') {
        this.passwordFlag = true
      } else {
        this.passwordFlag = false
      }
    },
    checkUser: function () {
      this.isAccountNull()
      this.isPasswordNull()
      // 判断用户名
      if (Object.prototype.hasOwnProperty.call(this.$store.state.users, this.inputAccount)) {
        // this.$store.state.users.prototype.hasOwnProperty.call(this.inputAccount)
        // 判断密码
        if (this.$store.state.users[this.inputAccount].password !== this.inputPassword) {
          this.$common('', '密码错误')
        } else {
          // this.$common('', '欢迎进入')
            this.$store.state.currentUser = this.inputAccount
          this.$router.push('/main')
        }
      } else {
        this.$common('', '用户名错误')
      }
      // this.$store.commit('userIsExist')
    },
    forgetPassword: function () {
      this.changeFlag = true
      this.drawer = true
    },
    createAccount: function () {
      this.changeFlag = false
      this.drawer = true
    }
  }
}
</script>

<style scoped lang="less">
#login {
    //background-color: floralwhite;
  background-image: url("../assets/bgyulan.png");
    height: 100%;
    display: flex;
    //align-items: center;
    justify-content: center;
    margin: 0;
    padding: 0;
    .container {
        width: 230px;
        height: 300px;
        margin-left: 10px;
        margin-right: 10px;
        margin-top: 150px;
        //border: darkolivegreen solid 1px;
        border-radius: 5px;
        background-color: #f0f0f0;
        //opacity: 0.8;
        //box-shadow: 0 0 5px 5px #999999;
        //.head-sculpture {
        //    padding: 15px 30px 10px 30px;
        //}

        .head-sculpture {
            text-align: center;
            padding: 20px;
            img {
                width: 30px;
                height: 30px;
            }
        }

        .content {
            //margin-top: 10px;

            .userName {
                display: flex;
                flex-wrap: wrap;

                .user {
                    width: 180px;
                    margin-right: 10px;
                }

                .el-icon-user {
                    height: 20px;
                    padding: 8px;
                }

                .account-null {
                    font-size: .5em;
                    color: #F56C6C;
                    margin-left: 25px;
                }
            }

            .password {
                display: flex;
                flex-wrap: wrap;
                padding-top: 5px;

                .el-icon-lock {
                    height: 20px;
                    padding: 8px;
                }

                .password {
                    width: 180px;
                    margin-right: 10px;
                }

                .password-null {
                    font-size: .5em;
                    color: #F56C6C;
                    margin-left: 25px;
                }
            }
        }
        .login{
            padding-top: 10px;
            margin-left: -20px;
            display: flex;
            .forget{
                .forget {
                  font-size: .5em;
                  color: burlywood;
                  //cursor: pointer;
                }
                padding-right: 35px;
                width: 100px;
            }
            .login{
                .login {
                  font-size: .5em;
                  color: burlywood;
                  //cursor: pointer;
                }
              width: 100px;
            }
        }
        .entry{
            margin-left: 35px;
            margin-top: 10px;
            width: 150px;
            //background-color: lavenderblush;
            //color: peachpuff;
        }
    }
}
</style>
