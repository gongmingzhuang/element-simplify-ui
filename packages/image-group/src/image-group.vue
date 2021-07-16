<template>
  <div
    class="image-group d-flex flex-wrap w-100"
    :class="item.prop"
  >
    <template v-for="(itm, idx) in item.group">
      <form-item
        class="d-flex"
        v-if="(!itm.invisibleControl || itm.invisibleControl(itm, form))"
        :label="itm.label"
        :key="idx"
        :prop="itm.prop"
      >
        <el-input
          v-model="form[itm.prop]"
          v-show="0"
        />
        <es-avatar-upload
          :form="form"
          :item="itm"
          :headers="item.setting.headers"
          :action="item.setting.action"
          :accept="item.setting.accept"
          :file-size="item.setting.fileSize"
          :before-upload="item.setting.beforeUpload"
          :on-success="item.setting.onSuccess"
        />
      </form-item>
    </template>
  </div>
</template>
<script>
/**
 * [20210714][crt]
 * @author: gongmingzhuang
 *
 */
import { FormItem } from 'element-ui'
import EsAvatarUpload from '../../upload/src/avatar-upload'
import VALID_SET from '../../../lib/validate'
import UTIL from '../../../util/util.js'

export default {
  name: 'EsImageGroup',
  components: {
    FormItem,
    EsAvatarUpload,
  },
  props: {
    item: {
      type: Object,
      default: () => {
        return {}
      },
    },
    columns: {
      type: Array,
      default: () => [],
    },
    form: {
      type: Object,
      default: () => {
        return {}
      },
    },
    rules: {
      type: Object,
      default: () => {
        return {}
      },
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      VALID_SET,
      UTIL
    }
  },
  watch: {
    'item': {
      handler: function (newVal) {
        this.init()
      },
      deep: true,
    },
  },
  created() {
    this.init()
  },
  methods: {
    //
    init() {
      this.item.group.forEach((itm) => {
        this.$set(this.form, itm.prop, '')
        this.$set(this.rules, itm.prop, [])
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
  },
}
</script>
<style lang="less">
</style>