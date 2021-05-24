
# [1.0.0-alpha][20210427]

- [init] 引入element-ui

# [1.0.10][20210428]

- [test] 测试继承element-ui

# [1.0.11][20210428]
+ [crt] 添加`<es-menu>` 导航菜单
- 继承`<el-menu>` 的所有“Menu Attribute”、“Menu Event”，使用同`<el-menu>`
- 新增props [menu-list]：导航菜单数组，[width]：导航栏宽度
```javascript
  // menu-list 对象
  [
    { index: 0, menuName: "处理中心" },
    { index: 1, menuName: "我的工作台", children: [
      { index: 1, menuName: "选项1" },
      { index: 2, menuName: "选项2" },
      { index: 3, menuName: "选项3" }
    ]},
    { index: 2, menuName: "消息中心", disabled: true },
    { index: 3, menuName: "订单管理", href: "http://www.baidu.com" }
  ]
```

# [1.0.12][20210428]
+ `<es-menu>`
- 新增props 参数[list-setting]：设置导航菜单数组[menu-list] 中菜单对象的属性值

# [1.0.13][20210428]
+ `<es-menu>`
- 修复[list-setting] 不配置时设置默认值

# [1.0.14][20210428]
+ [upd] `<es-menu>`
- 修复子菜单点击触发实参非当前点击子菜单对象问题

# [1.0.15][20210506]
+ [crt] 添加 `<es-tabs>` 标签页
- 继承 `<el-tabs>`
- 通过新增属性[list-setting] 设置传入标签页数组[tab-list] 中对象属性值
```javascript
// [tab-list] 数组示例
[
  { label: "标签一", name: "标签一" },
  { label: "标签二", name: "标签二" }
]
```
+ [crt] 添加 `<es-crumb>` 面包屑
- 继承 `<es-breadCrumb>`
- 通过新增属性[list-setting] 设置传入标签页数组[crumb-list] 中对象属性值
- 通过新增属性[button-list-setting] 设置按钮组[button-list] 对象属性值
```javascript
// [crumb-list] 数组示例
[
  { name: "标签一" },
  { name: "标签二" }
]
```
+ [crt] 添加 `<es-button>` 按钮
- 继承 `<es-button>`

+ [crt] 添加 `<es-button-group>` 按钮组
- 通过属性[list-setting] 设置传入标签页数组[button-list] 中对象属性值
```javascript
// [button-list] 数组示例
[
  { buttonName: '新增企业', size: 'mini', type: 'success', clickEvent: 'addCompany' },
  { buttonName: '新增部门', size: 'mini', type: 'warning', clickEvent: 'addDept' },
  { buttonName: '新增员工', size: 'mini', type: 'danger', visible: false }
]
```
+ [crt] 添加 `<es-query>` 条件查询组件
- 通过[query-list] 配置查询条件表单
- 通过[button-list] 配置查询/重置按钮，默认自带


# [1.0.16][20210518]
+ [upd] `<es-crumb>` 组件
- 新增prop[button-event-invoke-body]，用于传入给其子组件`<es-button-group>` 作为事件调用时查找父类组件中的事件
- 修改`<es-crumb>` 组件默认宽度样式为100%

+ [upd] `<es-button-group>`
- 新增prop[parent]，接收事件调用的父类，如果在嵌套结构中使用`<es-button-group>` 最好指定该值，否则无法正确调用对应事件函数
- 点击事件可以通过[query-event] 设置全局公用事件，在同时设置item 事件时，优先调用item 事件

+ [upd] `<es-query>`
- 支持日期范围选择功能
- 通过[query-list] item中[labelWidth] 属性单独设置label 狂赌，也可以通过[label-width] 可统一设置label 宽度

+ [crt] 添加`<es-table>` 组件
- 组件快捷过滤按钮、右侧辅助按钮通过调用`<es-button-group>` 组件实现
- [quick-filter-setting] [quick-filter] 设置列表快捷条件过滤查询
- [extra-operate-setting] [extra-operate] 设置列表右侧辅助功能按钮
- 配置[quick-filter] 时，最好配置@query-event 供快捷按钮调用事件
- [quick-filter] [extra-operate] 数组属性同`<es-button-group>`，注：[quick-filter] item 新增属性[default(Object)] 用于传递快捷过滤按钮条件


# [1.0.17][20210519]
+ [upd] `<es-table>` 组件
- 添加组件快捷过滤按钮切换选中样式，配置默认选中[quick-filter] 数组中item 指定type，如type: primary；如需指定切换后选中样式（对标element-ui 按钮样式），则item 需配置clickTrigger（默认primary），如clickTrigger: primary；
- 说明：快捷过滤按钮目前不支持配置独立clickEvent，只能通过配置公共query-event 实现事件回调；
- 列表标题字段通过title 属性进行默认值设置（无法动态变动）；如需根据列表参数动态变化展示内容，则可通过插槽`<template slot='title'></template>` 进行配置；
- 添加[table-columns]、[table-operate]、[data] 属性，分别进行列表字段传入、列表操作栏按钮控制、数据传入；
- 列表字段显示支持状态值解析，[table-columns] item 中配置translate 属性，值为状态值枚举对象；枚举值支持默认值设置，如
```javascript
  // 当值取0 时，状态解析为‘已解决’；当值取其他值时，状态值解析为‘待处理’
  {
    0: '已解决',
    'default': '待处理'
  }
```
- 列表字段显示支持日期格式化（通过Moment.js 实现），[table-columns] item 中配置dateFormat 属性进行配置输出对应日期格式，默认格式为“YYYY-MM-DD HH:mm:ss”，通过设置dateFormat:1，或dateFormat: true 即可采用默认格式进行日期格式化；
- 列表字段显示支持金额格式化（通过内置方法UTIL.moneyFormat 实现）,[table-colunms] item 中配置moneyFormat 属性进行配置，默认格式为按千位添加“,”（逗号），小数位保留2位小数；如果需要配置小数位，可通过moneyFormat：{decimal: 3}，进行小数位位数配置；通过设置moneyFormat:1，或moneyFormat: true 即可采用默认格式进行金额格式化；

+ [upg] `<es-button-group>` 组件
- 除快捷过滤按钮，支持行操作按钮传入scope 值进行针对行数据进行操作；
- visible 属性，可见参数配置由原Boolean 扩展支持Array 传入判断按钮显示/隐藏；
- 追加不可见参数配置invisible ，同visible属性；
- visible/invisible 值类型为Array 时通过执行相应方法checkVisible/checkInvisible 进行判断显示/隐藏；

# [1.0.18][20210520]
1. `<es-table>` 组件
- [del] 由于继承会出现错误提示`Error in mounted hook: "TypeError: Cannot read property 'addEventListener' of undefined`，故移除`<el-table>` 继承关系；
- [add] 添加完善分页插件`<el-pagination>`，集成到`<es-table>` 组件中，通过[pager-setting] 设置请求时用的“currentPage”、“pageSize” 字段名；
```html
  <es-table
    :pager-setting="{
      currentPage: 'pageNum'
    }"
  >
```
- [upd] 列表数据、分页通过通过[data]、[pager] 进行传递；
- [upg] `<el-table>` 通过v-bind='$attrs'、v-on='$listeners' 设置，可以在`<es-table>` 直接使用`<el-table>` 属性和方法；
- [upd] 条件查询、快捷过滤查询、分页查询统一通过通过“query-event” 配置回调函数执行，故需要设置变量（queryParams）接收不同方式回传的参数，再通过Object.assign 进行整合触发查询；
- [crt] 添加复选框选择功能，通过`<el-table>` 同名方法@selection-change 在当前组件中进行捕捉选中数据；
- 示例
```html
    <es-table
      @query-event="getList"
      @selection-change="handleSelectionChange"
      :quick-filter="[
        {buttonName: '全部', type:'primary', default: { status: ''}},
        {buttonName: '已生效', default: { status: 1}},
        {buttonName: '未生效', default: { status: 2}},
        {buttonName: '禁用', default: { status: 3}}
      ]"
      :extra-operate="[
        { buttonName: '选择子公司', size: 'mini', clickEvent: 'addEnterprise' },
        { buttonName: '返回上一级', size: 'mini', clickEvent: 'stackBack' }
      ]"
      :table-columns="[
        { label: '', prop: 'eid', type: 'selection', width: 100 },
        { label: '企业名称', prop: 'companyName', width: 200 },
        { label: '信用代码', prop: 'businessLicenseCode', width: 250 },
        { label: '已开通服务', prop: 'capitalNames' },
        { label: '状态', prop: 'status', translate: status() },
        { label: '审批状态', prop: 'approveStatus', translate: approveStatus() },
        { label: '企业来源', prop: 'companyFrom', translate: companyFrom() },
        { label: '子公司数', prop: 'sonNumber', width: 90, moneyFormat: 1 },
        { label: '创建时间', prop: 'createTime', width: 170, dateFormat: 1 },
        { label: '创建人', prop: 'createOperator' },
        { label: '操作', prop: 'oprationToll', width: 570, fixed: 'right' }
      ]"
      :table-operate="[
        { buttonName: '查看', size: 'mini', clickEvent: 'addEnterprise' },
        { buttonName: '编辑', size: 'mini', clickEvent: 'handleClick' },
        { buttonName: '设置管理员', size: 'mini', clickEvent: 'handleClick' },
        { buttonName: '子公司', size: 'mini', clickEvent: 'handleClick' },
        { buttonName: '重置密码', size: 'mini', clickEvent: 'handleClick', visible: /重置密码/.test(btnJur) },
        { buttonName: '启用', size: 'mini', clickEvent: 'handleClick' },
        { buttonName: '禁用', size: 'mini', clickEvent: 'handleClick', invisible: [/禁用/.test(btnJur), {status: 0, companyFrom: 'HRM'}] }
      ]"
      :pager-setting="{
        currentPage: 'pageNum'
      }"
      :data="tableData.data"
      :pager="tableData.pager"
      size="mini"
    >
      <template slot="title">企业列表（{{tableData.pager.total}}）</template>
    </es-table>
```


2. `<es-query>` 组件
- [upg] `<es-query>` 条件查询控件，“查询”、“重置”功能会重置当前分页参数{currentPage: 1}；若分页参数值非默认值“currentPage”，可通过[pagerSetting] 进行配置；


# [1.0.19][20210521]
1. `<es-query>` 组件
- [upd] 需隐藏搜索栏label 时，可配置[label-width] 为0、''；

2. `<es-button-group>` 组件
- [upg] 添加调用调用组件中方法的this 指向配置[current]，通过[button-list] item 配置“assignCurrentParent=true” 开启；
- 说明1：“assignCurrentParent=true” 后，上级组件（非当前页面组件）必需有“clickEvent=*** ”同名方法；
- 说明2：只有`<es-button-group>`组件非当前页面组件直接上级组件（例：`<es-dialog-form>`）才需配置；

3. `<es-dialog>` 弹窗组件
- [init] 新增组件，通过v-on、v-bind 进行属性及事件传递；
- [crt] 通过[title] 配置弹窗标题，[tips] 配置弹窗提示消息，[button-list]、[button-list-setting] 配置弹窗交互按钮；
- 说明1：页面组件通过方法`this.$refs[esDialogRef].open()`触发弹窗弹出；

4. `<es-dialog-form>` 弹窗表单组件
- [init] 新增组件，v-on、v-bind 进行`<el-form>` 自带属性和事件传递，通过props 对新增自定义属性及事件进行传递；
- [crt] [form-columns] 配置表单字段，详见示例；
- [crt] [button-list] 配置弹窗按钮，详见示例；
- [crt] [title] 配置弹窗标题，[labelWidth] 配置form-item label 宽度；
- [crt] [validate-custom-list] 配置自定义表单校验规则，详见示例；
- [crt] [@submit-event] 组件内自带表单提交事件回调（校验成功后），详见示例；
- 说明1：页面组件通过方法`this.$refs[dialogRef].open()`触发弹窗弹出；
- 说明2：组件内自带表单提交方法（Function submit），需要配置按钮“clickEvent=submit” 且“assignCurrentParent=true”，才可触发；
- 说明3：若不使用组件内提交方法，可通过`this.$refs[dialogRef].$refs.form` 获取form 对象，可执行交校验并触发提交；

```javascript
/*
<es-dialog-form
      // $ref
      ref="esDialogForm" 
      // 弹窗标题
      title="收获地址"
      // label 宽度
      labelWidth="100px"
      // 组件内值提交事件回调，Function(form)
      @submit-event="submitDialogForm"
      // 表单字段
      :form-columns="[
        { label: '企业名称', prop: 'companyName', width: 200, validate: ['v-required'] },
        { label: '信用代码', prop: 'businessLicenseCode', width: 250, validate: ['v-required', 'v-email'] },
        { label: '创建人年龄', prop: 'createOperator', validate: ['v-required', 'v-number'] },
        { label: '密码', prop: 'pwd', validate: ['v-required', 'v-compare'], dependPropIndex: 4 },
        { label: '确认密码', prop: 'rpwd', validate: ['v-required', 'v-comdepend'], dependPropIndex: 3 }
      ]"
      // 弹窗按钮
      :button-list="[
        { buttonName: '取消', type: 'primary', clickEvent: 'close', assignCurrentParent: true },
        { buttonName: '确定', clickEvent: 'submit', assignCurrentParent: true }
      ]"
      // 自定义校验规则
      :validate-custom-list="[
        { validName: 'v-number', 
          validator: function(item){
            return{
              validator: validNumber(item),
              trigger: ['blur', 'change']
            }
          }
        }
      ]"
/>
*/

/** 表单字段 - [formColumns]
 * label: 字段名
 * prop：字段
 * width：已失效，统一按labelWidth 配置
 * validate: 校验规则
 * dependPropIndex：两个相依赖字段相互校验索引标识
 * 说明1：目前系统支持校验有：v-required（必填）、v-email（邮箱）、v-number（数字）、v-compare（依赖-主）、v-comdepend（依赖-辅）；
 */
formColumns = [
  { label: '企业名称', prop: 'companyName', width: 200, validate: ['v-required'] },
  { label: '信用代码', prop: 'businessLicenseCode', width: 250, validate: ['v-required', 'v-email'] },
  { label: '创建人年龄', prop: 'createOperator', validate: ['v-required', 'v-number'] },
  { label: '密码', prop: 'pwd', validate: ['v-required', 'v-compare'], dependPropIndex: 4 },
  { label: '确认密码', prop: 'rpwd', validate: ['v-required', 'v-comdepend'], dependPropIndex: 3 }
]

/** 弹窗按钮 - [buttonList]
 * buttonName：按钮名
 * type：按钮样式，对标element-ui 按钮配色type
 * size：按钮样式，对标element-ui 按钮样式size
 * clickEvent：按钮触发事件，默认为当前页面中声明事件
 * assignCurrentParent：触发组件内事件开关，当开启时，按钮触发事件为组件内配置名为clickEvent 事件
 */
buttonList = [
  { buttonName: '取消', type: 'primary', clickEvent: 'close', assignCurrentParent: true },
  { buttonName: '确定', clickEvent: 'submit', assignCurrentParent: true }
]

/** 自定义校验规则 - [validateCustomList]
 * validName：校验规则名，在formColumns 中对应字段validate 数组中使用
 * validator：校验规则，方法返回校验对象{validator，trigger}
 */
validateCustomList = [
  { validName: 'v-number', 
    validator: function(item){
      return{
        validator: validNumber(item),
        trigger: ['blur', 'change']
      }
    }
  }
]
```


# [1.0.20][20210524]
1. `<es-form>`
- [crt] 通过[form-columns] 配置表单字段，通过[form-setting] 配置表单布局样式，通过[button-list] 配置按钮，通过[validate-custom-list] 配置自定义校验规则；
- 使用该组件相关组件有`<es-query>`/`<es-dialog-form>`；
- 触发表单提交按钮事件为当前组件`<es-form>`/`<es-query>`/`<es-dialog-form>` 中配置回调方法 @submit-event，回调参数为表单对象；
- 新增支持复选框select、单选框radio；目前支持text/radio/select/dateRange；
```html
 <es-form
    labelWidth="120px"
    @submit-event="submitDialogForm"
    :form-setting="{
      col: 3,
      itemWrap: false
    }"
    :form-columns="[
      { label: '基本信息', type: 'title' },
      { label: '企业名称', prop: 'companyName', validate: ['v-required'] },
      { label: '信用代码', prop: 'businessLicenseCode', validate: ['v-required', 'v-email'] },
      { label: '创建人年龄', prop: 'createOperator', validate: ['v-required', 'v-number'] },
      { label: '基本信息', type: 'title' },
      { label: '创建时间', prop: 'dateRange', props: ['start', 'end'], type: 'dateRange', validate: ['v-required']},
      { label: '密码', prop: 'pwd', validate: ['v-required', 'v-compare'], dependPropIndex: 4 },
      { label: '确认密码', prop: 'rpwd', validate: ['v-required', 'v-comdepend'], dependPropIndex: 3 }
    ]"
    :button-list="[
      { buttonName: '取消', type: 'primary', clickEvent: 'close', assignCurrentParent: true },
      { buttonName: '确定+', clickEvent: 'submit', assignCurrentParent: true }
    ]"
    :validate-custom-list="[
      { validName: 'v-number', 
        validator: function(item){
          return{
            validator: validNumber(item),
            trigger: ['blur', 'change']
          }
        }
      }
    ]"
  />
```

2. `<es-dialog>`/`<es-dialog-form>`/`<es-query>`
- [upd] 针对引入按钮组组件`<es-button-group>`，将[button-list] 通过`v-bind`/`v-on` 代替；
- [upd] `<es-dialog-form` 原表单组件`<el-form>` 改为`<es-form>`，参数通过`v-bind`/`v-on` 代替；

3. `<es-table>`/`<es-form>`
- [upd]（参考） 对于状态值配置文件（@/assets/json/status/status.json），`<es-form>` 下拉框使用的状态值类型为“数组”，`<es-table>` 列表状态值类型为“对象”；配置文件默认配置类型为“数组”，通过调用对应的状态值方法获取；
```javascript
// @/assets/json/status/status.json
// @param {number} kind: 对于`<es-form>`和`<es-table>` 两个主要使用组件，通过kind 进行切换，缺省值返回数组；
// @param {number} type: 对于同一个状态字段，可能存在多个使用场景，可通过type 字段进行切换；
export function status (kind, type) {
  let _status = {};
  // 任务状态1
  let status_1 = [
    {label: '已生效', value: 1},
    {label: '回退', value: 2},
    {label: '禁用', value: 3},
    {label: '未生效', value: 0}
  ]
  // 审批状态2
  let status_2 = [
    {label: '已审批', value: 1},
    {label: '未审批', value: 2}
  ]
  !type && (type = 0)
  switch (type) {
    case 0:
      _status = status_1
      break
    case 1:
      _status = status_2
      break
  }

  if (kind) {
    _status = translateToObject(_status)
  }
  return _status
}

function translateToObject (statusArray) {
  let _obj = {}
  statusArray.forEach(item => {
    _obj[item.value] = item.label
  })
  return _obj
}
```