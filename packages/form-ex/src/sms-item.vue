<template>
  <form-item
    class="sms-item"
    :label="label"
    :prop="item.prop"
    :label-width="labelWidth"
    :style="{width: width}"
  >
    <div class="sms-left">
      <form-input
        v-model.trim="value"
        :prefix-icon="item.setting && item.setting.prefixIcon"
        :placeholder="item.placeholder || '请输入'+item.label"
        :maxlength="item.maxlength"
        :readonly="readonly"
      />
    </div>
    <div class="sms-right">
      <el-button
        :type="item.setting && item.setting.buttonType || ''"
        @click="getMessageCode(item)"
        v-if="buttonStatus"
      >{{ wait == 'first' ? '' : '重新'}}获取</el-button>
      <span v-else>{{timer}}秒后可重发</span>
    </div>
  </form-item>
</template>

<script>
/**
 * @author: gongmingzhuang
 */

import indexMixin from '../mixin/indexMixin.js'
export default {
  name: 'EsSmsItem',
  mixins: [indexMixin],
  data() {
    return {
      wait: 'first',
      timer: 0
    }
  },
  watch: {
    isPop: {
      handler(_isPop) {
        let _item = this.item
        let _form = this.form
        if (_isPop && _form) {
          this.timer = this._timer
        }
      },
      immediate: true
    }
  },
  computed: {
    // 发送短信验证码按钮状态
    buttonStatus: function () {
      let _buttonStatus = true
      if (this.wait !== 'first' && this.wait) {
        _buttonStatus = false
      }
      return _buttonStatus
    },
    // 倒计时（设置）
    _timer: function () {
      let _item = this.item
      let _timer = 60
      if (
        _item.hasOwnProperty('setting') &&
        _item.setting.hasOwnProperty('interval') &&
        _item.setting.interval &&
        !isNaN(_item.setting.interval)
      ) {
        _timer = _item.setting.interval
      }
      return +_timer
    }
  },
  methods: {
    getMessageCode(item, callback) {
      let _that = this
      if (item.requestEvent) {
        item.requestEvent(item, this.form).then(
          res => {
            this.wait = true
            let timer = setInterval(() => {
              _that.timer--
              if (!_that.timer) {
                _that.timer = (item.setting && item.setting.interval) || 10
                _that.wait = false
                clearInterval(timer)
              }
            }, 1000)
          },
          rej => {
          }
        )
      }
    }
  }
}
</script>

<style lang="less">
.sms-item {
  .el-form-item__content {
    display: flex;
  }
  [class^='sms-']{
    // width: 50%;
  }
  .sms-left {
    width: calc(100% - 100px);
  }
  .sms-right {
    width: 98px;
    text-align: right;
    color: #666;
    button{
      width: 100px;
    }
    & > span {
      // margin-right: 10px;
      // text-align: right;
    }
  }
}
</style>