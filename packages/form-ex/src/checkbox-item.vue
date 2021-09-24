<template>
  <form-item
    class="checkbox-item"
    :label="label"
    :prop="item.prop"
    :label-width="labelWidth"
    :style="{width: width}"
  >
    <el-checkbox-group v-model="value">
      <template v-for="(itm,idx) in item.translate">
        <el-checkbox
          :key="idx+'_'+itm.value"
          :name="item.prop"
          :label="itm.value"
          :disabled="itm.hasOwnProperty('disabled') && itm.disabled"
        >{{itm.label}}</el-checkbox>
      </template>
    </el-checkbox-group>
  </form-item>
</template>

<script>
/**
 * @author: gongmingzhuang
 */

import indexMixin from '../mixin/indexMixin.js'
export default {
  name: 'EsCheckoutItem',
  mixins: [indexMixin],
  data() {
    return {
      codeSrc: ''
    }
  },
  watch: {
    isPop: {
      handler: function () {
        let _item = this.item
        // 远程请求
        if (_item.hasOwnProperty('setting') && _item.setting.hasOwnProperty('fetchEvent')) {
          _item.setting.fetchEvent().then(res => {
            _item.translate = res
          })
        }
      },
      immediate: true
    },
    'item.translate': {
      handler: function (translate) {
        if(!this.isPop){
          return
        }
        let _item = this.item
        // 设置禁用
        if (_item.hasOwnProperty('setting') && _item.setting.hasOwnProperty('disabledEvent')) {
          let disabledArray = _item.setting.disabledEvent()
          if (disabledArray.length > 0) {
            translate.forEach((item, index, array) => {
              if (disabledArray.includes(item.value)) {
                array[index].disabled = true
              }
            })
          }
        }
      },
      immediate: true
    }
  },
  computed: {
    disabled: function (itm) {
      let _item = this.item
      console.log('__________________________________', itm)
      let disabledArray = _item.setting.disabledEvent()
      if (disabledArray.include(itm)) {
      }
      return false
    }
  },
  methods: {}
}
</script>

<style lang="less">
</style>