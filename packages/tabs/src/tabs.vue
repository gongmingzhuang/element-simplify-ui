<template>
  <div class="es-tabs">
    <el-tabs
      :value="activeTab"
      :type="type"
      :closable="closable"
      :addable="addable"
      :editable="editable"
      :tab-position="tabPosition"
      :stretch="stretch"
      v-on="$listeners"
    >
      <el-tab-pane
        v-for="(item,index) in tabList"
        :key="index"
        :closable="item[listSetting.closable || 'closable']"
        :disabled="item[listSetting.disabled || 'disabled']"
        :label="item[listSetting.label || 'label']"
        :lazy="item[listSetting.lazy || 'lazy']"
        :name="item[listSetting.name || 'name']"
        :value="item[listSetting.label || 'label']"
      ></el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
/**
 * [20210506][crt]
 * @author: gongmingzhuang
 *
 * - 1. 通过extends 可直接继承子组件的props 变量
 * - 2. 通过v-on="$listeners" 可让子组件调用父级组件中定义的方法
 */
import { Tabs } from 'element-ui'
export default {
  extends: Tabs,
  name: 'EsTabs',
  props: {
    // 选中选项卡的 name
    activeTab: {
      type: String,
      default: '',
    },
    // 选项卡数组
    tabList: {
      type: Array,
      required: true,
    },
    // 数组组成配置
    listSetting: {
      type: Object,
      default: () => {
        return {
          label: 'label',
          disabled: 'disabled',
          name: 'name',
          closable: 'closable',
          lazy: 'lazy',
        }
      },
    },
  },
}
</script>
<style>
</style>