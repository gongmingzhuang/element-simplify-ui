<template>
  <div class="es-addr w-100">
    <div v-show="0">
      {{form}}
    </div>
    <div v-show="0">
      {{item}}
    </div>
    <el-input
      class="form-item"
      type="hidden"
      :readonly="true"
      v-model="form[item.prop]"
     />
    <el-cascader
      size="large"
      :options="regionOption"
      v-model="region"
      @change="val=>handleChangeRegion(val,item)"
    />
    <!-- <el-cascader
      size="large"
      :options="regionOption"
      v-model="regionConfig ? regionConfig[item.prop] : form[item.prop]"
      :disabled="item.setting && (item.setting.disabled || item.setting.readonly) || (formSetting.loadingCtrl && $props.loading)"
    /> -->
    <!-- <el-input
      v-if="item.setting && item.setting.detail"
      :readonly="item.setting && (item.setting.disabled || item.setting.readonly)"
      type="textarea"
      v-model="form[item.setting && item.setting.detail && item.setting.detail.prop]"
      row="3"
      resize="none"
      :placeholder="item.setting && item.setting.detail && item.setting.detail.placeholder || '请输入详细地址'"
    /> -->
  </div>
</template>

<script>
/**
 * @author: gongmingzhuang
 */
// 省市区联动数据
import {
  provinceAndCityData,
  regionData,
  provinceAndCityDataPlus,
  regionDataPlus,
  CodeToText,
  TextToCode
} from 'element-china-area-data'
import VALID_SET from '../../../lib/validate'
import UTIL from '../../../util/util.js'
export default {
  name: 'EsAddr',
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
      region: undefined
      // regionOptions: regionData, // 1102 省市区 全部数据
      // provinceAndCityOptions: provinceAndCityData, // 0714 省市 全部数据
      // selectedRegionOptions: [], // 1102 省市区 选择数据
      // selectedRegionData: {}, // 1102 省市区 选择数据
      // regionConfig: {} // 0714 地址类
    }
  },
  watch: {
    // form: {
    //   handler(val) {
    //     // debugger
    //     // this.region = undefined
    //   },
    //   deep: true,
    //   immediate: true
    // },
    'item.value': {
      handler(val){
        if(val){
          this.region = val.split(',')
        }
      },
      immediate: true
    },
    isPop: {
      handler(val) {
        this.region = undefined
        // console.log("item.value------------", this.item.value)
        this.initRule()
      },
      immediate: true
    }
  },
  computed: {
    // 省市区数据
    regionOption() {
      let _item = this.item
      let _regionData = regionData
      if (
        _item &&
        _item.hasOwnProperty('setting') &&
        _item.setting.hasOwnProperty('onlyProvinceAndCity') &&
        _item.setting.onlyProvinceAndCity
      ) {
        _regionData = provinceAndCityData
      }
      return _regionData
    }
    // 选择的地址数据
    // selectRegion(){

    //   return 'hello'
    // }
  },
  created() {
    // this.region = undefined
    // this.initRule()
  },
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
    setRule(){
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
    // [20210525][crt] 省市区地址
    handleChangeRegion(val, item) {
      this.selectedRegionData = {} // 初始化
      let regionArr = val
      let regionLen = 45 // 省市区字符串总长度
      let regionText = '' // 省市区地址中文
      let valType = item.valueType || 'text' // 地址值类型 text code array
      regionArr.forEach(itm => {
        regionLen += CodeToText[itm].length * 15
        regionText += CodeToText[itm]
      })

      let _form = this.form
      let _item = this.item
      _form[_item.prop] = valType == 'text' ? regionText : valType == 'code' ? val.join(',') : JSON.stringify(val)
      // debugger
      this.$emit('update:form', _form)

      // 所在地区选择赋值-校验规则
      // this.$set(
      //   this.form,
      //   item.prop,
      //   valType == 'text' ? regionText : valType == 'code' ? val.join(',') : JSON.stringify(val)
      // )
      // // 港澳数据出来 len=2
      // if (val.length == 2) {
      //   this.selectedRegionData.provinceId = ''
      //   this.selectedRegionData.province = ''
      //   this.selectedRegionData.cityId = regionArr[0]
      //   this.selectedRegionData.city = CodeToText[regionArr[0]]
      //   this.selectedRegionData.districtId = regionArr[1]
      //   this.selectedRegionData.district = CodeToText[regionArr[1]]
      // } else {
      //   this.selectedRegionData.provinceId = regionArr[0]
      //   this.selectedRegionData.province = CodeToText[regionArr[0]]
      //   this.selectedRegionData.cityId = regionArr[1]
      //   this.selectedRegionData.city = CodeToText[regionArr[1]]
      //   this.selectedRegionData.districtId = regionArr[2]
      //   this.selectedRegionData.district = CodeToText[regionArr[2]]
      // }
    },
    // [20210525] 地址控件转换
    // 用法：this.$refs['es-form'].transferRegion('140000,140300,140303', 'addr')
    transferRegion(addrStr, item) {
      this.form[item.prop] = addrStr
      let [provinceId, cityId, districtId] = addrStr.split(',')
      if (!districtId) {
        this.regionConfig[item.prop] = [provinceId, cityId]
      } else {
        this.regionConfig[item.prop] = [provinceId, cityId, districtId]
      }
      // let regionLen = 45
      // this.regionConfig[prop].forEach(item => {
      //   regionLen += CodeToText[item].length * 15
      // })
    }
  }
}
</script>

<style lang="less">
.es-addr{
  .form-item{
    position: absolute;
  }
}
</style>