import UTIL from '../../../util/util.js'
import VALID_SET from '../../../lib/validate'
import { FormItem, Input } from 'element-ui'
export default{
  components: {
    FormItem,
    'form-input': Input
  },
  props: {
    isPop: {
      type: Boolean,
      default: false
    },
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
    rule: {
      type: [Array, Object],
      default: () => []
    },
    formSetting: {
      type: Object,
      default: () => {
        return {}
      }
    },
    formColumns: {
      type: Array,
      default: () => []
    },
    validateCustomList: {
      type: Array,
      default: () => []
    }
  },
  data(){
    return{
      UTIL,
      VALID_SET,
      value: '',
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
    },
    // 
    labelWidth: function(){
      let _setting = this.formSetting
      let _item = this.item
      let _labelWidth
      if (_item.hasOwnProperty('setting') && _item.setting.hasOwnProperty('labelWidth')) {
        _labelWidth = _item.setting.labelWidth
      }
      return _labelWidth
    },
    // 
    readonly: function(){
      let _setting = this.formSetting
      let _item = this.item
      let _readonly = false
      if (_item.hasOwnProperty('setting') && _item.setting.hasOwnProperty('readonly')) {
        _readonly = _item.setting.readonly
      }
      return _readonly
    }
  },
  watch: {
    isPop: {
      handler(_isPop) {
        let _item = this.item
        let _form = this.form

        if(_isPop){
          this.$set(_form, _item.prop, '')
        }
        if (_isPop && _form) {
          this.value = ''
          this.initValue()
          this.initRule()
        }
      },
      immediate: true
    },
    value: {
      handler(_value) {
        let _form = this.form
        let _item = this.item
        this.$set(_form, _item.prop, '')
        if (_value && _form[_item.prop] != _value) {
          _form[_item.prop] = _value
        }
        this.$emit('update:form', _form)
      },
      immediate: true
    }
  },
  methods: {
    // 初始化值
    initValue() {
      let _form = this.form
      let _item = this.item
      let _value = _form[_item.prop]
      if (_value) {
        this.value = _value
      }
    },
    // 初始化rule
    initRule() {
      let _columns = this.formColumns
      let _item = this.item
      let _rule = []
      if (_item.hasOwnProperty('validate') && _item.validate instanceof Array) {
        _item.validate.forEach(itm => {
          let _valid = undefined
          // 默认校验
          if (this.VALID_SET.hasOwnProperty(itm)) {
            _valid = this.VALID_SET[itm](_item, _columns, this)
          }
          // 自定义
          let _customValid = this.validateCustomList.find(it => it.validName == itm)
          if (_customValid) {
            _valid = {}
            _valid.validator = _customValid.validator(_item, this, {})
            _valid.trigger = _customValid.trigger || ['blur', 'change']
          }
          if (_valid) {
            _rule.push(_valid)
          }
        })
        this.$emit('update:rule', _rule)
      }
    }
  }
}