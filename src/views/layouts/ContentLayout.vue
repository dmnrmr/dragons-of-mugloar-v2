<template>
  <div class="content-page">
    <div class="content-page__side">
      <router-link class="content-page__side-link" :to="'/'">
        <dm-icon class="content-page__side-link-icon" :name="'arrow-left'" :size="'md'" />
      </router-link>
    </div>

    <div class="content-page__content">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .content-page {
    height: 100%;
    display: flex;
    flex-direction: row;

    &__side {
      flex-basis: 10%;
      transition: background-color .2s ease-out, color .2s ease-out;

      &:hover {
        background-color: rgba(0, 0, 0, .05);
      }

      &-link {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;

        &-icon {
          transition: transform .2s ease-out, color .2s ease-out;
        }

        &:hover &-icon {
          transform: translateX(-10px);
        }
      }
    }

    &__content {
      flex-basis: 80%;
    }

    @media all and (max-width: 575px) {
      display: block;

      &__side {
        display: none;
      }
    }
  }
</style>

<script>
import DmIcon from '../components/Icon.vue';

export default {
  name: 'DmContentLayout',
  components: {
    DmIcon
  }
};
</script>
