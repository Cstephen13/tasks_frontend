<template>
  <b-modal
    id="modal-detail-user"
    ref="modalDetail"
    :title="user.name"
  >
    <h5>Correo: {{ user.email }}</h5>
    <template #modal-footer>
      <b-button variant="danger" @click="handleOk">Cerrar</b-button>
    </template>
  </b-modal>
</template>

<script>
export default {
  name: 'DetailUser',
  props: {
    user: Object
  },
  methods: {
    handleOk () {
      this.$nextTick(() => {
        this.$bvModal.hide('modal-detail-user')
      })
    }
  }
}
</script>

<style scoped>

</style>
