<template>
  <div class="ikun" :style="{ background: isPlay ? 'transparent' : 'black' }">
    <canvas ref="canvasRef" class="ikun-canvas" />
    <svg
      v-if="!isPlay"
      class="ikun-icon"
      @click="onClickPlay"
      t="1659080249044"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="6527"
      width="280"
      height="280">
      <path
        d="M2.353417 902.445527L8.464369 119.734428A122.728285 122.728285 0 0 1 187.71896 13.811261L955.152679 407.458417a119.163563 119.163563 0 0 1 0 213.374073L180.589516 1010.405678A122.219039 122.219039 0 0 1 2.353417 902.445527z"
        fill="#C74066"
        p-id="6528"></path>
      <path
        d="M5.408893 514.400076L2.353417 902.445527a122.219039 122.219039 0 0 0 178.236099 107.960151l773.544671-389.573188A118.654317 118.654317 0 0 0 1020.845412 514.400076z"
        fill="#AA2B52"
        p-id="6529"></path>
    </svg>
  </div>
</template>

<script lang="ts" setup>
  import CharVideo from '../utils/charVideo.ts'

  import { ref, unref } from 'vue'

  const canvasRef = ref(null)
  const isPlay = ref(false)

  const getBlob = () => {
    return new Promise(resolve => {
      const xhr = new XMLHttpRequest()
      xhr.open('GET', '/videos/ikun.mp4', true)
      xhr.responseType = 'blob'
      xhr.onload = () => {
        if (xhr.status === 200) {
          resolve(xhr.response)
        }
      }
      xhr.send()
    })
  }

  async function onClickPlay() {
    const blob = await getBlob()
    new CharVideo({
      canvasElement: unref(canvasRef)
    }).playFile(blob)

    isPlay.value = true
  }
</script>

<style scoped lang="scss">
  .ikun {
    position: relative;
    margin-top: 16px;

    &-canvas {
      width: 100%;
    }

    &-icon {
      position: absolute;
      left: 0;
      right: 0;
      margin: auto;
      top: 0;
      bottom: 0;
      width: 48px;
      height: 48px;
    }
  }
</style>
