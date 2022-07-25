<template>
  <div class="jumbotron">
    <img src="/images/frontend/element-blue.png" />
    <div class="jumbotron-red">
      <img src="/images/frontend/element-red.png" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  window.onscroll = () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    const red = document.querySelector('.jumbotron-red')
    red.style.height = scrollTop * 2 + 'px'
  }
</script>

<style lang="scss" scoped>
  .jumbotron {
    position: relative;
    overflow: hidden;
    &-red {
      height: 0;
      transition: height 0.1s;
      background: #fff;
      position: absolute;
      left: 0;
      top: 0;
      overflow: hidden;
    }
  }
</style>
