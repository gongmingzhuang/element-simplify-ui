<template>
  <div class="es-query">
    <el-form ref="form" :model="queryForm">
      <template v-for="(item, index) of queryList">
        <template v-if="item.type=='text'">
          <el-form-item
            :label="item.label"
            :key="index"
            :prop="item.prop"
          >
            <el-input v-model="queryForm[item.prop]"></el-input>
          </el-form-item>
        </template>
      </template>
    </el-form>
    <es-button-group
      :list-setting="buttonListSetting"
      :button-list="buttonList"
    />
  </div>
</template>
<script>
/**
 * [20210506][crt]
 * @author: gongmingzhuang
 *
 * - 1. 通过extends 可直接继承<el-form> 的props 变量
 * - 2. 通过queryList 数组生成queryForm 表单对象
 * - 3. 通过$emit 将表单传递给父组件调用查询
 */
import { Form } from 'element-ui'
import EsButtonGroup from '../../button-group/src/button-group'
export default {
  extends: Form,
  name: 'EsQuery',
  components: {
    EsButtonGroup,
  },
  props: {
    // 数组
    queryList: {
      type: Array,
      required: true,
    },
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
      }
    }
  },
  data(){
    return{
      queryForm: {}
    }
  },
  created() {
    this.queryList.forEach(item=>{
      this.$set(this.queryForm, item.prop, '');
    })
  },
  methods: {
    query(){
      this.$emit('query-event', this.queryForm);
    },
    reset(){
      this.$refs['form'].resetFields();
    }
  }
}
</script>
<style>
</style>