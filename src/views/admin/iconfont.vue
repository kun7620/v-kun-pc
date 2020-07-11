<template>
    <div class="iconfonts">
        <ul class="iconfontList">
            <li v-for="item in iconfontList" @click="copyClass(item)"><i class="iconfont" :class="item" title="点击复制代码"></i><span>{{item}}</span></li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'iconfont',
    data: function () {
        return {
            iconfontList: []
        }
    },
    created () {
        const that = this
        this.axios.get('/public/requestGet?url=' + window.hkConfig.iconfontUrl)
            .then(r => {
                if (r.code === 0) {
                    const split = r.data.split(':before')
                    for (let i = 0; i < split.length - 1; i++) {
                        if (i === 0) {
                            that.iconfontList.push(split[i].substring(split[i].lastIndexOf('.') + 1))
                        } else {
                            that.iconfontList.push(split[i].substring(split[i].indexOf('.') + 1))
                        }
                    }
                    console.log(that.iconfontList)
                } else {
                    that.$message.error('请求出错：' + r.msg)
                }
            })
    },
    methods: {
        copyClass (item) {
            // 判断是否作为别的组件的子组件
            if (JSON.stringify(this._events) !== '{}' && this._events.setIconFontClassName.length === 1) {
                this.$emit('setIconFontClassName', item)
            } else {
                if (this.hk.copy('iconfont ' + item)) {
                    this.$message.success('class复制成功')
                }
            }
        }
    }
}
</script>

<style scoped>
    .iconfonts{
        padding: 20px 10px 0;
    }
    .iconfontList li{
        list-style: none;
        width: 100px;
        height: 100px;
        float: left;
        text-align: center;
        cursor: pointer;
    }
    .iconfontList .iconfont{
        color: #909399;
        display: block;
        font-size: 30px;
        position: relative;
    }
    .iconfontList span{
        font-size: 12px;
        word-break:normal;
        width:auto;
        display:block;
        white-space:pre-wrap;
        word-wrap : break-word ;
        overflow: hidden ;
    }
</style>
