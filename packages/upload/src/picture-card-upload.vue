<template>
  <div class="es-upload">
    <div class="upload">
      <upload
        ref="picture-card"
        list-type="picture-card"
        :action="action"
        :headers="headers"
        :before-upload="file => beforeUpload(file, $attrs.item, $attrs.form)"
        :on-success="(response, file, fileList) => onSuccess(response, $attrs.item, $attrs.form)"
        :on-error="onError"
      >
        <i
          slot="default"
          class="el-icon-plus"
        ></i>
        <div
          slot="file"
          slot-scope="{file}"
        >
          <img
            class="el-upload-list__item-thumbnail"
            :src="file.url"
            alt=""
          >
          <span class="el-upload-list__item-actions">
            <span
              class="el-upload-list__item-preview"
              @click="handlePictureCardPreview(file)"
            >
              <i class="el-icon-zoom-in"></i>
            </span>
            <span
              v-if="!disabled"
              class="el-upload-list__item-delete"
              @click="handleDownload(file)"
            >
              <i class="el-icon-download"></i>
            </span>
            <span
              v-if="!disabled"
              class="el-upload-list__item-delete"
              @click="handleRemove(file)"
            >
              <i class="el-icon-delete"></i>
            </span>
          </span>
        </div>
      </upload>
      <dialog :visible.sync="dialogVisible">
        <img
          width="100%"
          :src="dialogImageUrl"
          alt=""
        >
      </dialog>
    </div>
    <!-- 1110 提示语 -->
    <div class="tips"></div>
  </div>
</template>

<script>
// 引入图片查看
import { Message, Dialog, Upload } from 'element-ui'
import PreviewImg from './preview'
import basic from '../../../src/mixin'
export default {
  name: 'EsPictureCardUpload',
  components: {
    PreviewImg,
    Dialog,
    Upload
  },
  props: {
    // 文件类型：file/preview(预览)
    type: {
      type: String,
      default: 'file',
    },
    // 请求头
    headers: {
      type: Object,
      default: () => {
        return {}
      },
    },
    // 文件路径
    filePath: {
      type: String,
      default: '',
    },
    // 文件上传接口
    action: {
      type: String,
      default: '#',
    },
    // 文件列表类型 text/picture/picture-card
    listType: {
      type: String,
      default: 'text',
    },
    // 文件上传配置
    setting: {
      type: Object,
      default: () => {
        return { accept: ['jpg'], fileSize: 1 }
      },
    },
    // [20210527][crt] 重写上传前执行方法
    beforeUpload: {
      type: Function,
      default: (file)=>true,
    },
    onSuccess: {
      type: Function,
      default: ()=>{}
    },
    // [20210527][crt] 是否使用引入pdf预览方法
    pdfPreview: {
      type: [Function, String, Boolean, Number, Object],
      default: null,
    },
    // [20210527][crt] 是否显示移除按钮
    resetButton: {
      type: Boolean,
      default: false,
    },
  },
  mixins: [basic],
  data() {
    return {
      file: '',
      dialogImageUrl: '',
      dialogVisible: false,
      
      fileType: '', // 文件类型
      isPreview: false, // 查看文件中
      filePreviewPath: '', // 预览文件路径
    }
    // fileUploadAction: 'http://192.168.200.203:8099/index/upload', // 1110 文件上传接口
  },
  created(){
  },
  methods: {
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleRemove(file) {
      console.log(file)
    },
    handleDownload(file) {
      console.log(file)
    },

    // [20210527][cpy] 文件上传前触发
    handleBeforeUpload(file) {
      let { accept, fileSize } = this.setting
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
          case 'pdf':
            transferAccept.push('application/pdf')
            break
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
      this.loadStart('文件上传中...')
      return true
    },
    // [20210527][upd] 文件上传成功后触发
    handleOnSuccess(response, item, form) {
      debugger

      this.onSuccess(response, item, form)
      // this.$emit('on-success', response)
      Message.success('上传成功')
      // this.loadEnd()
    },
    // [20210527]][cpy] 上传失败触发
    handleOnError(err, file, fileList) {
      Message.error('上传失败')
      this.loadEnd()
    },
    // [20210527][crt] 移除
    handleOnReset() {
      this.fileType = ''
      this.isPreview = false
      this.filePreviewPath = ''
      this.$emit('on-reset')
    },
    // [20210527][upd] 查看文件
    handleOnPreview(path) {
      let filePath = this.filePath

      let _this = this
      this.fileType = filePath
        .toLowerCase()
        .substring(filePath.lastIndexOf('.') + 1)
      // 处理pdf文件遮罩层
      if (this.fileType == 'pdf' && !this.pdfPreview) {
        this.loadStart('文件加载中...')
        var xhr = new XMLHttpRequest()

        xhr.open(
          'GET',
          this.$serverIp + '/file/oss/download?filePath=' + filePath
        )
        xhr.onreadystatechange = handler
        xhr.responseType = 'blob'
        xhr.setRequestHeader('Authorization', 'Bearer ' + this.access_token)
        xhr.send()

        function handler() {
          if (this.readyState === this.DONE) {
            if (this.status === 200) {
              _this.filePreviewPath = URL.createObjectURL(this.response)
            } else {
              console.error('no pdf :(')
            }
          }
        }
      } else if (this.fileType == 'pdf' && this.pdfPreview) {
        this.loadStart('文件加载中...')
        this.filePreviewPath = this.pdfPreview(filePath)
      } else {
        this.filePreviewPath = filePath
      }
      this.isPreview = true
      this.loadEnd()
    },
    // [20210527][cpy] 关闭预览
    closePreview() {
      this.isPreview = false
    },
  },
}
</script>
<style>
.es-upload {
}
.es-upload .upload {
  display: flex;
}
.es-upload .upload .upload-comp {
  margin-right: 10px;
}
</style>
