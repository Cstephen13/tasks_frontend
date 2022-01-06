<!-- Please remove this file from your project -->
<template>
  <div>
    <div class="card-header bg-white">
      <div class="row">
        <div class="col">
          <h2 class="card-title">
            ToDo List
          </h2>
        </div>
        <div class="col">
          <button class="btn btn-sm btn-primary float-right mt-2"
                 @click="openCreate" >
            <b-icon icon="plus"></b-icon> Nueva Tarea
          </button>
          <CreateToDoModal :model="form"
                           :isCreate="isCreate"
                           @submit-todo="handleSubmit"
                           @change-values="changeValues"
                           @reset-model="resetModel"
                           v-if="form"
          />
          <DetailTodo :todo="todo" v-if="todo"/>
        </div>
      </div>
    </div>
    <div class="card-body">
      <div class="row">
        <div class="col-md-12 col-sm-12 col-xs-12 col-lg-12">
          <Todos @detail-todo="detailTodo" @edit-todo="editTodo"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import Todos from '~/components/Todos'
import CreateToDoModal from '~/components/CreateToDoModal'
import DetailTodo from '~/components/DetailTodo'
export default {
  name: 'NuxtTutorial',
  components: { Todos, CreateToDoModal, DetailTodo },
  data () {
    return {
      todo: null,
      isCreate: true,
      form: null
    }
  },
  methods: {
    detailTodo (event) {
      this.todo = event.item
      this.$nextTick(() => {
        this.$bvModal.show('modal-detail')
      })
    },
    editTodo ({ item }) {
      this.isCreate = false
      const splitDate = item.limit_date.split(' ')
      this.form = JSON.parse(JSON.stringify(item))
      this.form.limit_date_format = splitDate[0]
      this.form.time_limit = splitDate[1]
      console.log(this.form)
      this.$nextTick(() => {
        this.$bvModal.show('modal-prevent-closing')
      })
    },
    openCreate () {
      this.resetModel()
      this.form = {
        title: '',
        description: '',
        limit_date_format: '',
        limit_date: '',
        time_limit: ''
      }
      this.$nextTick(() => {
        this.$bvModal.show('modal-prevent-closing')
      })
    },
    resetModel () {
      this.form = null
      this.isCreate = true
    },
    changeValues ({ key, value }) {
      this.form[key] = value
    },
    async handleSubmit () {
      this.form.limit_date = `${this.form.limit_date_format} ${this.form.time_limit}`
      try {
        if (this.isCreate) {
          const response = await this.$axios.post('/api/tasks', this.form)
          const todo = response.data
          this.$store.commit('todos/add', { todo })
          this.$bvToast.toast('Tu Registro ha sido exitoso', {
            title: 'Excelente',
            variant: 'success',
            solid: true
          })
        } else {
          const response = await this.$axios.put(`/api/tasks/${this.form.id}`, this.form)
          this.$store.commit('todos/setList', response.data)
          this.$bvToast.toast('Tu Registro ha sido actualizado', {
            title: 'Excelente',
            variant: 'success',
            solid: true
          })
        }
        this.$nextTick(() => {
          this.$bvModal.hide('modal-prevent-closing')
        })
      } catch (e) {
        this.$bvToast.toast('Ha ocurrido un problema', {
          title: 'Ups!',
          variant: 'danger',
          solid: true
        })
      }
    },
    ...mapMutations({
      toggle: 'todos/setTodo'
    })
  }
}
</script>
