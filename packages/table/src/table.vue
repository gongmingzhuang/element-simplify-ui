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
            :button-list-setting="quickFilterSetting"
            :button-list="quickFilter"
            :pager-setting="pagerSetting"
            :parent="$parent"
          />
          </ul>
        </div>
        <div class="extra-operate">
          <es-button-group
            :button-list-setting="extraOperateSetting"
            :button-list="extraOperate"
            :parent="$parent"
          />
        </div>
      </div>
      <div class="es-table-main">
        <el-table
          style="width: 100%;"
          :data="data"
          v-bind="$attrs"
          v-on="$listeners"
        >
          <template v-for="(item, index) in tableColumns">
            <el-table-column
              v-if="item.type=='selection'"
              label-class-name="selection-label"
              type="selection"
              :align="item.align||'center'"
              :width="item.width||''">
              </el-table-column>
            <el-table-column
              v-else-if="!item.fixed"
              :label="item.label"
              :prop="item.prop"
              :min-width="item.width||''"
              :align="item.align||'center'"
              :show-overflow-tooltip="item.showOverflowTooltip||false"
              :key="'table'+index"
            >
              <template slot-scope="{row}">
                <!-- 状态值解析 -->
                <template v-if="item.translate">
                  <template v-if="item.tagSetting">
                    <el-tag :type='item.tagSetting[row[item.prop]] ? item.tagSetting[row[item.prop]] : item.tagSetting.default'>{{item.translate[row[item.prop]] || item.translate['default']}}</el-tag>
                  </template>
                  <template v-else>
                    {{item.translate[row[item.prop]] || item.translate['default']}}
                  </template>

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
      <div class="es-table-pager">
        <el-pagination
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
          :current-page="pager[pagerSetting['currentPage'] || 'currentPage']"
          :page-sizes="pagerSetting['pageSizeArray'] || [10, 20, 50]"
          :page-size="pager[pagerSetting['pageSize'] || 'pageSize']"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pager[pagerSetting['total'] || 'total']"
        >
        </el-pagination>
      </div>
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
  // extends: Table,
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
    pagerSetting: {
      type: Object,
      default: () => {
        return {
          currentPage: "currentPage",
          pageSize: "pageSize",
          total: "total",
          pageSizeArray: [10, 20, 50]
        }
      }
    },
    // 列表字段数据组
    pager: {
      type: Object,
      default: () => {
        return{
          currentPage: 1,
          pageSize: 10,
          totalPage: 0,
          total: 0
        }
      },
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
  data() {
    return {
      UTILS,
    }
  },
  methods: {
    // [20210520][crt] 分页
    handleCurrentChange(currentPage){
      let _param = {}
      _param[this.pagerSetting['currentPage'] || 'currentPage'] = currentPage
      this.$emit('submit-event', _param)
    },
    // [20210520][crt] 分页
    handleSizeChange(pageSize){
      let _param = {}
      _param[this.pagerSetting['currentPage'] || 'currentPage'] = 1
      _param[this.pagerSetting['pageSize'] || 'pageSize'] = pageSize
      this.$emit('submit-event', _param)
    },
    handleSelectionChange(selectedItems){
      debugger
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

.es-table .es-table-pager{
  text-align: center;
  margin-top: 10px;
}

th>.selection-label::after{
  content: "全选";
  margin-left: 8px;
}

</style>