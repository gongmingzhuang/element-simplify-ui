<template>
  <div class="es-button-group">
    <template v-for="(item,index) of buttonList">
      <!-- [20210519][upg] 显示/隐藏增强 针对列表中操作栏根据scope 进行控制显示 -->
      <!-- [20210519][upg] 追加不可见控制 -->
      <!-- [20210519][remark] 当同时设置visible 与invisible 时，invisible 失效 -->
      <es-button
        v-if="(typeof(scope) == 'object' && typeof(item[listSetting.visible || 'visible']) == 'object') ? 
        checkVisible(scope, item[listSetting.visible || 'visible']) : 
        typeof(item[listSetting.visible || 'visible']) == 'boolean' ? 
        item[listSetting.visible || 'visible'] : 

        (typeof(scope) == 'object' && typeof(item[listSetting.invisible || 'invisible']) == 'object') ?
        checkInvisible(scope, item[listSetting.invisible || 'invisible']) : 
        typeof(item[listSetting.invisible || 'invisible']) == 'boolean' ? 
        item[listSetting.invisible || 'invisible'] : 

        'true'"
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
        @click="parent[item[listSetting.clickEvent || 'clickEvent']] ? parent[item[listSetting.clickEvent || 'clickEvent']](scope) : handelClick(item, index, $event) "
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
    // [20210519][crt] 行操作传值-当前行
    scope: {
      type: Object,
      default: ()=>{}
    },
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
          clickEvent: 'clickEvent',
        }
      },
    },
    // 上级父类
    parent: {
      type: Object,
      default() {
        return this.$parent
      },
    },
  },
  created(){
    // console.log(">>>>....")
    // console.log(this.buttonList)
  },
  methods: {
    // [20210519][upd] 切换快捷过滤按钮当前状态
    // @param {object} item - 按钮对象
    // @param {number} index - 当前点击按钮索引
    // @param {object} e - 当前点击元素对象
    handelClick(item, index, e) {
      this.$emit('query-event', item.default)
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
    checkVisible(scope, visible){
      let _visible = true
      visible.forEach(item=>{
        if(!item){
          _visible = false
        }
        if(typeof(item)=='object'){
          for(let key in item){
            if(scope.row[key] != item[key]){
              _visible = false
            }
          }
        }
      })
      return _visible
    },
    // [20210519][crt] 判断行按钮是否不可见
    checkInvisible(scope, invisible){
      let _invisible = false
      invisible.forEach(item=>{
        if(!item){
          _invisible = true
        }
        if(typeof(item)=='object'){
          for(let key in item){
            if(scope.row[key] != item[key]){
              _invisible = true
            }
          }
        }
      })
      return _invisible
    }
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