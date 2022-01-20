# v-title

Tooltip text for Vue.

Online Examples: https://yujinpan.github.io/v-title

> Now new version 2.0 is released, removed required packages `element-ui` and `tooltip.js`,
> tooltip.js has been deprecated, and the new version `tippy.js` added more features,
> so `v-title` removed many dom handles.

## Usage

### Install

```
npm install --save v-title
```

### Global registration

```js
import Vue from 'vue';
import VTitle from 'v-title';

Vue.use(VTitle);
```

### In-component registration

```js
import VTitle from 'v-title';

export default {
  directives: {
    VTitle
  }
};
```

### Options

#### Modifies

- delay: show delay
- light: use light effect, default: translucent
- overflow: use overflow mode
- multiple: use multiple line mode(**need set element's `line-height > offsetHeight`**)

#### Attributes

- title-placement: `String` placement top/right/bottom/left(-start, -end), default: top
- title-delay-time: `Number` show delay time, default: '200'
- title-max-width: `Number` tooltip max width, default: none

### Complete example

```vue
<template>
  <p v-title="title">hover me!</p>

  <!-- modify: light -->
  <p v-title.light="title">hover me!</p>

  <!-- modify: delay -->
  <p v-title.delay="title">hover me!</p>

  <!-- attr: title-delay-time -->
  <p v-title.delay="title" title-delay-time="1000">hover me!</p>

  <!-- attr: title-max-width -->
  <p v-title="title" title-max-width="100">hover me!</p>

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
.tippy-content {
  font-size: 20px;
}
</style>
```
