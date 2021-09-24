<template>
  <form-item
    class="textarea-item"
    :label="label"
    :prop="item.prop"
    :style="{width: width}"
  >
    <form-input
      type="textarea"
      v-model="value"
      :placeholder="item.placeholder || '请输入' + item.label"
      :clearable="item.setting && item.setting.clearable"
      resize="none"
    >
    </form-input>
  </form-item>
</template>

<script>
/**
 * @author: gongmingzhuang
 */
import indexMixin from '../mixin/indexMixin.js'

export default {
  name: 'EsTextareaItem',
  mixins: [indexMixin],
  components: {},
  props: {},
  data() {
    return {}
  },
  watch: {},
  computed: {
    // maxlength
    maxlength: function () {
      let _item = this.item
      let _maxlength = 50
      if (_item.hasOwnProperty('maxlength') && _item.maxlength && !isNaN(_item.maxlength)) {
        _maxlength = _item.maxlength
      }
      return _maxlength
    }
  },
  created() {},
  methods: {}
}
</script>

<style lang="less">
</style>