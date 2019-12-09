const state = {
  email: '',
  userId: null,
  isLoggedIn: false,
  loginError: ''
}

const getters = {
  isLoggedIn: state => state.isLoggedIn,
  userId: state => state.userId,
  loginError: state => state.loginError
}

const actions = {
  loginUser ({ commit }, payload) {
    if (payload.userId === 'testuser123@gmail.com' && payload.password === 'test111') {
      payload.userId = '5765s765sas6576asjghjha8777'
      commit('loginUser', payload)
    } else {
      commit('loginError')
    }
  }
}

const mutations = {
  loginUser (state, payload) {
    state.email = payload.email
    state.userId = payload.userId
    state.isLoggedIn = true
  },
  loginError (state) {
    state.isLoggedIn = false
    state.loginError = 'Email or Password is incorrect'
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
