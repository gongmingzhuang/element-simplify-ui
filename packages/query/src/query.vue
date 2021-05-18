<template>
  <div class="es-query">
    <el-form ref="form" :model="queryForm">
      <template v-for="(item, index) of queryList">
          <el-form-item
            :label="showLabel && item.label"
            :label-width="labelWidth || item.labelWidth"
            :key="index"
            :prop="item.prop"
          >
            <!-- 输入框 -->
            <template v-if="item.type=='text' || !item.type">
              <el-input v-model.trim="queryForm[item.prop]" :placeholder="item.placeholder || '请输入' + item.label" :maxlength="item.maxlength"></el-input>
            </template>
            <!-- 日期选择框 -->
            <template v-if="item.type=='dateRange'">
              <el-date-picker @change="date => {dateFormatting(date, item)}"
                            v-model="queryFormDate[item.prop]"
                            :format="item.format||'yyyy-MM-dd'"
                            :value-format="item.valueFormat||'yyyy-MM-dd HH:mm:ss'"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"/>
            </template>
            <!-- 下拉框 -->
            <template v-if="item.type=='select'">
              <el-input v-model.trim="queryForm[item.prop]" :placeholder="item.placeholder || '请输入' + item.label" :maxlength="item.maxlength"></el-input>
            </template>
          </el-form-item>
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
    // [20210518][upg]
    showLabel: {
      type: Boolean,
      default: true
    },
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
      queryForm: {},
      // [20210518][crt] 日期控件临时对象
      queryFormDate: {}
    }
  },
  created() {
    this.queryList.forEach(item=>{
      if(item.type == 'dateRange'){
        this.$set(this.queryFormDate, item.prop, '');
      }else{
        this.$set(this.queryForm, item.prop, '');
      }
    })
  },
  methods: {
    query(){
      this.$emit('query-event', this.queryForm);
    },
    reset(){
      this.$refs['form'].resetFields();
      // [20210518][upd] 重置日期
      this.queryList.forEach(item=>{
        if(item.type == 'dateRange'){
          this.queryFormDate[item.prop] = []
          this.queryForm[item.props[0]] = ''
          this.queryForm[item.props[1]] = ''
        }
      })
    },
    // [20210518][crt] 日期格式化
    dateFormatting(date, item){
      if(!date){
        this.queryForm[item.prop] = ''
        this.queryForm[item.props[0]] = ''
        this.queryForm[item.props[1]] = ''
        return
      }
      this.queryForm[item.props[0]] = date[0].split(' ')[0]
      this.queryForm[item.props[1]] = date[1].split(' ')[0]
    }
  }
}
</script>
<style>
.es-query .el-form{
  display: flex;
  flex-wrap: wrap;
}
.es-query .el-form .el-form-item{
  display: flex;
}
.es-query .el-form-item__content{
  margin-left: 0 !important;
}
.es-query .es-button-group{
  justify-content: flex-end;
  padding-right: 14px;
  padding-bottom: 14px;
}
</style>