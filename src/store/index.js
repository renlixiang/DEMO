import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
    account: '',
    password: '',
    phone: '',
    users: {
        123: {phone: '13512345678', password: '123'}
    },
    currentUser: '',
    headerColor: '#dcaf94',
    asideColor: '#f8dac8',
    mainColor: '#fcede4',
    footerColor: '#f9a7a7',
    activeTab: '',
    imgElements: []
}

const actions = {
}

const mutations = {
}

const store = new Vuex.Store({
    namespaced: true,
    state,
    actions,
    mutations

})
export default store
