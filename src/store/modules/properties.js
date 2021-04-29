import api from "../../helpers/api";
import Form from "../../helpers/classes/Form";
import { mixinMutations, mixinStates } from "../mixins.js";

const state = () => ({

    ...mixinStates(),

    form: new Form({
        name: '',
        latitude: '',
        longitude: '',
        city: '',
        area: '',
        description:'',
        id: ''
    }),
    countries: [],
    cities: [],
})

const getters = {
    isUpdate(state) {
        return state.actionType == 'update'
    },
}

const actions = {

    listCountries({ commit },) {
        api.geography.listCountries().then(response => {
            commit('fetchCoutries', response);
        });
    },

    listCities({ commit },params) {
        api.geography.listCities(params).then(response => {
            commit('fetchCities', response);
        });
    },

    listProperties({ commit }) {
        api.properties.list().then(({ items, }) => {
            commit('fetchAll', response);
        });
    },

    deleteProperty({ dispatch, state }) {
        api.properties.delete(state.form).then(() => {
            dispatch('getAllGoals');
            this._vm.$snackbar.showMessage({ message: 'Item deleted successfully' })
        }).catch(error => {
            this._vm.$snackbar.showMessage({ message: error.response.data.name, color: 'error' })
        })

    },

    updateProperty({ }, data) {
        return api.properties.update(data)
    },

    createProperty({ }, data) {
        return api.properties.create(data)
    },

    save({ dispatch, getters, commit }, data) {

        const action = getters.isUpdate ? 'updateProperty' : 'createProperty'

        const message = getters.isUpdate ? 'Item updated' : 'Item created'

        dispatch(action, data).then(() => {

            commit('resetForm');
            commit('closeModal');
            dispatch('listProperties');
            this._vm.$snackbar.showMessage({ message: `${message} successfully` })

        }).catch(error => {
            commit('getErrors', error.response.data)
        });

    },

}

const mutations = {

    ...mixinMutations(),

    fetchCoutries(state, countries) {
        state.countries = countries
    },

    fetchCities(state, cities) {
        state.cities = cities
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}