<template>
  <div class="es-dialog-form">
    <el-dialog
      class="es-dialog-form"
      v-bind="$attrs"
      v-on="$listeners"
      :visible.sync="dialogVisible"
      append-to-body
    >
      <es-form
        ref="form"
        is-dialog-form
        v-on="$listeners"
        v-bind="$attrs"
      />
      <span
        slot="footer"
        class="dialog-footer"
      >
        <es-button-group
          v-bind="$attrs"
          v-on="$listeners"
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
import EsForm from '../../form/src/form'
import VALID_SET from '../../../lib/validate'
export default {
  // extends: Form,
  name: 'EsDialogForm',
  components: {
    EsButtonGroup,
    EsForm
  },
  props: {},
  data() {
    return {
      dialogVisible: false,
      form: {},
      formLabelWidth: '120px',
    }
  },
  methods: {
    open(beforeInvoke, afterInvoke) {
      beforeInvoke && beforeInvoke()
      this.$nextTick(() => {
        if (this.$refs['form']) {
          this.$refs['form'].$refs.form.resetFields()
          this.$refs['form'].$refs.form.clearValidate()
        }
      })
      this.dialogVisible = true
      afterInvoke && afterInvoke()
    },
    close(beforeInvoke, afterInvoke) {
      beforeInvoke && beforeInvoke()
      this.$refs['form'].$refs.form.resetFields()
      this.$refs['form'].$refs.form.clearValidate()
      this.dialogVisible = false
      afterInvoke && afterInvoke()
    },
    submit() {
      this.$refs.form.submit()
    }
  },
}
</script>
<style>
.es-dialog-form .el-dialog{
  min-width: 800px;
}
.es-dialog-form .es-button-group{
  justify-content: center;
}
.es-dialog-form .es-button button{
  width: 120px;
}
</style>