<template>
    <div class="blogIndex">
        <div class="leftSide">
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
        <div class="rightSide">
            <ul>
                <li v-for="item in articleList">
                    <h2 class="title"><a href="javascript:void(0)">{{item.articleName}}</a></h2>
                    <div class="middle">
                        <div class="articleContent" v-html="item.articleAbstract"></div>
                        <div class="tags">
                            <a class="tag" href="javascript:void(0)">java</a>
                            <a class="tag" href="javascript:void(0)">前端</a>
                        </div>
                    </div>
                    <div class="dateTime">{{item.articleCdate}}</div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'index',
        data(){
            return{
                articleList :[]
            }
        },
        created() {
            let that = this;
            that.axios.get('/public/blog')
                .then(r=>{
                    that.articleList = r.data;
                })
        }
    };
</script>

<style scoped>
    *{
        margin: 0;
        padding: 0;
    }
    a{
        text-decoration: none;
    }
    .blogIndex{
        height: 100%;
        background-color: #eaeaea;
    }
    .leftSide{
        background: #fff;
        width: 300px;
        position: fixed;
        opacity: 1;
        transition: all .2s ease-in;
        height: 100%;
        z-index: 999;
    }
    .leftSide .overlay{
        background: #4d4d4d;
        width: 100%;
        height: 180px;
        position: absolute;
    }
    .leftSide .intrude-less{
        width: 76%;
        text-align: center;
        margin: 112px auto 0;
        height: 300px;
    }
    .leftSide .intrude-less .profilepic{
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
    .leftSide .intrude-less img{
        border-radius: 300px;
        opacity: 1;
        -webkit-transition: all .2s ease-in;
        border: 0;
        vertical-align: middle;
        max-width: 100%;
    }
    .leftSide .intrude-less .header-author{
        text-align: center;
        margin: .67em 0;
        font-family: Roboto,serif;
        font-size: 30px;
        transition: .3s;
        color: #696969;
    }
    .leftSide .intrude-less .header-subtitle{
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
    .leftSide .intrude-less .search{
        margin-top: 20px;
    }
    .leftSide .intrude-less .column{
        margin-top: 20px;
    }
    .leftSide .intrude-less .column a{
        font-size: 14px;
        color: #696969;
        margin-right: 10px;
        display: inline-block;
    }
    .leftSide .bottom{
      position: absolute;
      bottom: 20px;
      width: 100%;
      text-align: center;
    }
    .leftSide .bottom a{
      font-size: 12px;
      color: #909399;
    }


    .rightSide{
        position: absolute;
        left: 300px;
        width: auto;
        right: 0;
        background: #eaeaea;
        overflow: auto;
        height: 100%;
        overflow-x: hidden;
    }
    .rightSide ul{
        margin: 30px;
        list-style: none;
    }
    .rightSide ul li{
        background-color: white;
        margin-top:30px;
        position: relative;
    }
    .rightSide ul li .middle{
        padding:0 50px 20px;
    }
    .rightSide ul li .middle .articleContent{
        /*height: 200px;*/
        overflow: hidden;
        line-height: 30px;
    }
    .rightSide ul li .middle .articleContent img{
        max-width: 100%;
    }
    .rightSide .title{
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
    .rightSide .title a{
        color: #696969;

    }
    .rightSide .tags{
        margin-top: 20px;
    }
    .rightSide .tags .tag{
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
    .rightSide .dateTime{
        position: absolute;
        top: 20px;
        right: 30px;
        color: #999;
    }


    /*滚动条整体部分*/
    .rightSide::-webkit-scrollbar{
        width:10px;
        height:10px;
        /**/
    }
    /*滚动条的轨道（里面装有Thumb）*/
    .rightSide::-webkit-scrollbar-track{
        background: rgb(239, 239, 239);
        border-radius:2px;
    }
    /*滚动条里面的小方块，能向上向下移动（或往左往右移动，取决于是垂直滚动条还是水平滚动条）*/
    .rightSide::-webkit-scrollbar-thumb{
        background: #bfbfbf;
        border-radius:10px;
    }
    .rightSide::-webkit-scrollbar-thumb:hover{
        background: #606266;
    }
    /*边角，即两个滚动条的交汇处*/
    .rightSide::-webkit-scrollbar-corner{
        background: #179a16;
    }
</style>
