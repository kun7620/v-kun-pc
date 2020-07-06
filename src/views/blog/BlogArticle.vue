<template>
    <div>
        <el-row>
<!--            <el-button type="primary" @click="toForm(1)">新增</el-button>-->
        </el-row>
        <el-table
                ref="progressTwo"
                :data="articleList"
                style="width: 100%">
            <el-table-column
                    prop="articleName"
                    label="笔记名"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="articleIsPublic"
                    label="是否公开"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="articleIsEncryption"
                    label="是否对称加密"
                    width="180">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
<!--                    <i class="iconfont iconedit" @click="handleEdit(scope.$index, scope.row)"></i>-->
<!--                    <i class="iconfont icondelete" @click="handleDelete(scope.$index, scope.row)"></i>-->
                    <!--                    <el-button  size="medium">默认按钮</el-button>-->
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name:'blogArticle',
        data(){
            return{
                articleList:[]
            }
        },
        created() {
            let that = this;
            that.axios.get('/blog/article')
                .then(r=>{
                    that.articleList = r.data;
                })
        }
    };
</script>

<style scoped>

</style>