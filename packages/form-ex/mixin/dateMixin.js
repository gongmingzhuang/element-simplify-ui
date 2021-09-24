
import { DatePicker } from 'element-ui'
import indexMixin from '../mixin/indexMixin.js'
export default{
  mixins: [indexMixin],
  components: {
    DatePicker
  },
  props: {
  },
  data(){
    return{
      dateRange: { st: '', ed: '' },
      // 不可选择限制
      disableDateOptions: {
        // 直到现在，不含当天
        tillNowOn: time => {
          return time.getTime() > Date.now() - 86400*1000*1
        },
        // 直到现在，含当天
        tillNowOnInclude: time => {
          return time.getTime() > Date.now() - 86400*1000*0
        },
        // 始于现在，不含当天
        fromNowOn: time => {
          return time.getTime() < Date.now() - 86400*1000*0
        },
        // 始于现在，含当天
        fromNowOnInclude: time => {
          return time.getTime() < Date.now() - 86400*1000*1
        },
      }
    }
  },
  computed: {
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
  watch: {
  },
  methods: {
    // 变值
    handleRangeChange(val, item) {
      let _form = this.form
      let _item = this.item
      let _type = this.item.type
      let _dateRange = this.dateRange
      // 空值
      if(!val){
        _form[_item.prop] = _type == 'daterange' || _type == 'daterangeSwitch' ? [] : ''
        _dateRange['st'] = ''
        _dateRange['ed'] = ''
        _item.type == 'daterange' && this.setRangeValue(_form, _item, _dateRange)
        return
      }
      let _format = 'YYYY-MM-DD HH:mm:ss'
      let [st, ed] = val
      if (st && ed) {
        let _st = this.$moment(st).format(_format)
        let _ed = this.$moment(ed).format(_format)
        
        _dateRange['st'] = _st
        _dateRange['ed'] = _ed
        this.handleUpdateValue(_st, 'st')
        this.handleUpdateValue(_ed, 'ed')
      } else {
        
      }
      // _item.type == 'daterange' && this.setRangeValue(_form, _item, _dateRange)
      (_item.type == 'daterange' || _item.type == 'daterangeSwitch') && this.setRangeValue(_form, _item, _dateRange)
      this.$emit('update:form', _form)
    },
    // 更新
    handleUpdateValue(val, type){
      let _form = this.form
      let _item = this.item
      let _type = this.item.type
      // TODO isArray? 无法重置数组
      if(!_form[_item.prop] instanceof Array){
        _form[_item.prop] = []
      }
      if (type == 'st') {
          if (_form[_item.prop].length == 0) {
            _form[_item.prop].push(val)
          } else if(_form[_item.prop].length == 1){
            _form[_item.prop].shift()
            _form[_item.prop].push(val)
          } else {
            _form[_item.prop].shift()
            _form[_item.prop].unshift(val)
          }
        }
        if (type == 'ed') {
          // 结束日时间
          val = val && val.split(' ')[0] + ' 23:59:59'
          if (_form[_item.prop].length == 0) {
            _form[_item.prop].push('')
            _form[_item.prop].push(val)
          } else if(_form[_item.prop].length == 1){
            _form[_item.prop].push(val)
          } else {
            _form[_item.prop].pop()
            _form[_item.prop].push(val)
          }
        }
    },
    setRangeValue(form, item, dateRange){
      form[item.props[0]]= dateRange.st
      form[item.props[1]]= dateRange.ed
    }
  }
}