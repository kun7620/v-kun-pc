import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

/**
 * 在主框架内显示
 */
const frameIn = [
  {
    path: '/',
    redirect: { name: 'index' },
    component: layoutHeaderAside,
    children: [
      // 首页
      {
        path: 'index',
        name: 'index',
        meta: {
          auth: true
        },
        component: _import('system/index')
      },
      {
        path: 'user',
        name: 'user',
        component: _import('admin/user'),
        meta: { title: '用户管理' }
      },
      {
        path: 'role',
        name: 'role',
        component: _import('admin/role'),
        meta: { title: '角色管理' }
      },
      {
        path: 'menu_',
        name: 'menu_',
        component: _import('admin/menu'),
        meta: { title: '菜单管理' }
      },
      {
        path: 'right',
        name: 'right',
        component: _import('admin/right'),
        meta: { title: '权限管理' }
      },
      {
        path: 'dict',
        name: 'dict',
        component: _import('admin/dict'),
        meta: { title: '数据字典' }
      },
      {
        path: 'task',
        name: 'task',
        component: _import('admin/task'),
        meta: { title: '定时任务' }
      },
      {
        path: 'iconfont',
        name: 'iconfont',
        component: _import('admin/iconfont'),
        meta: { title: 'iconfont' }
      },{
        path: 'page1',
        name: 'page1',
        meta: {
          title: '页面 1',
          auth: true
        },
        component: _import('demo/page1')
      },
      {
        path: 'page2',
        name: 'page2',
        meta: {
          title: '页面 2',
          auth: true
        },
        component: _import('demo/page2')
      },
      {
        path: 'page3',
        name: 'page3',
        meta: {
          title: '页面 3',
          auth: true
        },
        component: _import('demo/page3')
      },
      // 系统 前端日志
      {
        path: 'log',
        name: 'log',
        meta: {
          title: '前端日志',
          auth: true
        },
        component: _import('system/log')
      },
      // 刷新页面 必须保留
      {
        path: 'refresh',
        name: 'refresh',
        hidden: true,
        component: _import('system/function/refresh')
      },
      // 页面重定向 必须保留
      {
        path: 'redirect/:route*',
        name: 'redirect',
        hidden: true,
        component: _import('system/function/redirect')
      }
    ]
  }
]

/**
 * 在主框架之外显示
 */
const frameOut = [
  // 登录
  {
    path: '/login',
    name: 'login',
    component: _import('system/login')
  }
]

/**
 * 错误页面
 */
const errorPage = [
  {
    path: '*',
    name: '404',
    component: _import('system/error/404')
  }
]

// 导出需要显示菜单的
export const frameInRoutes = frameIn

// 重新组织后导出
export default [
  ...frameIn,
  ...frameOut,
  ...errorPage
]
