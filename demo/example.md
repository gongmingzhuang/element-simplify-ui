- <h1 id="home">element-simplify-ui  组件使用说明</h1>
* <a href="#es-button">[ es-button ]</a>
* <a href="#es-button-group">[ es-button-group ]</a>
* <a href="#es-crumb">[ es-crumb ]</a>
* <a href="#es-dialog">[ es-dialog ]</a>
* <a href="#es-dialog-form">[ es-dialog-form ]</a>
* <a href="#es-form">[ es-form ]</a>
* <a href="#es-menu">[ es-menu ]</a>
* <a href="#es-query">[ es-query ]</a>
* <a href="#es-table">[ es-table ]</a>


# #######################################################
<h1 id="es-button">[ es-button ] 按钮组件 <span style="font-size: 14px">[ <a href="#home">返回头部</a> ]</span></h1>

- 用法同 `<el-button>`；

&nbsp;

# #######################################################
<h1 id="es-button-group">[ es-button-group ] 按钮组组件 <span style="font-size: 14px">[ <a href="#home">返回头部</a> ]</span></h1>

&nbsp;

使用`<es-button-group>` 组件配置参数

- 内置该组件的组件`<es-crumb>`、`<es-dialog>`、`<es-dialog-form>`、`<es-form>`、`<es-query>`、`<es-table>`

&nbsp;

### Button-Group Attribute

`* 为必填项`

`[*.*.*] - 于指定版本新增`

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

`[*.*.*] - 于指定版本新增`
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
loadingCtrl <sup>[1.0.33]</sup>|加载状态控制开关，受$attrs.loading 控制|boolean|--|false

&nbsp;

- 说明1：visible 类型为array 时，object 元素为对应字段值，例{status: 0, index: 1} 表示当列数据status=0 且index=1时，该元素符合可见要求；invisible 类型为array 时同理；<br>
- 说明2：当同时设置visible 和invisible 时，visible 的优先级高于invisible，即满足visible 要求时，不再对invisible 进行判断，故不推荐同时设置；<br>

&nbsp;
# #######################################################
<h1 id="es-crumb">[ es-crumb ] 面包屑组件 <span style="font-size: 14px">[ <a href="#home">返回头部</a> ]</span></h1>

### Crumb Attribute

`* 为必填项`

`[*.*.*] - 于指定版本新增`

|参数|说明|类型|可选值|默认值|
--|:--|:--:|:--|:--
ref|ref标识|string|--|--
`*` crumbList|面包屑数组，详细配置见下方**Crumb-list**|array[object]|--|--
listSetting|面包屑数组元素对象属性名配置，不推荐使用|object|--|{crumbName: 'crumbName', to: 'to', replace: 'replace'}
button-list-setting|按钮数组元素对象属性名配置，见`<es-button-group>`|object|--|--
button-list|右侧按钮数组，见`<es-button-group>`|array|--|--
prefix-icon <sup>[1.0.28]</sup>| 添加面包屑前缀icon配置项，如需自定义配置，也可通过插槽[slot:prefix-icon]，优先级低于配置项|string/object|--|--

&nbsp;

- 说明1：[prefix-icon] 配置项为string 时，必需为[icon] class，对应element-ui icon；
- 说明2：[prefix-icon] 配置项为object 时，该对象为{className, to}，className（必填） 对应icon class，to（可选） 对应点击跳转路由；

&nbsp;

### Crumb-list

`* 为必填项`

`[*.*.*] - 于指定版本新增`

属性名|说明|类型|可选值|默认值
--|:--|:--:|:--|:--
`*` crumbName|面包屑名，可通过**list-setting**变更该属性名，但不推荐|string|--|--
to|路由跳转对象，同 vue-router 的 to，对标element-ui to|string/object|--|--
replace|在使用 to 进行路由跳转时，启用 replace 将不会向 history 添加新记录，对标element-ui replace|boolean|--|false

```html
<!-- 示例 -->
<es-crumb
  :crumb-list="[
        { crumbName: '首页' },
        { crumbName: '基础管理'},
        { crumbName: '个人中心' }
      ]"
  :prefix-icon="{
      className: 'el-icon-position crumb-icon',
      to: '/'
    }"
  :button-list="[
        { buttonName: '添加', size: 'mini', clickEvent: openDialog, assignCurrentParent: true, visible: /添加/.test(btnJur) && stackArray.length === 1 },
        { buttonName: '返回上一级', size: 'mini', type: 'success', clickEvent: 'stackBack', visible: stackArray.length > 1},
      ]"
/>
```

&nbsp;
# #######################################################
<h1 id="es-dialog">[ es-dialog ] 弹窗组件 <span style="font-size: 14px">[ <a href="#home">返回头部</a> ]</span></h1>

- 当前功能提示语弹窗

### Dialog Attribute
`* 为必填项`

`[*.*.*] - 于指定版本新增`

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

```html
<!-- 示例 -->
<es-dialog
  ref="esDialog"
  :title="'提示'"
  :tips="'这是一段信息'"
  :button-list="[
    { buttonName: '取消', type: 'primary', clickEvent: 'close', assignCurrentParent: true  },
    { buttonName: '确定', clickEvent: 'close', assignCurrentParent: true  }
  ]"
/>
```

&nbsp;
# #######################################################
<h1 id="es-dialog-form">[ es-dialog-form ] 弹窗表单组件 <span style="font-size: 14px">[ <a href="#home">返回头部</a> ]</span></h1>

### Dialog-form Attribute
`* 为必填项`

`[*.*.*] - 于指定版本新增`

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

```html
<!-- 示例 -->
<es-dialog-form
  ref="esDialogForm"
  :title="'收获地址'"
  labelWidth="100px"
  @submit-event="submitDialogForm"
  :form-setting="{
    col: 2
  }"
  :form-columns="[
    { label: '基本信息', type: 'title' },
    { label: '企业名称', prop: 'companyName', validate: ['v-required'] },
    { label: '信用代码', prop: 'businessLicenseCode', validate: ['v-required', 'v-number'] },
    { label: '创建人年龄', prop: 'createOperator', validate: ['v-required', 'v-number'] },
    { label: '头像', prop: 'avatar', type: 'file', validate: [], setting: { accept: ['jpg','png'], filesize: 10, action: 'http://192.168.200.203:8099/index/upload'}, beforeUpload: false, onSuccess: fileSetting, onPdfPreview: pdfPreview, resetButton: true },
    { label: '基本信息', type: 'title' },
    { label: '创建时间', prop: 'dateRange', props: ['start', 'end'], type: 'dateRange', validate: ['v-required'], valueFormat: 'yyyy/MM/DD'},
    { label: '密码', prop: 'pwd', validate: ['v-required', 'v-compare'], dependPropIndex: 4 },
    { label: '确认密码', prop: 'rpwd', validate: ['v-required', 'v-comdepend'], dependPropIndex: 3 }
  ]"
  :button-list="[
    { buttonName: '取消', clickEvent: 'close', assignCurrentParent: true },
    { buttonName: '确定', type: 'primary', clickEvent: 'submit', assignCurrentParent: true }
  ]"
/>
```

&nbsp;
# #######################################################
<h1 id="es-form">[ es-form ] 表单组件 <span style="font-size: 14px">[ <a href="#home">返回头部</a> ]</span></h1>

&nbsp;
### Form Attribute

`* 为必填项`

`[*.*.*] - 于指定版本新增`

|参数|说明|类型|可选值|默认值|
--|:--|:--:|:--|:--
|ref|ref标识|string|--|--|
label-width|表单label宽度（统一配置），不配置不显示label|string|--|--
form-setting|表单布局配置<br> col ( Number )-表示一行有多少个字段<br> itemWrap ( Boolean )-表示label与input是否换行显示<br> itemWidth ( String )<sup>[1.0.28]</sup>(string，e.g. '100px')-标识所有**form-item** 采用固定宽度<br> hiddeButton ( Boolean )<sup>[1.0.32]</sup> - 隐藏默认表单提交按钮，隐藏后可通过 this.$refs['es-form'].submit() 触发提交表单<br> loadingCtrl ( Boolean )<sup>[1.0.33]</sup> - 与$props.loading、buttonListItem.loadingCtrl 进行加载状态控制，加载中，表单元素处于不可编辑/操作状态，只有[buttonListItem.loadingCtrl=true] 才有加载状态 |object|--|{col:1, itemWrap: false}
`*` form-columns|表单字段配置（详见下面具体说明）|array|--|--
`*` button-list|表单操作提交按钮配置|array|--|--
validate-custom-list|表单新增校验规则定义数组，|array|--|--

&nbsp;
### Validate Custom List

`* 为必填项`

`[*.*.*] - 于指定版本新增`

|参数|说明|类型|可选值|默认值|
--|:--|:--:|:--|:--
|validName|自定义校验规则名，与[formColumnsItem.validate] 匹配|string|--|--|
validator|自定义校验规则，返回值为vue 校验规则方法，item - [formColumnsItem]|function(item){return function(rule, value, callback)}|--|--
trigger<sup>[1.0.34]</sup>|自定义校验规则触发时机，缺省时触发时机为[blur\change]|array[string]|--|--

&nbsp;

- 说明1：valiate-custom-list 新增表单校验规则示例：
```javascript
  // validator 函数中Error 对象需要在形参中传入，否则会报 $vm.Error not define 异常
  {
    validName: 'v-number',
    validator: function(item){
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
  },
  /* [1.0.34] 远程校验 */
  {
    validName: 'v-repeat',
    trigger: ['blur'], /* [1.0.34] */
    validator: function(item, _this/* [1.0.34] */, _dynamicParam /* [1.0.34] */){
      return function(rule, value, callback) {
        if (!value) {
          callback()
        } else {
          let params = {}
          // 获取动态参数
          _dynamicParam && Object.assign(params, _dynamicParam()) 
          params[item.prop] = value
          // 通过vue 实例获取请求对象
          _this.$api.api(params).then(res => {
            let { code, data } = res.data
            if (code === 0 && data) {
              callback()
            } else {
              callback(new Error('字段已重复'))
            }
          })
        }
      }
    }
  }
```

&nbsp;
### Form-columns

`* 为必填项`

`[*.*.*] - 于指定版本新增`

属性名|说明|类型|可选值|默认值
--|:--|:--|:--|:--
label|字段名|string|--|--
`*` prop|字段属性名|string|--|--
type|字段类型|string|title-标题类型（无字段prop）<br> text-输入框<br> radio-单选框<br> select-下拉框<br> address-地址选择框<br> file-上传文件<br> preview-预览文件<br> dateRange-日期范围<br> password <sup>[1.0.30]</sup>-密码类型<br> code <sup>[1.0.30]</sup>-验证码类型<br> slot <sup>[1.0.31]</sup>-插槽类型（通过该类型可自定义表单元素）<br> message <sup>[1.0.32]</sup>-短信验证码类型<br> checkbox<sup>[1.0.32]</sup> - 复选框<br> txt<sup>[1.0.32]</sup> - 展示类文本类型，使用span 标签|text
validate|字段校验规则<br>支持出入传入对象{validator,message} 用于重置默认提示消息。<sup>[1.0.30]</sup>|array[string/（object<sup>[1.0.30]</sup>）]|v-required-必填<br> v-number-数值<br> v-email-邮箱格式<br> v-compare-主从一致（主）<br> v-comdepend-主从一致（从）<br> v-minlength <sup>[1.0.30]</sup>-限定最少需输入位数<br> v-comdepend-主从一致（从）<br> v-phone<sup>[1.0.32]</sup> - 固话校验，校验规则（/^\d{3}-\d{8}$\|^\d{4}-\d{7}$/）<br> v-mobile<sup>[1.0.34]</sup> - 手机号校验<br> v-telephone<sup>[1.0.34]</sup> - 手机号+固话校验|--
validateSetting<sup>[1.0.34]</sup>|自定义校验规则增强配置项，支持配置项dynamicParams - 动态参数，具体使用见示例|object{object}|--|--
translate|**[radio/select 限定]** 单选框/下拉框可选值配置|array[object]|--|--
valueType|**[address 限定]** 地址选择框值类型|string|text-中文地址（例："北京市市辖区东城区"）<br> code-地址编码组合(例："110000,110100,110101")|text
`*` props|**[dateRange 限定]** 日期范围选择框对应prop，必填项|array[string]|--|--
dependPropIndex|主从判断-依赖字段在当前form-columns 中的索引|number|--|--
setting|**[file 限定]** 上传文件格式、文件大小、上传接口配置，accept[string]-支持文件格式配置，fileSize(number)-最大支持上传文件大小，action(string)上传接口|object|--|{accept:['jpg'],fileSize: 1}
setting<sup>[1.0.32]</sup>|**[1.0.32 新增]** 通用配置项 |object|--|--
beforeUpload|[file 限定] 用于覆盖`<es-upload>` beforeUpload 方法，返回true 触发上传，返回false 拦截上传|function|--
`*` onSuccess|**[file 限定]** 必填项，文件上传成功后，表单字段赋值处理，Function({form,prop,result})，form-表单对象，prop-当前文件字段，result-上传成功后响应对象|function|--|--
onPdfPreview|**[file 限定]** 对于预览pdf 格式的预处理（转Blob）方法，Function(filepath)，filepath-pdf文件路径|function|--|--
resetButton|**[file 限定]** 默认上传文件成功后显示“变更”/“查看”按钮，只能通过“变更”替换字段值，开启resetButton 功能后，新增一个“移除”按钮，可清空当前file 字段值|boolean|--|false
minlength <sup>[1.0.30]</sup>|**[validate[v-minlength] 限定]** 校验规则限定，控制最少需输入位数|number|--|--
refreshEvent <sup>[1.0.30]</sup>|**[code 限定]** 验证码类型限定，配置验证码刷新方法，其中event-为事件对象，formColumnItem-为对应**form-columns**元素，codeConfig({path})-为验证码图片配置属性，通过将验证码图片路径传递给codeConfig.path 即可显示验证码，并支持点击验证码刷新|function(event,formColumnItem,codeConfig)|--|--
requestEvent <sup>[1.0.32]</sup>|**[message 限定]** 短信验证码类型限定，配置触发短信请求方法|function(formColumnItem)|--|--
invisibleControl <sup>[1.0.32]</sup>|动态控制显示/隐藏表单元素操作|function(formColumnItem){return Boolean}|--|--
&nbsp;

- 注1<sup>[1.0.32]</sup>：[type:message], setting{interval: 60, buttonType: 'primary'}，**interval** - 该属性设置每次请求短信的间隔时间（秒），默认为10s；**buttonType** - 该属性按钮类型，对应element-ui 中[button] 的**type**。
- 注2<sup>[1.0.32]</sup>：[type:address]，setting{detail:{prop}}，配置detail 对象可使用详细地址字段；
- 注3<sup>[1.0.32]</sup>：[formColumnsItem:setting.readonly]/[formColumnsItem:setting.disabled]，控制表单元素是否可编辑/操作，[type:input]-使用readonly，其余使用disabled;
- 注4<sup>[1.0.34]</sup>：[validateSetting[validateName].dynamicParams] 该配置参数不推荐使用，替换方案可以使用function validator(item, _this) 中**_this** 获取vue 示例再获取相应动态参数；
&nbsp;

### Form Event

`* 为必填项`

`[*.*.*] - 于指定版本新增`

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
      :loading="loading"
      :form-setting="{
        col: 3,
        itemWrap: false,
        loadingCtrl: true
      }"
      :form-columns="[
        { label: '基本信息', type: 'title' },
        { label: '品牌', prop: 'blankName', type: 'txt' },
        { label: '企业名称', prop: 'companyName', type: 'slot', validate: ['v-required'] },
        { label: '信用代码', prop: 'businessLicenseCode', validate: ['v-required', 'v-number'] },
        { label: '创建人年龄', prop: 'createOperator', validate: ['v-required', 'v-numx'] },
        { label: '状态值', prop: 'status2', type: 'radio', validate: ['v-required'], translate: status(0, 1) },
        { label: '类型', prop: 'type', type: 'select', validate: ['v-required'], translate: status() },
        { label: '地址', prop: 'addr', type: 'address', valueType: 'code', validate: ['v-required']},
        { label: '地址2', type: 'slot', prop: 'addr', setting: { detail: { prop: 'addrDetail' } }, validate: ['v-required'], valueType: 'code' },
        { label: '头像', prop: 'avatar', type: 'file', validate: ['v-required'], setting: { accept: ['jpg','png'], fileSize: 1, action: 'http://192.168.200.203:8099/index/upload'}, beforeUpload: false, onSuccess: fileSetting, onPdfPreview: pdfPreview, resetButton: true },
        { label: '基本信息', type: 'title' },
        { label: '创建时间', prop: 'dateRange', props: ['start', 'end'], type: 'dateRange', validate: ['v-required']},
        { label: '密码', prop: 'pwd', type: 'password', validate: ['v-required', 'v-compare'], dependPropIndex: 4 },
        { label: '确认密码', prop: 'rpwd',type: 'password', validate: ['v-required', 'v-comdepend'], dependPropIndex: 3 }
        { label: '验证码', prop: 'createOperator', type: 'code', validate: ['v-required', 'v-numx'], refreshEvent: refreshCode },
        { label: '短信验证码', prop: 'messageCode', type: 'message', validate: ['v-required'], setting:{ interval: 30, buttonType: 'text' }, requestEvent: getCode },
        { label: '类型', type: 'checkbox', prop: 'coopType', translate: [ { label: '超市', value: 1 }], setting: { isWholeLine: true }, validate: ['v-required'] },
        { label: '账号', prop: 'userName', validate: ['v-repeat'], validateSetting: { 'v-repeat': { dynamicParams: ()=> this.params } }}
      ]"
      :button-list="[
        { buttonName: '取消', type: 'primary', clickEvent: 'close', loadingCtrl: true,  assignCurrentParent: true },
        { buttonName: '确定+', clickEvent: 'submit', assignCurrentParent: true }
      ]"
      :validate-custom-list="[
        {
          validName: 'v-numx',
          validator: (item) =>
            (rule, value, callback) =>{
              if (!value) {
                return callback(Error(item.label + '不能为空'))
              }
              if (isNaN(value)) {
                callback(Error('请输入数字值'))
              } else {
                callback()
              }
            }
        },
        {
        validName: 'v-repeat',
        trigger: ['blur'], /* 自定义触发时机 */
        validator: function (item, _this, _dynamicParams) {
          return function(rule, value, callback) {
            if (!value) {
              callback()
            } else {
              let params = {}
              // 获取动态参数
              _dynamicParams && Object.assign(params, _dynamicParams()) 
              params[item.prop] = value
              // 通过vue 实例获取请求对象
              _this.$api.api(params).then(res => {
                let { code, data } = res.data
                if (code === 0 && data) {
                  callback()
                } else {
                  callback(new Error('字段已重复'))
                }
              })
            }
          }
        }
      }
      ]"
    >
      <!-- [1.0.31] 新增 -->
      <template slot="companyName" slot-scope="scope">
        <el-input v-model="scope.form[scope.item.prop]" maxlength="3"/>
      </template>
    </es-form>
```

&nbsp;
# #######################################################
<h1 id="es-menu">[ es-menu ] 菜单组件 <span style="font-size: 14px">[ <a href="#home">返回头部</a> ]</span></h1>

&nbsp;

# #######################################################
<h1 id="es-query">[ es-query ] 条件查询组件 <span style="font-size: 14px">[ <a href="#home">返回头部</a> ]</span></h1>

- 集成`<es-form>`、`<es-button-group>` 组件

### Query Attribute

`* 为必填项`

`[*.*.*] - 于指定版本新增`

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

`[*.*.*] - 于指定版本新增`

事件名|说明|参数
--|:--|:--
`*` submit-event|同`<es-form>`，表单组件校验通过后调用该方法，返回表单对象|Function(object)

```html
<!-- 示例 -->
<es-query
  @submit-event="getList"
  label-width="150px"
  :form-setting="{
    col: 3,
    itemWrap: false
  }"
  :form-columns="[
        { label: '企业名称', prop: 'companyName' },
        { label: '统一社会信用代码', prop: 'businessLicenseCode' },
        { label: '创建时间', prop: 'dateRange', props: ['start', 'end'], type: 'dateRange'},
      ]"
  :pager-setting="{
    currentPage: 'pageNum'
  }"
/>
```

&nbsp;
# #######################################################
<h1 id="es-table">[ es-table ] 列表组件 <span style="font-size: 14px">[ <a href="#home">返回头部</a> ]</span></h1>

&nbsp;

### Table Attribute

`* 为必填项`

`[*.*.*] - 于指定版本新增`

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

`[*.*.*] - 于指定版本新增`
属性名|说明|类型|可选值|默认值
--|:--|:--|:--|:--
`*` buttonName|按钮名称，可通过[button-list-setting] 变更，但不推荐|string|--|--
type|按钮类型，对标element-ui 按钮类型|string|primary<br> success<br> warning<br> danger<br> info<br> text|--
default|[`<es-table>` 限定] 快捷过滤条件对象，即设置具体查询条件的按钮，点击直接按按钮上条件进行查询|object|--|--

&nbsp;

### Table-columns

`* 为必填项`

`[*.*.*] - 于指定版本新增`

属性名|说明|类型|可选值|默认值
--|:--|:--|:--|:--
`*` label|字段名|string|--|--
`*` prop|字段属性名|string|--|--
type|**[selection 限定]** 列表中存在多选框列时需要配置，数据展示列不需配置|string|selection|--
width|列宽，一般除固定宽度列需要设置，其余列不推荐设置|number|--|--
tagSetting<sup>[1.0.28]</sup>|状态值设置`<el-tag>` 配置，取值对应elemeng-ui `<el-tag>` 中的[type]|object|--|--
translate|状态值解析对象，有别于`<es-form>` 中状态值选项是数组|object|--|--
moneyFormat|金额格式化，默认按千进添加逗号（,），保留两位小数，配置[ **moneyFormat={decimal: 3}** ] 可以配置保留小数位数，若按默认值进行格式化，则[ **moneyFormat=1** ] 或[ **moneyFormat=true** ] 即可|object/number/boolean|--|--
dateFormat|日期格式化，默认格式[ **YYYY-MM-DD HH:mm:ss** ]，如按默认格式格式化，则[ **dateFormat=1** ] 或[ **dateFormat=true** ] 即可；如需自定义格式化[dateFormat] 传入具体的日期格式即可|string/number/boolean|--|--
fixed|列是否固定在左侧或者右侧，true 表示固定在左侧，同element-ui `<el-table>` fixed|string/boolean|true/left/right|--
align|对齐方式，同element-ui `<el-table>` align|string|left/center/right|center


&nbsp;

- 说明1：列表对应字段必须含有[object:translate(object)] 属性，且[tagSetting(object)] 值和[translate(object)] 对应；
- 说明2：[tagSetting(object)] 可设置默认值[default]，当状态值匹配不到时，取该值；

&nbsp;
### Table Event

`* 为必填项`

`[*.*.*] - 于指定版本新增`

事件名|说明|参数
--|:--|:--
`*` submit-event|列表查询方法，用于快捷条件过滤，分页查询，返回值为条件查询对象|Function(object)
selection-change|**[selection 限定]** 用于列表多选框变动时触发|Function(array)

&nbsp;

- 说明1：**submit-event** 由于条件查询涉及多个组件（`<es-query>`、`<es-table> `快捷过滤按钮、`<es-table>`分页器）数据，所以请求前需要对这些数据进行合并，在发送请求；
```javascript
    getList(params) {
      // 整合条件参数
      Object.assign(this.queryParams, params)
      this.$api[this.baseUrl](this.queryParams).then(res=>{
        /* some codes */
      })

```
```html
<!-- 示例 -->
    <es-table
      @submit-event="getList"
      @selection-change="handleSelectionChange"
      :quick-filter="[
        {buttonName: '全部', type:'primary', default: { status: ''}},
        {buttonName: '已生效', default: { status: 1}},
        {buttonName: '未生效', default: { status: 2}},
        {buttonName: '禁用', default: { status: 3}}
      ]"
      :extra-operate="[
        { buttonName: '选择子公司', size: 'mini', clickEvent: openDialogForm },
        { buttonName: '返回上一级', size: 'mini', clickEvent: 'openDialogForm2' }
      ]"
      :table-columns="[
        { label: '', prop: 'eid', type: 'selection', width: 100 },
        { label: '企业名称', prop: 'companyName', width: 200 },
        { label: '信用代码', prop: 'businessLicenseCode', width: 250 },
        { label: '已开通服务', prop: 'capitalNames' },
        { label: '状态', prop: 'status', 
          translate: {
              1: '已生效', 
              2: '回退', 
              3: '禁用', 
              0: '未生效'
            },
          tagSetting: {
            0: 'info',
            1: 'success',
            3: 'danger',
            'default': 'warning'
          }
        },
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
      stripe
    >
      <template slot="title">企业列表（{{tableData.pager.total}}）</template>
    </es-table>
```
&nbsp;