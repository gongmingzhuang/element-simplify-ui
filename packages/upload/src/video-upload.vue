<template>
  <div class="video-upload">
    <!-- {{item}} -->
    <div v-show="0">
      {{form}}
      <hr>
    </div>
    <div v-show="0">
      {{item.setting.previewUrl}}
      <hr>
    </div>
    <!-- 预览控件 -->
    <div
      class="avatar-uploader preview-container"
      v-if="item.hasOwnProperty('setting') && item.setting.hasOwnProperty('isPreview') && item.setting.isPreview"
    >
      <video
        v-if="imageUrl"
        v-bind:src="imageUrl"
        class="avatar video-avatar"
      >
        您的浏览器不支持视频播放
      </video>
      <i
        class="el-icon-caret-right play-icon"
        @click="isPreview = true"
      />
      <preview-img
        v-if="isPreview"
        type="video"
        @clickit="isPreview = false"
        :imgSrc="item.setting.previewUrl"
      ></preview-img>
    </div>
    <!-- 上传控件 -->
    <div v-else>
      <el-upload
        ref="el-upload"
        class="avatar-uploader"
        :action="action"
        :show-file-list="false"
        :headers="headers"
        :data="data"
        :before-upload="file => manipulateBeforeUpload(file, item, form)"
        :on-success="(response,file,fileList) => mainpulateOnSuccess(response, file, item, form)"
      >
        <video
          v-if="imageUrl"
          v-bind:src="imageUrl"
          class="avatar video-avatar"
          controls="controls"
          controlslist="nodownload noremoteplayback"
          disablePictureInPicture
          preload
        >
          您的浏览器不支持视频播放
        </video>

        <!-- <img
          v-if="imageUrl"
          :src="imageUrl"
          class="avatar static"
        >
        <img
          v-else-if="item.setting.previewUrl"
          :src="item.setting.previewUrl"
          class="avatar dynamic"
        > -->
        <i
          v-else
          class="el-icon-plus avatar-uploader-icon"
        ></i>
      </el-upload>
      <div
        class="hadUpload"
        v-if="imageUrl && item.hasOwnProperty('setting') && item.setting.hasOwnProperty('clearable') && item.setting.clearable"
      >
        <es-close-icon :close-event="manipulateResetImageUrl" />
      </div>
    </div>
  </div>
</template>

<script>
/**
 * @author: gongmingzhuang
 * @time: 20210715
 *
 * e.g. <es-avatar-upload action="#" :accept="['jpg', 'png']" :file-size="1" :onSuccess="handleOnSuccess"/>
 */
import { Message } from 'element-ui'
import previewImg from './preview'
export default {
  name: 'EsVideoUpload',
  props: {
    headers: {
      type: Object,
      default: () => {
        return {}
      }
    },
    data: {
      type: Object,
      dafault: () => {
        return {}
      }
    },
    accept: {
      type: Array,
      default: () => ['jpg', 'png']
    },
    form: {
      type: Object,
      default: () => {
        return {}
      }
    },
    item: {
      type: Object,
      default: () => {
        return {}
      }
    },
    fileSize: {
      type: Number,
      default: 1
    },
    action: {
      type: String,
      default: '#'
    },
    beforeUpload: {
      type: Function,
      default: file => true
    },
    onSuccess: {
      type: Function,
      default: () => {}
    },
    overrideBeforeUpload: {
      type: Boolean,
      default: false
    },
    imgUrl: {
      type: String,
      default: ''
    }
  },
  components: {
    previewImg
  },
  data() {
    return {
      imageUrl: '',
      isPreview: false
    }
  },
  watch: {
    item: {
      handler(itm) {
        this.mainpulateSetImageUrl(itm.setting.previewUrl)
      },
      immediate: true,
      deep: true
    },
    'item.previewUrl': {
      handler(val) {
        this.mainpulateSetImageUrl(val)
      }
      // immediate: true
    }
  },
  created() {},
  methods: {
    mainpulateOnSuccess(response, file, item, form) {
      this.imageUrl = URL.createObjectURL(file.raw)
      // this.$set(this.item, 'previewUrl', URL.createObjectURL(file.raw))
      this.item.setting.previewUrl = URL.createObjectURL(file.raw)
      if (this.onSuccess) {
        this.onSuccess(response, item, form)
      }
    },
    manipulateBeforeUpload(file, item, form) {
      // 重写beforeUpload 方法
      if (this.overrideBeforeUpload) {
        return this.operateBeforeUpload(file, item, form)
      }
      // 内置校验，可配置accept/fileSize
      let accept = this.accept
      let fileSize = this.fileSize
      // [20210923] 类型映射
      // let typeMapping = item?.setting?.typeMapping

      let typeMapping = []
      // 外部传入支持格式
      if (
        item.hasOwnProperty('setting') &&
        item.setting.hasOwnProperty('typeMapping') &&
        item.setting.typeMapping
      ) {
        typeMapping = item.setting.typeMapping
      }

      let { type, size } = file
      let transferAccept = [] // 格式转换数组
      // 文件类型查询： https://tool.oschina.net/commons?type=22013-05-17
      accept.forEach(item => {
        switch (item) {
          case 'jpg':
            transferAccept.push('image/jpeg')
            break
          case 'png':
            transferAccept.push('image/png')
            break
          // case 'pdf':
          //   transferAccept.push('application/pdf')
          //   break
        }
      })

      if (typeMapping && typeMapping instanceof Object && !(typeMapping instanceof Array)) {
        for (let key in typeMapping) {
          transferAccept.push(typeMapping[key])
        }
      }
      if (typeMapping && typeMapping instanceof Array) {
        transferAccept = transferAccept.concat(typeMapping)
      }

      // 文件类型判断
      if (!transferAccept.includes(type)) {
        Message.error('上传文件支持类型：' + accept.join('、'))
        return false
      }
      // 文件大小判断
      if (size > fileSize * 1024 * 1024) {
        Message.error('上传文件大小限制：小于' + fileSize + 'M')
        return false
      }
      if (this.beforeUpload) {
        return this.beforeUpload(file, item, form)
      }
      return true
    },
    manipulateResetImageUrl() {
      let _item = this.item, _form = this.form
      this.imageUrl = ''
      this.item.previewUrl = ''
      if (this.onSuccess) {
        this.onSuccess(null, _item, _form)
      }
    },
    mainpulateSetImageUrl(filePath) {
      this.imageUrl = filePath
      this.item.previewUrl = filePath
    }
  }
}
</script>

<style lang="less">
.video-upload {
  .avatar-uploader {
    line-height: normal;
    &.preview-container {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    & + .hadUpload {
      display: none;
    }
    &:hover + .hadUpload {
      display: block;
    }
  }
  .hadUpload:hover {
    display: block;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader .avatar-uploader-icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .video-avatar {
    cursor: default;
  }
  .play-icon {
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    justify-content: center;
    border: 2px solid #333;
    background: rgba(0, 0, 0, 0.1);
    color: #333;
    font-size: 50px;
    border-radius: 50%;
  }
  .hadUpload {
    // position: absolute;
  }
}
</style>