<template>
  <div class="es-tip-item">
    <div
      class="type-tip"
      :class="item.setting && item.setting.styleClass ? item.setting.styleClass : ''"
      :style="{width: '100%'}"
    >
      <span class="tip-title">{{item.label}}</span>
      <span class="tip-tip">{{item.tip}}</span>
    </div>
  </div>
</template>

<script>
/**
 * @author: gongmingzhuang
 */
export default {
  name: 'EsTipItem',
  props: {
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
.es-tip-item {
  .type-tip {
    margin: 20px;
    .tip-title {
      font-weight: bold;
      margin-right: 20px;
    }
  }
}
</style>