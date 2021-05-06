<template>
  <div class="es-button">
    <el-button
      :size="size"
      :type="type"
      :plain="plain"
      :round="round"
      :circle="circle"
      :loading="loading"
      :disabled="disabled"
      :icon="icon"
      :autofocus="autofocus"
      :native-type="nativeType"
      v-on="$listeners"
    >
      <slot></slot>
    </el-button>
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
import { Button } from 'element-ui'
export default {
  extends: Button,
  name: 'EsButton'
}
</script>