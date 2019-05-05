<template>
  <div>
    <h1 class="title">
      Game over 😢
    </h1>

    <span @click="isLoading = true">
      <router-link
        class="button is-link is-medium"
        to="/play"
        :class="{ 'is-loading': isLoading }"
      >
        Try again
      </router-link>
    </span>
  </div>
</template>

<script>
export default {
  name: 'DmGameOver',
  data: () => ({
    isLoading: false
  })
};
</script>
