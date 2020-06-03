import Vue from 'vue'
import Router from 'vue-router'
const Login = () => import('../components/Login')
const Home = () => import('../components/Home')
const Welcome = () => import('../components/Welcome')
const Users = () => import('../components/user/Users')

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '',
      redirect: '/login'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: Home,
      redirect: '/welcome',
      children: [
        {
          path: '/welcome',
          component: Welcome
        },
        {
          path: '/users',
          component: Users
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
