<template>
  <div
    class="date-range-switch-item"
    :style="{width: width}"
    :class="item.hasOwnProperty('setting') && item.setting.hasOwnProperty('longTermSelected') ? '' : 'notLongTerm'"
  >
    <!-- -- {{dateRange}} -->
    <form-item
      :label="label"
      :prop="item.props[0]"
    >
      <!-- <form-input v-model="form[item.prop]"/> -->
      <date-picker
        v-model="dateRange['st']"
        type="date"
        placeholder="开始日期"
        @change="val => handleChange(val, 'st')"
        @clear="val => handleClear(val, 'st')"
        :picker-options="{ disabledDate: time => handleStDisabledDate(time, item) }"
      >
      </date-picker>
    </form-item>
    <span
      class="separator"
      v-text="'至'"
    ></span>
    <form-item
      label-width="0"
      :prop="item.props[1]"
    >
      <date-picker
        v-model="dateRange['ed']"
        type="date"
        placeholder="结束日期"
        @change="val => handleChange(val, 'ed')"
        :picker-options="{ disabledDate: time => handleEdDisabledDate(time, item) }"
        :disabled="isDisabledEdDate"
      >
      </date-picker>
    </form-item>
    <form-checkbox
      v-if="item.hasOwnProperty('setting') && item.setting.hasOwnProperty('longTermSelected')"
      v-model="isSelected"
      class="longTermSelect ml-10"
      @change="val => { handleSwitch(val, item) }"
    >长期</form-checkbox>
  </div>
</template>

<script>
/**
 * @author: gongmingzhuang
 */
import dateMixin from '../mixin/dateMixin.js'

import { Checkbox } from 'element-ui'
export default {
  name: 'EsDataRangeSwitchItem',
  mixins: [dateMixin],
  components: {
    'form-checkbox': Checkbox
  },
  props: {
    rule: {
      type: [Object, Array],
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      dateRange: { st: '', ed: '' },
      isSelected: false, //
      isDisabledEdDate: false // 禁用结束时间
    }
  },
  watch: {
    isPop: {
      handler(_isPop) {
        let _item = this.item
        let _form = this.form
        if (_isPop && _form) {
          this.initRule()
          this.initValue()

          this.$nextTick(() => {
            // 初始化选中状态
            if (
              _item.hasOwnProperty('setting') &&
              _item.setting.hasOwnProperty('longTermSelected')
            ) {
              this.isSelected = _item.setting.longTermSelected
              this.handleSwitch(this.isSelected)
            }
          })
        }
      },
      immediate: true
    }
  },
  computed: {},

  methods: {
    // 初始化value
    initValue() {
      let _form = this.form
      let _item = this.item
      _form[_item.prop] = []
      this.$set(_form, _item.props[0], '')
      this.$set(_form, _item.props[1], '')
      this.dateRange = { st: '', ed: '' }
    },
    // 初始化rule
    initRule() {
      let _columns = this.formColumns
      let _item = this.item
      let _rule = this.rule
      _rule[_item.props[0]] = []
      _rule[_item.props[1]] = []
      if (_item.hasOwnProperty('validate') && _item.validate instanceof Array) {
        _item.validate.forEach(itm => {
          let _valid = undefined
          // 默认校验
          if (this.VALID_SET.hasOwnProperty(itm)) {
            if (itm == 'v-required') {
              _valid = this.VALID_SET[itm](_item, { message: '该日期为必填项' }, this)
            } else {
              _valid = this.VALID_SET[itm](_item, _columns, this)
            }
          }
          // 自定义
          let _customValid = this.validateCustomList.find(it => it.validName == itm)
          if (_customValid) {
            _valid = {}
            _valid.validator = _customValid.validator(_item, this, {})
            _valid.trigger = _customValid.trigger || ['blur', 'change']
          }
          if (_valid) {
            _rule[_item.props[0]].push(_valid)
            _rule[_item.props[1]].push(_valid)
            // _rule.push(_valid)
          }
        })
        this.$emit('update:rule', _rule)
      }
    },
    // 变值
    handleChange(val, type) {
      let _format = 'YYYY-MM-DD HH:mm:ss'
      let _form = this.form
      let _item = this.item
      if (!val) {
        this.dateRange[type] = ''
        _form[_item.props[type == 'st' ? 0 : 1]] = ''
        this.handleUpdateValue('', type)
      } else {
        let _cur = this.$moment(val).format(_format)
        this.dateRange[type] = _cur
        _form[_item.props[type == 'st' ? 0 : 1]] = _cur
        this.handleUpdateValue(val, type)
      }
      this.$emit('update:form', _form)
    },

    // 长期
    handleSwitch(val, item) {
      let _form = this.form
      let _item = this.item
      this.isSelected = val
      this.isDisabledEdDate = val
      let _edValue = ''
      if (val) {
        _edValue = '9999-12-31 23:59:59'
      }
      _form[_item.props[1]] = _edValue
      this.dateRange['ed'] = _edValue
      this.handleUpdateValue(_edValue, 'ed')
      this.$emit('update:form', _form)
    },
    // 开始-过滤
    handleStDisabledDate(time, item) {
      let _curDisabledDate = undefined
      let _disabled = false
      if (
        item.hasOwnProperty('setting') &&
        item.setting.hasOwnProperty('pickerOptions') &&
        item.setting.pickerOptions.hasOwnProperty('disabledDate')
      ) {
        let _disableDate = item.setting.pickerOptions.disabledDate
        if (_disableDate instanceof Function) {
          _curDisabledDate = _disableDate
        } else {
          _curDisabledDate = this.disableDateOptions[_disableDate]
        }
      }
      if (_curDisabledDate) {
        _disabled = _curDisabledDate(time)
      }
      // 切换
      if (
        item.hasOwnProperty('setting') &&
        item.setting.hasOwnProperty('switch') &&
        item.setting.switch.hasOwnProperty('select') &&
        item.setting.switch.select
      ) {
        return _disabled
      }
      // 结束不为空值
      if (this.dateRange['ed']) {
        return time.getTime() > new Date(this.dateRange['ed']).getTime() - 8.64e7
      }
      // 空值
      if (!this.dateRange['st']) {
        return _disabled || false
      }
      return _disabled
    },
    // 结束-过滤
    handleEdDisabledDate(time, item) {
      let _curDisabledDate = undefined
      let _disabled = false
      let _st = 0
      if (this.dateRange['st']) {
        _st = new Date(this.dateRange['st']).getTime()
      }
      let _disableDate = item.setting.pickerOptions.disabledDate
      if (_disableDate instanceof Function) {
        _curDisabledDate = _disableDate
      } else {
        _curDisabledDate = this.disableDateOptions[_disableDate]
      }
      if (_curDisabledDate) {
        _disabled = _curDisabledDate(time)
      }
      // 结束不为空值
      if (this.dateRange['st']) {
        return time.getTime() < new Date(this.dateRange['st']).getTime() || _disabled
      }
      // 空值
      if (!this.dateRange['ed']) {
        return _disabled || false
      }
      return _disabled
    }
  }
}
</script>

<style lang="less">
.date-range-switch-item {
  display: flex;
  .el-form-item {
    width: 285px;
    &:nth-of-type(2) {
      width: 135px;
    }
  }
  .el-form-item__content {
    width: 40%;
    min-width: 125px;
  }
  .separator {
    margin: 8px 8px 0 0;
  }
  .longTermSelect {
    margin-top: 10px;
  }
  &.notLongTerm {
    .separator {
      margin-left: 10px;
    }
    .el-form-item__content {
      min-width: 140px;
    }
  }
}
</style>