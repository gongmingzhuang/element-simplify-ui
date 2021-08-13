<template>
  <form-item
    :label="label"
    :prop="item.prop"
    :style="{width: width}"
  >
    <template v-if="dataType=='money'">
      <span>{{ UTIL.moneyFormat(value) }}</span>
    </template>
    <template v-else-if="item.render">
      <div v-html='item.render(item, form)'></div>
    </template>
    <template v-else>
      <span>{{ value }}</span>
    </template>
    <!-- </div> -->
  </form-item>
</template>

<script>
/**
 * @author: gongmingzhuang
 */
import UTIL from '../../../util/util.js'
import { FormItem } from 'element-ui'
export default {
  name: 'EsTxtItem',
  props: {
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
    isPop: {
      type: Boolean,
      default: true
    },
    formSetting: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      UTIL,
      formData: undefined
    }
  },
  watch: {
    form: {
      handler(_form) {
        if (_form) {
          this.formData = _form
        }
      },
      immediate: true
    }
  },
  computed: {
    // label
    label: function () {
      let _setting = this.formSetting
      let _form = this.form
      let _item = this.item
      let _label = _item.label
      if (
        _item.hasOwnProperty('setting') &&
        _item.setting.hasOwnProperty('dynamicLabel') &&
        _item.setting.dynamicLabel instanceof Function
      ) {
        _label = _item.setting.dynamicLabel(_form, _item)
      }
      if (
        _item.hasOwnProperty('setting') &&
        _item.setting.hasOwnProperty('hideLabel') &&
        _item.setting.hideLabel
      ) {
        _label = ''
      }
      return _label
    },
    // 值
    value: function () {
      let _form = this.form
      let _item = this.item
      let _val =
        _item.hasOwnProperty('setting') && _item.setting.hasOwnProperty('emptyValue')
          ? _item.setting.emptyValue
          : ''
      if (_form.hasOwnProperty(_item.prop) && _form[_item.prop]) {
        _val = _form[_item.prop]
      }
      return _val
    },
    // 数据类型
    dataType: function () {
      let _item = this.item
      if (_item.hasOwnProperty('setting') && _item.setting.hasOwnProperty('dataType')) {
        return _item.setting.dataType
      }
    },
    //
    width: function () {
      let _setting = this.formSetting
      let _item = this.item
      let _width = '100%'
      // 全局
      if (JSON.stringify(_setting) != '{}' && _setting.hasOwnProperty('itemWidth')) {
        _width = _setting.itemWidth
      }
      if (JSON.stringify(_setting) != '{}' && _setting.hasOwnProperty('col')) {
        _width = `calc( 100% / ${_setting.col || 1})`
      }
      // 独立
      if (_item.hasOwnProperty('setting') && _item.setting.hasOwnProperty('itemWidth')) {
        _width = _item.setting.itemWidth
      }
      // 占行
      if (_item.hasOwnProperty('setting') && _item.setting.hasOwnProperty('isWholeLine')) {
        _width = '100%'
      }
      return _width
    }
  },
  components: {
    FormItem
  }
}
</script>

<style lang="less">
</style>