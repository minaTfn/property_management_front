import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from "./routes.js"

Vue.use(VueRouter)

export const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register','/user-info'];
  const authRequired = !publicPages.includes(to.path);
  const authNotRequired = publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('token');

  if (authRequired && !loggedIn) {
    return next('/login');
  }

  if(loggedIn && authNotRequired){
    return next('/home')
  }

  next();
})
