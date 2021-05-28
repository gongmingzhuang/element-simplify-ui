# element-simplify-ui  组件使用说明

## `<es-button>` 按钮组件 ###################################################################

- 用法同 `<el-button>`；

&nbsp;

## `<es-button-group>` 按钮组组件 ###########################################################

&nbsp;

使用`<es-button-group>` 组件配置参数

- 内置该组件的组件`<es-crumb>`、`<es-dialog>`、`<es-dialog-form>`、`<es-form>`、`<es-query>`、`<es-table>`

&nbsp;

### Button-Group Attribute

`* 为必填项`

|参数|说明|类型|可选值|默认值|常用值|
--|:--|:--:|:--|:--|:--
ref|ref标识|string|--|--|--
`*` button-list|按钮数组，配置见下方**Button-list 表格**|array|--|--|--
button-list-setting|按钮数组属性名配置，不推荐，配置见下方**Button-list-setting 表格**|array|--|--|--
pager-setting|**[`<es-table>` 限定]** 分页器属性名配置，按需求配置，通常只需配置currentPage 字段名即可|object|--|{currentPage: 'currentPage'}|--
scope|**[`<es-table>` 限定]** 获取当前列参数|object|--|--|--
parent|用于配置上级组件，常用于中间组件引用`<es-button-group>`时使用，通过该参数可以让`<es-button-group>` 自组件`<es-button>` 可调用上级组件中定义的方法/属性|object|--|--|$parent
current|用于配置当前组件，通过该参数可以让`<es-button-group>` 自组件`<es-button>` 可调用中间（当前）组件中定义的方法/属性|object|--|--|this


### Button-list-setting

属性名|说明|类型|可选值|默认值
--|:--|:--|:--|:--
buttonName|不推荐配置，[button-list] 中配置按钮名字对应替换字段，如配置[button-list] 时直接通过'buttonName' 来定义按钮名，则无需配置|string|--|'buttonName'

&nbsp;

### Button-list

`* 为必填项`
属性名|说明|类型|可选值|默认值
--|:--|:--|:--|:--
`*` buttonName|按钮名称，可通过[button-list-setting] 变更，但不推荐|string|--|--
size|按钮尺寸，对标element-ui 按钮尺寸|string|medium<br> small<br> mini<br>|--
type|按钮类型，对标element-ui 按钮类型|string|primary<br> success<br> warning<br> danger<br> info<br> text|--
plain|是否朴素按钮，对标element-ui plain|boolean|--|false
round|是否圆角按钮，对标element-ui round|boolean|--|false
circle|是否圆形按钮，对标element-ui circle|boolean|--|false
loading|是否加载中状态，对标element-ui loading|boolean|--|false
disabled|是否禁用状态，对标element-ui disabled|boolean|--|false
icon|图标类名，对标element-ui icon|string|--|--
autofocus|是否默认聚焦，对标element-ui autofocus|boolean|--|false
nativeType|原生 type 属性，对标element-ui native-type|boolean|button<br> submit<br> reset|button
clickEvent|按钮点击事件<br> （1）传入类型为Function 时，调用当前组件同名方法<br> （2）传入类型为String 且assignCurrentParent=true，调用中间件同名方法；<br>（3））传入类型为String 且assignCurrentParent=false，调用`<es-button-group>`同名方法；|function/string|--|--
assignCurrentParent||boolean|--|false
visible|按钮是否显示<br> （1）boolean 常用于非列表列按钮，true-显示 <br> （2）array 常用于列表列按钮，数组元素可以为boolean和object，当所有元素均为true 才显示按钮|boolean/array[boolean/object]|--|false
invisible|按钮是否隐藏<br>（1）boolean false-显示 <br> （2）array 常用于列表列按钮，数组元素可以为boolean和object，当所有元素均为true 才隐藏按钮|boolean/array[boolean/object]|--|false

&nbsp;

- 说明1：visible 类型为array 时，object 元素为对应字段值，例{status: 0, index: 1} 表示当列数据status=0 且index=1时，该元素符合可见要求；invisible 类型为array 时同理；<br>
- 说明2：当同时设置visible 和invisible 时，visible 的优先级高于invisible，即满足visible 要求时，不再对invisible 进行判断，故不推荐同时设置；<br>

&nbsp;

##  `<es-crumb>` 面包屑组件 #################################################################

### Crumb Attribute

`* 为必填项`

|参数|说明|类型|可选值|默认值|
--|:--|:--:|:--|:--
ref|ref标识|string|--|--
`*` crumbList|面包屑数组，详细配置见下方**Crumb-list**|array[object]|--|--
listSetting|面包屑数组元素对象属性名配置，不推荐使用|object|--|{crumbName: 'crumbName', to: 'to', replace: 'replace'}
button-list-setting|按钮数组元素对象属性名配置，见`<es-button-group>`|object|--|--
button-list|右侧按钮数组，见`<es-button-group>`|array|--|--

&nbsp;

### Crumb-list

`* 为必填项`

属性名|说明|类型|可选值|默认值
--|:--|:--:|:--|:--
`*` crumbName|面包屑名，可通过**list-setting**变更该属性名，但不推荐|string|--|--
to|路由跳转对象，同 vue-router 的 to，对标element-ui to|string/object|--|--
replace|在使用 to 进行路由跳转时，启用 replace 将不会向 history 添加新记录，对标element-ui replace|boolean|--|false


&nbsp;

##  `<es-dialog>` 弹窗组件 ###################################################################

- 当前功能提示语弹窗

### Dialog Attribute
`* 为必填项`

|参数|说明|类型|可选值|默认值|
--|:--|:--:|:--|:--
`*` ref|ref标识，需要通过该表示唤起弹窗|string|--|--
title|弹窗标题|string|--|--
tips|提示语|string|--|'确定执行该操作？'
button-list-setting|按钮数组元素对象属性名配置，见`<es-button-group>`|object|--|--
button-list|右侧按钮数组，见`<es-button-group>`|array|--|--

&nbsp;

- 说明1：唤起弹窗通过调用`<es-dialog>` 组件内open 方法实现：this.$refs[esDialog].open()；
- 说明2：[button-list] 元素对象，需要配置clickEvent='close' 和assignCurrentParent=true，让`<es-button-group>`调用`<es-dialog>` 内close 方法实现关闭弹窗，或通过执行this.$refs[esDialog].close()实现；

&nbsp;

##  `<es-dialog-form>` 弹窗表单组件 #########################################################

### Dialog-form Attribute
`* 为必填项`

|参数|说明|类型|可选值|默认值|
--|:--|:--:|:--|:--
`*` ref|ref标识，需要通过该表示唤起弹窗|string|--|--
title|弹窗标题|string|1
label-width|同`<es-form>`，统一设置字段label 宽度|string|--|--
form-setting|同`<es-form>`，表单布局配置，col-表示一行有多少个字段，itemWrap-表示label与input是否换行显示|object|--|{col:1, itemWrap: false}
`*` form-columns|同`<es-form>`，表单字段配置（详见`<es-form>`）|array|--|--
`*` button-list|同`<es-form>`，表单操作提交按钮配置|array|--|--
validate-custom-list|同`<es-form>`，表单新增校验规则定义数组|array|--|--

&nbsp;

##  `<es-form>` 表单组件 ####################################################################

&nbsp;
### Form Attribute

`* 为必填项`

|参数|说明|类型|可选值|默认值|
--|:--|:--:|:--|:--
|ref|ref标识|string|--|--|
label-width|表单label宽度（统一配置），不配置不显示label|string|--|--
form-setting|表单布局配置，col-表示一行有多少个字段，itemWrap-表示label与input是否换行显示|object|--|{col:1, itemWrap: false}
`*` form-columns|表单字段配置（详见下面具体说明）|array|--|--
`*` button-list|表单操作提交按钮配置|array|--|--
validate-custom-list|表单新增校验规则定义数组，|array|--|--

&nbsp;

- 说明1：valiate-custom-list 新增表单校验规则示例：
```javascript
  // validator 函数中Error 对象需要在形参中传入，否则会报 $vm.Error not define 异常
  {
    validName: 'v-number',
    validator: function(item, Error){
      return function(rule, value, callback){
        if (!value) {
          return callback(Error(item.label + '不能为空'))
        }
        if (isNaN(value)) {
          callback(Error('请输入数字值dk'))
        } else {
          callback()
        }
      }
    }
  }
```

&nbsp;
### Form-columns

`* 为必填项`

属性名|说明|类型|可选值|默认值
--|:--|:--|:--|:--
label|字段名|string|--|--
`*` prop|字段属性名|string|--|--
type|字段类型|string|title-标题类型（无字段prop）<br> text-输入框<br> radio-单选框<br> select-下拉框<br> address-地址选择框<br> file-上传文件<br> preview-预览文件<br> dateRange-日期范围|text
validate|字段校验规则|array[string]|v-required-必填<br> v-number-数值<br> v-email-邮箱格式<br> v-compare-主从一致（主）<br> v-comdepend-主从一致（从）|--
translate|**[radio/select 限定]** 单选框/下拉框可选值配置|array[object]|--|--
valueType|**[address 限定]** 地址选择框值类型|string|text-中文地址（例："北京市市辖区东城区"）<br> code-地址编码组合(例："110000,110100,110101")|text
`*` props|**[dateRange 限定]** 日期范围选择框对应prop，必填项|array[string]|--|--
dependPropIndex|主从判断-依赖字段在当前form-columns 中的索引|number|--|--
setting|**[file 限定]** 上传文件格式、文件大小、上传接口配置，accept[string]-支持文件格式配置，fileSize(number)-最大支持上传文件大小，action(string)上传接口|object|--|{accept:['jpg'],fileSize: 1}
beforeUpload|[file 限定] 用于覆盖`<es-upload>` beforeUpload 方法，返回true 触发上传，返回false 拦截上传|function|--
`*` onSuccess|**[file 限定]** 必填项，文件上传成功后，表单字段赋值处理，Function({form,prop,result})，form-表单对象，prop-当前文件字段，result-上传成功后响应对象|function|--|--
onPdfPreview|**[file 限定]** 对于预览pdf 格式的预处理（转Blob）方法，Function(filepath)，filepath-pdf文件路径|function|--|--
resetButton|**[file 限定]** 默认上传文件成功后显示“变更”/“查看”按钮，只能通过“变更”替换字段值，开启resetButton 功能后，新增一个“移除”按钮，可清空当前file 字段值|boolean|--|false
 
&nbsp;
### Form Event

`* 为必填项`

事件名|说明|参数
--|:--|:--
`*` submit-event|表单组件校验通过后调用该方法，返回表单对象|Function(object)

&nbsp;

```html
    <!-- 示例 -->
    <es-form
      ref="es-form"
      label-width="120px"
      @submit-event="submitDialogForm"
      :form-setting="{
        col: 3,
        itemWrap: false
      }"
      :form-columns="[
        { label: '基本信息', type: 'title' },
        { label: '企业名称', prop: 'companyName', validate: ['v-required'] },
        { label: '信用代码', prop: 'businessLicenseCode', validate: ['v-required', 'v-number'] },
        { label: '创建人年龄', prop: 'createOperator', validate: ['v-required', 'v-number'] },
        { label: '状态值', prop: 'status2', type: 'radio', validate: ['v-required'], translate: status(0, 1) },
        { label: '类型', prop: 'type', type: 'select', validate: ['v-required'], translate: status() },
        { label: '地址', prop: 'addr', type: 'address', valueType: 'code', validate: ['v-required']},
        { label: '头像', prop: 'avatar', type: 'file', validate: ['v-required'], setting: { accept: ['jpg','png'], fileSize: 1, action: 'http://192.168.200.203:8099/index/upload'}, beforeUpload: false, onSuccess: fileSetting, onPdfPreview: pdfPreview, resetButton: true },
        { label: '基本信息', type: 'title' },
        { label: '创建时间', prop: 'dateRange', props: ['start', 'end'], type: 'dateRange', validate: ['v-required']},
        { label: '密码', prop: 'pwd', validate: ['v-required', 'v-compare'], dependPropIndex: 4 },
        { label: '确认密码', prop: 'rpwd', validate: ['v-required', 'v-comdepend'], dependPropIndex: 3 }
      ]"
      :button-list="[
        { buttonName: '取消', type: 'primary', clickEvent: 'close', assignCurrentParent: true },
        { buttonName: '确定+', clickEvent: 'submit', assignCurrentParent: true }
      ]"
      :validate-custom-list="[]"
    />
```

&nbsp;

##  `<es-menu>` 菜单组件 ####################################################################

&nbsp;

##  `<es-query>` 条件查询组件 ################################################################

- 集成`<es-form>`、`<es-button-group>` 组件

### Query Attribute

`* 为必填项`

|参数|说明|类型|可选值|默认值|
--|:--|:--:|:--|:--
|ref|ref标识|string|--|--|
pager-setting|列表分页器对象属性名配置|object|--|{currentPage: 'currentPage'}
form-setting|表单布局配置，详见`<es-form>`|object|--|{col:1, itemWrap: false}
form-columns|条件查询表单字段数组，详见`<es-form>`|array|--|--
button-list|条件查询按钮，详见`<es-button-group>`|array|--|[<br>&nbsp;&nbsp;&nbsp;&nbsp;{ buttonName: '查询', type: 'primary', clickEvent: 'query' },<br>&nbsp;&nbsp;&nbsp;&nbsp;{ buttonName: '重置', type: '', clickEvent: 'reset' }<br>]

&nbsp;

- 说明1：**Query Attribute** 中只列举部分属性，其他属性详见`<es-form>`、`<es-button-group>`;


&nbsp;

### Query Event

`* 为必填项`

事件名|说明|参数
--|:--|:--
`*` submit-event|同`<es-form>`，表单组件校验通过后调用该方法，返回表单对象|Function(object)

&nbsp;

##  `<es-table>` 列表组件 ###################################################################

&nbsp;

### Table Attribute

`* 为必填项`

|参数|说明|类型|可选值|默认值|
--|:--|:--:|:--|:--
|ref|ref标识|string|--|--|
title|表头标题，如果需要配置动态表头展示动态数据，该属性不可设置，而是通过插槽`<template slot="title">` 进行动态配置|string|--|--
quick-filter|表头快捷条件过滤按钮组，同`<es-button-group>` [button-list-setting]，且新增一个属性值，详见**Quick-filter**|array[object]|--|--
quick-filter-setting|快捷过滤按钮组属性名配置，同`<es-button-group>` [button-list-setting]|object|--|--
extra-operate|表头右侧按钮组，同`<es-button-group>` [button-list]|array|--|--
extra-operate-setting|表头右侧按钮组属性名配置，同`<es-button-group>` [button-list-setting]|object|--|--
`*` table-columns|列表字段数组，详见**Table-columns**|array|--|--
table-operate|列表操作列按钮数组，同`<es-button-group>` [button-list]|array|--|--
pager-setting|分页器属性名配置|object|--|{currentPage: 'currentPage'}
data|列表数据|array|--|--
pager|分页数据|object|--|{currentPage: 1, pageSize: 10, totalPage: 0, total: 0}

&nbsp;

- 说明1：部分**element-ui**`<el-table>` 属性未列出，如[size]、[border]等，但组件也支持；

### Quick-filter

`* 为必填项`
属性名|说明|类型|可选值|默认值
--|:--|:--|:--|:--
`*` buttonName|按钮名称，可通过[button-list-setting] 变更，但不推荐|string|--|--
type|按钮类型，对标element-ui 按钮类型|string|primary<br> success<br> warning<br> danger<br> info<br> text|--
default|[`<es-table>` 限定] 快捷过滤条件对象，即设置具体查询条件的按钮，点击直接按按钮上条件进行查询|object|--|--

&nbsp;

### Table-columns

`* 为必填项`

属性名|说明|类型|可选值|默认值
--|:--|:--|:--|:--
`*` label|字段名|string|--|--
`*` prop|字段属性名|string|--|--
type|**[selection 限定]** 列表中存在多选框列时需要配置，数据展示列不需配置|string|selection|--
width|列宽，一般除固定宽度列需要设置，其余列不推荐设置|number|--|--
translate|状态值解析对象，有别于`<es-form>` 中状态值选项是数组|object|--|--
moneyFormat|金额格式化，默认按千进添加逗号（,），保留两位小数，配置[ **moneyFormat={decimal: 3}** ] 可以配置保留小数位数，若按默认值进行格式化，则[ **moneyFormat=1** ] 或[ **moneyFormat=true** ] 即可|object/number/boolean|--|--
dateFormat|日期格式化，默认格式[ **YYYY-MM-DD HH:mm:ss** ]，如按默认格式格式化，则[ **dateFormat=1** ] 或[ **dateFormat=true** ] 即可；如需自定义格式化[dateFormat] 传入具体的日期格式即可|string/number/boolean|--|--
fixed|列是否固定在左侧或者右侧，true 表示固定在左侧，同element-ui `<el-table>` fixed|string/boolean|true/left/right|--
align|对齐方式，同element-ui `<el-table>` align|string|left/center/right|center



&nbsp;
### Table Event

`* 为必填项`

事件名|说明|参数
--|:--|:--
`*` query-event|列表查询方法，用于快捷条件过滤，分页查询，返回值为条件查询对象|Function(object)
selection-change|**[selection 限定]** 用于列表多选框变动时触发|Function(array)

&nbsp;

- 说明1：**query-event** 由于条件查询涉及多个组件（`<es-query>`、`<es-table> `快捷过滤按钮、`<es-table>`分页器）数据，所以请求前需要对这些数据进行合并，在发送请求；
```javascript
    getList(params) {
      // 整合条件参数
      Object.assign(this.queryParams, params)
      this.$api[this.baseUrl](this.queryParams).then(res=>{
        /* some codes */
      })

```

&nbsp;