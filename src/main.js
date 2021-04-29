import Vue from 'vue'
import App from './App.vue'
import {router} from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import snackbarPlugin from './plugins/snackbar';


if (localStorage.getItem('token')) {
    store.dispatch('accounts/getUserInfo')
}

Vue.prototype.$isLoggedIn = '';
Vue.use(snackbarPlugin, {store})


Vue.config.productionTip = false
Vue.config.devtools = process.env.NODE_ENV === 'development'

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
