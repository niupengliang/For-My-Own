import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入local
import local from '@/utils/local'

// 引入组件
import Login from '@/views/Login'
import Layout from '@/views/Layout'

// 解决警告
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}
Vue.use(VueRouter)

// 路由配置【不变的 默认的 】
const routes = [
  // 登录
  {
    path: '/login',
    component: Login
  },
  // 后端大布局
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    meta: { title: '后台首页' },
    children: [
      { path: '/home', component: () => import('@/views/Home/index.vue') }
    ]
  },
]

// 异步路由配置【 用于计算权限路由 】
const asyncRoutes = [
  // 登录
  {
    path: '/login',
    component: Login,
    meta: { isNav: false }
  },

  // 后端大布局
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    meta: { title: '后台首页', icon: "icon-shouye" },
    children: [
      { path: '/home', component: () => import('@/views/Home/index.vue') }
    ]
  },

  // 订单管理
  {
    path: '/order',
    component: Layout,
    redirect: '/order/order-list',
    meta: { title: '订单管理', icon: "icon-dingdan" },
    children: [
      { path: '/order/order-list', component: () => import('@/views/Order/OrderList.vue') },
      { path: '/order/order-edit', component: () => import('@/views/Order/OrderEdit.vue') },
    ]
  },

  // 商品管理
  {
    path: '/goods',
    component: Layout,
    meta: { title: '商品管理', icon: "icon-shangpin", roles: ['super', 'normal'] },
    redirect: '/goods/goods-list',
    children: [
      { meta: { title: '商品列表' }, path: '/goods/goods-list', component: () => import('@/views/Goods/GoodsList.vue') },
      { meta: { title: '商品添加' }, path: '/goods/goods-add', component: () => import('@/views/Goods/GoodsAdd.vue') },
      { meta: { roles: ['super'], title: '商品分类' }, path: '/goods/goods-cate', component: () => import('@/views/Goods/GoodsCate.vue') },
    ]
  },

  // 店铺管理
  {
    path: '/shop',
    component: Layout,
    meta: { title: '店铺管理', icon: "icon-dianpu", roles: ['super'] },
    children: [
      { path: '', component: () => import('@/views/Shop/index.vue') }
    ]
  },

  // 账号管理
  {
    path: '/account',
    component: Layout,
    meta: { title: '账号管理', icon: "icon-zhanghao", roles: ['super', 'normal'] },
    redirect: '/account/account-list',
    children: [
      { meta: { roles: ['super'], title: '添加账号' }, path: '/account/account-add', component: () => import('@/views/Account/AccountAdd.vue') },
      { meta: { roles: ['super'], title: '账号列表' }, path: '/account/account-list', component: () => import('@/views/Account/AccountList.vue') },
      { meta: { title: '修改密码' }, path: '/account/pass-modify', component: () => import('@/views/Account/PassModify.vue') },
      { meta: { title: '个人中心' }, path: '/account/personal', component: () => import('@/views/Account/Personal.vue') },
    ]
  },

  // 销售统计
  {
    path: '/total',
    component: Layout,
    meta: { title: '销售统计', icon: "icon-tongji", roles: ['super'] },
    redirect: '/total/goods-total',
    children: [
      { meta: { title: '商品统计' }, path: '/total/goods-total', component: () => import('@/views/Total/GoodsTotal.vue') },
      { meta: { title: '订单统计' }, path: '/total/order-total', component: () => import('@/views/Total/OrderTotal.vue') },
    ]
  },

  {
    path: '/404',
    component: () => import("@/views/Error404/Error404.vue"),
    meta: { isNav: false }
  },

  {
    path: '*',
    redirect: '/404',
    meta: { isNav: false }
  }
]

// 创建路由实例对象 传入路由配置
const router = new VueRouter({
  routes
})

// 路由守卫【保安】
router.beforeEach((to, from, next) => {
  let isLogin = local.get('t_k') ? true : false; // 获取登录的状态

  // 如果登录过 且是登录成功的
  if (isLogin) {
    next()  // 直接放行
  } else {
    // 否则

    // 如果去的是登录页
    if (to.path === '/login') {
      next() // 直接放行
    } else {
      next('/login') // 如果去的是别的页面 直接跳转到登录页
    }
  }
})

/* 
  创建动态路由的函数
*/
// 【1】
export function createRoutes() {
  let role = local.get('role') // 把role取出来
  if (!role) return; // 如果本地没有用户角色 直接return 代码就不往后走了

  let accessRoutes = calcRoutes(asyncRoutes, role) // 计算出有权限访问的路由对象

  // 添加动态路由
  router.addRoutes(accessRoutes)

  // 计算动态权限菜单
  let menus = calcMenus(accessRoutes)
  local.set('menus', menus) // 把菜单存入本地
}
createRoutes() // 初始化调用

// 【2】 根据完整异步路由 和 当前角色 两个参数， 算出哪些路由有权访问
function calcRoutes(asyncRoutes, role) {
  // 循环完整异步路由
  let accessRoutes = asyncRoutes.filter(item => { // item就每一个单个路由对象
    if (hasPermission(item, role)) {
      // 如果有儿子 儿子也是数组 里面也是当个路由对象 也要过滤
      if (item.children && item.children.length) {
        item.children = calcRoutes(item.children, role)
      }
      return true;
    } else {
      return false;
    }
  })
  return accessRoutes;
}

// 【3】实现一个函数，可以判断当前角色是否有权访问`单个路由对象`
function hasPermission(router, role) {
  if (router.meta && router.meta.roles) {
    return router.meta.roles.includes(role)
  } else {
    return true // 默认如果没有meta 或没有role 都是可以访问的
  }
}

// 【4】计算动态权限菜单
function calcMenus(accessRoutes) {
  let menus = accessRoutes.filter(item => {
    if (item.meta && item.meta.hasOwnProperty('isNav')) {
      return item.meta.isNav;  // false
    } else {
      return true
    }
  })
  return menus
}
export default router
