
# [1.0.0-alpha][20210427]

- [init] 引入element-ui

# [1.0.10][20210428]

- [test] 测试继承element-ui

# [1.0.11][20210428]
+ [crt] 添加<es-menu> 导航菜单
- 继承<el-menu> 的所有“Menu Attribute”、“Menu Event”，使用同<el-menu>
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
+ <es-menu>
- 新增props 参数[list-setting]：设置导航菜单数组[menu-list] 中菜单对象的属性值

# [1.0.13][20210428]
+ <es-menu>
- 修复[list-setting] 不配置时设置默认值

# [1.0.14][20210428]
+ [upd] <es-menu>
- 修复子菜单点击触发实参非当前点击子菜单对象问题