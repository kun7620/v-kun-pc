<template>
    <div class="ueditor">
        <VueUeditorWrap ref="VueUeditorWrap" @ready="ready" :config="myConfig" v-model="content"/>
    </div>
</template>

<script>
    /* https://github.com/HaoChuan9421/vue-ueditor-wrap */
    import VueUeditorWrap from 'vue-ueditor-wrap';

    export default {
        name: 'ueditor',
        props:{
            height : {
                default:500
            },
            initContent :{
                type :String,
                default:''
            }
        },
        data() {
            return {
                ue : null,
                content: this.initContent,
                myConfig: {
                    // 编辑器不自动被内容撑高
                    autoHeightEnabled: false,
                    // 初始容器高度
                    initialFrameHeight: Number(this.height),
                    // 初始容器宽度
                    initialFrameWidth: '100%',
                    // 上传文件接口
                    serverUrl: window.hkConfig.uploadFile,
                    // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
                    UEDITOR_HOME_URL: '/lib/ueditor/'
                }
            };
        },
        methods: {
            ready (editorInstance) {
                this.ue = editorInstance;
            },
            getContent(){
                return this.content;
            },
            setContent(content){
                this.content = content;
            }
        },
        components: {
            VueUeditorWrap
        }
    };
</script>

<style scoped>
    .ueditor >>> .edui-editor-toolbarboxinner .edui-box > div{
        line-height: initial;
    }
</style>
