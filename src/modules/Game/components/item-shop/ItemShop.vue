<template>
  <div class="shop-dropdown dropdown" :class="{ 'is-active': isShopOpened }">
    <button
      ref="dropdownButton"
      class="shop-dropdown__button button"
      type="button"
      @click="toggleShop()"
    >
      <dm-cart></dm-cart>
      <span>Buy items</span>
    </button>

    <div class="shop-dropdown__menu dropdown-menu">
      <div class="shop-dropdown__menu-content dropdown-content">
        <button
          v-for="item in shopItems"
          :key="item.id"
          class="shop-dropdown__menu-content-item dropdown-item"
          type="button"
          :disabled="!item.purchasable"
          @click="buy(item.id)"
        >
          [{{ item.cost }}] {{ item.name }}
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '~bulma/sass/utilities/mixins';
@import '~bulma/sass/utilities/derived-variables';

.shop-dropdown__menu-content-item {
  background: 0;
  border: 0;
  cursor: pointer;

  &:disabled {
    cursor: no-drop;
    color: $light;
  }
}

@include mobile {
  .shop-dropdown {
    width: 100%;

    &__button {
      width: 100%;
    }
  }
}
</style>

<script>
import DmCart from '../../../../components/icons/shopping_cart.svg';

export default {
  name: 'DmItemShop',
  components: {
    DmCart
  },
  props: {
    gold: {
      type: Number,
      required: true
    },
    items: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    isShopOpened: false
  }),
  computed: {
    shopItems: ({ gold, items }) =>
      items.map(item => ({
        ...item,
        purchasable: gold >= item.cost
      }))
  },
  created() {
    document.addEventListener('click', this.handleDocumentClick);
  },
  destroyed() {
    document.removeEventListener('click', this.handleDocumentClick);
  },
  methods: {
    toggleShop() {
      this.isShopOpened = !this.isShopOpened;
    },
    closeShop() {
      this.isShopOpened = false;
    },
    handleDocumentClick(element) {
      const { dropdownButton } = this.$refs;
      const { target } = element;
      const isDropDownClicked = dropdownButton === target;
      const isDropDownChildClicked = dropdownButton.contains(target);
      const isDropDownOpened = this.isShopOpened;

      if (!isDropDownClicked && !isDropDownChildClicked && isDropDownOpened) {
        this.closeShop();
      }
    },
    buy(id) {
      this.$emit('item-buy', id);
    }
  }
};
</script>
