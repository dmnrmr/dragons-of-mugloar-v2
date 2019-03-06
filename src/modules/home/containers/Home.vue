<template>
  <div class="home-page">
    <h1 class="home-page__title">
      Dragons of Mugloar 2
    </h1>

    <nav>
      <router-link to="/game">
        Play game
      </router-link>

      <router-link to="/about">
        About the game
      </router-link>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
  h1 {
    color: darkgreen;
  }
</style>
