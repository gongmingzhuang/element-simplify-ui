<template>
  <div
    class="cropper_content"
    :class="{ small: cropHeight <= 300, big: cropHeight > 300 }"
  >
    <el-row :gutter="10">
      <el-col
        :span="24"
        class="imageArea"
      >
        <vue-cropper
          ref="cropper"
          :img="option.image ? option.image : dealImage"
          :autoCrop="true"
          :info="true"
          :full="false"
          :fixed="true"
          :centerBox="true"
          outputType="png"
          :fixedBox="fixedBox"
          :autoCropWidth="option.autoCropWidth"
          :autoCropHeight="option.autoCropHeight"
          :outputSize="option.outputSize"
          @realTime="realTime"
        >
        </vue-cropper>
      </el-col>
      <el-col :span="8">
        <div
          v-if="!hiddenButton"
          class="prewArea"
          :style="cropWidth > 200 ? previewStyleBig : previewStyle"
        >
          <div
            :style="previews.div"
            class="preview"
            v-if="previews.url || option.image || dealImage"
          >
            <img
              :src="previews.url ? previews.url : dealImage"
              :style="previews.img"
            >
          </div>
        </div>
        <el-row
          :gutter="10"
          v-show="0"
        >
          <el-col :span="22">
            <div class="changeImage">
              <label
                class="btn"
                for="uploads"
              >选择图片</label>
              <input
                type="file"
                ref="uploads"
                id="uploads"
                style="position:absolute; clip:rect(0 0 0 0);"
                accept="image/png, image/jpeg, image/bmp, image/jpg"
                @change="setImage($event, 1)"
              >
            </div>
          </el-col>
        </el-row>
        <el-row
          :gutter="10"
          v-if="0"
        >
          <!-- v-if="option.image || !hiddenButton" -->
          <el-col :span="11">
            <!-- 放大 -->
            <el-button
              type="success"
              @click="changeScale(1)"
            >放大</el-button>
          </el-col>
          <el-col :span="11">
            <!-- 缩小 -->
            <el-button
              type="success"
              @click="changeScale(-1)"
            >缩小</el-button>
          </el-col>
        </el-row>
        <el-row
          :gutter="10"
          v-if="0"
        >
          v-if="option.image"
          <el-col :span="11">
            <!-- 左旋转 -->
            <el-button
              type="success"
              @click="rotateLeft"
            >左旋转</el-button>
          </el-col>
          <el-col :span="11">
            <!-- 右旋转 -->
            <el-button
              type="success"
              @click="rotateRight"
            >右旋转</el-button>
          </el-col>
        </el-row>
        <el-row
          :gutter="10"
          v-if="0"
        >
          <!-- v-if="option.image" -->
          <el-col :span="11">
            <!-- 上传 -->
            <el-button
              type="success"
              @click="upload('blob')"
            >上传</el-button>
          </el-col>
          <el-col :span="11">
            <!-- 取消 -->
            <el-button
              type="success"
              @click="cancelUpload"
            >取消</el-button>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
/**
 * [20210713][crt]
 * @author: gongmingzhuang
 *
 */
import EsButtonGroup from '../../button-group/src/button-group'
import { Message } from 'element-ui'
export default {
  // extends: Dialog,
  name: 'EsCropper',
  components: {
    EsButtonGroup
  },
  props: {
    hiddenButton: {
      type: Boolean,
      default: true
    },
    fileType: {
      type: Array,
      default: ()=>[ 'jpg', 'jpeg', 'png', 'bmp']
    },
    fileSize: {
      type: Number,
      default: 5
    },
    isShowCropper: {
      type: Boolean,
      default: false
    },
    fixedBox: {
      type: Boolean,
      default: true
    },
    // 截图框-width
    cropWidth: {
      type: Number,
      default: 400
    },
    // 截图框-height
    cropHeight: {
      type: Number,
      default: 400
    },
    dealImage: {
      type: String,
      default: null
    },
    getChangedImage: {
      type: Function,
      default: () => {}
    },
    uploadUrl: {
      type: String,
      default: ''
    },
    dataSize: {
      type: Number,
      default: 3
    }
  },
  data() {
    return {
      previewStyle: {
        width: '230px',
        'max-height': '230px',
        overflow: 'hidden',
        zoom: '0.75'
      },
      previewStyleBig: {
        overflow: 'hidden',
        zoom: '0.23'
      },
      fileList: [], // 用来存放图片（用来装饰）
      previews: {},
      fileUpload: null,
      // option: {
      //   outputSize: 1,
      //   full: false,
      //   autoCrop: true,
      //   fixedBox: true,
      //   autoCropWidth: this.cropWidth,
      //   autoCropHeight: this.cropHeight,
      //   image: null
      // },
      isShowModel: this.isShowCropper,
      option: {
        image: '', //裁剪图片的地址
        outputSize: 1, //裁剪生成图片的质量(可选0.1 - 1)
        outputType: 'png', //裁剪生成图片的格式（jpeg || png || webp）
        info: true, //图片大小信息
        canScale: true, //图片是否允许滚轮缩放
        autoCrop: true, //是否默认生成截图框
        autoCropWidth: this.cropWidth, //默认生成截图框宽度
        autoCropHeight: this.cropHeight, //默认生成截图框高度
        fixed: true, //是否开启截图框宽高固定比例
        fixedNumber: [1.53, 1], //截图框的宽高比例
        full: false, //false按原比例裁切图片，不失真
        fixedBox: true, //固定截图框大小，不允许改变
        canMove: false, //上传图片是否可以移动
        canMoveBox: true, //截图框能否拖动
        original: false, //上传图片按照原始比例渲染
        centerBox: false, //截图框是否被限制在图片里面
        height: true, //是否按照设备的dpr 输出等比例图片
        infoTrue: false, //true为展示真实输出图片宽高，false展示看到的截图框宽高
        maxImgSize: 3000, //限制图片最大宽度和高度
        enlarge: 1, //图片根据截图框输出比例倍数
        mode: '230px 150px' //图片默认渲染方式
      }
    }
  },
  methods: {
    setImage(e, num) {
      let file = e.target.files[0]
      this.fileUpload = file
      let supportFileType = ''
      let checkTypeReg = null
      if(this.fileType && this.fileType.length > 0){
        supportFileType = this.fileType.join('|')
      }else{
        console.error('<es-cropper> 控件图片格式设置错误')
        return
      }
      console.log("supportFileType - ", supportFileType)
      checkTypeReg = new RegExp('\.' + supportFileType + '$')
      if (checkTypeReg && !checkTypeReg.test(e.target.value)) {
        this.$message.warning('图片类型必须是 ' + supportFileType.replaceAll('|',',') + ' 中的一种')
        return false
      }


      let reader = new FileReader()
      reader.onload = e => {
        let data
        if (typeof e.target.result === 'object') {
          // 把Array Buffer转化为blob 如果是base64不需要
          data = window.URL.createObjectURL(new Blob([e.target.result]))
        } else {
          data = e.target.result
        }
        if (num === 1) {
          this.option.image = data
        }
        this.$refs['uploads'].value = ''
      }
      // 转化为base64
      reader.readAsDataURL(file)
      // 转化为blob
      // reader.readAsArrayBuffer(file)
    },

    // 放大缩小
    changeScale(num) {
      num = num || 1
      this.$refs.cropper.changeScale(num)
    },

    // 左旋转
    rotateLeft() {
      this.$refs.cropper.rotateLeft()
    },

    // 右旋转
    rotateRight() {
      this.$refs.cropper.rotateRight()
    },

    // 上传
    upload(type) {
      let formData = new FormData()
      if (!this.fileUpload) {
        Message.error('请先选择需要上传的图片')
        return
      }
      if (!type) {
        type = 'blob'
      }
      if (type === 'blob') {
        this.$refs.cropper.getCropBlob(data => {
          let img = window.URL.createObjectURL(data)
          if (data.size / 1024 / 1024 > this.fileSize) {
            this.$message({
              message: '上传图片不能超过' + this.fileSize + 'M',
              type: 'warning'
            })
            return false
          }
          let _obj = { name: this.fileUpload.name }
          let X = this.fileUpload.name.substring(
            this.fileUpload.name.lastIndexOf('.'),
            this.fileUpload.name.length
          )
          _obj.name = this.fileUpload.name.substring(0, this.fileUpload.name.lastIndexOf('.'))
          let reg = /^[\u4e00-\u9fa5\(\)_a-zA-Z0-9]+$/

          if (!reg.test(_obj.name)) {
            _obj.name = _obj.name.replace(/[^\u4e00-\u9fa5\(\)_a-zA-Z0-9]+/g, '')
          }
          _obj.name = _obj.name + X
          formData.append('file', data, _obj.name)

          // let opt = {

          // }

          /* 文件截取上传 */
          let params = {
            formData,
            headers: {
              //
              'Content-Type': 'multipart/form-data'
            }
          }
          this.$emit('upload-crop-file', params)
        })
      } else {
        // 预留
      }
    },

    // 取消上传
    cancelUpload() {
      this.fileUpload = null
      this.option = {
        outputSize: 1,
        autoCrop: true,
        fixedBox: true,
        autoCropWidth: this.cropWidth,
        autoCropHeight: this.cropHeight,
        image: null
      }
      this.previews = {}
      if (this.option.image) {
        this.$refs['cropper'].imgs = ''
      }

      this.$emit('update:isShowCropper', false)
    },

    // 预览
    realTime(data) {
      this.previews = {
        ...data
      }
    },

    // 将base64的图片转换为file文件
    convertBase64UrlToBlob(urlData) {
      let bytes = window.atob(urlData.split(',')[1]) //去掉url的头，并转换为byte
      //处理异常,将ascii码小于0的转换为大于0
      let ab = new ArrayBuffer(bytes.length)
      let ia = new Uint8Array(ab)
      for (let i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i)
      }
      return new Blob([ab], { type: 'image/jpeg' })
    },

    // 关闭弹窗之前
    closecropperModel(done) {
      this.$emit('update:isShowCropper', false)
      this.fileUpload = null
      this.option = {
        outputSize: 1,
        autoCrop: true,
        fixedBox: true,
        autoCropWidth: this.cropWidth,
        autoCropHeight: this.cropHeight,
        image: null
      }
      if (this.option.image) {
        this.$refs['cropper'].imgs = ''
      }
      this.previews = {}
      // this.dealImage = null;
      done()
    }
  },
  watch: {
    isShowCropper(param) {
      this.isShowModel = param
    }
  }
}
</script>

<style lang="less">
.scropper {
  .el-dialog {
    width: 600px !important;
    .cropper_content {
      .vue-cropper {
        width: 350px !important;
        height: 350px !important;
        .cropper-crop-box {
          width: 200px;
          height: 200px;
        }
        .cropper-modal {
          background: url('data:image/png') !important;
        }
      }
      .prewArea {
        flex: 1;
        -webkit-flex: 1;
        display: flex;
        display: -webkit-flex;
        justify-content: center;
        -webkit-justify-content: center;
        background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMzTjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC');
        .preview {
          overflow: hidden;
          /*margin-left: 40px;*/
          img {
            max-height: 1000px !important;
          }
        }
      }
      .el-button {
        margin-top: 10px;
        width: 100%;
        height: 40px;
        font-size: 12px;
        text-align: center;
      }
      .changeImage {
        margin-top: 10px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 12px;
        color: #fff;
        background: #67c23a;
        border-color: #67c23a;
        border-radius: 4px;
      }
    }
  }
}
.jxf-upload {
  .btn {
    display: inline-block;
    width: 100%;
    cursor: pointer;
  }
  small {
    zoom: 0.5;
  }
  big {
    zoom: 0.5;
  }
  .imageArea {
    position: relative;
  }
}
.lcropper {
  .el-dialog {
    width: 400px !important;
    .cropper_content {
      .vue-cropper {
        width: 900px !important;
        height: 900px !important;
        zoom: 0.4;
        .cropper-crop-box {
          width: 400px;
          height: 400px;
        }
        .cropper-modal {
          background: url('data:image/png') !important;
        }
        .crop-info{
          display: none;
        }
      }
      .prewArea {
        background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMzTjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC');
        .preview {
          overflow: hidden;
          /*margin-left: 40px;*/
          img {
            max-height: 1400px !important;
          }
        }
      }
      .el-button {
        margin-top: 10px;
        width: 100%;
        height: 40px;
        font-size: 12px;
        text-align: center;
      }
      .changeImage {
        margin-top: 10px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 12px;
        color: #fff;
        background: #67c23a;
        border-color: #67c23a;
        border-radius: 4px;
      }
    }
  }
}
</style>