<template>
  <container class="images">
    <el-image

      v-for="item in images"
      :src="item.download_url"
      :preview-src-list="item.srcList">
    </el-image>
  </container>
</template>

<script>
export default {
    name: 'images',
    data () {
        return {
            images: [],
            url: 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
            srcList: ['https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg']
        };
    },
    created () {
        const that = this;
        this.axios.get('/public/requestGet?url=' + encodeURIComponent('https://picsum.photos/v2/list?page=1&limit=10'))
            .then(r => {
                that.images = JSON.parse(r.data);
                for (const item of that.images) {
                    item.srcList = [item.download_url];
                }
                console.log(that.srcList);
            });
    }
};
</script>

<style scoped>

</style>
