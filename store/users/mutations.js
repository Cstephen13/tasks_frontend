export default {
  add (state, { user }) {
    state.list.push(user)
  },
  setList (state, list) {
    state.list = list
  },
  setUser (state, user) {
    state.user = user
  }
}
