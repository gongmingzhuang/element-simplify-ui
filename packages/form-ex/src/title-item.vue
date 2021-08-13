<template>
  <div class="prefix-slot">
    <slot
      :name="`${name}-prefix`"
      :form="form"
      :item="item"
    />
  </div>
</template>

<script>
/**
 * @author: gongmingzhuang
 */
export default {
  name: 'PrefixSlot',
  props: {
    name: {
      type: String,
      default: ''
    },
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