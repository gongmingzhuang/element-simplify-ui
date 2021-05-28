<template>
  <div class="es-query">
    <es-form 
      ref="form"
      v-bind="$attrs"
      v-on="$listeners"
      is-query-form
    />
    <es-button-group
      v-bind="$attrs"
      v-on="$listeners"
      :button-list="buttonList"
    />
  </div>
</template>
<script>
/**
 * [20210506][crt]
 * @author: gongmingzhuang
 *
 * - 1. 通过<es-form>\<es-button-group> 实现
 * - 2. 查询/重置功能，通过调用<es-form> 中方法实现
 */
import { Form } from 'element-ui'
import EsButtonGroup from '../../button-group/src/button-group'
import EsForm from '../../form/src/form'
export default {
  // extends: Form,
  name: 'EsQuery',
  components: {
    EsButtonGroup,
    EsForm
  },
  props: {
    // 按钮组
    buttonList: {
      type: Array,
      default: ()=>{
        return [
          { buttonName: '查询', type: 'primary', clickEvent: 'query' },
          { buttonName: '重置', type: '', clickEvent: 'reset' }
        ]
      },
    },
    pagerSetting: {
      type: Object,
      default: () => {
        return {currentPage: "currentPage"}
      }
    },
  },
  data(){
    return{}
  },
  created() {},
  methods: {
      // [20210520][upd] 在点击查询/重置按钮时，重置当前分页
      // [20210524][upg] 调用<es-form> submit 方法进行查询
    query(){
      let _param = {}
      _param[this.pagerSetting['currentPage'] || 'currentPage'] = 1
      let $form = this.$refs.form
      $form.assignForm(_param)
      $form.submit()
    },
    reset(){
      let $form = this.$refs.form
      $form.$refs.form.resetFields()
      $form.resetDateRangeFields()
      this.query()
    }
  }
}
</script>
<style>
.es-query{
  padding: 10px;
  background: #fff;
  border-radius: 5px;
}
.es-query .es-form{
  padding: 0;
}
.es-query .el-form{
  display: flex;
  flex-wrap: wrap;
}
.es-query .el-form .el-form-item{
  /* display: flex;
  padding-right: 20px; */
}
.es-query .el-form-item__content{
  /* width: 100%;
  margin-left: 0 !important; */
}
.es-query .es-button-group{
  justify-content: flex-end;
}
</style>