<template>
  <div class="columns is-vcentered">
    <div class="column is-6">
      <div class="section-header">
        <h1 class="title is-spaced">
          As a dragon trainer, find financial stability (or more)
        </h1>

        <h2 class="subtitle is-3">
          Through completing tasks of varying complexity for fellow muglorians with the
          assistance of your dragon.
        </h2>

        <span @click="isLoading = true">
          <router-link
            class="button is-link is-medium play-game"
            to="/play"
            :class="{ 'is-loading': isLoading }"
          >
            Start the game
          </router-link>
        </span>
      </div>
    </div>

    <div class="column is-6">
      <div class="section-media">
        <div class="image"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
/* stylelint-disable */
@import '~bulma/sass/utilities/mixins';

.image {
  background: center / contain no-repeat
    url('../../../../assets/images/ambassadorOnPaper.png');
  height: 0;
  padding-bottom: 71%;
}

@include mobile {
  .play-game {
    width: 100%;
  }
}
/* stylelint-enable */
</style>

<script>
export default {
  name: 'DmHome',
  data: () => ({
    isLoading: false
  })
};
</script>
