<template>
  <div>
    <el-upload
      class="avatar-uploader"
      :action="action"
      :show-file-list="false"
      :headers="headers"
      :before-upload="file => manipulateBeforeUpload(file, $attrs.item, $attrs.form)"
      :on-success="(response,file,fileList) => mainpulateOnSuccess(response, file, $attrs.item, $attrs.form)"
    >
      <img
        v-if="imageUrl"
        :src="imageUrl"
        class="avatar"
      >
      <i
        v-else
        class="el-icon-plus avatar-uploader-icon"
      ></i>
    </el-upload>
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
export default {
  name: 'EsAvatarUpload',
  props: {
    headers: {
      type: Object,
      default: () => {
        return {}
      },
    },
    accept: {
      type: Array,
      default: () => ['jpg', 'png'],
    },
    fileSize: {
      type: Number,
      default: 1,
    },
    action: {
      type: String,
      default: '#',
    },
    beforeUpload: {
      type: Function,
      default: (file) => true,
    },
    onSuccess: {
      type: Function,
      default: () => {},
    },
    overrideBeforeUpload: {
      type: Boolean,
      default: false,
    },
    imgUrl: {
      type: String, 
      default: ''
    }
  },
  data() {
    return {
      imageUrl: '',
    }
  },
  watch:{
    imgUrl: {
      handler(val){
        this.mainpulateSetImageUrl(val)
      }
    }
  },
  methods: {
    mainpulateOnSuccess(response, file, item, form) {
      this.imageUrl = URL.createObjectURL(file.raw)
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
      let { type, size } = file
      let transferAccept = [] // 格式转换数组
      accept.forEach((item) => {
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
    manipulateResetImageUrl(){
      this.imageUrl = ''
    },
    mainpulateSetImageUrl(filePath){
      this.imageUrl = filePath
    }
  },
}
</script>

<style>
.avatar-uploader{
  line-height: normal;
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
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>