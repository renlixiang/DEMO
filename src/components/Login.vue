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
                <span
                    class="account-null"
                    v-if="!accountFlag">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
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
                <span
                    class="password-null"
                    v-if="!passwordFlag">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
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
            <div class="register">
              <el-link
                class="register"
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
    mounted() {
        this.getUserIP((ip) => {
            this.ip = ip;
            alert(this.ip)
        });
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
          changeFlag: true,
          ip: ''
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

      getUserIP(onNewIP) {
          let MyPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
          let pc = new MyPeerConnection({
              niceServers: []
          });
         let noop = () => {

         };
         let localIPs = {};
         let ipRegex = /([0-9]{1,3}(\\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g;
         let iterateIP = (ip) => {
          if (!localIPs[ip]) onNewIP(ip)
          localIPs[ip] = true;
          };
          pc.createDataChannel('');
          pc.createOffer().then((sdp) => {
              sdp.sdp.split('\\n').forEach(function (line) {
                  if (line.indexOf('candidate') < 0) return;
                  line.match(ipRegex).forEach(iterateIP);
              });
              pc.setLocalDescription(sdp, noop, noop);
          }).catch(() => {
          });
          pc.onicecandidate = (ice) => {
              if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
              ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
          };
      },

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
            window.sessionStorage.setItem('currentUser', this.inputAccount)
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
    background: url("../assets/bgyulan.png") no-repeat;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 0;
    padding: 0;
    .container {
        width: 20%;
        height: 40%;
        margin-left: 10px;
        margin-right: 10px;
        margin-top: 150px;
        border-radius: 5px;
        background-color: #f0f0f0;

        .head-sculpture {
            text-align: center;
            padding: 20px;
            img {
                //width: 45px;
                //height: 45px;
                width: 20%;
                height: 20%;
            }
        }

        .content {
            //margin-left: 20px;
            margin-left: 10%;

            .userName {
                display: flex;
                flex-wrap: wrap;
                //margin-bottom: 15px;
                .user {
                    //width: 220px;
                    width: 73%;
                    margin-right: 20px;
                }

                .el-icon-user {
                    //height: 20px;
                    height: 13%;
                    padding: 8px;
                }

                .account-null {
                    font-size: .5em;
                    color: #F56C6C;
                    margin-left: 25px;
                    height: 15px;
                }
            }

            .password {
                display: flex;
                flex-wrap: wrap;
                //padding-top: 5px;
                //margin-top: 2%;

                .el-icon-lock {
                    //height: 20px;
                    height: 13%;
                    padding: 8px;
                    //margin: 8px;
                }

                .password {
                    //width: 220px;
                    width: 73%;
                    margin-right: 20px;
                }

                .password-null {
                    font-size: .5em;
                    color: #F56C6C;
                    margin-left: 25px;
                    height: 15px;
                }
            }
        }
        .login{
            padding-top: 5px;

            .forget{
                .forget {
                  font-size: .5em;
                  color: burlywood;
                }
                float: left;
                left: 20px;
            }

            .register{
                .register {
                  font-size: .5em;
                  color: burlywood;
                }
                float: right;
                right: 40px;
            }
        }

        .entry{
            //margin-left: 85px;
            margin-left: 27%;
            margin-top: 15px;
            //width: 150px;
            width: 45%;
            height: 35px;

        }
    }
}
</style>
