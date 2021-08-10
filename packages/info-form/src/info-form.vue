<template>
  <div class="es-form">
    <!-- >>> {{formColumns}} -->
    <!-- {{form.avatar1}} -->
    <div v-show="0">
      {{form}}
      <hr>
    </div>

    <div v-show="0">
      {{formColumns}}
      <hr>
    </div>
    <el-form
      ref="form"
      :model="form"
      v-bind="$attrs"
      v-on="$listeners"
      :rules="rules"
    >
      <template v-for="(item, index) of formColumns">
        <div
          v-if="item.type=='tip' && (!item.invisibleControl || item.invisibleControl(item, form))"
          class="type-tip"
          :class="item.setting && item.setting.styleClass ? item.setting.styleClass : ''"
          :style="{width: '100%'}"
        >
          <span class="tip-title">{{item.label}}</span>
          <span class="tip-tip">{{item.tip}}</span>
        </div>
        <div
          v-if="item.type=='line' && (!item.invisibleControl || item.invisibleControl(item, form))"
          style="border-top: 1px solid #cacaca"
          :style="{'border-top-style': item.borderStyle, 'width': '100%'}"
          class="type-line"
          :class="item.setting && item.setting.styleClass ? item.setting.styleClass : ''"
        >
        </div>
        <!-- [upg][20210622] 前置插槽，不推荐使用 -->
        <div
          class="prefix-slot"
          v-if="item.prefix"
        >
          <slot
            :name="`${item.prop}-prefix`"
            :form="form"
            :item="item"
          />
        </div>
        <!-- [upg][20210524] 标题 -->
        <!-- [upg][20210705] 标题显示隐藏控制 -->
        <template v-if="item.type=='title' && (!item.invisibleControl || item.invisibleControl(item, form))">
          <p
            class="form-header"
            :key="index"
          >{{item.label}}</p>
        </template>
        <!-- [upg][20210706]: 隐藏域字段-->
        <el-form-item
          v-else-if="item.type=='hidden'"
          class="hidden"
        >
          <el-input
            v-model.trim="form[item.prop]"
            type="hidden"
            :readonly="true"
          />
        </el-form-item>
        <!-- [upg][20210524] 支持分列表单 -->
        <!-- :style="{width: `calc(100% - ${formSetting.col}) / ${ formSetting.col || 1})`}" -->
        <!-- [upg][20210630]: invisibleControl - 新增可控制显示/隐藏表单操作 -->
        <!-- [upg][20210630]: isWholeLine - 新增单独控制对应字段占一整行 -->
        <!-- [upg][20210701]: loadingCtrl - 提交loading控制 -->
        <!-- [upg][20210705]: invisibleControl - 返回form 表单对象-->
        <!-- [upg][20210713] type=txt 新增render 渲染 -->
        <!-- [upg][20210713] 样式class 添加 -->
        <!-- [upg][20210713] 输入框支持清空 -->
        <!-- [upg][20210714] 禁用formSetting.itemWrap -->
        <!-- [upg][20210714] 新增item.setting.styleClass 添加类名 -->
        <!-- [upg][20210714] 新增 crediteCode/name/phone，配置默认校验规则 -->
        <!-- [upg][20210714] 新增 remoteText，远程模糊查询输入 -->
        <!-- :label="!labelWidth ? '' : (showLabel && item.label)" -->
        <el-form-item
          v-else-if="item.type != 'image-group'&& (item.type != 'line' && item.type != 'tip' && item.type != 'title' && item.type != 'hidden')  && item.invisibleControl ? item.invisibleControl(item, form) : (item.type != 'line' && item.type != 'tip' && item.type != 'title' && item.type != 'hidden') ? true : false"
          :style="{width: (item.setting && item.setting.isWholeLine) ? '100%' : formSetting.itemWidth ? formSetting.itemWidth : `calc((100% / ${formSetting.col || 1 })`}"
          :class="item.setting && item.setting.styleClass ? item.setting.styleClass : ''"
          :label="!labelWidth ? '' : (showLabel && (item.setting && item.setting.dynamicLabel ? item.setting.dynamicLabel(form, formColumns[index]) : item.label))"
          :label-width="labelWidth || item.labelWidth"
          :key="index"
          :prop="item.prop"
        >
          <div class="es-form-item">
            <!-- [crt][20210701] 文本展示 -->
            <template v-if="item.type=='txt'">
              <!-- [crt][20210709] 金额格式化 -->
              <template v-if="item.setting && item.setting.dataType=='money'">
                <span>{{(form[item.prop] && UTIL.moneyFormat(form[item.prop])) || (UTIL.moneyFormat(0)) }}</span>
              </template>
              <template v-else-if="item.render">
                <div v-html='item.render(item, form)'></div>
              </template>
              <template v-else>
                <span>{{form[item.prop] || '-'}}</span>
              </template>
            </template>
            <!-- [crt][20210715] 远程查询模糊输入 -->
            <template v-if="item.type=='remote'">
              <el-autocomplete
                v-model="form[item.prop]"
                :fetch-suggestions="item.fetchEvent"
                :placeholder="'请输入'+item.label"
                @select="item.selectEvent ? item.selectEvent : ()=>{}"
              ></el-autocomplete>
            </template>
            <!-- [crt][20210706] 隐藏域 -->
            <template v-if="item.type=='hidden'">
              <el-input
                v-model.trim="form[item.prop]"
                type="hidden"
                :readonly="true"
              ></el-input>
            </template>
            <!-- 输入框 -->
            <!-- [crt][20210714] 统一社会信用代码类型 -->
            <!-- [crt][20210714] 名称类型 -->
            <!-- [crt][20210715] 前置icon -->
            <template v-if="item.type=='text' || !item.type || item.type == 'creditCode' || item.type == 'name' || item.type == 'mobile' || item.type == 'IDCard' || item.type == 'email'">
              <el-input
                :prefix-icon="item.setting && item.setting.prefixIcon"
                v-model.trim="form[item.prop]"
                :placeholder="item.placeholder || '请输入' + item.label"
                :maxlength="item.maxlength"
                :clearable="item.setting && item.setting.clearable"
                :readonly="item.setting && item.setting.readonly || (formSetting.loadingCtrl && $props.loading)"
              ></el-input>
            </template>
            <!-- [crt][20210621] 密码框 -->
            <template v-if="item.type=='password'">
              <el-input
                :prefix-icon="item.setting && item.setting.prefixIcon"
                :type="passwordConfig[item.prop].show ? 'text': 'password'"
                v-model.trim="form[item.prop]"
                :placeholder="item.placeholder || '请输入' + item.label"
                :maxlength="item.maxlength"
                :clearable="item.setting && item.setting.clearable"
                :readonly="item.setting && item.setting.readonly || (formSetting.loadingCtrl && $props.loading)"
              >
                <i
                  class="el-icon-view"
                  slot="suffix"
                  @click="passwordConfig[item.prop].show = !passwordConfig[item.prop].show"
                />
                <!-- @mouseout="passwordConfig[item.prop].show = false" -->
              </el-input>
            </template>
            <!-- 文本域 -->
            <template v-if="item.type=='textarea'">
              <es-textarea
                :columns="formColumns"
                :item="item"
                :form.sync="form"
                :rules="rules"
              ></es-textarea>
            </template>
            <!-- [crt][20210629] 短信验证码框 -->
            <template v-if="item.type=='message'">
              <div class="message">
                <div class="message-left">
                  <el-input
                    :prefix-icon="item.setting && item.setting.prefixIcon"
                    v-model.trim="form[item.prop]"
                    :placeholder="item.placeholder || '请输入' + item.label"
                    :maxlength="item.maxlength"
                    :readonly="item.setting && item.setting.readonly || (formSetting.loadingCtrl && $props.loading)"
                  />
                </div>
                <div class="message-right">
                  <el-button
                    :type="item.setting && item.setting.buttonType || ''"
                    @click="getMessageCode(item)"
                    v-if="messageConfig[item.prop] && !messageConfig[item.prop].wait || messageConfig[item.prop] && messageConfig[item.prop].wait == 'first'"
                  >{{messageConfig[item.prop] && messageConfig[item.prop].wait == 'first' ? '' : '重新'}}获取短信验证码</el-button>
                  <span v-else>{{messageConfig[item.prop] && messageConfig[item.prop].timer}}秒后可重发</span>
                </div>
              </div>
            </template>
            <!-- [crt][20210621] 验证码框 -->
            <template v-if="item.type=='code'">
              <div class="code">
                <div class="code-left">
                  <el-input
                    :prefix-icon="item.setting && item.setting.prefixIcon"
                    v-model.trim="form[item.prop]"
                    :placeholder="item.placeholder || '请输入' + item.label"
                    :maxlength="item.maxlength"
                    :readonly="item.setting && item.setting.readonly || (formSetting.loadingCtrl && $props.loading)"
                  />
                </div>
                <div
                  class="code-right"
                  @click="e => item.refreshEvent(e, item, codeConfig[item.prop])"
                >
                  <img
                    :src="codeConfig[item.prop] && codeConfig[item.prop].path"
                    :id="item.prop+'_code'"
                  />
                </div>
              </div>
            </template>
            <!-- [crt][20210621] 复选框 -->
            <!-- [crt][20210706] singleDisabled: 单独控制不可点击 -->
            <template v-if="item.type=='checkbox'">
              <el-checkbox-group
                v-model="form[item.prop]"
                @change="val => item.hasOwnProperty('setting') && item.setting.hasOwnProperty('changeEvent') && item.setting.changeEvent(val, item, form)"
              >
                <template v-for="(itm,idx) in item.translate">
                  <el-checkbox
                    :key="index+'_'+itm.value"
                    :name="item.prop"
                    :label="itm.value"
                    :disabled="item.setting && (item.setting.disabled || item.setting.readonly) || (formSetting.loadingCtrl && $props.loading)
                    || ( 
                      item.setting.singleDisabled 
                      && item.setting.singleDisabled.ctrl 
                      && (
                        (typeof(item.setting.singleDisabled.ctrl[itm.value]) == 'boolean' && item.setting.singleDisabled.ctrl[itm.value]) 
                        ||  typeof(item.setting.singleDisabled.ctrl[itm.value]) == 'function' && item.setting.singleDisabled.ctrl[itm.value](item, form)
                      )
                    )"
                  >{{itm.label}}</el-checkbox>
                </template>
              </el-checkbox-group>
            </template>
            <!-- 单选框 -->
            <template v-if="item.type=='radio'">
              <el-radio-group v-model="form[item.prop]">
                <template v-for="(itm,idx) in item.translate">
                  <el-radio
                    :key="index+'_'+itm.value"
                    :label="itm.value"
                    :disabled="item.setting && item.setting.disabled || (formSetting.loadingCtrl && $props.loading)"
                  >{{itm.label}}</el-radio>
                </template>
              </el-radio-group>
            </template>
            <!-- 下拉选择框 -->
            <template v-if="item.type=='select'">
              <el-select
                v-model="form[item.prop]"
                :placeholder="item.placeholder || '请选择'"
                :disabled="item.setting && (item.setting.disabled || item.setting.readonly) || (formSetting.loadingCtrl && $props.loading)"
                @change="(val) => item.hasOwnProperty('changeEvent') ? item.changeEvent(val, item, form) : item.hasOwnProperty('setting') && item.setting.hasOwnProperty('changeEvent') && item.setting.changeEvent(val, item, form)"
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
            <!-- [upg][20210706]: 详细地址只读属性添加-->
            <!-- [upg][20210714]: 支持只选省市 onlyProvinceAndCity -->
            <template v-if="item.type=='address'">
              <el-input
                v-model="form[item.prop]"
                v-show="false"
              />
              <div class="address">
                <el-cascader
                  size="large"
                  :options="item.setting && item.setting.onlyProvinceAndCity ? provinceAndCityOptions : regionOptions"
                  v-model="regionConfig ? regionConfig[item.prop] : form[item.prop]"
                  @change="val=>handleChangeRegion(val,item)"
                  :disabled="item.setting && (item.setting.disabled || item.setting.readonly) || (formSetting.loadingCtrl && $props.loading)"
                >
                </el-cascader>
                <el-input
                  v-if="item.setting && item.setting.detail"
                  :readonly="item.setting && (item.setting.disabled || item.setting.readonly) || (formSetting.loadingCtrl && $props.loading)"
                  type="textarea"
                  v-model="form[item.setting && item.setting.detail && item.setting.detail.prop]"
                  row="3"
                  resize="none"
                  :placeholder="item.setting && item.setting.detail && item.setting.detail.placeholder || '请输入详细地址'"
                />
              </div>
            </template>
            <!-- 日期选择框 -->
            <!-- [20210726][upd] 移除组件格式化功能 -->
            <template v-if="item.type=='date'">
              <el-date-picker
                @change="date => {dateFormatting(date, item)}"
                v-model="form[item.prop]"
                :disabled="item.setting && (item.setting.disabled || item.setting.readonly) || (formSetting.loadingCtrl && $props.loading)"
                type="date"
              />
            </template>
            <!-- [20210714][upd] 移除组件格式化功能 -->
            <template v-if="item.type=='dateRange'">
              <el-date-picker
                @change="date => {dateFormatting(date, item)}"
                v-model="form[item.prop]"
                :disabled="item.setting && (item.setting.disabled || item.setting.readonly) || (formSetting.loadingCtrl && $props.loading)"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              />
            </template>
            <!-- [20210714] 日期切换框 -->
            <template v-if="item.type === 'dateRangeSwitch'">
              <div class="p-rel d-flex w-100">
                <el-date-picker
                  v-show="item.setting && !item.setting.switch"
                  @change="date => {dateFormatting(date, item)}"
                  v-model="form[item.prop]"
                  :disabled="item.setting && (item.setting.disabled || item.setting.readonly) || (formSetting.loadingCtrl && $props.loading)"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                ></el-date-picker>
                <el-date-picker
                  v-show="item.setting && item.setting.switch"
                  @change="date => {dateFormatting(date, item)}"
                  v-model="form[item.props[0]]"
                  :disabled="item.setting && (item.setting.disabled || item.setting.readonly) || (formSetting.loadingCtrl && $props.loading)"
                  type="date"
                  placeholder="选择日期"
                ></el-date-picker>
                <!-- <el-checkbox
                  v-if="item.setting && (!item.setting.disabled && !item.setting.readonly)"
                  class="ml-10"
                  v-model="item.setting.switch"
                  @change="val => {switchDateType(val, item)}"
                >长期</el-checkbox> -->
                <!-- @change="val => { item.setting.switch = !val }" -->
              </div>
            </template>
            <!-- 文件上传框 -->
            <template v-if="item.type=='file' || item.type=='preview'">
              <el-input
                v-model="form[item.prop]"
                v-show="false"
              />
              <es-upload
                :type="item.type"
                :headers="item.setting && item.setting.headers"
                :data="item.setting && item.setting.data ? item.setting.data : {}"
                :action="item.setting.action || '/'"
                :file-path="form[item.prop]"
                :setting="item.setting"
                :pdf-preview="item.onPdfPreview"
                :before-upload="item.beforeUpload"
                :preview="val => item.setting.onPreview(val,item, item.setting)"
                @on-success="res => handleOnSuccess(res,item, item.setting)"
                @on-reset="res=>handleOnReset(res,item, item.setting)"
              />
            </template>
            <!-- [crt][20210621] 兼容额外字段 -->
            <template v-if="item.type=='slot'">
              <slot
                :name="item.prop"
                :item="item"
                :form="form"
                :rules="rules"
              />
            </template>
            <!-- [upg][20210622] 后置插槽 -->
            <div
              class="suffix-slot"
              v-if="item.suffix"
            >
              <slot
                :name="`${item.prop}-suffix`"
                :form="form"
                :item="item"
              />
            </div>
          </div>
        </el-form-item>
        <!-- [upg][20210714] 新增图片组 -->
        <template v-if="item.type == 'image-group' && (!item.invisibleControl || item.invisibleControl(item, form))">
          <es-image-group
            class="ig"
            :columns="formColumns"
            :item="item"
            :form="form"
            :rules="rules"
          ></es-image-group>
          <div
            v-if="0"
            class="image-group d-flex flex-wrap w-100"
            :class="item.prop"
          >
            <template v-for="(imgItem, imgIndex) in item.group">
              <el-form-item
                v-if="(!imgItem.invisibleControl || imgItem.invisibleControl(imgItem, form))"
                class="d-flex"
                :label="imgItem.label"
                :key="imgIndex"
                :prop="imgItem.prop"
              >
                <el-input
                  v-model="form[imgItem.prop]"
                  v-show="0"
                />
                <es-upload
                  :headers="item.setting.headers"
                  :action="item.setting.action || '#'"
                  :list-type="'picture-card'"
                  :file-path="form[imgItem.prop]"
                  :setting="item.setting"
                  :reset-button="item.setting.resetButton"
                  :pdf-preview="item.setting.onPdfPreview"
                  :before-upload="item.setting.beforeUpload"
                  @on-success="res => handleOnSuccess(res,imgItem, item.setting)"
                  @on-reset="res=>handleOnReset(res,imgItem, item.setting)"
                />
              </el-form-item>
            </template>
          </div>
        </template>
      </template>
    </el-form>
    <!-- [20210622] 表单元素追加插槽，支持两种方式 -->
    <slot v-if="formSetting.appendSlot"></slot>
    <slot name="append-slot"></slot>
    <span
      v-if="!isDialogForm && !isQueryForm"
      slot="footer"
      class="footer"
    >
      <!-- [upg][20210630]: hideButton - 控制是否显示按钮组 -->
      <es-button-group
        v-if="!formSetting.hideButton"
        :button-list="buttonList"
        v-bind="{...$attrs, ...$props}"
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
/**
 * [20210621][upg] 新增控制输入框可清楚事件及按钮/密码框隐藏显示控制
 * [20210622][crt] 新增插槽form-item 前置插槽/后置插槽/按钮组前置插槽
 */
import { Form } from 'element-ui'
import EsButtonGroup from '../../button-group/src/button-group'
import EsImageGroup from '../../image-group/src/image-group'
import EsTextarea from '../../form/src/textarea'
import EsUpload from '../../upload/src/upload'
import VALID_SET from '../../../lib/validate'
import UTIL from '../../../util/util.js'
export default {
  name: 'EsInfoForm',
  components: {
    EsButtonGroup,
    EsImageGroup,
    EsTextarea,
    EsUpload
  },
  props: {
    // 显示label
    showLabel: {
      type: Boolean,
      default: true
    },
    // label 宽度
    labelWidth: {
      type: String,
      default: ''
    },
    // 表单配置
    formSetting: {
      type: Object,
      default: () => {
        return {
          col: 1,
          itemWrap: false
        }
      }
    },
    // 表单字段
    formColumns: {
      type: Array,
      required: true
    },
    // 自定义校验规则
    validateCustomList: {
      type: Array,
      default: () => []
    },
    // 校验规则
    rules: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // 弹窗表单
    isDialogForm: {
      type: Boolean,
      default: false
    },
    // 条件查询表单
    isQueryForm: {
      type: Boolean,
      default: false
    },
    buttonList: {
      type: Array,
      default: () => [
        {
          buttonName: '确定',
          type: 'primary',
          clickEvent: 'submit',
          loadingCtrl: true, // [upg][20210701] 添加loading 控制
          assignCurrentParent: true
        }
      ]
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      VALID_SET,
      UTIL,
      hadInit: false, // 是否已经初始化
      canReinit: false,
      form: {} // 表单对象
    }
  },
  // [upg][20210702] 动态监听columns
  watch: {
    formColumns: {
      handler: function (newColumns) {
        this.initForm()
        // debugger
      },
      immediate: true,
      deep: true
    }
  },
  created() {
    this.$emit('before-created', this.formColumns)
    this.initForm()
  },
  mounted() {},
  methods: {
    // [20210629][upg] 初始化表单
    initForm() {
      let _that = this
      // 添加校验规则
      this.formColumns.forEach((item, index, array) => {
        // [20210524] 日期控件
        // [20210714] 新增日期切换控件
        if (item.type == 'dateRange' || item.type == 'dateRangeSwitch') {
          this.$set(this.form, item.prop, '')
          this.$set(this.form, item.props[0], '')
          this.$set(this.form, item.props[1], '')
        }
        // [20210621] 密码类型显示/隐藏控制
        if (item.type == 'password') {
          this.$set(this.passwordConfig, item.prop, {})
          this.$set(this.passwordConfig[item.prop], 'show', false)
        }
        // [20210621] 验证码类图片-添加验证码路径属性
        if (item.type == 'code') {
          this.$set(this.codeConfig, item.prop, {})
          this.$set(this.codeConfig[item.prop], 'path', '')
          // 首次调用
          item.refreshEvent(null, item, this.codeConfig[item.prop])
        }
        // [20210629] 短信验证码类-添加计时器/计时器开启属性
        if (item.type == 'message') {
          this.$set(this.messageConfig, item.prop, {})
          this.$set(
            this.messageConfig[item.prop],
            'timer',
            (item.setting && item.setting.interval) || 10
          )
          this.$set(this.messageConfig[item.prop], 'wait', 'first')
        }

        if (item.type != 'title') {
          this.$set(this.form, item.prop, '')
          // [20210630] 复选框类
          if (item.type == 'checkbox') {
            this.$set(this.form, item.prop, [])
          }
          // [20210701] 地址控件
          if (item.type == 'address' && item.setting && item.setting.detail) {
            this.$set(this.form, item.setting.detail.prop, '')
          }
          if (item.type == 'address') {
            this.$set(this.regionConfig, item.prop, [])
          }

          // [20210714][crt] type：image-group 按钮组
          if (item.type == 'image-group') {
            0 &&
              item.group.forEach(imgItem => {
                this.$set(this.form, imgItem.prop, '')
                this.$set(this.rules, imgItem.prop, [])
                if (imgItem.validate) {
                  let _imgValid = _that.VALID_SET[imgItem.validate[0]](
                    imgItem,
                    _that.formColumns,
                    _that
                  )
                  this.rules[imgItem.prop].push(_imgValid)
                }
              })
          }

          if (item.validate) {
            if (!this.rules.hasOwnProperty(item.prop)) {
              this.$set(this.rules, item.prop, [])
              item.validate.forEach(itm => {
                let _valid = {}
                // [upd][20210701] 联动查询修复
                if (itm == 'v-compare' || itm == 'v-comdepend') {
                  _valid = _that.VALID_SET[itm](item, itm, _that.formColumns, _that)
                } else if (_that.VALID_SET.hasOwnProperty(itm)) {
                  // 默认校验
                  _valid = _that.VALID_SET[itm](item, _that.formColumns, _that)
                } else if (itm instanceof Object && itm.hasOwnProperty('validator')) {
                  if (_that.VALID_SET.hasOwnProperty(itm.validator)) {
                    // [20210621][upg] 追加支持默认校验规则配置提示语
                    _valid = _that.VALID_SET[itm.validator](item, itm, _that.formColumns, _that)
                  } else {
                    let _validate = _that.validateCustomList.find(
                      it => it.validName == itm.validator
                    )
                    if (_validate) {
                      _valid.validator = _validate.validator(item, this, itm)
                      _valid.trigger = _validate.trigger || ['blur', 'change']
                    }
                  }
                } else {
                  // 自定义校验
                  this.validateCustomList.forEach(vitem => {
                    if (itm == vitem.validName) {
                      // [20210702][upg] 对自定义校验规则增强配置{validateSetting}，通过与[validateCustomListItem] 同名进行设置；其中动态入参配置属性(dynamicParams)Function，可动态获取对应参数；
                      /**
                       * 示例：validateCustomList: ['v-temp']，validateSetting: { 'v-temp': dynamicParams: ()=>this.dynamicParams }
                       * - 动态校验规则通过arguments[2] 获取该参数回调方法
                       */
                      let _opt = null
                      if (
                        item.validateSetting &&
                        item.validateSetting[itm] &&
                        item.validateSetting[itm].dynamicParams
                      ) {
                        _opt = item.validateSetting[itm].dynamicParams
                      }
                      // 函数中Error 对象需要在形参中传入，否则会报 $vm.Error not define 异常
                      // [20210531][upd] 已修复
                      // [20210702][upg] 新增自定义校验可设置校验规则触发时机
                      // [20210702][upg] 自定义校验规则调用时返回vue 实例
                      _valid.validator = vitem.validator(item, this, _opt)
                      _valid.trigger = vitem.trigger || ['blur', 'change']
                    }
                  })
                }
                this.rules[item.prop].push(_valid)
              })
            }
          }
        }
      })
      // [20210629][crt] 移除校验规则/清空表单
      // [crt][20210707] value = 0 赋值
      // this.$nextTick(() => {
      //   this.$refs.form.clearValidate()
      //   this.$refs.form.resetFields()

      this.initDefaultValue()
      // })
    },
    initRules() {},
    initDefaultValue() {
      // 设置默认值
      this.formColumns.forEach(item => {
        if (item.value || item.value === 0) {
          if (item.value === 0) {
            this.$set(this.form, item.prop, item.value + '')
          } else {
            this.$set(this.form, item.prop, item.value)
          }
          // [20210702][crt] 地址类型数据回显处理
          // [crt][20210705] 详细地址回显
          if (item.type == 'address') {
            this.transferRegion(item.value, item)
            if (
              item.setting &&
              item.setting.detail &&
              item.setting.detail.prop &&
              item.setting.detail.value
            ) {
              this.$set(this.form, item.setting.detail.prop, item.setting.detail.value)
            }
          }
        }
        if (item.type == 'image-group') {
          item.group.forEach(imgItem => {
            this.$set(this.form, imgItem.prop, imgItem.value || '')
          })
        }
      })
    },

    // [20210518][crt] 日期格式化
    // [20210714][upd] dateRangeSwitch 增强
    dateFormatting(date, item) {
      let _valueFormat = item.valueFormat || 'yyyy-MM-DD HH:mm:ss'
      if (!date) {
        this.form[item.prop] = ''
        this.form[item.props[0]] = ''
        this.form[item.props[1]] = ''
        return
      }
      // dateRange / dateRangeSwitch[switch: FALSE]
      if (
        (item.type != 'date' && !item.setting.hasOwnProperty('switch')) ||
        (item.setting.hasOwnProperty('switch') && !item.setting.switch)
      ) {
        this.form[item.props[0]] = this.$moment(date[0]).format(_valueFormat)
        this.form[item.props[1]] =
          this.$moment(date[1]).format(_valueFormat).split(' ')[0] + ' 23:59:59'
      }
      // [20210714] dateRangeSwitch 增强
      // dateRangeSwitch[switch: TRUE]
      if (item.setting.hasOwnProperty('switch') && item.setting.switch) {
        this.$set(this.form, item.prop, this.$moment(date).format(_valueFormat))
      }
    },
    // [20210714][crt] 切换日期类型
    switchDateType(val, item) {
      item.setting.switch = val
      this.form[item.prop] = ''
      this.form[item.props[0]] = ''
      this.form[item.props[1]] = ''
    },
    // [20210518] 表单提交
    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          let _form = JSON.parse(JSON.stringify(this.form))
          this.formColumns.forEach(item => {
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
      this.formColumns.forEach(item => {
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
      regionArr.forEach(itm => {
        regionLen += CodeToText[itm].length * 15
        regionText += CodeToText[itm]
      })

      // 所在地区选择赋值-校验规则
      this.$set(
        this.form,
        item.prop,
        valType == 'text' ? regionText : valType == 'code' ? val.join(',') : JSON.stringify(val)
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
    },
    // [20210726][crt] 文件预览
    handleOnPreview(path, item, setting) {
      return new Promise((resolve, reject) => {
        setting.onPreview(path, item, this.form).then(res => {
          debugger
          resolve(res)
        })
      })
    },
    // [20210525][crt] 文件上传成功
    handleOnSuccess(res, item, setting) {
      setting.onSuccess(res, item, this.form)
    },
    // [20210527][crt] 重置字段
    handleOnReset(res, item) {
      this.form[item.prop] = ''
    },
    // [20210629][crt] 获取短信验证码
    // [crt][20210705] 获取表单
    getMessageCode(item, callback) {
      // 1.初始化计时器
      // 2.判断是否符合触发请求
      // 3.触发请求
      // 4.计时器触发
      // this.messageConfig[item.prop].timer =  (item.setting && item.setting.interval) || 10
      // this.messageConfig[item.prop].wait = 'first'
      let _that = this
      if (item.requestEvent) {
        item.requestEvent(item, this.form).then(
          res => {
            this.messageConfig[item.prop].wait = true
            let timer = setInterval(() => {
              _that.messageConfig[item.prop].timer--
              if (!_that.messageConfig[item.prop].timer) {
                _that.messageConfig[item.prop].timer = (item.setting && item.setting.interval) || 10
                _that.messageConfig[item.prop].wait = false
                clearInterval(timer)
              }
            }, 1000)
          },
          rej => {
            // debugger
          }
        )
        // callback(function () {
        //   let timer = setInterval(() => {
        //     _that.messageConfig[item.prop].timer--
        //     if (!_that.messageConfig[item.prop].timer) {
        //       _that.messageConfig[item.prop].timer = (item.setting && item.setting.interval) || 10
        //       _that.messageConfig[item.prop].wait = false
        //       clearInterval(timer)
        //     }
        //   }, 1000)
        // })
      }
    }
  }
}
</script>
<style lang="less">
.es-form {
  padding: 10px;
  background: #fff;
  border-radius: 5px;
  .p-rel {
    position: relative;
  }
  .d-flex {
    display: flex;
  }
  .flex-wrap {
    flex-wrap: wrap;
  }
  .w-100 {
    width: 100%;
  }
  .ml-10 {
    margin-left: 10px;
  }
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
.es-form .el-date-editor--timerange.el-input__inner,
.es-form .el-autocomplete {
  width: 100%;
}

.es-form .es-form-item {
  display: flex;
}
.es-form .el-form-item.hidden {
  display: none;
}
.es-form .es-form-item .suffix-slot {
  margin-left: 8px;
}

.es-form .code {
  position: relative;
  display: flex;
  width: 100%;
}
.es-form .code .code-left {
  // width: calc(100% - 120px);
  width: 100%;
}
.es-form .code .code-right {
  position: absolute;
  right: 3px;
  top: 4px;
  height: 34px;
  width: 110px;
  border-radius: 5px;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.1);
}
.es-form .code img {
  float: right;
  height: 100%;
}
.es-form i.el-icon-view {
  margin-right: 5px;
  line-height: 40px;
}
.es-form i.el-icon-view:hover {
  color: #666;
}

.es-form .message {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.es-form .message .message-left {
  width: calc(100% - 168px);
}
.es-form .message .message-right {
  width: 168px;
  text-align: right;
  color: #666;
}
.es-form .message .message-right > span {
  margin-right: 10px;
}
.es-form .el-button--text {
  border: 0;
}

.es-form .address {
  width: 100%;
}
.es-form .address .el-textarea {
  margin-top: 5px;
  font-size: 12px;
}

.es-form {
  // 日期控件布局样式
  .el-date-editor {
    display: flex;
    justify-content: space-around;
  }
  .el-date-editor.el-input,
  .el-date-editor--daterange.el-input,
  .el-date-editor--daterange.el-input__inner,
  .el-date-editor--timerange.el-input,
  .el-date-editor--timerange.el-input__inner {
    width: 100% !important;
  }
  // 图片组控件
  .image-group {
    .el-form-item {
      flex-direction: column;
      align-items: center;
      margin: 0 20px 22px;
    }
  }
  // 单选框
  .el-radio-group {
    padding-top: 13px;
  }
}
</style>