<template>
  <div>
    <div class="card-header bg-white">
      <div class="row">
        <div class="col">
          <h2 class="card-title">
            Listado de Usuarios
          </h2>
        </div>
        <div class="col">
          <button class="btn btn-sm btn-primary float-right mt-2"
                  @click="openCreate" >
            <b-icon icon="plus"></b-icon> Nueva Usuario
          </button>
          <CreateUserModal :model="form"
                           :isCreate="isCreate"
                           @submit-user="handleSubmit"
                           @change-values="changeValues"
                           @reset-model="resetModel"
                           v-if="form"
          />
          <DetailUser :user="user" v-if="user"/>
        </div>
      </div>
    </div>
    <div class="card-body">
      <div class="row">
        <div class="col-md-12 col-sm-12 col-xs-12 col-lg-12">
          <ListUsers @detail-user="detailUser" @edit-user="editUser" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import ListUsers from '~/components/ListUsers'
import CreateUserModal from '~/components/CreateUserModal'
import DetailUser from '~/components/DetailUser'
export default {
  name: 'Users',
  components: { ListUsers, CreateUserModal, DetailUser },
  data () {
    return {
      user: null,
      isCreate: true,
      form: null
    }
  },
  methods: {
    editTodo ({ item }) {
      this.isCreate = false
      this.form = JSON.parse(JSON.stringify(item))
      this.$nextTick(() => {
        this.$bvModal.show('modal-create-update-user')
      })
    },
    detailUser (event) {
      this.user = event.item
      this.$nextTick(() => {
        this.$bvModal.show('modal-detail-user')
      })
    },
    editUser ({ item }) {
      this.isCreate = false
      this.form = { ...item }
      this.$nextTick(() => {
        this.$bvModal.show('modal-create-update-user')
      })
    },
    openCreate () {
      this.resetModel()
      this.form = {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      }
      this.$nextTick(() => {
        this.$bvModal.show('modal-create-update-user')
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
      try {
        if (this.isCreate) {
          const response = await this.$axios.post('/api/users', this.form)
          const user = response.data
          this.$store.commit('users/add', { user })
          this.$bvToast.toast('Tu registro ha sido exitoso', {
            title: 'Excelente',
            variant: 'success',
            solid: true
          })
        } else {
          const response = await this.$axios.put(`/api/users/${this.form.id}`, this.form)
          this.$store.commit('users/setList', response.data)
          this.$bvToast.toast('Tu registro ha sido actualizado', {
            title: 'Excelente',
            variant: 'success',
            solid: true
          })
        }
        this.$nextTick(() => {
          this.$bvModal.hide('modal-create-update-user')
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
      toggle: 'users/setUser'
    })
  }
}
</script>

<style scoped>

</style>
