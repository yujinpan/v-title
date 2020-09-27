export default `<template>
  <p v-title="title">hover me!</p>

  <!-- modify: light -->
  <p v-title.light="title">hover me!</p>

  <!-- modify: delay -->
  <p v-title.delay="title">hover me!</p>

  <!-- attr: title-delay-time -->
  <p v-title.delay="title" title-delay-time="1000">hover me!</p>

  <!-- attr: title-max-width -->
  <p v-title="title" title-max-width="100">hover me!</p>

  <!-- attr: title-class-name -->
  <p v-title="title" title-class-name="test-class">hover me!</p>

  <!-- modify: overflow -->
  <p v-title.overflow="title">hover me!</p>

  <!-- modify: overflow.multiple -->
  <p v-title.overflow.multiple="title">hover me!</p>

  <!-- attr: title-placement -->
  <p v-title="title" title-placement="bottom">
    top(-start, -end), right(-start, -end), bottom(-start, -end),
    left(-start, -end)，default: top
  </p>
</template>

<script>
import VTitle from 'v-title';

export default {
  directives: {
    VTitle
  },
  data() {
    return {
      title: 'ABCDEFGABCDEFGABCDEFGABCDEFGABCDEFGABCDEFG',
    };
  }
};
</script>

<style lang="scss">
// custom className
.test-class {
  font-size: 20px;
}
</style>`;
