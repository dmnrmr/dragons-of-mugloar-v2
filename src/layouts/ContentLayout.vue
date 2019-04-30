<template>
  <div class="content-page">
    <div class="content-page__side">
      <router-link class="content-page__side-link" :to="'/'">
        <ArrowLeft
          class="content-page__side-link-icon"
          width="48px"
          height="48px"
        />
      </router-link>
    </div>

    <div class="content-page__content">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
/* stylelint-disable */
.content-page {
  height: 100%;
  display: flex;
  flex-direction: row;

  &__side {
    flex-basis: 10%;
    transition: background-color 0.2s ease-out, color 0.2s ease-out;

    &:hover {
      background-color: rgba(0, 0, 0, 0.05);
    }

    &-link {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;

      &-icon {
        transition: transform 0.2s ease-out, color 0.2s ease-out;
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
/* stylelint-enable */
</style>

<script>
import ArrowLeft from '../components/icons/keyboard_arrow_left.svg';

export default {
  name: 'DmContentLayout',
  components: {
    ArrowLeft
  }
};
</script>
