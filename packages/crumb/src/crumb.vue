<template>
  <div class="es-crumb">
    <div class="es-crumb-left">
      <el-breadcrumb
        :separator="separator"
        :separator-class="separatorClass"
      >
        <template v-for="(item, index) of crumbList">
          <template v-if="item[listSetting.to || 'to']">
            <el-breadcrumb-item
              :to="{ path: item[listSetting.to || 'to'] }"
              :replace="item[listSetting.replace || 'replace']"
              :key="index"
            >{{item[listSetting.crumbName || 'crumbName']}}</el-breadcrumb-item>
          </template>
          <template v-else>
            <el-breadcrumb-item :key="index">{{item[listSetting.crumbName || 'crumbName']}}</el-breadcrumb-item>
          </template>
        </template>
      </el-breadcrumb>
    </div>
    <div class="es-crumb-right">
      <!-- <slot name="button-group"></slot> -->
      <es-button-group
        v-bind="$attrs"
        v-on="$listeners"
        :parent="$parent"
        :current="this"
      />
    </div>
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
import { Breadcrumb } from 'element-ui'
import EsButtonGroup from '../../button-group/src/button-group'
export default {
  extends: Breadcrumb,
  name: 'EsCrumb',
  components: {
    EsButtonGroup,
  },
  props: {
    // 数组
    crumbList: {
      type: Array,
      required: true,
    },
    // 导航菜单数组组成配置
    listSetting: {
      type: Object,
      default: () => {
        return {
          crumbName: 'crumbName',
          to: 'to',
          replace: 'replace',
        }
      },
    }
  },
  methods: {}
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