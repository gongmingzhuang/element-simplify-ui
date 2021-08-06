<template>
  <div class="es-date-range-switch w-100">
    <div v-show="0">
      {{form}}
    </div>
    <div v-show="0">
      {{item}}
    </div>
    <div v-show="0">
      {{dateRange}}
    </div>
    <div class="container d-flex">
      <el-date-picker
        v-model="form[item.props[0]]"
        type="date"
        placeholder="开始日期"
        @change="val => handleChange(val, 'st')"
        :picker-options="{ disabledDate: time => handleStDisabledDate(time, item) }"
      >
      </el-date-picker>
      <span
        class="separator"
        v-text="'至'"
      ></span>
      <el-date-picker
        v-model="form[item.props[1]]"
        type="date"
        placeholder="结束日期"
        @change="val => handleChange(val, 'ed')"
        :picker-options="{ disabledDate: time => handleEdDisabledDate(time, item) }"
        :disabled="isDisabledEdDate"
      >
      </el-date-picker>
      <el-checkbox
        v-if="item.hasOwnProperty('setting') && item.setting.hasOwnProperty('switch')"
        v-model="isSelected"
        class="ml-10"
        @change="val => { handleSwitch(val, item) }"
      >长期</el-checkbox>
    </div>
  </div>
</template>

<script>
/**
 * @author: gongmingzhuang
 */
import VALID_SET from '../../../lib/validate'
import UTIL from '../../../util/util.js'
export default {
  name: 'EsDateRangeSwitch',
  props: {
    isPop: {
      type: Boolean,
      default: true
    },
    form: {
      type: Object,
      require: true
    },
    rules: {
      type: Object
    },
    columns: {
      type: Array,
      require: true
    },
    item: {
      type: Object,
      require: true
    },
    value: {
      type: String
    }
  },
  data() {
    return {
      VALID_SET,
      UTIL,
      dateRange: { st: '', ed: '' },
      isSelected: false, //
      isDisabledEdDate: false // 禁用结束时间
    }
  },
  watch: {
    isDisabledEdDate: function(val){
      this.isSelected = val
    },
    form: {
      handler(_form) {
        let _item = this.item
        let st = _form[_item.props[0]]
        let ed = _form[_item.props[1]]
        this.dateRange = { st, ed }
        // 长期选择回显
        if (ed == '9999-12-31') {
          this.isDisabledEdDate = true
        //   _item.setting.switch.select = true
        }
        //
        if (st) {
          this.handleStDisabledDate(new Date(st), _item)
        }
        if (ed) {
          this.handleEdDisabledDate(new Date(ed), _item)
        }
      },
      immediate: true,
      deep: true
    },
    isPop: {
      handler(val) {
        // this.region = undefined
        // console.log("item.value------------", this.item.value)
        this.initRule()
      },
      immediate: true
    }
  },
  computed: {},
  created() {},
  methods: {
    initForm() {
      let _form = this.form
      let _item = this.item
      this.$set(_form, _item.prop, '')
      if (
        _item.hasOwnProperty('setting') &&
        _item.setting.hasOwnProperty('detail') &&
        _item.setting.detail.hasOwnProperty('prop')
      ) {
        this.$set(_form, _item.prop, '')
      }
      this.$emit('update:form', _form)
    },
    initRule() {
      // debugger
      let _item = this.item
      let _rule = []
      if (_item.validate) {
        _item.validate.forEach(itm => {
          let _valid = {}
          if (this.VALID_SET.hasOwnProperty(itm)) {
            _valid = this.VALID_SET[itm](_item, this.columns, this)
          }
          _rule.push(_valid)
        })
      }
      let _obj = {}
      _obj[_item.prop] = _rule
      this.$emit('assignRule', _obj)
    },
    setRule() {
      let _item = this.item
      let _rule = []
      if (_item.validate) {
        _item.validate.forEach(itm => {
          let _valid = {}
          if (this.VALID_SET.hasOwnProperty(itm)) {
            _valid = this.VALID_SET[itm](_item, this.columns, this)
          }
          _rule.push(_valid)
        })
      }
    },
    init() {
      // [20210701] 地址控件
      if (item.type == 'address' && item.setting && item.setting.detail) {
        this.$set(this.form, item.setting.detail.prop, '')
      }
      if (item.type == 'address') {
        this.$set(this.regionConfig, item.prop, [])
      }
    },
    // 变值
    handleChange(val, type) {
      let _format = 'YYYY-MM-DD'
      let _form = this.form
      if (!val) {
        this.dateRange[type] = ''
        _form[this.item.prop] = undefined
      } else {
        let _cur = this.$moment(val).format(_format)
        this.dateRange[type] = _cur
        if (this.dateRange['st'] && this.dateRange['ed']) {
          _form[this.item.prop] = [this.dateRange['st'], this.dateRange['ed']]
        }
      }
      this.$emit('update:form', _form)
    },
    // 长期
    handleSwitch(val, item) {
      let _form = this.form
      this.isSelected = val
      this.isDisabledEdDate = val
      if (val) {
        this.dateRange['ed'] = '9999-12-31'
        _form[item.props[1]] = '9999-12-31'
        if (this.dateRange['st']) {
          _form[this.item.prop] = [this.dateRange['st'], this.dateRange['ed']]
        }
      } else {
        _form[item.props[1]] = ''
        _form[this.item.prop] = []
      }
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
        _curDisabledDate = item.setting.pickerOptions.disabledDate
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
      if (
        item.hasOwnProperty('setting') &&
        item.setting.hasOwnProperty('pickerOptions') &&
        item.setting.pickerOptions.hasOwnProperty('disabledDate')
      ) {
        _curDisabledDate = item.setting.pickerOptions.disabledDate
      }
      if (_curDisabledDate) {
        _disabled = _curDisabledDate(time)
      }
      // 结束不为空值
      if (this.dateRange['st']) {
        return (time.getTime() < new Date(this.dateRange['st']).getTime()) || _disabled
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
.es-date-range-switch {
  .separator {
    padding: 0 10px;
  }
}
</style>