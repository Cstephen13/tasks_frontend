<template>
  <div>
    <b-table striped
             hover
             :items="users"
             :responsive="true"
             :fields="fields">

      <template #cell(actions)="{ item }">
        <b-button pill
                  variant="outline-primary"
                  size="sm"
                  @click="edit(item)"
                  title="Editar"><b-icon icon="pencil-square"></b-icon></b-button>
        <b-button pill
                  variant="outline-danger"
                  size="sm"
                  @click="deleteUser(item)"
                  title="Eliminar">
          <b-icon icon="trash"></b-icon></b-button>
      </template>
      <template #cell(name)="{item}">
        <b-button title="Ver Detalles" variant="link" @click="detail(item)">{{item.name}}</b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ListUsers',
  data () {
    return {
      fields: [
        {
          key: 'id',
          label: 'Id'
        },
        {
          key: 'name',
          label: 'Nombre Completo'
        },
        {
          key: 'email',
          label: 'Correo'
        },
        {
          key: 'actions',
          label: 'Acciones'
        }
      ]
    }
  },
  methods: {
    detail (item) {
      this.$emit('detail-user', { item })
    },
    edit (item) {
      this.$emit('edit-user', { item })
    },
    showErrorMessage () {
      this.$bvToast.toast('Ha ocurrido un problema', {
        title: 'Ups!',
        variant: 'danger',
        solid: true
      })
    },
    async deleteUser (item) {
      try {
        const response = await this.$axios.delete(`/api/users/${item.id}`)
        this.$store.commit('users/setList', response.data)
        this.$bvToast.toast('Usuario eliminado de manera exitosa', {
          title: 'Excelente',
          variant: 'success',
          solid: true
        })
      } catch (e) {
        this.showErrorMessage()
      }
    }
  },
  computed: mapGetters({
    users: 'users/users'
  }),
  beforeMount () {
    (async () => {
      try {
        const response = await this.$axios.get('/api/users')
        this.$store.commit('users/setList', response.data)
      } catch (e) {
        this.$bvToast.toast('No hemos podido obtener los datos', {
          title: 'Ups!',
          variant: 'danger',
          solid: true
        })
      }
    })()
  }
}
</script>

<style scoped>

</style>
