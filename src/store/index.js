import Vue from 'vue'
import Vuex from 'vuex'
import accounts from './modules/accounts'
import properties from './modules/properties'

Vue.use(Vuex)

Vue.config.devtools = process.env.NODE_ENV === 'development'

const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
    modules: {
        accounts,
        properties,
    },
    strict: debug,
})
