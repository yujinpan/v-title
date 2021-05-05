# v-title

Auxiliary text display（like `el-tooltip`）.

https://yujinpan.github.io/v-title/

## Usage

### Install

```
npm install --save v-title
```

### Require element-ui

If your project does not use element-ui,
you need to introduce a separate element-ui package, like this:

```js
import 'v-title/lib/element-ui';
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
- light: use light effect, default: dard
- overflow: use overflow mode
- multiple: use multiple line mode(**need set element's `line-height > offsetHeight`**)

#### Attributes

- title-placement: `String` placement top/right/bottom/left(-start, -end), default: top
- title-delay-time: `Number` show delay time, default: '200'
- title-max-width: `Number` tooltip max width, default: none
- title-class-name: `String` tooltip class name, default: 'v-title'

### Complete example

```xml
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
</style>
```
