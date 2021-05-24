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
          <p class="form-header">{{item.label}}</p>
        </template>
        <!-- [upg][20210524] 支持分列表单 -->
        <el-form-item
          v-else
          :style="{width: 'calc(100%/' + ( formSetting.col || 1)+')'}"
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
                <el-radio :key="index+'_'+itm.value" :label="itm.value">{{itm.label}}</el-radio>
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
 * - 1. 通过extends 可直接继承<el-form> 的props 变量
 * - 2. 通过queryList 数组生成queryForm 表单对象
 * - 3. 通过$emit 将表单传递给父组件调用查询
 */
import { Form } from 'element-ui'
import EsButtonGroup from '../../button-group/src/button-group'
import VALID_SET from '../../../lib/validate'
export default {
  // extends: Form,
  name: 'EsForm',
  components: {
    EsButtonGroup,
  },
  props: {
    showLabel: {
      type: Boolean,
      default: true,
    },
    labelWidth: {
      type: String,
      default: '',
    },
    formSetting: {
      type: Object,
      default: () => {
        return {
          col: 1,
          itemWrap: false,
        }
      },
    },
    // 数组
    formColumns: {
      type: Array,
      required: true,
    },
    validateCustomList: {
      type: Array,
      default: () => [],
    },
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
      form: {},
    }
  },
  created() {
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
              VALID_SET.hasOwnProperty(itm) &&
                (_valid = VALID_SET[itm](item, this.formColumns, this))
              // 自定义校验
              this.validateCustomList.forEach((vitem) => {
                if (itm == vitem.validName) {
                  _valid = vitem.validator(item)
                }
              })
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
.es-form .el-select{
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