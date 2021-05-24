<template>
  <div class="es-dialog-form">
    <el-dialog
      class="es-dialog-form"
      v-bind="$attrs"
      v-on="$listeners"
      :visible.sync="dialogVisible"
      append-to-body
    >
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
            :class="formSetting.col==2 ? 'w-50 ' + (formSetting.itemWrap ? ' item-wrap' : '') : 'w-100 ' + (formSetting.itemWrap ? ' item-wrap' : '')"
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
            <!-- 日期选择框 -->
            <template v-if="item.type=='dateRange'">
              <el-date-picker
                @change="date => {dateFormatting(date, item)}"
                v-model="form[item.prop]"
                :format="item.format||'yyyy-MM-dd'"
                :value-format="item.valueFormat||'yyyy-MM-dd HH:mm:ss'"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              />
            </template>
            <!-- 下拉框 -->
            <template v-if="item.type=='select'">
              <el-input
                v-model.trim="form[item.prop]"
                :placeholder="item.placeholder || '请输入' + item.label"
                :maxlength="item.maxlength"
              ></el-input>
            </template>
          </el-form-item>
        </template>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <es-button-group
          :list-setting="buttonListSetting"
          :button-list="buttonList"
          :parent="$parent"
          :current="this"
        />
      </span>
    </el-dialog>
  </div>
</template>
<script>
/**
 * [20210506][crt]
 * @author: gongmingzhuang
 *
 * - 1. 通过extends 可直接继承子组件的props 变量
 * - 2. 可传入button-list 可直接配置右侧按钮组
 */
import { Dialog } from 'element-ui'
import { Form } from 'element-ui'
import EsButtonGroup from '../../button-group/src/button-group'
import VALID_SET from '../../../lib/validate'
export default {
  // extends: Form,
  name: 'EsDialogForm',
  components: {
    EsButtonGroup,
  },
  props: {
    tips: {
      type: String,
      default: '确定执行该操作？',
    },
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
      default: ()=>{
        return {
          col: 1,
          itemWrap: false
        }
      }
    },
    // 数组
    formColumns: {
      type: Array,
      required: true,
    },
    buttonListSetting: {
      type: Object,
      default: () => {
        return {
          size: 'size',
          type: 'type',
          plain: 'plain',
          round: 'round',
          circle: 'circle',
          loading: 'loading',
          disabled: 'disabled',
          icon: 'icon',
          autofocus: 'autofocus',
          buttonName: 'buttonName',
          nativeType: 'nativeType',
          visible: 'visible', // boolean
          clickEvent: 'clickEvent',
        }
      },
    },
    buttonList: {
      type: Array,
      default: () => [],
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
  },
  data() {
    return {
      dialogVisible: false,
      form: {},
      formLabelWidth: '120px',
    }
  },
  created(){
    this.formColumns.forEach(item=>{
      if(item.type == 'dageRange'){
        this.$set(this.form, item.props[0], '')
        this.$set(this.form, item.props[1], '')
      }
    })
  },
  watch: {
    // [20210521][crt] 生成验证表单
    formColumns: function (columns) {
      columns.forEach((item) => {
        this.$set(this.form, item.prop, '')
        if (item.validate) {
          if (!this.rules.hasOwnProperty(item.prop)) {
            this.$set(this.rules, item.prop, [])
            item.validate.forEach((itm) => {
              var _valid = {}
              // 默认校验
              VALID_SET.hasOwnProperty(itm) &&
                (_valid = VALID_SET[itm](item, columns, this))
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
      })
    },
  },
  methods: {
    open(beforeInvoke, afterInvoke) {
      beforeInvoke && beforeInvoke()
      this.$nextTick(() => {
        if (this.$refs['form']) {
          this.$refs['form'].resetFields()
          this.$refs['form'].clearValidate()
        }
      })
      this.dialogVisible = true
      afterInvoke && afterInvoke()
    },
    close(beforeInvoke, afterInvoke) {
      beforeInvoke && beforeInvoke()
      this.$refs['form'].resetFields()
      this.$refs['form'].clearValidate()
      this.dialogVisible = false
      afterInvoke && afterInvoke()
    },
    submit() {
      var $form = this.$refs.form
      $form.validate((valid) => {
        if (valid) {
          this.$emit('submit-event', this.form)
        }
      })
    },
    // [20210518][crt] 日期格式化
    dateFormatting(date, item){
      if(!date){
        this.form[item.prop] = ''
        this.form[item.props[0]] = ''
        this.form[item.props[1]] = ''
        return
      }
      this.form[item.props[0]] = date[0].split(' ')[0]
      this.form[item.props[1]] = date[1].split(' ')[0]
    }
  },
}
</script>
<style>
.es-dialog-form .el-form{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.es-dialog-form .el-form .el-form-item.w-100{
  width: 100%;
}
.es-dialog-form .el-form .el-form-item.w-50{
  width: 48%;
}

.el-form-item.item-wrap label{
  width: 100% !important;
  text-align: left;
}
.el-form-item.item-wrap > div{
  margin-left: 0 !important;
}

.form-header{
  width: 100%;
  margin: 10px;
  margin-top: 15px;
  font-size: 16px;
  font-weight: bold;
}
</style>