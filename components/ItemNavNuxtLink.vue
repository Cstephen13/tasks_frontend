<template>
  <li class="nav-item">
    <nuxt-link class="nav-link" :to="uri">{{title}}</nuxt-link>
  </li>
</template>

<script>
export default {
  props: {
    title: String,
    uri: String
  },
  name: 'ItemNavNuxtLink'
}
</script>

<style scoped>

</style>
