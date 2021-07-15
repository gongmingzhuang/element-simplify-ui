<template>
  <div
    class="image-group d-flex flex-wrap w-100"
    :class="formItem.prop"
  >
    {{formItem}}
    <template v-for="(imgItem, imgIndex) in formItem.group">
      <form-item
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
          :form="form"
          :item="imgItem"
          :headers="formItem.setting.headers"
          :action="formItem.setting.action || '#'"
          :list-type="'picture-card'"
          :file-path="form[imgItem.prop]"
          :setting="formItem.setting"
          :reset-button="formItem.setting.resetButton"
          :pdf-preview="formItem.setting.onPdfPreview"
          :before-upload="formItem.setting.beforeUpload"
          :on-success="formItem.setting.onSuccess"
          @on-reset="res=>handleOnReset(res,imgItem, formItem.setting)"
        />
      </form-item>
    </template>
  </div>
</template>
<script>
/**
 * [20210714][crt]
 * @author: gongmingzhuang
 *
 */
import { FormItem } from 'element-ui'
import EsButtonGroup from '../../button-group/src/button-group'
import EsUpload from '../../upload/src/upload'
import VALID_SET from '../../../lib/validate'
import UTIL from '../../../util/util.js'
export default {
  name: 'EsImageGroup',
  components: {
    FormItem,
    EsButtonGroup,
    EsUpload,
  },
  props: {
    formItem: {
      type: Object,
      default: () => {
        return {}
      },
    },
    form: {
      type: Object,
      default: () => {
        return {}
      },
    },
    rules: {
      type: Object,
      default: () => {
        return {}
      },
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      VALID_SET,
      UTIL,
      formColumns: [
        {
          label: '',
          prop: 'images',
          type: 'image-group',
          invisibleControl: () => true,
          setting: {
            headers: {
              Authorization: 'bearer ' + _that.$store.state.login.token,
            },
            accept: ['jpg', 'png'],
            fileSize: 1,
            action: _that.$api.uploadFileAction(),
            beforeUpload: _that.beforeUpload,
            onSuccess: _that.uploadSuccess,
            resetButton: true,
            cols: 5,
          },
          group: [
            {
              label: '营业执照',
              prop: 'avatar0',
              type: 'file',
              // validate: ['v-required']
            },
            {
              label: '法定代表人证件正面',
              prop: 'avatar1',
              type: 'file',
              // validate: ['v-required']
            },
            {
              label: '法定代表人证件反面',
              prop: 'avatar1',
              type: 'file',
              // validate: ['v-required']
            },
            {
              label: '客户协议',
              prop: 'avatar2',
              type: 'file',
              // validate: ['v-required']
            },
            {
              label: '手持身份证正面照',
              prop: 'avatar1',
              type: 'file',
              // validate: ['v-required']
            },
            {
              label: '门头照',
              prop: 'avatar2',
              type: 'file',
              // validate: ['v-required']
            },
            {
              label: '结算银行卡正面',
              prop: 'avatar1',
              type: 'file',
              // validate: ['v-required'],
              invisibleControl: (item, form) =>
                _that.invisibleServiceControl(item, form, 1),
              setting: {},
            },
            {
              label: '结算银行卡反面',
              prop: 'avatar1',
              type: 'file',
              // validate: ['v-required'],
              invisibleControl: (item, form) =>
                _that.invisibleServiceControl(item, form, 1),
              setting: {},
            },
            {
              label: '开户许可证或印鉴卡',
              prop: 'avatar1',
              type: 'file',
              // validate: ['v-required'],
              invisibleControl: (item, form) =>
                _that.invisibleServiceControl(item, form, 2),
              setting: {},
            },
            {
              label: '经营场所图1',
              prop: 'avatar2',
              type: 'file',
              // validate: ['v-required']
            },
            {
              label: '经营场所图2',
              prop: 'avatar2',
              type: 'file',
              // validate: ['v-required']
            },
          ],
        },
      ],
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // [20210629][upg] 初始化表单
    initForm() {
      let _that = this
      // 添加校验规则
      this.formColumns.forEach((item, index, array) => {
        // [20210714][crt] type：image-group 按钮组
        if (item.type == 'image-group') {
          item.group.forEach((imgItem) => {
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
            item.validate.forEach((itm) => {
              let _valid = {}
              // [upd][20210701] 联动查询修复
              if (itm == 'v-compare' || itm == 'v-comdepend') {
                _valid = _that.VALID_SET[itm](
                  item,
                  itm,
                  _that.formColumns,
                  _that
                )
              } else if (_that.VALID_SET.hasOwnProperty(itm)) {
                // 默认校验
                _valid = _that.VALID_SET[itm](item, _that.formColumns, _that)
              } else if (
                itm instanceof Object &&
                itm.hasOwnProperty('validator')
              ) {
                // [20210621][upg] 追加支持默认校验规则配置提示语
                _valid = _that.VALID_SET[itm.validator](
                  item,
                  itm,
                  _that.formColumns,
                  _that
                )
              } else {
                // 自定义校验
                this.validateCustomList.forEach((vitem) => {
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
      })
      // [20210629][crt] 移除校验规则/清空表单
      // [crt][20210707] value = 0 赋值
      this.$nextTick(() => {
        this.$refs.form.clearValidate()
        this.$refs.form.resetFields()
        // 设置默认值
        this.formColumns.forEach((item) => {
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
                this.$set(
                  this.form,
                  item.setting.detail.prop,
                  item.setting.detail.value
                )
              }
            }
          }
        })
      })
    },
    handleBeforeUpload(file, item, formItem){
      debugger
      return formItem.setting.beforeUpload(file, item, formItem)
    },
    // [20210525][crt] 文件上传成功
    handleOnSuccess(res, item, setting) {
      setting.onSuccess(res, item, this.form)
    },
    handleOnReset(res,imgItem, setting){
      setting.onSuccess(res, item, this.form)
    }
  },
}
</script>
<style lang="less">
</style>