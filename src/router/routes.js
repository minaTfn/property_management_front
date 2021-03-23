import Home from '../views/Home.vue'
import Login from '../views/accounts/Login.vue'
import Register from "../views/accounts/Register";
import UserInfo from "../views/accounts/UserInfo";

export default [
    {
        path: '/user-info',
        name: 'UserInfo',
        component: UserInfo
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
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
    // otherwise redirect to home
    {path: '*', redirect: '/home'}
]
