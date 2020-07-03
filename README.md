[D2Admin](https://github.com/d2-projects/d2-admin) is a fully open source and free enterprise back-end product front-end integration solution, using the latest front-end technology stack, javascript files loading of local first screen less than 60kb, has prepared most of the project preparations, and with a lot of sample code to help the management system agile development.

[中文](https://github.com/d2-projects/d2-admin-start-kit/blob/master/README.zh.md) | **English**

## Preview
├─.browserslistrc ------------------- // 目标浏览器配置
├─.editorconfig --------------------- // 编辑器配置
├─.env ------------------------------ // 基础环境变量配置
├─.env.development ------------------ // 开发模式下的环境变量配置
├─.env.preview ---------------------- // 各个环境通用的环境变量
├─.eslintignore --------------------- // ESLint 的忽略目录配置
├─.eslintrc.js ---------------------- // ESLint 的配置文件
├─.github --------------------------- // Github 配置
│ ├─ISSUE_TEMPLATE ------------------ // GitHub issue 模板
│ └─workflows ----------------------- // GitHub action 配置文件
├─.gitignore ------------------------ // git 的忽略配置
├─.postcssrc.js --------------------- // postcss 插件设置
├─.releaserc.js --------------------- // semantic 配置文件
├─LICENSE --------------------------- // 开源协议
├─README.md ------------------------- // 介绍
├─README.zh.md ---------------------- // 中文介绍 在码云仓库下自动加载这个文件
├─babel.config.js ------------------- // babel 设置
├─d2-admin.babel -------------------- // 多国语设置软件 BabelEdit 的项目文件
├─dependencies-cdn.js --------------- // 构建时的 CDN 依赖配置
├─docs ------------------------------ // 文档相关
├─jest.config.js -------------------- // 单元测试配置
├─jsconfig.json --------------------- // 指定根文件和 JavaScript 语言服务提供的功能选项
├─package-lock.json ----------------- // 锁定依赖版本
├─package.json ---------------------- // 项目信息和依赖
├─public ---------------------------- // 静态资源文件夹，不经过 webpack 处理
│ ├─html ---------------------------- // 用于演示加载静态页面的资源
│ ├─icon.ico ------------------------ // 网站图标
│ ├─image 
│ │ ├─baidu-pan-logo.png 
│ │ ├─loading ----------------------- // index.html 使用的加载图标
│ │ │ └─loading-spin.svg 
│ │ └─theme ------------------------- // 主题图片资源
│ │   ├─chester 
│ │   ├─d2 
│ │   ├─element 
│ │   ├─line 
│ │   ├─star 
│ │   ├─tomorrow-night-blue 
│ │   └─violet 
│ ├─index.html ---------------------- // 网站的基础页面模板
│ ├─lib ----------------------------- // 静态依赖
│ │ └─UEditor ----------------------- // 编辑器
│ └─markdown ------------------------ // 用于展示 Markdown 远程加载资源的文件
├─src ------------------------------- // 主要的代码目录
│ ├─App.vue ------------------------- // 项目根组件
│ ├─api ----------------------------- // 网络请求配置
│ │ ├─index.js 
│ │ ├─modules ----------------------- // API 配置
│ │ │ ├─demo.js 
│ │ │ ├─file.js 
│ │ │ └─sys.user.js 
│ │ ├─service.js -------------------- // 用于网络请求的实例配置
│ │ └─tools.js ---------------------- // 网络请求相关工具函数
│ ├─assets -------------------------- // 资源文件夹
│ │ ├─style ------------------------- // 样式资源
│ │ │ ├─animate --------------------- // 页面过渡动画
│ │ │ │ └─vue-transition.scss 
│ │ │ ├─fixed ----------------------- // 覆盖一些组件库的默认样式
│ │ │ ├─public-class.scss ----------- // 导出可以直接使用的 class
│ │ │ ├─public.scss ----------------- // 导出所有公用的 scss 资源
│ │ │ ├─theme ----------------------- // 主题样式相关
│ │ │ │ ├─chester 
│ │ │ │ ├─d2 
│ │ │ │ ├─element 
│ │ │ │ ├─line 
│ │ │ │ ├─register.scss ------------- // 注册所有主题样式
│ │ │ │ ├─star 
│ │ │ │ ├─theme-base.scss ----------- // 每个主题共用的样式
│ │ │ │ ├─theme.scss ---------------- // 每个主题特有的设置
│ │ │ │ ├─tomorrow-night-blue 
│ │ │ │ └─violet 
│ │ │ └─unit ------------------------ // scss 的基础变量
│ │ │   └─color.scss 
│ │ └─svg-icons --------------------- // svg 图标
│ │   ├─icons ----------------------- // 用来存放图标的文件夹
│ │   └─index.js -------------------- // 自动导入所有符合条件的图标
│ ├─components ---------------------- // 组件
│ │ ├─d2-container ------------------ // 页面容器
│ │ ├─d2-container-frame ------------ // 用于显示外部网页的页面容器
│ │ ├─d2-count-up ------------------- // 数字动画组件
│ │ ├─d2-highlight ------------------ // 代码高亮组件
│ │ ├─d2-icon ----------------------- // 图标组件
│ │ ├─d2-icon-select ---------------- // 图标选择组件
│ │ ├─d2-icon-svg ------------------- // svg 图标组件
│ │ ├─d2-icon-svg-select ------------ // svg 图标选择组件
│ │ ├─d2-link-btn ------------------- // 链接组件
│ │ ├─d2-markdown ------------------- // Markdown 加载和显示组件
│ │ ├─d2-mde ------------------------ // Markdown 编辑器
│ │ ├─d2-module-index-banner -------- // 演示用 每个模块首页的展示组件
│ │ ├─d2-module-index-menu ---------- // 演示用 每个模块首页的展示组件
│ │ ├─d2-quill ---------------------- // 富文本编辑器
│ │ ├─d2-ueditor -------------------- // 富文本编辑器
│ │ └─index.js ---------------------- // 组件注册
│ ├─i18n.js ------------------------- // 国际化配置
│ ├─layout -------------------------- // 布局
│ │ └─header-aside ------------------ // 具有顶栏加侧边栏的布局
│ │   ├─components 
│ │   ├─index.js 
│ │   ├─layout.vue 
│ │   └─mixins 
│ │     └─search.js 
│ ├─libs ---------------------------- // 一些通用的方法
│ │ ├─util.cookies.js --------------- // cookie 相关
│ │ ├─util.db.js -------------------- // 数据存储相关
│ │ ├─util.import.development.js ---- // 开发环境下使用的页面导入方法
│ │ ├─util.import.production.js ----- // 开发环境下使用的页面导入方法
│ │ ├─util.js ----------------------- // 杂项
│ │ └─util.log.js ------------------- // 日志相关
│ ├─locales ------------------------- // 国际化语言配置
│ │ ├─en.json 
│ │ ├─ja.json 
│ │ ├─mixin.js 
│ │ ├─zh-chs.json 
│ │ └─zh-cht.json 
│ ├─main.js ------------------------- // 程序主入口
│ ├─menu ---------------------------- // 静态的菜单数据
│ │ ├─index.js 
│ │ └─modules 
│ │   ├─demo-business.js 
│ │   ├─demo-charts.js 
│ │   ├─demo-components.js 
│ │   ├─demo-d2-crud.js 
│ │   ├─demo-frame.js 
│ │   ├─demo-playground.js 
│ │   └─demo-plugins.js 
│ ├─plugin -------------------------- // 插件
│ │ ├─api 
│ │ ├─d2admin ----------------------- // 统一注册系统必须的资源
│ │ ├─error ------------------------- // 错误拦截
│ │ ├─log --------------------------- // 日志
│ │ └─open -------------------------- // 新窗口打开
│ ├─router -------------------------- // 路由
│ │ ├─index.js ---------------------- // 注册路由以及设置拦截规则
│ │ ├─modules ----------------------- // 预先设置好的静态路由
│ │ │ ├─business.js 
│ │ │ ├─charts.js 
│ │ │ ├─components.js 
│ │ │ ├─d2-crud.js 
│ │ │ ├─frame.js 
│ │ │ ├─playground.js 
│ │ │ └─plugins.js 
│ │ └─routes.js --------------------- // 导入所有路由
│ ├─setting.js ---------------------- // 全局设置
│ ├─store --------------------------- // vuex
│ │ ├─index.js ---------------------- // vuex 注册主入口
│ │ └─modules ----------------------- // 模块目录
│ │   └─d2admin --------------------- // 系统自带模块，业务模块建议在同级新建
│ │     ├─index.js ------------------ // 模块主入口
│ │     └─modules ------------------- // 子模块
│ │       ├─account.js -------------- // 用户身份
│ │       ├─color.js ---------------- // 主题颜色
│ │       ├─db.js ------------------- // 本地数据库
│ │       ├─fullscreen.js ----------- // 全屏
│ │       ├─gray.js ----------------- // 灰度模式
│ │       ├─log.js ------------------ // 日志
│ │       ├─menu.js ----------------- // 菜单
│ │       ├─page.js ----------------- // 多页面控制
│ │       ├─releases.js ------------- // 版本
│ │       ├─search.js --------------- // 全局搜索
│ │       ├─size.js ----------------- // 全局尺寸
│ │       ├─theme.js ---------------- // 主题
│ │       ├─transition.js ----------- // 过渡效果
│ │       ├─ua.js ------------------- // 浏览器信息
│ │       └─user.js ----------------- // 用户信息
│ └─views --------------------------- // 页面视图
│   ├─demo -------------------------- // 演示页面
│   │ ├─business -------------------- // 业务页面演示
│   │ ├─charts ---------------------- // 图表
│   │ ├─components ------------------ // 内置组件演示
│   │ ├─d2-crud --------------------- // D2CRUD 表格封装演示
│   │ ├─element --------------------- // Element UI 组件
│   │ ├─frame ----------------------- // 嵌套第三方页面演示
│   │ ├─playground ------------------ // 试验台
│   │ └─plugins --------------------- // 插件演示
│   └─system ------------------------ // 系统页面
├─tests ----------------------------- // 单元测试
│ └─unit 
├─vue.config.js --------------------- // vue-cli3 的项目配置文件
└─yarn.lock ------------------------- // 版本锁定
