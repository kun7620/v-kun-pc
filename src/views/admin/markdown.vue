<template>
    <div>
        <mavon-editor v-model="content" ref="md" style="min-height: 600px"/>
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
    }
};
</script>

<style scoped>

</style>
