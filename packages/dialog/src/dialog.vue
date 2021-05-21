<template>
  <div class="es-dialog">
    <el-dialog 
      v-bind="$attrs"
      v-on="$listeners"
      :visible.sync="dialogVisible"
      append-to-body
      >
      <span>{{tips}}</span>
      <span slot="footer" class="dialog-footer">
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
import EsButtonGroup from '../../button-group/src/button-group'
export default {
  // extends: Dialog,
  name: 'EsDialog',
  components: {
    EsButtonGroup
  },
  props: {
    tips: {
      type: String,
      default: "确定执行该操作？"
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
      default: ()=>[]
    }
    
  },
  data(){
    return{
      dialogVisible: false
    }
  },
  methods: {
    open(beforeInvoke, afterInvoke){
      beforeInvoke && beforeInvoke()
      this.dialogVisible = true
      afterInvoke && afterInvoke()
    },
    close(beforeInvoke, afterInvoke){
      beforeInvoke && beforeInvoke()
      this.dialogVisible = false
      afterInvoke && afterInvoke()
    }
  }
}
</script>
<style>
.es-crumb {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px;
  background: #fff;
  border-radius: 5px;
}
</style>