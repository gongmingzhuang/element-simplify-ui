<template>
  <div class="es-table">
    <main>
      <div class="es-table-tool">
        <div class="title">
          <template v-if="!title">
            <slot name="title" />
          </template>
          <template v-else>{{title}}</template>
        </div>
        <div class="quick-filter">
          <es-button-group
            v-on="$listeners"
            :list-setting="quickFilterSetting"
            :button-list="quickFilter"
            :parent="$parent"
          />
          </ul>
        </div>
        <div class="extra-operate">
          <es-button-group
            :list-setting="extraOperateSetting"
            :button-list="extraOperate"
            :parent="$parent"
          />
        </div>
      </div>
      <div class="es-table-main">
        <el-table
          :data="data"
          style="width: 100%;"
        >
          <template v-for="(item, index) in tableColumns">
            <el-table-column
              v-if="!item.fixed"
              :label="item.label"
              :prop="item.prop"
              :width="item.width||''"
              :align="item.align||'center'"
              :key="'table'+index"
            >
            <template slot-scope="{row}">
              <!-- 状态值解析 -->
              <template v-if="item.translate">
                {{item.translate[row[item.prop]] || item.translate['default']}}
              </template>
              <!-- 日期格式化 -->
              <template v-else-if="item.dateFormat">
                {{$moment(row[item.prop]).format((item.dateFormat === 1 || item.dateFormat === true) ? 'YYYY-MM-DD HH:mm:ss' : item.dateFormat)}}
              </template>
              <!-- 金额格式化 -->
              <template v-else-if="item.moneyFormat">
                <template v-if="row[item.prop] || row[item.prop] === 0 || row[item.prop] === '0'">
                  {{UTILS.moneyFormat(row[item.prop], item.moneyFormat.decimal || '')}}
                </template>
              </template>
              <!-- 默认 -->
              <template v-else>
                {{row[item.prop]}}
              </template>
            </template>
            </el-table-column>
            <el-table-column
              v-else
              :label="item.label"
              :prop="item.prop"
              :width="item.width||''"
              :align="item.align||'center'"
              :fixed="item.fixed||''"
              show-overflow-tooltip
              :key="'table'+index"
            >
              <template slot-scope="scope">
                <es-button-group
                  :scope="scope"
                  :list-setting="tableOperateSetting"
                  :button-list="tableOperate"
                  :parent="$parent"
                />
              </template>
            </el-table-column>
          </template>
        </el-table>
      </div>
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
import UTILS from '../../../util/util.js'
import EsButtonGroup from '../../button-group/src/button-group'
export default {
  extends: Table,
  name: 'EsTable',
  components: {
    EsButtonGroup,
  },
  props: {
    // 标题
    title: {
      type: String,
    },
    // 数组
    quickFilter: {
      type: Array,
      default: () => [],
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
      },
    },
    // 按钮组
    extraOperate: {
      type: Array,
      default: () => [],
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
      },
    },
    // 列表字段组
    tableColumns: {
      type: Array,
      default: () => [],
    },

    // 列表字段数据组
    data: {
      type: Array,
      default: () => [],
    },
    // 按钮组
    tableOperate: {
      type: Array,
      default: () => [],
    },
    tableOperateSetting: {
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
  },
  data(){
    return {
      UTILS
    }
  }
}
</script>
<style>
.es-table {
  padding: 10px;
  background: #fff;
  border-radius: 5px;
}
.es-table .es-table-tool {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.es-table .es-table-tool .title {
  width: 200px;
  font-size: 16px;
  font-weight: bold;
}

.es-table .es-table-tool .quick-filter {
  flex-grow: 5;
}

.es-table .es-table-main {
  width: 100%;
  margin-top: 10px;
}
.es-table .es-table-main .es-button-group {
  display: flex;
  justify-content: center;
}
.es-table table,
.es-table .el-table__fixed,
.es-table .el-table__empty-block {
  /* width: 100% !important; */
}
</style>