<template>
  <div class="content">
    <div class="account">
      <i class="el-icon-user"></i>
      <el-input
        class="input-account"
        size="medium"
        placeholder="请设置账户名"
        v-model="inputAccount"
        @blur="accountIsNull"
        clearable>
      </el-input>
      <span
        class="account-null"
        v-if="accountFlag">请输入您的账户名</span>
    </div>
    <div class="phone">
      <i class="el-icon-phone-outline"></i>
      <el-input
        class="phone-num"
        size="medium"
        placeholder="请输入手机号"
        v-model="inputPhone"
        @blur="phoneIsNull"></el-input>
      <span
        class="phone-null"
        v-if="phoneFlag">请输入您的手机号</span>
    </div>
      <div class="password">
        <i class="el-icon-lock"></i>
        <el-input
          class="input-password"
          size="medium"
          placeholder="请输入密码"
          v-model="inputPassword"
          @blur="passwordIsNull"
          show-password></el-input>
        <span
          class="password-null"
          v-if="passwordFlag">请输入您的密码</span>
      </div>
      <div class="verify-password">
        <i class="el-icon-circle-check"></i>
        <el-input
          class="input-verify-password"
          size="medium"
          placeholder="请确认密码"
          v-model="inputVerifyPassword"
          @blur="verifyPasswordIsNull"
          show-password></el-input>
        <span
          class="verify-password-null"
          v-if="verifyPasswordFlag">请再次输入您的密码</span>
      </div>
      <el-button
        class="entry"
        type="primary"
        @click="createAccount">完成</el-button>
  </div>
</template>

<script>
export default {
  name: 'vueForget',
  data () {
    return {
      inputAccount: '',
      inputPassword: '',
      inputVerifyPassword: '',
      inputPhone: '',
      accountFlag: false,
      passwordFlag: false,
      phoneFlag: false,
      verifyPasswordFlag: false,
      drawer: false,
      innerDrawer: false,
      direction: 'rtl'
    }
  },
  methods: {
    accountIsNull: function () {
      if (this.inputAccount === '') {
        this.accountFlag = true
      } else {
        this.accountFlag = false
      }
    },
    passwordIsNull: function () {
      if (this.inputPassword === '') {
        this.passwordFlag = true
      } else if (this.inputPassword.length < 6) {
        this.$common('注册账号', '密码不能少于6位！')
      } else {
        this.passwordFlag = false
      }
    },
    phoneIsNull: function () {
      let reg = /^1[345789][0-9]{9}$/
      if (this.inputPhone === '') {
        this.phoneFlag = true
      } else if (!reg.test(this.inputPhone)) {
        this.$common('注册账号', '手机号无效！')
      } else {
        this.phoneFlag = false
      }
    },
    verifyPasswordIsNull: function () {
      if (this.inputVerifyPassword === '') {
        this.verifyPasswordFlag = true
      } else if (this.inputPassword !== this.inputVerifyPassword) {
        this.$common('注册账号', '两次输入密码不相同！')
      } else {
        this.verifyPasswordFlag = false
      }
    },
    createAccount: function () {
      if (this.accountFlag || this.passwordFlag || this.phoneFlag || this.verifyPasswordFlag || this.inputPassword === '' || this.inputVerifyPassword === '') {
        this.$common('注册账号', '请检查所有输入项！')
      } else {
        this.$store.state.users[this.inputAccount] = {
          phone: '',
          password: ''
        }
        this.$store.state.users[this.inputAccount].phone = this.inputPhone
        this.$store.state.users[this.inputAccount].password = this.inputPassword
        // alert('注册成功')
        this.$common('', '注册成功！')
        // this.$confirm()
      }
    }
  }
}
</script>

<style scoped lang="less">
.content{
  .account {
    display: flex;
    flex-wrap: wrap;
    padding-left: 30px;
    .input-account {
      width: 200px;
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
  .phone {
    display: flex;
    flex-wrap: wrap;
    padding-left: 30px;
    padding-top: 20px;
    .phone-num {
      width: 200px;
      margin-right: 10px;
    }
    .el-icon-phone-outline {
      height: 20px;
      padding: 8px;
    }
    .phone-null {
      font-size: .5em;
      color: #F56C6C;
      margin-left: 25px;
    }
  }
  .password {
    display: flex;
    flex-wrap: wrap;
    padding-top: 20px;
    padding-left: 30px;
    .el-icon-lock {
      height: 20px;
      padding: 8px;
    }
    .input-password {
      width: 200px;
      margin-right: 10px;
      /*padding-left: 8px;*/
    }
    .password-null {
      font-size: .5em;
      color: #F56C6C;
      margin-left: 25px;
    }
  }
  .verify-password {
    display: flex;
    flex-wrap: wrap;
    padding-top: 20px;
    padding-left: 30px;
    .el-icon-circle-check {
      height: 20px;
      padding: 8px;
    }
    .input-verify-password {
      width: 200px;
      margin-right: 10px;
      /*padding-left: 8px;*/
    }
    .verify-password-null {
      font-size: .5em;
      color: #F56C6C;
      margin-left: 25px;
    }
  }
  .entry{
    margin-left: 70px;
    margin-top: 30px;
    width: 150px;
    /*background-color: aquamarine;*/
    /*color: cadetblue;*/
  }
}
</style>
