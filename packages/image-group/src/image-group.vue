<template>
  <div
    class="image-group d-flex flex-wrap w-100"
    :class="item.prop"
  >
    <div v-show="0">
      {{form}}
      <hr>
    </div>
    <div v-show="0">
      {{columns}}
      <hr>
    </div>
    <div v-show="0">
      {{item.group}}
      <hr>
    </div>
    <template v-for="(itm, idx) in item.group">
      <div v-show="0">
        {{itm}}
        <hr>
      </div>
      <el-form-item
        v-if="(!itm.invisibleControl || itm.invisibleControl(itm, form))"
        class="d-flex"
        :label="itm.label"
        :key="idx"
        :prop="itm.prop"
      >
        <el-input
          v-show="0"
          v-model="form[itm.prop]"
          :readonly="true"
        />
        <es-avatar-upload
          ref="es-avatar-upload"
          :form="form"
          :item="itm"
          :headers="item.setting.headers"
          :action="item.setting.action"
          :accept="item.setting.accept"
          :file-size="item.setting.fileSize"
          :before-upload="item.setting.beforeUpload"
          :on-success="item.setting.onSuccess"
        />
      </el-form-item>
    </template>
  </div>
</template>
<script>
/**
 * [20210714][crt]
 * @author: gongmingzhuang
 *
 */
import EsAvatarUpload from '../../upload/src/avatar-upload'
import VALID_SET from '../../../lib/validate'
import UTIL from '../../../util/util.js'

export default {
  name: 'EsImageGroup',
  components: {
    EsAvatarUpload
  },
  props: {
    item: {
      type: Object,
      default: () => {
        return {}
      }
    },
    columns: {
      type: Array,
      default: () => []
    },
    form: {
      type: Object,
      default: () => {
        return {}
      }
    },
    rules: {
      type: Object,
      default: () => {
        return {}
      }
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    let _that = this
    return {
      VALID_SET,
      UTIL
    }
  },
  watch: {
    item: {
      handler: function (newVal) {
        // this.init()
      },
      immediate: true,
      deep: true
    }
  },
  created() {
    // debugger
    this.init()
  },
  methods: {
    //
    init() {
      this.item.group.forEach((itm, idx) => {
        this.$set(this.form, itm.prop, itm.value || '')
        this.$set(this.rules, itm.prop, [])
        // 重置预览图片
        let _curComp = this.$refs['es-avatar-upload'] && this.$refs['es-avatar-upload'][idx]
        if (_curComp) {
          _curComp.manipulateResetImageUrl()
        }
        if (itm.validate) {
          let _valid = this.VALID_SET[itm.validate[0]](itm, this.columns, this)
          this.rules[itm.prop].push(_valid)
        }
      })
    },
    handleBeforeUpload(file, item, formItem) {
      return formItem.setting.beforeUpload(file, item, formItem)
    },
    // [20210525][crt] 文件上传成功
    handleOnSuccess(res, item, setting) {
      setting.onSuccess(res, item, this.form)
    },
    handleOnReset(res, imgItem, setting) {
      setting.onSuccess(res, item, this.form)
    },
    handleResetPreviewImageUrl() {
      this.item.group.forEach(itm => {})
    }
  }
}
</script>
<style lang="less">
</style>