<template>
  <router-link class="anchor-button" :to="to">
    {{ text }}
  </router-link>
</template>

<style lang="scss" scoped>
  @import '../../../styles/variables';

  .anchor-button {
    color: inherit;
    text-decoration: none;
    text-transform: uppercase;
    border: .15em solid $main-color;
    padding: 1em;
    width: 20em;
    display: inline-block;
    font-weight: 700;
    text-align: center;
    transition: background-color .2s ease-out, color .2s ease-out;

    &:hover {
      background-color: $main-color;
      color: $secondary-color;
    }
  }
</style>

<script>
export default {
  name: 'DmAnchorButton',
  props: {
    text: {
      type: String,
      required: true
    },
    to: {
      type: String,
      required: true
    }
  }
};
</script>
