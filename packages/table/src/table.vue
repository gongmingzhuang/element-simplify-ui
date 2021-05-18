<template>
  <div class="es-table">
    <main>
      <div class="es-table-tool">
        <div class="title" style="width: 200px;">企业列表</div>
        <div class="quick-filter">
          <es-button-group
            v-on="$listeners"
            :list-setting="quickFilterSetting"
            :button-list="quickFilter"
            :parent="$parent"
          />
        </div>
        <div class="extra-operate">
          <es-button-group
            :list-setting="extraOperateSetting"
            :button-list="extraOperate"
            :parent="$parent"
          />
        </div>
      </div>
      <div class="es-table-main"></div>
      <div class="es-table-pager"></div>
    </main>
  </div>
</template>
<script>
/**
 * [20210518][crt]
 * @author: gongmingzhuang
 *
 * - 1. 通过extends 可直接继承<el-table> 的props 变量
 */
import { Table } from 'element-ui'
import EsButtonGroup from '../../button-group/src/button-group'
export default {
  extends: Table,
  name: 'EsTable',
  components: {
    EsButtonGroup,
  },
  props: {
    // 数组
    quickFilter: {
      type: Array,
      default: () => []
    },
    quickFilterSetting: {
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
      }
    },
    // 按钮组
    extraOperate: {
      type: Array,
      default: () => []
    },
    extraOperateSetting: {
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
      }
    }
  }
}
</script>
<style>
.es-table{}
.es-table .es-table-tool{
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.es-table .es-table-tool .quick-filter{
  flex-grow: 5;
}
</style>