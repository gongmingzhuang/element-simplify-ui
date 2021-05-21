/* 校验两个相依赖字段是否相等 */
const compareTwoFieldsAgree = {
  main: (label, nextLabel, curProp, nextProp, _this) => {
    return (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入' + label))
      } else {
        if (_this.form[curProp] !== '') {
          _this.$refs.form.validateField(nextProp)
        }
        callback()
      }
    }
  },
  depend: (preLabel, label, preProp, curProp, _this) => {
    return (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入'+label))
      } else if (value !== _this.form[preProp]) {
        callback(new Error('两次输入'+preLabel+'不一致!'))
      } else {
        callback()
      }
    }
  }
}

/* 校验数字 */
const validNumber = function (item) {
  return  (rule, value, callback) => {
    if (!value) {
      return callback(new Error(item.label + '不能为空'));
    }
    if (isNaN(value)) {
      callback(new Error('请输入数字值'));
    } else {
      callback();
    }
  }
}

export default {
  'v-required': item => {
    return {
      required: true,
      message: item.label + '为必填项',
      trigger: ['blur', 'change']
    }
  },
  'v-email': item => {
    return {
      type: 'email',
      message: '请输入正确的' + item.label,
      trigger: ['blur', 'change']
    }
  },
  'v-number': item => {
    return {
      validator: validNumber(item),
      trigger: ['blur', 'change']
    }
  },
  'v-compare': (item, columns, _this) => {
    return {
      validator: compareTwoFieldsAgree.main(
        item.label,
        columns[item.dependPropIndex].label,
        item.prop,
        columns[item.dependPropIndex].prop,
        _this
      ),
      trigger: ['blur', 'change']
    }
  },
  'v-comdepend': (item, columns, _this) => {
    return {
      validator: compareTwoFieldsAgree.depend(
        columns[item.dependPropIndex].label,
        item.label,
        columns[item.dependPropIndex].prop,
        item.prop,
        _this
      ),
      trigger: ['blur', 'change']
    }
  }
}