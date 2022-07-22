<template>
  <h1 class="palette-title">你好，调色板！</h1>
</template>

<style lang="scss">
  /* 从该插件的调色板中引入变量 *

  /* 设置变量的默认值 */
  $color: red !default;

  /* 在你的样式中使用变量 */
  .palette-title {
    color: $color;
  }
</style>
