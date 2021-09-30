<template>
  <!-- 过渡动画 -->
  <transition name="fade">
    <div
      class="img-view"
      @click="bigImg"
    >
      <!-- 遮罩层 -->
      <div class="img-layer"></div>
      <div class="img">
        <img
          :src="imgSrc"
          v-if="type == 'image'"
        />
        <video
          v-if="imgSrc && type == 'video'"
          :src="imgSrc"
          class="avatar video-avatar"
          controls="controls"
          controlslist="nodownload noremoteplayback"
          disablePictureInPicture
        >
          您的浏览器不支持视频播放
        </video>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  // props: ['imgSrc', 'type'], //接受图片地址
  props: {
    imgSrc: {
      type: String,
      require: true
    },
    type: {
      type: String,
      default: 'image'
    }
  }, //接受图片地址
  methods: {
    bigImg() {
      // 发送事件
      this.$emit('clickit')
    }
  }
}
</script>
<style lang="less">
/*动画*/
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s linear;
  transform: translate3D(0, 0, 0);
}
.fade-enter,
.fade-leave-active {
  transform: translate3D(100%, 0, 0);
}

/* bigimg */
.img-view {
  // // position: inherit;
  // // width: 100%;
  // // height: 100%;
  // // modify by codeofevan
  // position: absolute;
  // width: 1000px;
  // min-height: 600px;
  // top: 50%;
  // left: 50%;
  // margin-left: -500px;
  // // margin-top: -200px;
  // overflow-y: scroll;
  position: fixed;
  width: 100vw;
  min-height: 100vh;
  top: 0;
  left: 0;
  z-index: 2000;
  .img {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 2001;
    height: 90vh;
    padding: 20px 0;
    overflow-y: auto;
    // min-width: 80vw;
    // height: 80vh;
    transform: translate(-50%, -50%);
  }
}
/*遮罩层样式*/
.img-view .img-layer {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.7);
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.img-view .img {
  /*不限制图片大小，实现居中*/
  img {
    // max-width: 100%;
    width: 100%;
    display: block;
    // position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    z-index: 1000;
  }
  video {
    width: auto;
    height: 80vh;
  }
}
</style>
