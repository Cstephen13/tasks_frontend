<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="primary">
      <b-navbar-brand href="#">ToDo List</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <ItemNavNuxtLink title="Usuarios" uri="/users"/>
          <ItemNavNuxtLink title="Tareas" uri="/"/>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <p class="text-white mt-1">{{ $auth.user.name }}</p>
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <b-icon icon="person-fill"></b-icon>
            </template>
            <b-dropdown-item href="#">Perfil</b-dropdown-item>
            <b-dropdown-item href="#">Salir</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import ItemNavNuxtLink from '~/components/ItemNavNuxtLink'
export default {
  name: 'NavBar',
  components: { ItemNavNuxtLink }
}
</script>

<style scoped>

</style>
