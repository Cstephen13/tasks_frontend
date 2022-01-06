<template>
  <b-modal
    id="modal-detail"
    ref="modalDetail"
    :title="todo.title"
  >
    <h5>Fecha Limite: {{ todo.limit_date }}</h5>
    <h6>Creador: {{ todo.user.name }}</h6>
    <h6>Descripción:</h6>
    <b-jumbotron>
      {{ todo.description }}
    </b-jumbotron>
    <template #modal-footer>
      <b-button variant="danger" @click="handleOk">Cerrar</b-button>
    </template>
  </b-modal>
</template>

<script>
export default {
  name: 'DetailTodo',
  props: {
    todo: Object
  },
  methods: {
    handleOk () {
      this.$nextTick(() => {
        this.$bvModal.hide('modal-detail')
      })
    }
  }
}
</script>

<style scoped>

</style>
