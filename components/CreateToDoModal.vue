<template>
  <b-modal
    id="modal-prevent-closing"
    ref="modal"
    :title="`${isCreate ? 'Crear Tarea' : `Actualiar ${model.title}`}`"
    @hidden="resetModal"
    @ok="handleOk"
  >
    <form ref="form" @submit.stop.prevent="handleSubmit">
      <b-form-group label="Título:" label-for="name-input" invalid-feedback="Nombre es requerido" :state="nameState">
        <b-form-input id="name-input"
                      @change="changeValue($event, 'title')"
                      :value="model.title"
                      :state="nameState"
                      required></b-form-input>
      </b-form-group>
      <b-form-group label="Fecha Límite:"
                    label-for="description-input"
                    invalid-feedback="Descripción es requerida"

                    :state="nameState">
        <b-row>
          <b-col>
            <b-form-datepicker id="example-datepicker"
                               right
                               required
                               locale="es-CO"
                               @input="changeValue($event, 'limit_date_format')"
                               :value="model.limit_date_format"
                               class="mb-2"></b-form-datepicker>
          </b-col>
          <b-col>
            <b-form-timepicker @input="changeValue($event, 'time_limit')"
                               :value="model.time_limit"
                               required
                               locale="es-CO"></b-form-timepicker>
          </b-col>
        </b-row>
      </b-form-group>
      <b-form-group label="Descripción:"
                    label-for="description-input"
                    invalid-feedback="Descripción es requerida"
                    :state="nameState">
        <b-form-textarea class="mt-1"
                         @change="changeValue($event, 'description')"
                         id="description-text-area"
                         :value="model.description"
                         :state="descriptionState"
                         required></b-form-textarea>
      </b-form-group>
    </form>
  </b-modal>
</template>

<script>
export default {
  name: 'CreateToDoModal',
  props: {
    isCreate: Boolean,
    model: Object
  },
  data () {
    return {
      nameState: null,
      descriptionState: null
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
      this.$emit('submit-todo')
    }
  }
}
</script>

<style scoped>

</style>
