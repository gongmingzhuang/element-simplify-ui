<template>
  <div class="es-aside">
    <es-menu
      :list-setting="listSetting"
      :menu-list="menuList"
      unique-opened
      @menu-item-click="jump"
    />
  </div>
</template>

<script>
/**
 * [20210531][crt]
 * @author: gongmingzhuang
 * 1. 初始化菜单，api 请求接口
 * 2. 默认菜单
 * 3. 获取未读消息列表，api 请求接口
 * 4.
 */

import EsMenu from '../../menu/src/menu'

export default {
  // extends: Button,
  name: 'EsAside',
  props: {
    getMenuList: {
      type: Function,
      required: true,
    },
    // menuList: {
    //   type: Array,
    //   default: ()=>[]
    // },
    listSetting: {
      type: Object
    },
    beforeForward: {
      type: [Function, Object],
      default: null
    }
  },
  data() {
    return {
      menuList: [],
      defaultActiveMenu: ''
    }
  },
  mounted() {
    this.getMenuList((data) => {
      this.menuList = data
    })
  },
  methods: {
    // 导航跳转页面
    jump(menu) {
      let args = arguments
      let menuItem = args[0]
      menuItem.index = args[1]
      if(typeof this.beforeForward == 'function'){
        menuItem = this.beforeForward(menuItem)
      }
      // 解构
      let { label, parentId, id, item, index } = menuItem
      this.defaultActiveMenu = parentId + '-' + id + '-' + index
      if (label === '') {
        return
      }
      window.sessionStorage.setItem(
        'curMenuId',
        this.defaultActiveMenu
      )
      this.$emit('aside-item-click', menuItem)
    },
  },
}
</script>