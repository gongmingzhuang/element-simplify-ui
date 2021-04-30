<template>
  <el-menu
    :mode="mode"
    :collapse="collapse"
    :background-color="backgroundColor"
    :text-color="textColor"
    :active-text-color="activeTextColor"
    :default-active="defaultActive"
    :default-openeds="defaultOpeneds"
    :unique-opened="uniqueOpened"
    :menu-trigger="menuTrigger"
    :router="router"
    :collapse-transition="collapseTransition"
    :style="{ width: this.width }"
    v-on="$listeners"
  >
    <template v-for="(menuItem, menuIndex) of menuList">
      <!-- [20210430][upg] 存在下级菜单 -->
      <template v-if="menuItem[listSetting.children || 'children']">
      <el-submenu
        :key="menuIndex"
        :index="`${menuItem[listSetting.index || 'index']}`"
        :data-index="`${menuItem[listSetting.index || 'index']}`"
        :disabled="menuItem[listSetting.disabled || 'disabled']"
      >
        <template slot="title">
          <i class="el-icon-location"></i>
            <!-- <router-link :to="menuItem.url"> -->
            <template v-if="menuItem[listSetting.href || 'href']">
              <a
                class="a-underline-none"
                :href="menuItem[listSetting.href || 'href']"
                target="_blank"
              >
                {{ menuItem[listSetting.menuName || 'menuName'] }}
              </a>
            </template>

            <template v-else>
              {{ menuItem[listSetting.menuName || 'menuName'] }}
            </template>
            <!-- </router-link> -->
        </template>
        <template v-for="(subMenuItem, subMenuIndex) of menuItem[listSetting.children || 'children']">
          <!-- id：用于按钮权限控制，不添加影响部分列表页添加按钮功能 -->
          <!-- <router-link :to="`${subMenuItem.label}?id=${subMenuItem.id}`"> -->
          <el-menu-item
            :key="subMenuIndex"
            :index="`${menuItem[listSetting.index || 'index']}-${subMenuItem[listSetting.index || 'index']}-${subMenuIndex}`"
            :data-index="`${menuItem[listSetting.index || 'index']}-${subMenuItem[listSetting.index || 'index']}-${subMenuIndex}`"
            :disabled="subMenuItem[listSetting.disabled || 'disabled']"
            @click="$emit('menu-item-click', subMenuItem)"
          >
            <template v-if="subMenuItem[listSetting.href || 'href']">
              <i class="iconfont"></i>
              <a
                :href="subMenuItem[listSetting.href || 'href']"
                target="_blank"
              >
                {{ subMenuItem[listSetting.menuName || 'menuName'] }}
              </a>
            </template>

            <template v-else>
              <i class="iconfont"></i>
              {{ subMenuItem[listSetting.menuName || 'menuName'] }}
            </template>
          </el-menu-item>
          <!-- </router-link> -->
        </template>
      </el-submenu>
      </template>
      <!-- [20210430][upg] 不存在下级菜单 -->
      <template v-else>
        <el-menu-item
            :key="menuIndex"
            :index="`${menuItem[listSetting.index || 'index']}`"
            :data-index="`${menuItem[listSetting.index || 'index']}`"
            :disabled="menuItem[listSetting.disabled || 'disabled']"
            @click="$emit('menu-item-click', menuItem)"
          >
            <template v-if="menuItem[listSetting.href || 'href']">
              <i class="iconfont"></i>
              <a
                class="a-underline-none"
                :href="menuItem[listSetting.href || 'href']"
                target="_blank"
              >
                {{ menuItem[listSetting.menuName || 'menuName'] }}
              </a>
            </template>

            <template v-else>
              <i class="iconfont"></i>
              {{ menuItem[listSetting.menuName || 'menuName'] }}
            </template>
          </el-menu-item>
      </template>
    </template>
  </el-menu>
</template>
<script>
/**
 * [20210430][crt]
 * @author: gongmingzhuang
 *
 * - 1. 通过extends 可直接继承子组件的props 变量
 * - 2. 通过v-on="$listeners" 可让子组件调用父级组件中定义的方法
 * - 3. @menu-item-click - 点击子菜单进行操作
 * - 4. 通过width 定义菜单栏宽度
 */
import { Menu } from 'element-ui'
export default {
  extends: Menu,
  name: 'EsMenu',
  props: {
    // 导航菜单数组
    menuList: {
      type: Array,
      required: true,
    },
    // 导航菜单数组组成配置
    listSetting: {
      type: Object,
      default: ()=>{
        return {
          index: 'index',
          menuName: 'menuName',
          children: 'children',
          disabled: 'disabled',
          href: 'href'
        }
      }
    },
    // 导航栏宽度
    width: {
      type: [String, Number],
      default: 'auto',
    },
  },
}
</script>
<style>
  a {
    text-decoration: none;
  }
</style>