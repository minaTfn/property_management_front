import api from "../../helpers/api";
import VueJwtDecode from 'vue-jwt-decode'
import _ from "lodash"
import Form from "@/helpers/classes/Form";

const state = () => ({

    auth: [],
    form: new Form({
        email: '',
        password: '',
    }),

});

const actions = {
    login({commit}, credentials) {

        api.auth.login(credentials).then((res) => {
            localStorage.setItem('token',res.access)
            const data = getUserData(res.access)
            commit('setLoggedUser',data);
        }).catch(error => {
            commit('getErrors', error.response.data)
        });
    }
};

const mutations = {
    setLoggedUser(state, userData){
        state.auth = userData
    },
    getErrors(state, error) {
        state.form.errors.record(error)
    },
    resetForm(state) {
        state.form.reset();
    },
    updateForm(state, item) {
        Object.assign(state.form, item);
    },
};


function getUserData(token) {
    return _.pick(VueJwtDecode.decode(token), ['full_name', 'email', 'email_verified', 'user_id']);
}


export default {
    namespaced: true,
    state,
    actions,
    mutations
}