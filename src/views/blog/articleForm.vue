<template>
    <container class="articleForm">
        <template slot="header">
            <el-button type="primary" @click="submit">提交</el-button>
            <el-button type="primary" @click="changeEdit">切换编辑器</el-button>
            <el-button type="primary" @click="changeEdit1">切换编辑器</el-button>
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
            <el-row>
                <ueditor ref="ueditor" height="400" :initContent="blogArticle.articleContent" v-if="editType==='ueditor'"></ueditor>
                <markdown ref="markdown" v-if="editType==='markdown'"/>
            </el-row>
        </el-form>
    </container>
</template>

<script>
import ueditor from '../admin/ueditor';
import markdown from '../admin/markdown';

export default {
    name: 'articleForm',
    components: { ueditor, markdown },
    data () {
        return {

            blogArticle: {
                articleName: '',
                articleIsPublic: false,
                articleIsEncryption: false,
                articleContent: '',
                articleAbstract: ''
            },
            editType: 'ueditor'
        };
    },
    methods: {
        submit () {
            const that = this;
            that.articleAbstract = '';
            // 提取摘要
            let plainTxt = '';
            if (that.editType === 'ueditor') {
                plainTxt = this.$refs.ueditor.ue.getPlainTxt();
                that.articleContent = this.$refs.ueditor.getContent().replace(/&nbsp;/g, ' ').replace(/<br\/>/g, '\n');
            } else {
                plainTxt = this.$refs.markdown.content;
                that.articleContent = this.$refs.markdown.content;
            }
            const split = plainTxt.split('\n');
            for (let i = 0; i < split.length && i < 5; i++) {
                that.articleAbstract += split[i] + '<br\>';
            }
            that.axios.post('/blog/article', {
                articleName: that.blogArticle.articleName,
                articleIsPublic: that.blogArticle.articleIsPublic ? '1' : '0',
                articleIsEncryption: that.blogArticle.articleIsEncryption ? '1' : '0',
                articleContent: that.articleContent,
                articleAbstract: that.articleAbstract
            }).then(r => {
                that.$message.success('操作成功');
            });
        },
        changeEdit () {
            if (this.editType === 'ueditor') {
                this.editType = 'markdown';
            } else {
                this.editType = 'ueditor';
            }
        },
        changeEdit1 () {
            console.log(this.$refs.markdown.content);
        }
    }
};
</script>

<style lang="scss" scoped>
    .articleForm {
        padding: 10px;
        border-radius: 5px;
    }
    ::v-deep .el-form-item__label {
        color: white;
    }
</style>
