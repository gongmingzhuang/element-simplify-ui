<template>
  <form-item
    class="code-item"
    :label="label"
    :prop="item.prop"
    :label-width="labelWidth"
    :style="{width: width}"
  >
    <div class="code-left">
      <form-input
        v-model.trim="value"
        :prefix-icon="item.setting && item.setting.prefixIcon"
        :placeholder="item.placeholder || '请输入'+item.label"
        :maxlength="item.maxlength"
        :readonly="readonly"
      />
    </div>
    <div
      class="code-right"
      @click="getCode"
    >
      <img
        :src="codeSrc"
        :id="item.prop+'_code'"
      />
    </div>
  </form-item>
</template>

<script>
/**
 * @author: gongmingzhuang
 * // TODO 限制输入字符
 */

import indexMixin from '../mixin/indexMixin.js'
export default {
  name: 'EsCodeItem',
  mixins: [indexMixin],
  data() {
    return {
      codeSrc: ''
    }
  },
  watch: {
    isPop: {
      handler(_isPop) {
        let _item = this.item
        let _form = this.form
        if (_isPop && _form) {
          this.codeSrc = this.getCode()
        }
      },
      immediate: true
    }
  },
  computed: {},
  methods: {
    async getCode() {
      let _item = this.item
      let _mapping = ['data', 'path']
      if (
        _item.hasOwnProperty('setting') &&
        _item.setting &&
        _item.setting.hasOwnProperty('responseData') &&
        _item.setting.responseData &&
        typeof _item.setting.responseData === 'string'
      ) {
        _mapping = _item.setting.responseData.split('.')
      }
      if (
        _item.hasOwnProperty('setting') &&
        _item.setting &&
        _item.setting.hasOwnProperty('api') &&
        _item.setting.api &&
        _item.setting.api instanceof Function
      ) {
        let res = await _item.setting.api()
        _mapping.forEach((itm, index) => {
          if (index < _mapping.length) {
            res = res[itm]
          }
        })
        if (res && typeof res === 'string') {
          this.codeSrc = res
        }
      }
    }
  }
}
</script>

<style lang="less">
.code-item {
  .el-form-item__content {
    position: relative;
  }
  .code-right {
    position: absolute;
    top: 2px;
    right: 1px;
    height: 38px;
    border-radius: 5px;
    overflow: hidden;
  }
}
</style>