<template>
    <d2-container class="articleForm">
        <template slot="header">
            <el-button type="primary" @click="submit">提交</el-button>
        </template>
        <el-form ref="blogArticle" :model="blogArticle" label-width="80px">
            <el-form-item label="文章名称">
                <el-input v-model="blogArticle.articleName"></el-input>
            </el-form-item>
            <el-form-item label="是否公开">
                <el-switch v-model="blogArticle.articleIsPublic"></el-switch>
            </el-form-item>
            <el-form-item label="是否加密">
                <el-switch v-model="blogArticle.articleIsEncryption"></el-switch>
            </el-form-item>
            <el-form-item label="内容">
                <ueditor ref="ueditor" height="400" :initContent="blogArticle.articleContent"></ueditor>
            </el-form-item>
        </el-form>
    </d2-container>
</template>

<script>
import ueditor from '../admin/ueditor';

export default {
    name: 'articleForm',
    components: { ueditor },
    data () {
        return {

            blogArticle: {
                articleName: '',
                articleIsPublic: false,
                articleIsEncryption: false,
                articleContent: '',
                articleAbstract: ''
            }
        };
    },
    methods: {
        submit () {
            const that = this;
            that.articleAbstract = '';
            // 提取摘要
            const plainTxt = this.$refs.ueditor.ue.getPlainTxt();
            const split = plainTxt.split('\n');
            for (let i = 0; i < split.length && i < 5; i++) {
                that.articleAbstract += split[i] + '<br\>';
            }
            that.axios.post('/blog/article', {
                articleName: that.blogArticle.articleName,
                articleIsPublic: that.blogArticle.articleIsPublic ? '1' : '0',
                articleIsEncryption: that.blogArticle.articleIsEncryption ? '1' : '0',
                articleContent: this.$refs.ueditor.getContent().replace(/&nbsp;/g, ' ').replace(/<br\/>/g, '\n'),
                articleAbstract: that.articleAbstract
            }).then(r => {
                that.$message.success('操作成功');
            });
        }
    }
};
</script>

<style lang="scss" scoped>
    .articleForm {
        padding: 10px;
        border-radius: 5px;
    }
    .articleForm /deep/ .el-form-item__label {
        color: white;
    }
</style>
