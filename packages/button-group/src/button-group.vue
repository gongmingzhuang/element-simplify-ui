<template>
  <div class="es-button-group">
    <template v-for="(item,index) of buttonList">
      <!-- [20210519][upg] 显示/隐藏增强 针对列表中操作栏根据scope 进行控制显示 -->
      <!-- [20210519][upg] 追加不可见控制 -->
      <!-- [20210519][remark] 当同时设置visible 与invisible 时，invisible 失效 -->
      <es-button
        v-if="(typeof(scope) == 'object' && typeof(item[buttonListSetting.visible || 'visible']) == 'object') ? 
        checkVisible(scope, item[buttonListSetting.visible || 'visible']) : 
        typeof(item[buttonListSetting.visible || 'visible']) == 'boolean' ? 
        item[buttonListSetting.visible || 'visible'] : 

        (typeof(scope) == 'object' && typeof(item[buttonListSetting.invisible || 'invisible']) == 'object') ?
        checkInvisible(scope, item[buttonListSetting.invisible || 'invisible']) : 
        typeof(item[buttonListSetting.invisible || 'invisible']) == 'boolean' ? 
        item[buttonListSetting.invisible || 'invisible'] : 
        'true'"
        :key="index"
        :size="item[buttonListSetting.size || 'size']"
        :type="item[buttonListSetting.type || 'type']"
        :plain="item[buttonListSetting.plain || 'plain']"
        :round="item[buttonListSetting.round || 'round']"
        :circle="item[buttonListSetting.circle || 'circle']"
        :loading="item.loadingCtrl ? $attrs.loading : item[buttonListSetting.loading || 'loading']"
        :disabled="item[buttonListSetting.disabled || 'disabled']"
        :icon="item[buttonListSetting.icon || 'icon']"
        :autofocus="item[buttonListSetting.autofocus || 'autofocus']"
        :native-type="item[buttonListSetting.nativeType || 'nativeType']"
        @click="typeof item[buttonListSetting.clickEvent || 'clickEvent']=='function' ?
         item[buttonListSetting.clickEvent || 'clickEvent'](scope, $parent) :
         item.assignCurrentParent ? 
         current[item.clickEvent || 'clickEvent']() :
         handelClick(item, index, $event) "
      >
      <!-- [upg][20210701] loadingCtrl - 追加加载中控制 -->
        <slot>{{ item[buttonListSetting.buttonName || 'buttonName'] }}</slot>
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
    // [20210519][crt] 行操作传值-当前行
    scope: {
      type: Object,
      default: () => {},
    },
    // 数组
    buttonList: {
      type: Array,
      required: true,
    },
    // 数组组成配置
    buttonListSetting: {
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
          clickEvent: 'clickEvent',
        }
      },
    },
    pagerSetting: {
      type: Object,
      default: () => {
        return { currentPage: 'currentPage' }
      },
    },
    // 上级父类-页面组件类
    parent: {
      type: Object,
      default() {
        return this.$parent
      },
    },
    // 上级父类-调用组件类
    current: {
      type: Object,
      default() {
        return this
      },
    },
  },
  created() {
    // console.log(">>>>....")
    // console.log(this.buttonList)
  },
  methods: {
    // [20210519][upd] 切换快捷过滤按钮当前状态
    // @param {object} item - 按钮对象
    // @param {number} index - 当前点击按钮索引
    // @param {object} e - 当前点击元素对象
    // [20210520][upd] 在点击快捷过滤按钮时，重置当前分页
    handelClick(item, index, e) {
      let _param = {}
      _param[this.pagerSetting['currentPage' || 'currentPage']] = 1
      Object.assign(_param, item.default)
      this.$emit('submit-event', _param)
      this.changeButtonActive(e, item, index)
    },
    // [20210519][crt] 通过原生dom 操作实现，切换快捷过滤按钮选中状态
    changeButtonActive(e, item, index) {
      // 判断当前点击对象是span 还是button
      let type = 'span'
      let _cur = e.target
      if (_cur.getAttribute('type') == 'button') {
        type = 'button'
      }
      // span 获取按钮组需要多一级parentElement
      let _buttonList =
        e.target.parentElement.parentElement.parentElement.children
      if (type == 'button') {
        _buttonList = e.target.parentElement.parentElement.children
      }
      for (let i = 0, len = _buttonList.length; i < len; i++) {
        let itm = _buttonList[i]
        let idx = i
        let _child = itm.firstElementChild
        let _classArr = _child.getAttribute('class').split(' ')
        let _active = item.clickTrigger || 'primary'
        if (_classArr.includes('el-button--' + _active)) {
          _classArr[1] = 'el-button--default'
        }
        if (idx == index) {
          _classArr[1] = 'el-button--' + _active
        }
        _child.setAttribute('class', _classArr.join(' '))
      }
    },
    // [20210519][crt] 判断行按钮是否可见
    checkVisible(scope, visible) {
      let _visible = true
      visible.forEach((item) => {
        if (!item) {
          _visible = false
        }
        if (typeof item == 'object') {
          for (let key in item) {
            if (scope.row[key] != item[key]) {
              _visible = false
            }
          }
        }
      })
      return _visible
    },
    // [20210519][crt] 判断行按钮是否不可见
    checkInvisible(scope, invisible) {
      let _invisible = false
      invisible.forEach((item) => {
        if (!item) {
          _invisible = true
        }
        if (typeof item == 'object') {
          for (let key in item) {
            if (scope.row[key] != item[key]) {
              _invisible = true
            }
          }
        }
      })
      return _invisible
    },
  },
}
</script>
<style>
.es-button-group {
  display: flex;
}
.es-button-group > .es-button + .es-button {
  margin-left: 10px;
}
</style>