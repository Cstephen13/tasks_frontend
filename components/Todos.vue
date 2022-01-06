<template>
  <div>
    <b-table striped
             hover
             :items="todos"
             :responsive="true"
             :fields="fields"
             :tbody-tr-class="rowClass">
      <template #cell(actions)="{item, index}">
        <b-button pill
                  variant="outline-info"
                  @click="finish(item, index)"
                  size="sm"
                  title="Terminar"
                  v-if="!item.state"><b-icon icon="check"></b-icon></b-button>
        <b-button pill
                  variant="outline-primary"
                  size="sm"
                  @click="edit(item)"
                  v-if="!item.state"
                  title="Editar"><b-icon icon="pencil-square"></b-icon></b-button>
        <b-button pill
                  variant="outline-danger"
                  size="sm"
                  @click="deleteTask(item)"
                  title="Eliminar">
          <b-icon icon="trash"></b-icon></b-button>
      </template>
      <template #cell(title)="{item}">
        <b-button title="Ver Detalles" variant="link" @click="detail(item)">{{item.title}}</b-button>
      </template>
    </b-table>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  data () {
    return {
      fields: [
        {
          key: 'id',
          label: 'Id'
        },
        {
          key: 'title',
          label: 'Título'
        },
        {
          key: 'limit_date',
          label: 'Fecha Vencimiento'
        },
        {
          key: 'user',
          label: 'Creador',
          formatter: 'fullName'
        },
        {
          key: 'actions',
          label: 'Acciones'
        }
      ]
    }
  },
  methods: {
    fullName (value) {
      return value.name
    },
    detail (item) {
      this.$emit('detail-todo', { item })
    },
    edit (item) {
      this.$emit('edit-todo', { item })
    },
    rowClass (item, type) {
      if (!item || type !== 'row') { return }
      if (item.state) { return 'table-success' }
    },
    showErrorMessage () {
      this.$bvToast.toast('Ha ocurrido un problema', {
        title: 'Ups!',
        variant: 'danger',
        solid: true
      })
    },
    async deleteTask (item) {
      try {
        const response = await this.$axios.delete(`/api/tasks/${item.id}`)
        this.$store.commit('todos/setList', response.data)
        this.$bvToast.toast('Tarea eliminada de manera exitosa', {
          title: 'Excelente',
          variant: 'success',
          solid: true
        })
      } catch (e) {
        this.showErrorMessage()
      }
    },
    async finish (item, index) {
      this.toggle(index)
      item.state = 1
      try {
        const response = await this.$axios.put(`/api/tasks/${item.id}`, item)
        this.$store.commit('todos/setList', response.data)
        this.$bvToast.toast('Tarea Terminada', {
          title: 'Excelente',
          variant: 'success',
          solid: true
        })
      } catch (e) {
        this.showErrorMessage()
      }
    },
    ...mapMutations('todos', ['toggle'])
  },
  computed: mapGetters({
    todos: 'todos/todos'
  }),

  beforeMount () {
    (async () => {
      try {
        const response = await this.$axios.get('/api/tasks')
        this.$store.commit('todos/setList', response.data)
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
