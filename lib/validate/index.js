/* 校验两个相依赖字段是否相等 */
const compareTwoFieldsAgree = {
  main: (itm, label, nextLabel, curProp, nextProp, _this) => {
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
  depend: (itm, preLabel, label, preProp, curProp, _this) => {
    return (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入'+label))
      } else if (value !== _this.form[preProp]) {
        callback(new Error(itm.message || '两次输入'+preLabel+'不一致!'))
      } else {
        callback()
      }
    }
  }
}

/* 校验数字 */
const validNumber = function (item, itm) {
  return  (rule, value, callback) => {
    if (!value) {
      return callback(new Error(item.label + '不能为空'));
    }
    if (isNaN(value)) {
      callback(new Error(itm.message || '请输入数字值'));
    } else {
      callback();
    }
  }
}

/* 校验固话 */
const validPhone = function (item, itm) {
  return (rule, value, callback) => {
    let regStr = /^\d{3}-\d{8}$|^\d{4}-\d{7}$/
    let reg = new RegExp(regStr)
    if (!value) {
      return callback(new Error(item.label + '不能为空'));
    }
    if (!reg.test(value)) {
      callback(new Error(itm.message || '请输入正确的电话号码'));
    } else {
      callback();
    }
  }
}

/* [20210621][crt] 校验最少字符 */
const validMinLength = function (item, itm) {
  return  (rule, value, callback) => {
    if (!value) {
      return callback(new Error(item.label + '不能为空'));
    }
    if (value.length < item.minlength) {
      callback(new Error(itm.message || item.label + '不能少于' + item.minlength + '位'));
    } else {
      callback();
    }
  }
}


export default {
  'v-required': (item, itm) => {
    return {
      required: true,
      message: itm.message || item.label + '为必填项',
      trigger: ['blur', 'change']
    }
  },
  'v-email': (item, itm) => {
    return {
      type: 'email',
      message: itm.message || '请输入正确的' + item.label,
      trigger: ['blur', 'change']
    }
  },
  'v-phone': (item, itm) => {
    return {
      validator: validPhone(item, itm),
      trigger: ['blur', 'change']
    }
  },
  'v-number': (item, itm) => {
    return {
      validator: validNumber(item, itm),
      trigger: ['blur', 'change']
    }
  },
  'v-minlength': (item, itm) => {
    return {
      validator: validMinLength(item, itm),
      trigger: ['blur', 'change']
    }
  },
  'v-compare': (item, itm, columns, _this) => {
    return {
      validator: compareTwoFieldsAgree.main(
        itm,
        item.label,
        columns[item.dependPropIndex].label,
        item.prop,
        columns[item.dependPropIndex].prop,
        _this
      ),
      trigger: ['blur', 'change']
    }
  },
  'v-comdepend': (item, itm, columns, _this) => {
    return {
      validator: compareTwoFieldsAgree.depend(
        itm,
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