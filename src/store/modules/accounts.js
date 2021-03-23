import api from "../../helpers/api";
// import VueJwtDecode from 'vue-jwt-decode'
// import _ from "lodash"
import Form from "@/helpers/classes/Form";

const state = () => ({
    loggedInUser: [],
    loginForm: new Form({
        email: '',
        password: '',
    }),
    registerForm: new Form({
        email: '',
        password: '',
        repeat_password: '',
    }),
    userInfoForm: new Form({
        email: '',
        first_name: '',
        last_name: '',
        phone_number: '',
    })
});

const actions = {
    register({commit, dispatch}, userData) {
        api.accounts.register(userData).then(() => {
            commit('resetForm');
            delete userData.repeat_password;
            dispatch('login', userData)
        }).catch(error => {
            commit('setFormErrors', {form: 'registerForm', errors: error.response.data})
        });
    },

    login({commit, dispatch}, credentials) {
        api.accounts.login(credentials).then((res) => {
            localStorage.setItem('token', res.access)
            dispatch("getUserInfo");
            // const data = getUserData(res.access)
            // commit('setLoggedUser', data);
        }).catch(error => {
            commit('setFormErrors', {form: 'loginForm', errors: error.response.data})
        });
    },

    getUserInfo({commit}) {
        api.accounts.userGetInfo().then((res) => {
            commit('setLoggedUser', res);
        }).catch(error => {
            console.log(error);
        });
    },

    updateUser({commit}, userData) {
        api.accounts.userUpdateInfo(userData).then(() => {
            commit('resetForm');
        }).catch(error => {
            commit('setFormErrors', {form: 'userInfoForm', errors: error.response.data})
        });
    }
};

const mutations = {
    setLoggedUser(state, userData) {
        state.loggedInUser = userData
    },
    setFormErrors(state, data) {
        state[data.form].errors.record(data.errors)
    },
    resetForm(state) {
        state.loginForm.reset();
        state.registerForm.reset();
    },
    updateForm(state, item) {
        Object.assign(state[item.form], item.data);
    },
};

// function getUserData(token) {
//     return _.pick(VueJwtDecode.decode(token), ['full_name', 'email', 'email_verified', 'user_id']);
// }

export default {
    namespaced: true,
    state,
    actions,
    mutations
}