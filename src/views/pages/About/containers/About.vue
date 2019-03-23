<template>
  <dm-content-layout>
    <div class="content-about">
      <h1 class="content-about__title">
        About the game
      </h1>

      <div class="content-about__description">
        <p class="content-about__description-paragraph">
          The Kingdom of Mugloar has noticeably changed over the short time of just a few years – it was not long ago
          when the state officials introduced a skilled dragon trainer to the country’s payroll to train the scaly
          beasts to protect our lands against invading knights, hungry for royal hands in marriage – princess or
          miscellaneous. The dragon trainer was successful in fending off the knights and making dragons commonplace in
          the Mugloarian everyday.
        </p>

        <p class="content-about__description-paragraph">
          So much so that many people discovered a dragon-shaped hole in their hearts and a corresponding amount of
          space in their barns and began describing themselves as „freelance dragon trainers“. This was before the
          general public learned the fire hazards of keeping fire-breathing creatures in wooden buildings and the
          dangers of heart burn, soon after, fresh dragon trainers began investing in stone dragon dens and making the
          dragon strictly a matter of the brain, not heart.
        </p>

        <p class="content-about__description-paragraph">
          As owning a dragon is a rather expensive hobby if you’re not funded by generous amounts of taxpayer money,
          the dragon trainers sought financial stability (or more) through completing tasks of varying complexity for
          fellow muglorians with the assistance of their dragon.
        </p>

        <p class="content-about__description-paragraph">
          They would get the assignments, complete with promises of glory and riches, delivered on bits of paper,
          leaves, leather or sometimes even a crudely carved potato skin. As you pass the messages on to the dragon
          owners, a creative business idea emerges.
        </p>

        <p class="content-about__description-paragraph">
          You could provide a service for these people in need! Instead of flipping over every leaf on their front lawn
          to see if they are desperate support requests from the dragonless or just nature doing it’s thing for the
          winter, the dragon trainers could just come to you and purchase a right to view all the messages. For a small
          fee, of course. Instead of leaving their cries of help with untrustworthy travellers or carrier birds of
          varying intelligence, people seeking the help of a freelance dragon trainer, could just purchase the right to
          leave their message with you – a person of established trustworthyness and a static intelligence of the „quite
          noticeably above average“ level. For a small fee, of course.
        </p>
      </div>
    </div>
  </dm-content-layout>
</template>

<style lang="scss" scoped>
  .content-about {
    padding: 2rem;

    &__title {
      text-transform: uppercase;
    }

    &__description {
      padding-top: 2rem;

      &-paragraph {
        margin-bottom: 1rem;
      }
    }
  }
</style>

<script>
import DmContentLayout from '../../../layouts/ContentLayout.vue';

export default {
  name: 'DmHome',
  components: {
    DmContentLayout
  }
};
</script>
