import api from "../../helpers/api";

const state = () => ({

    auth: [],

});

const actions = {
    login({commit}, credentials) {

        api.auth.login(credentials).then((res) => {
            localStorage.setItem('token',res.token)
            commit('setLoggedUser',res);
        })
    }
};

const mutations = {
    setLoggedUser(userData){
        state.auth = userData
    }
};


export default {
    namespaced: true,
    state,
    actions,
    mutations
}