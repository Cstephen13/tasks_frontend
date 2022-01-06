export default {
  add (state, { todo }) {
    state.list.push(todo)
  },
  toggle (state, index) {
    state.list[index].state = 1
  },
  setList (state, list) {
    state.list = list
  },
  setTodo (state, todo) {
    state.todo = todo
  }
}
