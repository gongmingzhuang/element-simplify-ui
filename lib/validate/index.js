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

/* 校验两个相依赖字段是否不为空 */
const compareTwoFieldsNotEmpty = {
  main: (itm, label, columns, _this) => {
    return (rule, value, callback) => {
      // _this.$refs.form.validateField(otherProp)
      if (_this.form[itm.dependProp] != '' && value === '') {
        _this.$nextTick(()=>{
          let _dependProp = columns.find(i=>i.prop == itm.dependProp)
          _this.$set(_this.rules, itm.dependProp, [{required: true, message: `${_dependProp.label} 为必填项`, trigger: ['change','blur']}])
          _this.$refs.form.validateField(itm.dependProp)
        })
        // callback(new Error(`${label} 不能为空`))
      }
      callback()
    }
  }
}

/**
	 * [20210121][upd] 校验证件号。
	 * @param value
	 * @param minlen
	 * @param maxlen
	 * @returns {boolean}
	 * 备注：
	 * - 正则：/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/
	 * - 正则：/^(^\d{18}$|^\d{17}(\d|X|x))$/
	 * 说明：
	 *   1. type: 1-身份证 2-港澳通行证 3-护照 4-台胞证 5-组织机构代码 6-统一社会信用代码 7-企业工商注册号
	 */
 const verifyCode = function(value, type, extend) {
  let _type = type, _extend = extend || false, verifyResult = true;
  let regIDCard = new RegExp("^\\d{6}(18|19|20)?\\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\\d|3[01])\\d{3}(\\d|X)$", "i");
  let regHKPass = new RegExp("^[HMhm]{1}([0-9]{10}|[0-9]{8})$");
  let regPassport = new RegExp("(^[EeKkGgDdSsPpHh]\\d{8}$)|bai(^(([Ee][a-fA-F])|([DdSsPp][Ee])|([Kk][Jj])|([Mm][Aa])|(1[45]))\\d{7}$)");
  let regTWPass = new RegExp("^([0-9]{8}|[0-9]{10})$");

  let regOrganCode = new RegExp("[a-zA-Z0-9]{8}-[a-zA-Z0-9]");
  let regCreditCode = new RegExp("[^_IOZSVa-z\\W]{2}\\d{6}[^_IOZSVa-z\\W]{10}");
  let regBusiNo = new RegExp("[1-9A-GY]{1}[1239]{1}[1-5]{1}[0-9]{5}[0-9A-Z]{10}$|[1-9A-GY]{1}[1239]{1}[1-5]{1}[0-9]{5}[0-9A-Z]{10}-[0-9]{2}$");


  // 普通
  if (!_extend) {
    switch (_type) {
      case 1:
        verifyResult = regIDCard.test(value);
        break;
      case 2:
        verifyResult = regHKPass.test(value);
        break;
      case 3:
        verifyResult = regPassport.test(value);
        break;
      case 4:
        verifyResult = regTWPass.test(value);
        break;
      case 5:
        verifyResult = regOrganCode.test(value);
        break;
      case 6:
        verifyResult = regCreditCode.test(value);
        break;
      case 7:
        verifyResult = regBusiNo.test(value);
        break;
    }
  }
  // 增强
  if (type == 1 && _extend) {
    let tip = "";
    let city = {
      11: "北京",
      12: "天津",
      13: "河北",
      14: "山西",
      15: "内蒙古",
      21: "辽宁",
      22: "吉林",
      23: "黑龙江 ",
      31: "上海",
      32: "江苏",
      33: "浙江",
      34: "安徽",
      35: "福建",
      36: "江西",
      37: "山东",
      41: "河南",
      42: "湖北 ",
      43: "湖南",
      44: "广东",
      45: "广西",
      46: "海南",
      50: "重庆",
      51: "四川",
      52: "贵州",
      53: "云南",
      54: "西藏 ",
      61: "陕西",
      62: "甘肃",
      63: "青海",
      64: "宁夏",
      65: "新疆",
      71: "台湾",
      81: "香港",
      82: "澳门",
      91: "国外 "
    };
    if (!value || !regIDCard.test(value)) {
      tip = "身份证号格式错误";
      verifyResult = false;
    } else if (!city[value.substr(0, 2)]) {
      tip = "地址编码错误";
      verifyResult = false;
    } else {
      //18位身份证需要验证最后一位校验位
      if (value.length == 18) {
        value = value.split('');
        //∑(ai×Wi)(mod 11)
        //加权因子
        let factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        //校验位
        let parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
        let sum = 0;
        let ai = 0;
        let wi = 0;
        for (let i = 0; i < 17; i++) {
          ai = value[i];
          wi = factor[i];
          sum += ai * wi;
        }
        let last = parity[sum % 11];
        if (parity[sum % 11] != value[17]) {
          tip = "校验位错误";
          verifyResult = false;
        }
      }
    }
    if (!verifyResult) {
      console.warn("身份证校验失败，错误：", tip)
    }
  }
  return verifyResult;
}


/* 校验名称 */
const validName = function(item, itm){
  return (rule, value, callback) => {
    if (!value) {
      callback(new Error(item.label + '不能为空'));
    }
    if (!/^(?=.*?[a-zA-Z\u4e00-\u9fa5])[a-zA-Z\u4e00-\u9fa5\.()（）]+$/g.test(value)) {
      callback(new Error(itm.message || '仅支持中英文或常见符号，不可全部为符号'))
    } else {
      callback()
    }
  }
}

/* 校验数字 */
const validNumber = function (item, itm) {
  return  (rule, value, callback) => {
    if (!value) {
      callback(new Error(item.label + '不能为空'));
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
      callback(new Error(item.label + '不能为空'));
    }
    if (!reg.test(value)) {
      callback(new Error(itm.message || '请输入正确的固定电话号码'));
    } else {
      callback();
    }
  }
}

/* 校验手机号 */
const validMobile = function (item, itm) {
  return (rule, value, callback) => {
    let regStr = /^1[3456789]\d{9}$/
    let reg = new RegExp(regStr)
    if (!value) {
      callback()
    } else if (!reg.test(value)) {
      callback(new Error('请输入正确的' + item.label))
    }
    callback()
  }
}

/* 校验手机号+固话 */
const validTelephone = function (item, itm) {
  return (rule, value, callback) => {
    let regStr = /(^\d{3}-\d{8}$|^\d{4}-\d{7}$)|(^1[3456789]\d{9}$)/
    let reg = new RegExp(regStr)
    if (!value) {
      callback(new Error(item.label + '不能为空'));
    }
    if (!reg.test(value)) {
      callback(new Error(itm.message || '请输入正确的电话号码'));
    } else {
      callback()
    }
  }
}

/* [20210714][crt] 校验统一社会信用代码 */
const validCreditCode = function(item, itm){
  return function(rule, value, callback) {
    if (!value) {
      callback(new Error(item.label + '不能为空'))
    } else if (!/^([0-9A-Z]{2})(\d{6})([0-9A-Z]{10})$/gi.test(value)) {
      callback(new Error('请输入正确格式的统一社会信用代码'))
    } else{
      callback()
    }
  }
}

/* [20210714][crt] 校验身份证号 */
// 通过item.validSetting.mode 开启增强校验
const validIDCard = function(item, itm){
  let _extend = item.validSetting && item.validSetting.mode && item.validSetting.mode == '_extend' || false
  return function(rule, value, callback) {
    if (!value) {
      callback(new Error(item.label + '不能为空'))
    } else if (!verifyCode(value, 1, _extend ? 1 : undefined)) {
      callback(new Error('请输入正确的' + item.label ))
    } else{
      callback()
    }
  }
}

/* [20210621][crt] 校验最少字符 */
const validMinLength = function (item, itm) {
  return  (rule, value, callback) => {
    if (!value) {
      callback(new Error(item.label + '不能为空'));
    }
    if (value.length < item.minlength) {
      callback(new Error(itm.message || item.label + '不能少于' + item.minlength + '位'));
    } else {
      callback();
    }
  }
}
/* 大于0 */
const validNumberExceptZero = function (item, itm) {
  return  (rule, value, callback) => {
    if (!value) {
      callback(new Error(item.label + '不能为空'));
    }
    if (isNaN(value)) {
      callback(new Error(itm.message || '请输入数字值'));
    } else if(value <= 0) {
      callback("请输入大于0的数字");
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
  'v-name': (item, itm) => {
    return {
      validator: validName(item, itm),
      trigger: item.trigger || ['blur', 'change']
    }
  },
  'v-id-card': (item, itm) => {
    return {
      validator: validIDCard(item, itm),
      trigger: item.trigger || ['blur', 'change']
    }
  },
  'v-credit-code': (item, itm) => {
    return {
      validator: validCreditCode(item, itm),
      trigger: item.trigger || ['blur', 'change']
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
  'v-mobile': (item, itm) => {
    return {
      validator: validMobile(item, itm),
      trigger: ['blur', 'change']
    }
  },
  'v-telephone': (item, itm) => {
    return {
      validator: validTelephone(item, itm),
      trigger: ['blur', 'change']
    }
  },
  'v-number': (item, itm) => {
    return {
      validator: validNumber(item, itm),
      trigger: ['blur', 'change']
    }
  },
  'v-number-except-zero': (item, itm) => {
    return {
      validator: validNumberExceptZero(item, itm),
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
  },
  /** 未完善 */
  'v-com-not-empty': (item, itm, columns, _this) => {
    return {
      validator: compareTwoFieldsNotEmpty.main(
        itm,
        item.label,
        columns,
        _this
      ),
      trigger: ['blur', 'change']
    }
  }
}


	