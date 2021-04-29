import Login from '../views/accounts/Login.vue'
import Register from "../views/accounts/Register";
import UserInfo from "../views/accounts/UserInfo";
import Properties from "../views/Properties.vue";

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
        path: '/properties',
        name: 'Properties',
        component: Properties
    },

    // otherwise redirect to home
    {path: '*', redirect: '/login'}
]
