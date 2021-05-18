<template>
  <div class="es-button-group">
    <template v-for="(item,index) of buttonList">
      <es-button
        v-if="typeof(item[listSetting.visible || 'visible']) == 'boolean' ? item[listSetting.visible || 'visible'] : 'true'"
        :key="index"
        :size="item[listSetting.size || 'size']"
        :type="item[listSetting.type || 'type']"
        :plain="item[listSetting.plain || 'plain']"
        :round="item[listSetting.round || 'round']"
        :circle="item[listSetting.circle || 'circle']"
        :loading="item[listSetting.loading || 'loading']"
        :disabled="item[listSetting.disabled || 'disabled']"
        :icon="item[listSetting.icon || 'icon']"
        :autofocus="item[listSetting.autofocus || 'autofocus']"
        :native-type="item[listSetting.nativeType || 'nativeType']"
        @click="parent[item[listSetting.clickEvent || 'clickEvent']] ? parent[item[listSetting.clickEvent || 'clickEvent']]() : $emit('query-event', item.default) "
      >
        <!-- @click="handelClick(item[listSetting.clickEvent || 'clickEvent'])" -->
        <slot>{{ item[listSetting.buttonName || 'buttonName'] }}</slot>
      </es-button>
    </template>
  </div>
</template>
<script>
/**
 * [20210506][crt]
 * @author: gongmingzhuang
 *
 * - 1. 通过extends 可直接继承子组件的props 变量
 * - 2. 通过$parent[clickEvent] 可让子组件调用父级组件中定义的方法
 * - 3. 通过visible 控制组件的显示隐藏
 * - 4. [upg] 点击事件可以通过[query-event] 设置全局公用事件，在同时设置item 事件时，优先调用item 事件
 */
import EsButton from '../../button/src/button'
export default {
  name: 'EsButtonGroup',
  components: {
    EsButton,
  },
  props: {
    // 数组
    buttonList: {
      type: Array,
      required: true,
    },
    // 数组组成配置
    listSetting: {
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
          clickEvent: 'clickEvent'
        }
      }
    },
    // 上级父类
    parent: {
      type: Object,
      default(){
        return this.$parent
      }
    }
  },
  methods: {

    handelClick(event){
      debugger
    }
  }
}
</script>
<style>
.es-button-group {
  display: flex;
}
.es-button-group > .es-button+.es-button {
  margin-left: 10px;
}
</style>