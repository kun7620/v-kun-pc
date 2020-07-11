<template>
    <div class="blogIndex">
        <div class="leftSide" :class="{'hideLeftSide':hideLeftSide, 'showLeftSide':!showLeftSide}">
            <div class="overlay"></div>
            <div class="intrude-less">
                <a href="javascript:void(0)" class="profilepic">
                    <img src="http://litten.me/assets/blogImg/litten.png" alt="">
                </a>
                <h1 class="header-author">上善若水</h1>
                <p class="header-subtitle">花花世界，何必当真</p>
                <div class="search"><input type="text" placeholder="搜索文章"></div>
                <div class="column"><a href="javascript:void(0)">所有文章</a><a href="javascript:void(0)">所有标签</a></div>
            </div>
            <div class="bottom">
                <a href="/#/home">后台管理</a>
            </div>
        </div>
        <div class="rightSide" :class="{'hideRightSide':!hideRightSide}" v-if="!isShowContent">
            <ul>
                <li v-for="item in articleList">
                    <h2 class="title"><a href="javascript:void(0)" @click="showContent(item)">{{item.articleName}}</a>
                    </h2>
                    <div class="middle">
                        <div class="articleAbstract" v-html="item.articleAbstract"></div>
                        <div class="tags">
                            <a class="tag" href="javascript:void(0)">java</a>
                            <a class="tag" href="javascript:void(0)">前端</a>
                        </div>
                    </div>
                    <div class="dateTime">{{item.articleCdate}}</div>
                </li>
            </ul>
        </div>
        <div class="rightSide articleContent" :class="{'showRightSide':showRightSide}" v-if="isShowContent">
            <ul>
                <li>
                    <h2 class="title"><i class="iconfont iconback"
                                         @click="hideContent"></i><a>{{article.articleName}}</a></h2>
                    <div class="middle">
                        <div class="articleAbstract articleContentDetails" :class="{'articleContentDetailsHide':articleContentDetailsHide}" v-html="article.articleContent"></div>
                        <!--            <el-card shadow="never" class="d2-mb">-->
                        <!--              <d2-highlight :code="article.articleContent"></d2-highlight>-->
                        <!--            </el-card>-->
                        <div class="tags">
                            <a class="tag" href="javascript:void(0)">java</a>
                            <a class="tag" href="javascript:void(0)">前端</a>
                        </div>
                    </div>
                    <div class="dateTime">{{article.articleCdate}}</div>
                </li>
            </ul>
        </div>
        <el-backtop target=".rightSide"></el-backtop>
    </div>
</template>

<script>
import hljs from 'highlight.js';
import 'highlight.js/styles/androidstudio.css'; // 样式文件
export default {
    name: 'index',
    data () {
        return {
            articleList: [],
            article: {
                articleName: '',
                articleCdate: '',
                articleContent: ''
            },
            isShowContent: false,
            showLeftSide: false,
            hideLeftSide: false,
            hideRightSide: false,
            articleContentDetailsHide: true
        };
    },
    created () {
        const that = this;
        that.axios.get('/public/blog')
            .then(r => {
                that.articleList = r.data;
            });
    },
    methods: {
        showContent (item) {
            const that = this;
            that.axios.get('/public/blog/selectBlogArticleByUuid?articleUuid=' + item.articleUuid)
                .then(r => {
                    that.article = r.data;
                    // that.article.articleContent = r.data.articleContent.replace(/&nbsp;/g,' ');
                    // that.article.articleContent = r.data.articleContent.replace(/<br\/>/g,'\n');
                    // that.article.articleContent = r.data.articleContent.replace(/<\/p><p>/g,'\n');
                    // that.article.articleContent = r.data.articleContent.replace(/&quot;/g,'"');
                    // that.article.articleContent = r.data.articleContent.replace(/<\/p>/g,'');
                    // that.article.articleContent = r.data.articleContent.replace(/<p>/g,'');
                    // that.article.articleContent = r.data.articleContent.replace(/&gt;/g,'>');
                    // that.article.articleContent = r.data.articleContent.replace(/&lt;/g,'<');
                    // console.log(that.article.articleContent)
                    that.article.articleContent = r.data.articleContent.replace(/&nbsp;/g, ' ');
                    that.isShowContent = true;

                    that.showLeftSide = true;
                    that.hideLeftSide = true;
                    that.showRightSide = true;
                    that.hideRightSide = true;
                    setTimeout(() => {
                        const blocks = document.querySelectorAll('pre code');
                        // console.log(that.article.articleContent.split('\n').length)
                        // that.number = that.article.articleContent.split('\n').length-2
                        blocks.forEach((block) => {
                            hljs.highlightBlock(block);
                        });

                        // 添加行号和copy按钮
                        const pre = document.getElementsByTagName('pre');
                        for (let i = 0; i < pre.length; i++) {
                            const codes = pre[i].getElementsByTagName('code')[0];
                            // 获取换行数
                            const hhNum = codes.innerHTML.split('\n').length;
                            const dl = document.createElement('dl');
                            dl.className = 'myLine';
                            for (let x = 1; x < hhNum; x++) {
                                const dd = document.createElement('dd');
                                dd.innerText = x;
                                dl.appendChild(dd);
                            }
                            // 添加行号
                            pre[i].appendChild(dl);
                            // 添加复制按钮
                            const copy = document.createElement('div');
                            copy.className = 'copy';
                            copy.innerText = 'copy';
                            // 复制按钮添加事件
                            copy.onclick = function () {
                                const innerText = this.parentNode.getElementsByTagName('code')[0].innerText;
                                if (that.hk.copy(innerText)) {
                                    that.$message.success('复制成功！');
                                } else {
                                    that.$message.error('代码复制失败，请手动复制！');
                                }
                            };
                            pre[i].appendChild(copy);
                            // 显示或隐藏copy按钮
                            pre[i].onmouseenter = function () {
                                this.getElementsByClassName('copy')[0].style.display = 'block';
                            };
                            pre[i].onmouseleave = function () {
                                this.getElementsByClassName('copy')[0].style.display = 'none';
                            };
                        }
                        that.articleContentDetailsHide = false;
                    }, 200);
                });
        },
        hideContent () {
            const that = this;
            that.isShowContent = false;

            that.showLeftSide = false;
            that.hideLeftSide = false;
            that.showRightSide = false;
            that.hideRightSide = false;
        }
    }
};
</script>

<style scoped>
    * {
        margin: 0;
        padding: 0;
    }

    a {
        text-decoration: none;
    }

    .blogIndex {
        height: 100%;
        background-color: #eaeaea;
    }

    .leftSide {
        background: #fff;
        width: 300px;
        position: fixed;
        opacity: 1;
        transition: all .2s ease-in;
        height: 100%;
        z-index: 999;
        min-height: 500px;
    }

    .leftSide .overlay {
        background: #4d4d4d;
        width: 100%;
        height: 180px;
        position: absolute;
    }

    .leftSide .intrude-less {
        width: 76%;
        text-align: center;
        margin: 112px auto 0;
        height: 300px;
    }

    .leftSide .intrude-less .profilepic {
        border: 5px solid #fff;
        border-radius: 300px;
        width: 128px;
        height: 128px;
        margin: 0 auto;
        position: relative;
        overflow: hidden;
        background: #88acdb;
        -webkit-transition: all .2s ease-in;
        display: -webkit-box;
        -webkit-box-orient: horizontal;
        -webkit-box-pack: center;
        -webkit-box-align: center;
        text-align: center;
    }

    .leftSide .intrude-less img {
        border-radius: 300px;
        opacity: 1;
        -webkit-transition: all .2s ease-in;
        border: 0;
        vertical-align: middle;
        max-width: 100%;
    }

    .leftSide .intrude-less .header-author {
        text-align: center;
        margin: .67em 0;
        font-family: Roboto, serif;
        font-size: 30px;
        transition: .3s;
        color: #696969;
    }

    .leftSide .intrude-less .header-subtitle {
        text-align: center;
        color: #999;
        font-size: 14px;
        line-height: 25px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }

    .leftSide .intrude-less .search {
        margin-top: 20px;
    }

    .leftSide .intrude-less .column {
        margin-top: 20px;
    }

    .leftSide .intrude-less .column a {
        font-size: 14px;
        color: #696969;
        margin-right: 10px;
        display: inline-block;
    }

    .leftSide .bottom {
        position: absolute;
        bottom: 20px;
        width: 100%;
        text-align: center;
    }

    .leftSide .bottom a {
        font-size: 12px;
        color: #909399;
    }

    .rightSide {
        position: absolute;
        left: 300px;
        width: auto;
        right: 0;
        background: #eaeaea;
        overflow: auto;
        height: 100%;
        overflow-x: hidden;
    }

    .rightSide ul {
        margin: 30px;
        list-style: none;
    }

    .rightSide ul li {
        background-color: white;
        margin-top: 30px;
        position: relative;
    }

    .rightSide ul li .middle {
        padding: 0 50px 20px;
    }

    .rightSide ul li .middle .articleAbstract {
        /*height: 200px;*/
        overflow: hidden;
        line-height: 30px;
    }

    .rightSide ul li .middle .articleAbstract img {
        max-width: 100%;
    }

    .rightSide .title {
        color: #696969;
        margin-left: 0;
        font-weight: 300;
        line-height: 35px;
        margin-bottom: 20px;
        font-size: 26px;
        transition: color .3s;
        margin-right: 100px;
        padding: 20px 50px;
        border-left: 5px solid #4d4d4d;
    }

    .rightSide .title a {
        color: #696969;

    }

    .rightSide .tags {
        margin-top: 20px;
    }

    .rightSide .tags .tag {
        background-color: #ecf5ff;
        display: inline-block;
        height: 32px;
        padding: 0 10px;
        line-height: 30px;
        font-size: 12px;
        color: #409eff;
        border: 1px solid #d9ecff;
        border-radius: 4px;
        box-sizing: border-box;
        white-space: nowrap;
        margin-left: 10px;
    }

    .rightSide .dateTime {
        position: absolute;
        top: 20px;
        right: 30px;
        color: #999;
    }

    /* 代码样式 */
    .rightSide ul li .middle .articleContentDetailsHide{
        display: none;
    }
    .rightSide ul li .middle .articleContentDetails >>> code, .rightSide ul li .middle .articleContentDetails >>> .myLine {
        line-height: 22px;
        font-size: 14px;
        font-family: Source Code Pro, DejaVu Sans Mono, Ubuntu Mono, Anonymous Pro, Droid Sans Mono, Menlo, Monaco, Consolas, Inconsolata, Courier, monospace, PingFang SC, Microsoft YaHei, sans-serif;
    }

    .rightSide ul li .middle .articleContentDetails >>> pre {
        position: relative;
        overflow-y: hidden;
    }

    .rightSide ul li .middle .articleContentDetails >>> code {
        padding-left: 60px;
    }

    .rightSide ul li .middle .articleContentDetails >>> .myLine {
        position: absolute;
        top: 0;
        margin-top: 0.5em;
        width: 50px;
        margin-left: 0;
        text-align: right;
    }

    .rightSide ul li .middle .articleContentDetails >>> .myLine dd {
        margin: 0;
        color: #abb2bf !important;
        border-right: 1px solid #c5c5c5;
        padding-right: 10px;
    }

    /* 复制按钮 */
    .rightSide ul li .middle .articleContentDetails >>> pre .copy {
        position: absolute;
        right: 20px;
        top: 10px;
        background-color: rgba(255, 255, 255, 0.1);
        padding: 2px 10px;
        font-size: 14px;
        border-radius: 4px;
        cursor: pointer;
        color: burlywood;
        display: none;
    }

    /**************** 左侧菜单显示隐藏动画 start ****************/
    .showLeftSide {
        animation: leftSideShowAnimation 1s;
        -moz-animation: leftSideShowAnimation 1s; /* Firefox */
        -webkit-animation: leftSideShowAnimation 1s; /* Safari and Chrome */
        -o-animation: leftSideShowAnimation 1s; /* Opera */
        left: 0;
    }

    .hideLeftSide {
        animation: leftSideHideAnimation 1s;
        -moz-animation: leftSideHideAnimation 1s; /* Firefox */
        -webkit-animation: leftSideHideAnimation 1s; /* Safari and Chrome */
        -o-animation: leftSideHideAnimation 1s; /* Opera */
        left: -300px;
    }

    @keyframes leftSideHideAnimation {
        0% {
            left: 0;
        }
        100% {
            left: -300px;
        }
    }

    @-moz-keyframes leftSideHideAnimation /* Firefox */
    {
        0% {
            left: 0;
        }
        100% {
            left: -300px;
        }
    }

    @-webkit-keyframes leftSideHideAnimation /* Safari and Chrome */
    {
        0% {
            left: 0;
        }
        100% {
            left: -300px;
        }
    }

    @-o-keyframes leftSideHideAnimation /* Opera */
    {
        0% {
            left: 0;
        }
        100% {
            left: -300px;
        }
    }

    @keyframes leftSideShowAnimation {
        0% {
            left: -300px;
        }
        100% {
            left: 0;
        }
    }

    @-moz-keyframes leftSideShowAnimation /* Firefox */
    {
        0% {
            left: -300px;
        }
        100% {
            left: 0;
        }
    }

    @-webkit-keyframes leftSideShowAnimation /* Safari and Chrome */
    {
        0% {
            left: -300px;
        }
        100% {
            left: 0;
        }
    }

    @-o-keyframes leftSideShowAnimation /* Opera */
    {
        0% {
            left: -300px;
        }
        100% {
            left: 0;
        }
    }

    /**************** 左侧菜单显示隐藏动画 end ****************/

    /**************** 文章内容显示隐藏动画 start ****************/
    .showRightSide {
        animation: rightSideShowAnimation 1s;
        -moz-animation: rightSideShowAnimation 1s; /* Firefox */
        -webkit-animation: rightSideShowAnimation 1s; /* Safari and Chrome */
        -o-animation: rightSideShowAnimation 1s; /* Opera */
        left: 0;
    }

    .hideRightSide {
        animation: rightSideHideAnimation 1s;
        -moz-animation: rightSideHideAnimation 1s; /* Firefox */
        -webkit-animation: rightSideHideAnimation 1s; /* Safari and Chrome */
        -o-animation: rightSideHideAnimation 1s; /* Opera */
        left: 300px;
    }

    @keyframes rightSideShowAnimation {
        0% {
            left: 300px;
        }
        100% {
            left: 0;
        }
    }

    @-moz-keyframes rightSideShowAnimation /* Firefox */
    {
        0% {
            left: 300px;
        }
        100% {
            left: 0;
        }
    }

    @-webkit-keyframes rightSideShowAnimation /* Safari and Chrome */
    {
        0% {
            left: 300px;
        }
        100% {
            left: 0;
        }
    }

    @-o-keyframes rightSideShowAnimation /* Opera */
    {
        0% {
            left: 300px;
        }
        100% {
            left: 0;
        }
    }

    @keyframes rightSideHideAnimation {
        0% {
            left: 0;
        }
        100% {
            left: 300px;
        }
    }

    @-moz-keyframes rightSideHideAnimation /* Firefox */
    {
        0% {
            left: 0;
        }
        100% {
            left: 300px;
        }
    }

    @-webkit-keyframes rightSideHideAnimation /* Safari and Chrome */
    {
        0% {
            left: 0;
        }
        100% {
            left: 300px;
        }
    }

    @-o-keyframes rightSideHideAnimation /* Opera */
    {
        0% {
            left: 0;
        }
        100% {
            left: 300px;
        }
    }

    /**************** 左侧菜单显示隐藏动画 end ****************/

    .articleContent .iconback {
        padding: 0 5px 0 0;
        font-size: 28px;
        vertical-align: middle;
        border-right: 3px solid #696969;
        color: #696969;
        margin-right: 15px;
        cursor: pointer;
    }

    .articleContent .title a {
        color: #E6A23C;
        font-weight: 700;
    }

    /*滚动条整体部分*/
    .rightSide::-webkit-scrollbar {
        width: 10px;
        height: 10px;
        /**/
    }

    /*滚动条的轨道（里面装有Thumb）*/
    .rightSide::-webkit-scrollbar-track {
        background: rgb(239, 239, 239);
        border-radius: 2px;
    }

    /*滚动条里面的小方块，能向上向下移动（或往左往右移动，取决于是垂直滚动条还是水平滚动条）*/
    .rightSide::-webkit-scrollbar-thumb {
        background: #bfbfbf;
        border-radius: 10px;
    }

    .rightSide::-webkit-scrollbar-thumb:hover {
        background: #606266;
    }

    /*边角，即两个滚动条的交汇处*/
    .rightSide::-webkit-scrollbar-corner {
        background: #179a16;
    }
</style>
