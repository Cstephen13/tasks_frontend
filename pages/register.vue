<template>
  <div>
    <b-card-body>
      <b-form @submit="onSubmit">
        <b-form-group id="input-group-2" label="Tu Nombre:" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="form.name"
            placeholder="Ingresa tu nombre completo"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-1"
          label="Correo Electrónico:"
          label-for="input-1"
          description="We'll never share your email with anyone else."
        >
          <b-form-input
            id="input-1"
            v-model="form.email"
            type="email"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Contraseña:" label-for="input-2">
          <b-form-input
            type="password"
            id="input-2"
            v-model="form.password"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Confirmar Contraseña:" label-for="input-2">
          <b-form-input
            type="password"
            id="input-2"
            v-model="form.password_confirmation"
            required
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary" class="float-lg-right w-25">Enviar</b-button>
      </b-form>
    </b-card-body>
  </div>
</template>

<script>
export default {
  name: 'register',
  layout: 'register',
  auth: 'guest',
  data () {
    return {
      form: {
        email: '',
        name: '',
        password: '',
        password_confirmation: ''
      }
    }
  },
  methods: {
    async onSubmit (event) {
      event.preventDefault()
      try {
        await this.$axios.post('/api/register', this.form)
        await this.$router.back()
        this.$bvToast.toast('Tu Registro ha sido exitoso', {
          title: 'Excelente',
          variant: 'success',
          solid: true
        })
      } catch (e) {
        this.$bvToast.toast('Ha ocurrido un problema', {
          title: 'Ups!',
          variant: 'danger',
          solid: true
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
