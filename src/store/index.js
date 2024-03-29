import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false
  },
  getters: {
  },
  mutations: {
    changeLoginStatus (state, status) {
      state.isLogin = status
    }
  },
  actions: {
  }
})
