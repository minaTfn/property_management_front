import Home from '../views/Home.vue'
import Login from '../views/accounts/Login.vue'

export default [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
]
