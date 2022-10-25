<template>
<div>
    <div class="list">
        <h3 class="jumbotron-heading">Search Github Users</h3>
        <div class="search">
            <input type="text" placeholder="enter the name you search" v-model="keyWord">
            <button @click="searchUsers">Search</button>
        </div>
    </div>

    <div class="jumbotron">
<!--        第一次登录，欢迎界面-->
        <div v-show="isFirst" class="welcome">
            <h1>欢迎使用！</h1>
        </div>
<!--        展示加载中-->
        <div v-show="isLoading" class="loading">
            <h1>loading</h1>
        </div>
<!--        展示错误信息-->
        <div v-show="errMsg" class="error">
            <h1>啊哦 好像出错喽 {{errMsg}}</h1>
        </div>
<!--        展示用户列表-->
        <div v-show="userList.length" class="user" v-for="item in userList" :key="item.login">
            <img :src="item.avatar_url" alt="" @click="userhtml(item)">
            <span @click="userhtml(item)">{{item.login}}</span>
<!--            https://api.github.com/search/users?q=xxx  get请求-->
        </div>
    </div>
</div>
</template>



<script>
import axios from 'axios'
export default {
    name: 'vueSearch',
    data () {
        return {
            keyWord: '',
            userList: [],
            isFirst: true,
            isLoading: false,
            errMsg: '',
        }
    },
    methods: {
        searchUsers: function () {
            this.isFirst = false
            this.isLoading = true
            this.userList = []
            axios.get('https://api.github.com/search/users?q=' + this.keyWord).then(
                response => {
                    this.isLoading = false
                    this.userList = response.data.items
                    console.log('请求成功', response.data)
                },
                error => {
                    console.error('请求失败', error.message)
                    this.isLoading = false
                    this.errMsg = error.message
                }
            )
        },
        userhtml: function( item ) {
            // window.location.href = item.html_url
            window.open(item.html_url)
        }
    }
}
</script>

<style scoped lang="less">
.list{
    padding-bottom: 40px;
    .jumbotron-heading {
        font-size: 40px;
    }
    .search {
        input {
            width: 300px;
            height: 25px;
            margin-right: 10px;
        }
        button {
            width: 100px;
            height: 30px;
        }
    }
}

.jumbotron {
    display: flex;
    vertical-align: center;
    align-content: center;
    flex-wrap: wrap;
    .user {
        padding: 20px;
        width: 150px;
        img {
            width: 100%;
            padding-bottom: 20px;
        }
        span {
            width: 150px;
            height: 30px;
        }

        img:hover {
            cursor: pointer;
        }
        span:hover {
            cursor: pointer;
        }
    }
}
</style>
