<template>
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
                    <el-menu-item index="search" @click="searchUsers">查询</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>导航二</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="drag" @click="changeDrag">拖动</el-menu-item>
                    <el-menu-item index="animal" @click="changeAnimal">动画</el-menu-item>
                    <el-menu-item index="table" @click="changeTable">表格</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
    </el-row>
</template>

<script>
export default {
    name: "vueNavigation",
    data() {
        return {

        }
    },
    methods: {handleOpen (key, keyPath) {
            console.log(key, keyPath)
        },
        handleClose (key, keyPath) {
            console.log(key, keyPath)
        },

        // 皮肤颜色
        changeSkin: function () {
            this.$router.push({path: 'skin'})
            this.$store.state.activeTab = 'skin'
        },

        // 轮播图
        changeCarousel: function () {
            this.$router.push({path: 'carousel'})
            this.$store.state.activeTab = 'carousel'
        },

        // 瀑布流
        changeWaterfall: function () {
            this.$router.push({path: 'waterfall'})
            this.$store.state.activeTab = 'waterfall'
        },

        changeDrag: function () {
            this.$router.push({path: 'drag'})
            this.$store.state.activeTab = 'drag'
        },
        // 瀑布流（自己写的）
        // changePubuliu: function () {
        //   this.$router.push({path: 'pubuliu'})
        //   this.$store.state.activeTab = 'pubuliu'
        // },

        searchUsers: function () {
            this.$router.push({path: 'search'})
            this.$store.state.activeTab = 'search'
        },

        changeAnimal: function () {
            this.$router.push({path: 'animal'})
            this.$store.state.activeTab = 'animal'
        },

        changeTable: function() {
            this.$router.push({path: 'table'})
            this.$store.state.activeTab = 'table'
        },
    },
}
</script>

<style scoped>

</style>
