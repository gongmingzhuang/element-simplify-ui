<template>
  <div class="es-hide-item">
    <!-- <label>{{item.label}}</label> -->
    <el-input
      v-model.trim="form[item.prop]"
      type="hidden"
      :readonly="true"
    />
  </div>
</template>

<script>
/**
 * @author: gongmingzhuang
 */
export default {
  name: 'EsHideItem',
  props: {
    form: {
      type: Object,
      default: () => {
        return {}
      }
    },
    item: {
      type: Object,
      default: () => {
        return {}
      }
    },
    isPop: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="less">
</style>