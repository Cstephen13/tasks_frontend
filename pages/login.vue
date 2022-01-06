<template>
  <div class="mt-lg-5 mt-md-5">
    <div class="card shadows mt-lg-5 mt-md-5">
      <div class="card-header bg-primary">
        <p class="card-title text-white">Iniciar Sesión</p>
      </div>
      <div class="card-body">
        <b-form @submit="onSubmit" >
          <b-form-group
            id="input-group-1"
            label="Correo Electrónico:"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              v-model="form.email"
              type="email"
              placeholder="example@example.com"
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
          <b-button type="submit" pill block variant="primary">Enviar</b-button>
          <div class="text-center">
            <nuxt-link to="/register">Registrarse</nuxt-link>
          </div>
        </b-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  layout: 'login',
  auth: 'guest',
  data () {
    return {
      form: {
        email: '',
        password: ''
      },
      error: {}
    }
  },
  methods: {
    async onSubmit (event) {
      event.preventDefault()
      try {
        await this.$auth.loginWith('local', { data: this.form })
        this.$router.push({ name: '/' })
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
