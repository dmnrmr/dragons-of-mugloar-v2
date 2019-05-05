<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <router-link
          class="navbar-item has-text-weight-bold is-size-4 is-uppercase"
          to="/"
        >
          Dragons of Mugloar 2
        </router-link>
      </div>

      <div class="navbar-menu">
        <div class="navbar-end">
          <router-link class="navbar-item is-tab" to="/play" active-class="is-active">
            Play
          </router-link>

          <router-link class="navbar-item is-tab" to="/about" active-class="is-active">
            About
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'DmNavigationBar'
};
</script>
