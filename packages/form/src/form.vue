<template>
  <div class="es-form">
    <el-form
      ref="form"
      :model="form"
      v-bind="$attrs"
      v-on="$listeners"
      :rules="rules"
    >
      <template v-for="(item, index) of formColumns">
        <!-- [upg][20210524] 标题 -->
        <template v-if="item.type=='title'">
          <p
            class="form-header"
            :key="index"
          >{{item.label}}</p>
        </template>
        <!-- [upg][20210524] 支持分列表单 -->
          <!-- :style="{width: `calc(100% - ${formSetting.col}) / ${ formSetting.col || 1})`}" -->
        <el-form-item
          v-else
          :style="{width: formSetting.itemWidth ? formSetting.itemWidth : `calc((100% / ${formSetting.col || 1 })`}"
          :class="formSetting.itemWrap ? ' item-wrap' : ''"
          :label="!labelWidth ? '' : (showLabel && item.label)"
          :label-width="labelWidth || item.labelWidth"
          :key="index"
          :prop="item.prop"
        >
          <!-- 输入框 -->
          <template v-if="item.type=='text' || !item.type">
            <el-input
              v-model.trim="form[item.prop]"
              :placeholder="item.placeholder || '请输入' + item.label"
              :maxlength="item.maxlength"
            ></el-input>
          </template>
          <!-- 单选框 -->
          <template v-if="item.type=='radio'">
            <el-radio-group v-model="form[item.prop]">
              <template v-for="(itm,idx) in item.translate">
                <el-radio
                  :key="index+'_'+itm.value"
                  :label="itm.value"
                >{{itm.label}}</el-radio>
              </template>
            </el-radio-group>
          </template>
          <!-- 下拉选择框 -->
          <template v-if="item.type=='select'">
            <el-select
              v-model="form[item.prop]"
              :placeholder="item.placeholder || '请选择'"
            >
              <el-option
                v-for="itm in item.translate"
                :key="itm.value"
                :label="itm.label"
                :value="itm.value"
              >
              </el-option>
            </el-select>
          </template>
          <!-- 省市区选择 -->
          <template v-if="item.type=='address'">
            <el-input
              v-model="form[item.prop]"
              v-show="false"
            />
            <el-cascader
              size="large"
              :options="regionOptions"
              v-model="selectedRegionOptions"
              @change="val=>handleChangeRegion(val,item)"
            >
            </el-cascader>
          </template>
          <!-- 日期选择框 -->
          <template v-if="item.type=='dateRange'">
            <el-date-picker
              @change="date => {dateFormatting(date, item)}"
              v-model="form[item.prop]"
              :format="item.format||'yyyy-MM-DD'"
              :value-format="item.valueFormat||'yyyy-MM-DD HH:mm:ss'"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </template>
          <!-- 输入框 -->
          <template v-if="item.type=='file' || item.type=='preview'">
            <el-input
              v-model="form[item.prop]"
              v-show="false"
            />
            <es-upload
              :type="item.type"
              :action="item.setting.action || '/'"
              :file-path="form[item.prop]"
              :setting="item.setting"
              :reset-button="item.resetButton"
              :pdf-preview="item.onPdfPreview"
              :before-upload="item.beforeUpload"
              @on-success="res => handleOnSuccess(res,item)"
              @on-reset="res=>handleOnReset(res,item)"
            />
          </template>
        </el-form-item>
      </template>
    </el-form>
    <span
      v-if="!isDialogForm && !isQueryForm"
      slot="footer"
      class="footer"
    >
      <es-button-group
        v-bind="$attrs"
        v-on="$listeners"
        :parent="$parent"
        :current="this"
      />
    </span>
  </div>
</template>
<script>
/**
 * [20210521][crt]
 * @author: gongmingzhuang
 *
 */
import { Form } from 'element-ui'
import EsButtonGroup from '../../button-group/src/button-group'
import EsUpload from '../../upload/src/upload'
import VALID_SET from '../../../lib/validate'
// 省市区联动数据
import {
  provinceAndCityData,
  regionData,
  provinceAndCityDataPlus,
  regionDataPlus,
  CodeToText,
  TextToCode,
} from 'element-china-area-data'
export default {
  name: 'EsForm',
  components: {
    EsButtonGroup,
    EsUpload,
  },
  props: {
    // 显示label
    showLabel: {
      type: Boolean,
      default: true,
    },
    // label 宽度
    labelWidth: {
      type: String,
      default: '',
    },
    // 表单配置
    formSetting: {
      type: Object,
      default: () => {
        return {
          col: 1,
          itemWrap: false,
        }
      },
    },
    // 表单字段
    formColumns: {
      type: Array,
      required: true,
    },
    // 自定义校验规则
    validateCustomList: {
      type: Array,
      default: () => [],
    },
    // 校验规则
    rules: {
      type: Object,
      default: () => {
        return {}
      },
    },
    // 弹窗表单
    isDialogForm: {
      type: Boolean,
      default: false,
    },
    // 条件查询表单
    isQueryForm: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      form: {}, // 表单对象
      regionOptions: regionData, // 1102 省市区 全部数据
      selectedRegionOptions: [], // 1102 省市区 选择数据
      selectedRegionData: {}, // 1102 省市区 选择数据
    }
  },
  created() {
    // 添加校验规则
    this.formColumns.forEach((item) => {
      if (item.type == 'dageRange') {
        this.$set(this.form, item.props[0], '')
        this.$set(this.form, item.props[1], '')
      }
      if (item.type != 'title') {
        this.$set(this.form, item.prop, '')
        if (item.validate) {
          if (!this.rules.hasOwnProperty(item.prop)) {
            this.$set(this.rules, item.prop, [])
            item.validate.forEach((itm) => {
              var _valid = {}
              // 默认校验
              if (VALID_SET.hasOwnProperty(itm)) {
                _valid = VALID_SET[itm](item, this.formColumns, this)
              } else {
                // 自定义校验
                this.validateCustomList.forEach((vitem) => {
                  if (itm == vitem.validName) {
                    // 函数中Error 对象需要在形参中传入，否则会报 $vm.Error not define 异常
                    // [20210531][upd] 已修复
                    _valid.validator = vitem.validator(item)
                    _valid.trigger = ['blur', 'change']
                  }
                })
              }
              this.rules[item.prop].push(_valid)
            })
          }
        }
      }
    })
  },
  methods: {
    // [20210518][crt] 日期格式化
    dateFormatting(date, item) {
      let _valueFormat = item.valueFormat || 'yyyy-MM-DD HH:mm:ss'
      if (!date) {
        this.form[item.prop] = ''
        this.form[item.props[0]] = ''
        this.form[item.props[1]] = ''
        return
      }
      this.form[item.props[0]] = this.$moment(date[0]).format(_valueFormat)
      this.form[item.props[1]] = this.$moment(date[1]).format(_valueFormat)
    },
    // [20210518] 表单提交
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          let _form = JSON.parse(JSON.stringify(this.form))
          this.formColumns.forEach((item) => {
            if (item.type == 'dateRange') {
              delete _form[item.prop]
            }
          })
          this.$emit('submit-event', _form)
        }
      })
    },
    // [20210524][crt] 整合表单，用于条件查询
    assignForm(otherParams) {
      Object.assign(this.form, otherParams)
    },
    // [20210524][crt] 重置日期类型字段
    resetDateRangeFields() {
      this.formColumns.forEach((item) => {
        if (item.type == 'dateRange') {
          this.form[item.prop] = []
          this.form[item.props[0]] = ''
          this.form[item.props[1]] = ''
        }
      })
    },
    // [20210525][crt] 省市区地址
    handleChangeRegion(val, item) {
      this.selectedRegionData = {} // 初始化
      let regionArr = val
      let regionLen = 45 // 省市区字符串总长度
      let regionText = '' // 省市区地址中文
      let valType = item.valueType || 'text' // 地址值类型 text code array
      regionArr.forEach((itm) => {
        regionLen += CodeToText[itm].length * 15
        regionText += CodeToText[itm]
      })

      // 所在地区选择赋值-校验规则
      this.$set(
        this.form,
        item.prop,
        valType == 'text'
          ? regionText
          : valType == 'code'
          ? val.join(',')
          : JSON.stringify(val)
      )
      // 港澳数据出来 len=2
      if (val.length == 2) {
        this.selectedRegionData.provinceId = ''
        this.selectedRegionData.province = ''
        this.selectedRegionData.cityId = regionArr[0]
        this.selectedRegionData.city = CodeToText[regionArr[0]]
        this.selectedRegionData.districtId = regionArr[1]
        this.selectedRegionData.district = CodeToText[regionArr[1]]
      } else {
        this.selectedRegionData.provinceId = regionArr[0]
        this.selectedRegionData.province = CodeToText[regionArr[0]]
        this.selectedRegionData.cityId = regionArr[1]
        this.selectedRegionData.city = CodeToText[regionArr[1]]
        this.selectedRegionData.districtId = regionArr[2]
        this.selectedRegionData.district = CodeToText[regionArr[2]]
      }
    },
    // [20210525] 地址控件转换
    // 用法：this.$refs['es-form'].transferRegion('140000,140300,140303', 'addr')
    transferRegion(addrStr, prop) {
      this.form[prop] = addrStr
      let [provinceId, cityId, districtId] = addrStr.split(',')
      if (!provinceId) {
        this.selectedRegionOptions = [cityId, districtId]
      } else {
        this.selectedRegionOptions = [provinceId, cityId, districtId]
      }
      let regionLen = 45
      this.selectedRegionOptions.forEach((item) => {
        regionLen += CodeToText[item].length * 15
      })
    },
    // [20210525][crt] 文件上传成功
    handleOnSuccess(res, item) {
      typeof item.onSuccess == 'function' &&
        item.onSuccess({ form: this.form, prop: item.prop, result: res })
    },
    // [20210527][crt] 重置字段
    handleOnReset(res, item) {
      this.form[item.prop] = ''
    },
  },
}
</script>
<style>
.es-form {
  padding: 10px;
  background: #fff;
  border-radius: 5px;
}
.es-form .el-form {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 100%;
}

.el-form .el-form-item.w-100 {
  width: 100%;
}
.el-form .el-form-item.w-50 {
  width: 48%;
}

/* label/input 各占一行 */
.el-form-item.item-wrap label {
  width: 100% !important;
  text-align: left;
}
.el-form-item.item-wrap > div {
  margin-left: 0 !important;
}
.es-form .el-select,
.es-form .el-cascader {
  width: 100%;
}

/* type=title */
.form-header {
  width: 100%;
  margin: 10px;
  margin-top: 15px;
  font-size: 16px;
  font-weight: bold;
}
.es-form .es-button-group {
  justify-content: flex-end;
}
.es-form .el-date-editor--daterange.el-input,
.es-form .el-date-editor--daterange.el-input__inner,
.es-form .el-date-editor--timerange.el-input,
.es-form .el-date-editor--timerange.el-input__inner {
  width: 100%;
}
</style>