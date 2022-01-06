<template>
  <div class="bg-light">
    <NavBar/>
    <div class="container">
      <div class="row" style="height: 92vh;">
        <div class="col-md-12 col-sm-12 col-xs-12 col-lg-12 d-flex justify-content-center p-md-3 p-lg-3">
          <div class="card shadows w-75 h-auto">
            <Nuxt/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import NavBar from '~/components/NavBar'
export default {
  layout: 'newLayout',
  components: { NavBar }
}
</script>
