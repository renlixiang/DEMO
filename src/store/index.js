import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
    account: '',
    password: '',
    phone: '',
    usersName: '123',
    users: {
        123: {phone: '13512345678', password: '123', name: "123"}
    },
    // currentUser: '',
    headerColor: '#dcaf94',
    asideColor: '#f8dac8',
    mainColor: '#fcede4',
    footerColor: '#f9a7a7',
    activeTab: '',
    imgElements: []
}

const actions = {
    resetPassword(context, parameter) {
        context.commit('REST_PASSWORD', parameter)
    }
}

const mutations = {
    REST_PASSWORD (state, parameter) {
        if (parameter.newPassword === parameter.verifyPassword) {
            state.users[parameter.currentUser].password = parameter.newPassword
        }
    }
}

const store = new Vuex.Store({
    namespaced: true,
    state,
    actions,
    mutations

})
export default store
