<template>
    <div>
        <mavon-editor v-model="content" ref="md" @imgAdd="$imgAdd" style="min-height: 600px"/>
    </div>
</template>

<script>
import { mavonEditor } from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';

export default {
    components: {
        mavonEditor
    },
    name: 'markdown',
    data () {
        return {
            content: '',
            html: '',
            configs: {}
        };
    },
    methods: {
        $imgAdd (pos, $file) {
            const formdata = new FormData();
            formdata.append('file', $file);
            this.axios.post(window.hkConfig.uploadFile, formdata)
                .then(res => {
                    this.$refs.md.$img2Url(pos, res.url);
                }).catch(err => {
                    console.log(err);
                });
        }
    }
};
</script>

<style scoped>

</style>
