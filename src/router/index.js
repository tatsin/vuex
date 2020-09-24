import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/form',
    name: 'Form',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Form.vue')
  },
  {
    path: '/user',
    name: 'User',
    component: () => import( '../views/User.vue')
  },
  {
    path: '/todo',
    name: 'Todo',
    component: () => import( '../views/Todo.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import( '../views/search.vue')
  },
  {
    path: '/people/:id',
    name: 'people/',
    component: () => import( '../views/people.vue')
  },
  {
    path: '/vuex',
    name: 'vuex/',
    component: () => import( '../views/vuex.vue')
  },
  {
    path: '/vuexaxios',
    name: 'vuexaxios/',
    component: () => import( '../views/vuexaxios.vue')
  },
  {
    path: '*',
    name: 'notFound',
    component: () => import( '../views/notFound.vue')
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//add loader 
router.beforeResolve((to, from, next) => {
    // If this isn't an initial page load.
    if (to.name) {
        // Start the route progress bar.
        NProgress.start()
    }
    next()
  })
  
  router.afterEach((to, from) => {
    // Complete the animation of the route progress bar.
    NProgress.done()
  })

export default router
