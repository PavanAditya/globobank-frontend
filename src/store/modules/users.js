import Vue from 'vue'
import bcryptjs from 'bcryptjs'

const state = {
  email: '',
  userId: null,
  first: '',
  last: '',
  isLoggedIn: false,
  loginError: ''
}

const getters = {
  isLoggedIn: state => state.isLoggedIn,
  userId: state => state.userId,
  loginError: state => state.loginError
}

const actions = {
  async loginUser ({ commit }, payload) {
    await Vue.axios.get('/user/email/' + payload.email)
      .then((resp) => {
        let data = resp.data.data
        console.log(data)
        if (data && data.length > 0) {
          const pwdHash = data[0].password
          if (bcryptjs.compareSync(payload.password, pwdHash)) {
            const user = data[0]
            payload.userId = user._id
            payload.first = user.firstName
            payload.last = user.lastName
            payload.email = user.emailId
            commit('loginUser', payload)
          } else {
            commit('LoginError')
          }
        }
      })
      .catch(() => {
        commit('loginError')
      })
  },
  async loadUserProfile ({ commit }) {
    // get the user object for the currently logged in user...
    await Vue.axios.get('/user/' + this.userId).then(resp => {
      let data = resp.data.data
      console.log('loadUserProfile data:', data)
    })
  },
  updateUserProfile ({ commit }, payload) {
    // TODO: encrypt the user's password
    console.log(payload)
    bcryptjs.hash(payload.password, 8, (err, hash) => {
      if (!err) {
        payload.password = hash
        console.log('password hash: ', payload.password)
        Vue.axios
          .put('/user/' + this.state.users.userId, payload)
          .then(resp => {
            console.log(resp)
          })
          .catch(err => {
            console.log(err)
          })
      }
    })
  }
}

const mutations = {
  loginUser (state, payload) {
    state.email = payload.email
    state.userId = payload.userId
    state.isLoggedIn = true
    state.first = payload.first
    state.last = payload.last
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
