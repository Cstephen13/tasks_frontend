<template>
  <b-modal
    id="modal-create-update-user"
    ref="modal"
    :title="`${isCreate ? 'Crear Usuario' : `Actualiar ${model.name}`}`"
    @hidden="resetModal"
    @ok="handleOk"
  >
    <form ref="form" @submit.stop.prevent="handleSubmit">
      <b-form-group label="Nombre:" label-for="name-input" invalid-feedback="Nombre es requerido" :state="nameState">
        <b-form-input id="name-input"
                      @change="changeValue($event, 'name')"
                      :value="model.name"
                      :state="nameState"
                      required></b-form-input>
      </b-form-group>

      <b-form-group label="Correo electrónico:"
                    label-for="description-input"
                    invalid-feedback="Correo es requerido"
                    :state="nameState">
                  <b-form-input
                    @change="changeValue($event, 'email')"
                    id="input-1"
                    :value="model.email"
                    type="email"
                    required
                  ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-2"
                    label="Contraseña:"
                    label-for="input-2"
                    v-if="isCreate">
        <b-form-input
          @change="changeValue($event, 'password')"
          type="password"
          id="input-2"
          :value="model.password"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-2"
                    label="Confirmar Contraseña:"
                    label-for="input-2"
                    v-if="isCreate"
      >
        <b-form-input
          type="password"
          id="input-2"
          @change="changeValue($event, 'password_confirmation')"
          :value="model.password_confirmation"
          required
        ></b-form-input>
      </b-form-group>
    </form>
  </b-modal>
</template>

<script>
export default {
  name: 'CreateUserModal',
  props: {
    isCreate: Boolean,
    model: Object
  },
  data () {
    return {
      nameState: null
    }
  },
  methods: {
    checkFormValidity () {
      const valid = this.$refs.form.checkValidity()
      this.nameState = valid
      return valid
    },
    resetModal () {
      this.$emit('reset-model')
    },
    changeValue (value, key) {
      this.$emit('change-values', { key, value })
    },
    handleOk (bvModalEvt) {
      bvModalEvt.preventDefault()
      this.handleSubmit()
    },
    handleSubmit () {
      this.$emit('submit-user')
    }
  }
}
</script>

<style scoped>

</style>
