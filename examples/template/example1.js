export default `<template>
  <p v-title="title"></p>
  <p v-title.delay="title"></p>
  <p v-title.delay="title" delay-time="1000"></p>
  <p v-title.light="title"></p>
  <p v-title.overflow="title"></p>
  <p v-title.overflow.multiple="title"></p>
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
      title: 'test',
    };
  }
};
</script>`;
