<template>
  <div class="d2-container-full">
    <div v-if="$slots.header" class="d2-container-full__header" ref="header">
      <slot name="header"/>
    </div>
    <div class="d2-container-full__body" ref="body">
      <slot/>
    </div>
    <div v-if="$slots.footer" class="d2-container-full__footer" ref="footer">
      <slot name="footer"/>
    </div>
  </div>
</template>

<script>
import scroll from './mixins/normal'
export default {
  name: 'd2-container-full',
  mixins: [
    scroll
  ],
  mounted () {
    // 增加滚动事件监听
    this.addScrollListener()
  },
  beforeDestroy () {
    // 移除滚动事件监听
    this.removeScrollListener()
  }
}
</script>
<style>
  .d2-container-full__body{

  }
  /*滚动条整体部分*/
  .d2-container-full__body::-webkit-scrollbar{
    width:10px;
    height:10px;
    /**/
  }
  /*滚动条的轨道（里面装有Thumb）*/
  .d2-container-full__body::-webkit-scrollbar-track{
    background: rgb(239, 239, 239);
    border-radius:2px;
  }
  /*滚动条里面的小方块，能向上向下移动（或往左往右移动，取决于是垂直滚动条还是水平滚动条）*/
  .d2-container-full__body::-webkit-scrollbar-thumb{
    background: #bfbfbf;
    border-radius:10px;
  }
  .d2-container-full__body::-webkit-scrollbar-thumb:hover{
    background: #606266;
  }
  /*边角，即两个滚动条的交汇处*/
  .d2-container-full__body::-webkit-scrollbar-corner{
    background: #179a16;
  }
</style>
