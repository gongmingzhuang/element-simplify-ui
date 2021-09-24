<template>
  <form-item
    class="data-item"
    :label="label"
    :prop="item.prop"
    :style="{width: width}"
  >
    <date-picker
      v-model="value"
      type="daterange"
      @change="val => handleRangeChange(val, item)"
      :disabled="disabled || readonly"
      :picker-options="pickerOptions"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      range-separator="至"
    />
  </form-item>
</template>

<script>
/**
 * @author: gongmingzhuang
 */
import dateMixin from '../mixin/dateMixin.js'

export default {
  name: 'EsDataRangeItem',
  mixins: [dateMixin],
  components: {
  },
  props: {},
  data() {
    return {
      value: '',
    }
  },
  watch: {
    isPop: {
      handler(_isPop) {
        let _item = this.item
        let _form = this.form
        if (_isPop && _form) {
          this.value = ''
          this.initRule()
          this.initValue()
        }
      },
      immediate: true
    },
    value: {
      handler(value, old) {
        if(value != old)
          this.handleRangeChange(value)
      },
      immediate: true,
      deep: true
    }
  },
  computed: {
    //
    disabled: function () {
      let _item = this.item
      let _disabled = false
      if (_item.hasOwnProperty('setting') && _item.setting.hasOwnProperty('disabled')) {
        _disabled = _item.setting.disabled
      }
      if (
        _item.hasOwnProperty('setting') &&
        _item.setting.hasOwnProperty('readonly') &&
        !_item.setting.hasOwnProperty('disabled')
      ) {
        _disabled = _item.setting.readonly
      }
      return _disabled
    },
    pickerOptions: function () {
      let _item = this.item
      let _pickerOptions = {}
      if (_item.hasOwnProperty('setting') && _item.setting.hasOwnProperty('pickerOptions')) {
        _pickerOptions = _item.setting.pickerOptions
        let _disabledDate = _item.setting.pickerOptions.disabledDate
        // 是否使用内置
        if(_item.setting.pickerOptions.hasOwnProperty('disabledDate') && typeof(_disabledDate) == 'string' && this.disableDateOptions.hasOwnProperty(_disabledDate)){
          _pickerOptions.disabledDate = this.disableDateOptions[_disabledDate]
        }
      }
      return _pickerOptions
    }
  },

  methods: {
    // 初始化值
    initValue() {
      let _form = this.form
      let _item = this.item
      _form[_item.prop] = ''
    },
  }
}
</script>

<style lang="less">
</style>