import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '',
      redirect: '/login'
    },
    {
      path: '/login',
      component: () => import('../components/Login')
    },
    {
      path: '/home',
      component: () => import('../components/Home'),
      redirect: '/welcome',
      children: [
        {
          path: '/welcome',
          component: () => import('../components/welcome')
        }
      ]
    }
  ]
  // mode: 'history'
})
// 挂载导航守卫
router.beforeEach((to, from, next) => {
  /*
    to:要访问哪个路径
    from:从哪个路径来
    next:放行
   */
  if (to.path === '/login') return next()
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
