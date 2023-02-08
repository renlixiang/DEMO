<template>
    <el-container>
        <el-header>
            <el-row :gutter="10">
                <el-col :span="4"><el-input
                    placeholder="请输入内容"
                    v-model="input"
                    clearable>
                </el-input></el-col>
                <el-col :span="6">
                    <el-button
                        type="primary"
                        icon="el-icon-search"
                        @click="searchData">搜索</el-button>
                </el-col>
            </el-row>


        </el-header>
        <el-main>
            <!--    定义表格-->
            <el-table
                :data="tableDataList"
                border
                style="width: 100%"
                class="el-table">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="id" label="id" width="150"></el-table-column>
                <el-table-column prop="province" label="城市" width="120"></el-table-column>
                <el-table-column prop="province" label="省份" width="120"></el-table-column>
                <el-table-column prop="city" label="市区" width="120"></el-table-column>
                <el-table-column prop="address" label="地址" width="300"></el-table-column>
                <el-table-column prop="zip" label="邮编" width="120"></el-table-column>
                <el-table-column prop="city" label="市区" width="120"></el-table-column>
                <el-table-column prop="address" label="地址" width="300"></el-table-column>
                <el-table-column prop="zip" label="邮编" width="120"></el-table-column>
                <el-table-column fixed="right" label="操作" width="100">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                        <el-button type="text" size="small">编辑</el-button>
                    </template>
                </el-table-column>
                <el-dialog
                    title="收货地址"
                    :visible.sync="dialogTableVisible"
                    :close-on-click-modal="false"
                    :append-to-body="true">
                    <el-table :data="gridData">
                        <el-table-column property="date" label="日期" width="150"></el-table-column>
                        <el-table-column property="name" label="姓名" width="200"></el-table-column>
                        <el-table-column property="address" label="地址"></el-table-column>
                    </el-table>
                </el-dialog>
            </el-table>
        </el-main>
    </el-container>

<!--  手机号归属地  http://apis.juhe.cn/mobile/get?phone=19919878143&key=48d23bcba1f5ea2c180481f560d96943-->


</template>

<script>
// import axios from "axios";
//  axios.defaults.baseURL = '/apis';
export default {
    name: "vueTable",
    data () {
        return {
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
            },],
            gridData: [{
                date: '2023-01-16',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }],
            dialogTableVisible: false,
            input: '',
            tableDataList: []
        }
    },
    methods: {
        handleClick(row) {
            console.log(row);
            this.dialogTableVisible = true;
        },

        searchData() {

            // this.axios.get('/apis/mobile/get?phone=' + this.input + '&key=48d23bcba1f5ea2c180481f560d96943').then(
            //     response => {
            //         this.tableData = response.data
            //         console.log('请求成功', response.data)
            //     },
            //     error => {
            //         console.error('请求失败', error.message)
            //         this.isLoading = false
            //         this.errMsg = error.message
            //     }
            // )


            // https://v.juhe.cn/hisWeather/province?key=86a8b726a117288aad71db54d0979572
            // this.axios({
            //     url: '/api/hisWeather/province?key=86a8b726a117288aad71db54d0979572',
            //     method: 'get',
            //     data: {},
            // }).then(response => {
            //     this.tableDataList = response.data.result
            //     console.log('请求成功',response.data)
            // }, error => {
            //     console.error('请求失败', error.message)
            //     this.isLoading = false
            //     this.errMsg = error.message
            // })

            // http://apis.juhe.cn/simpleWeather/query?city=北京&key=5b59dd80d594ffc679deb8bc1359a7f9

            // 新闻
            // http://v.juhe.cn/toutiao/index?type=top&key=9bc329c686a8d7d59674175bda4a06be
            this.axios({
                url: '/api/toutiao/index?key=9bc329c686a8d7d59674175bda4a06be',
                method: 'get',
                data: {
                    type: this.input
                }
            }).then(reponse => {
                console.log('请求成功', reponse.data)
            }, error => {
                console.log('请求失败', error.message)
            })
        }



    },
}
</script>

<style scoped>

    .el-table {
        /*margin-left: 20px;*/
    }

</style>
