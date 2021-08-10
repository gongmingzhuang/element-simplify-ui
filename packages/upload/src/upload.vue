<template>
  <div class="es-upload">
    <div class="upload">
      <!-- [20210526][upd] 显示控件情景：未选择、可修改 -->
      <!-- [20210714][upd] 添加请求头 -->
      <el-upload
        class="upload-comp"
        v-if="type=='file'"
        :list-type="listType"
        :action="action"
        :headers="headers"
        :data="data"
        :before-upload="typeof(beforeUpload)=='function' ? beforeUpload: handleBeforeUpload"
        :on-success="handleOnSuccess"
        :on-error="handleOnError"
        :show-file-list="false"
      >
       <i slot="default" class="el-icon-plus" v-if="listType=='picture-card'"></i>
        <el-button
          v-else
          class="upload-select"
          :type="filePath ? 'warning' : 'primary'"
        >{{ filePath ? "变 更" : "选 择" }}
        </el-button>
      </el-upload>
      <!-- [20210526][upd] 文件查看情景：文件已上传、文件查看页面 -->
      <div
        class="upload-view"
        v-if="type == 'preview' || filePath"
      >
        <el-button
          v-if="setting.accept.length > 0"
          type="success"
          @click="handleOnPreview(filePath)"
        >查 看</el-button>
        <el-button
          v-if="resetButton"
          type="danger"
          @click="handleOnReset(filePath)"
        >移 除</el-button>
        <!-- 放大图片 -->
        <!-- https://www.cnblogs.com/xiaoyao181/p/8550398.html -->
        <preview-img
          v-if="isPreview && fileType != 'pdf'"
          @clickit="closePreview"
          :imgSrc="filePreviewPath"
        ></preview-img>
        <!-- pdf -->
        <div
          class="group_img"
          v-if="isPreview && fileType == 'pdf'"
        >
          <div
            class="group_img_mask"
            @click="closePreview"
          ></div>
          <iframe
            title="查看文件"
            :src="filePreviewPath"
            width="100%"
            height="100%"
          ></iframe>
          <!-- v-if="isCheckingFile && isPdfFile" -->
        </div>
      </div>
    </div>
    <!-- 1110 提示语 -->
    <div class="tips"></div>
  </div>
</template>

<script>
// 引入图片查看
import PreviewImg from './preview'
import { Message } from 'element-ui'
import basic from '../../../src/mixin'
export default {
  name: 'EsUpload',
  components: {
    PreviewImg,
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
      default: ()=>{return{}}
    },
    // 额外参数
    data: {
      type: Object,
      default: ()=>{return{}}
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
      default: 'text'
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
      type: [Function, String, Boolean, Number, Object],
      default: null,
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
    // [20210726]
    preview: {
      type: Function,
      default: ()=>{return{}}
    }
  },
  mixins: [basic],
  data() {
    return {
      fileType: '', // 文件类型
      isPreview: false, // 查看文件中
      filePreviewPath: '', // 预览文件路径
    }
    // fileUploadAction: 'http://192.168.200.203:8099/index/upload', // 1110 文件上传接口
  },
  methods: {
    // [20210527][cpy] 文件上传前触发
    handleBeforeUpload(file) {
      let { accept, fileSize } = this.setting
      let { type, size } = file
      let transferAccept = [] // 格式转换数组
      let acceptAllType = false // 允许上传所有格式
      if(accept.length == 0){
        acceptAllType = true
      }
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
      if (!acceptAllType && !transferAccept.includes(type)) {
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
    handleOnSuccess(response, form, field) {
      this.$emit('on-success', response)
      Message.success('上传成功')
      this.loadEnd()
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
      this.preview(path).then(res=>{
        // debugger
        this.isPreview = true
        this.filePreviewPath =  res
      })
      // this.$emit('on-preview', path)
      return
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
