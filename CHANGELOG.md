
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