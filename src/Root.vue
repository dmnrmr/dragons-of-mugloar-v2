<template>
  <div id="app">
    <header>
      <dm-navigation-bar />
    </header>

    <section class="hero section is-fullheight-with-navbar">
      <div class="hero-body">
        <div class="container">
          <router-view />
        </div>
      </div>
    </section>

    <notifications classes="notification" position="bottom right" />
  </div>
</template>

<script>
import DmNavigationBar from './components/navigation-bar/NavigationBar.vue';

export default {
  name: 'DmRoot',
  components: {
    DmNavigationBar
  }
};
</script>
