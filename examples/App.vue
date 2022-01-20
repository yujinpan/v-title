<template>
  <CMDoc class="cm-padding-medium">
    <h2>v-title</h2>
    <p>
      author:&nbsp;&nbsp;<code>yujinpan</code>
      &nbsp;&nbsp;version:&nbsp;&nbsp;
      <code>v{{ require('../package').version }}</code
      >&nbsp;&nbsp;source code:&nbsp;&nbsp;
      <code>
        <a href="https://github.com/yujinpan/v-title">github</a>
      </code>
    </p>

    <h3>Installation</h3>
    <Highlight code="$ npm install --save v-title" lang="sh"></Highlight>
    <Highlight
      :code="
        `
import Vue from 'vue';
import VTitle from 'v-title';

Vue.use(VTitle);
    `
      "
      lang="js"
    ></Highlight>

    <h3>Usage</h3>

    <h4>dark</h4>
    <section>
      <el-button v-title="title">hover me!</el-button>
      <hr />
      <Highlight :code="templates.dark"></Highlight>
    </section>

    <h4>light</h4>
    <section>
      <el-button v-title.light="title">hover me!</el-button>
      <hr />
      <Highlight :code="templates.light"></Highlight>
    </section>

    <h4>delay</h4>
    <p>default 200ms</p>
    <section>
      <el-button v-title.delay="title">hover me!</el-button>
      <hr />
      <Highlight :code="templates.delay"></Highlight>
    </section>

    <h4>delay-time</h4>
    <section>
      <el-button v-title.delay="title" title-delay-time="1000"
        >hover me and hold 1000ms!</el-button
      >
      <hr />
      <Highlight :code="templates.delayTime"></Highlight>
    </section>

    <h4>max-width</h4>
    <section>
      <el-button v-title="title" title-max-width="100">hover me!</el-button>
      <hr />
      <Highlight :code="templates.maxWidth"></Highlight>
    </section>

    <h4>trigger</h4>
    <section>
      <el-button v-title="title" title-trigger="click">click me!</el-button>
      <hr />
      <Highlight :code="templates.trigger"></Highlight>
    </section>
    <blockquote>
      <ul>
        <li>default: <code>mouseenter focus</code></li>
        <li><code>click</code></li>
        <li><code>focusin</code></li>
      </ul>
    </blockquote>

    <h4>overflow</h4>
    <p>only show when text overflow.</p>
    <section>
      <p
        :class="{ 'cm-text-ellipsis': overflowMode }"
        :style="{ width: overflowMode ? '90px' : 'auto' }"
        v-title.overflow="title"
      >
        hover me! try toggle switch and hover me again!
      </p>
      <el-switch v-model="overflowMode"></el-switch>
      <hr />
      <Highlight :code="templates.overflow"></Highlight>
    </section>

    <h4>overflow + multiple</h4>
    <p>only show when multi-line text overflow.</p>
    <section>
      <p
        :class="{ 'cm-text-ellipsis-2': overflowAndMultipleMode }"
        :style="{ width: overflowAndMultipleMode ? '90px' : 'auto' }"
        v-title.overflow.multiple="title"
      >
        hover me! try toggle switch and hover me again!
      </p>
      <el-switch v-model="overflowAndMultipleMode"></el-switch>
      <hr />
      <Highlight :code="templates.overflowMultiple"></Highlight>
    </section>

    <h4>placement</h4>
    <ul>
      <li>default: <code>top</code></li>
      <li><code>top-start</code></li>
      <li><code>top-end</code></li>
      <li><code>right</code></li>
      <li><code>right-start</code></li>
      <li><code>right-end</code></li>
      <li><code>bottom</code></li>
      <li><code>bottom-start</code></li>
      <li><code>bottom-end</code></li>
      <li><code>left</code></li>
      <li><code>left-start</code></li>
      <li><code>left-end</code></li>
      <li><code>auto</code></li>
      <li><code>auto-start</code></li>
      <li><code>auto-end</code></li>
    </ul>
  </CMDoc>
</template>

<script>
import VTitle from '../src';
import CMDoc from '@yujinpan/common-modules/dist/components/CMDoc';

const version = require('../package').version;

export default {
  components: {
    CMDoc
  },
  directives: {
    title: VTitle
  },
  data() {
    return {
      overflowMode: true,
      overflowAndMultipleMode: true,
      title: 'ABCDEFGABCDEFGABCDEFGABCDEFGABCDEFGABCDEFG',
      version,
      templates: {
        dark: `<el-button v-title="title">hover me!</el-button>`,
        light: `<el-button v-title.light="title">hover me!</el-button>`,
        delay: `<el-button v-title.delay="title">hover me!</el-button>`,
        delayTime: `
<el-button v-title.delay="title" title-delay-time="1000"
  >hover me and hold 1000ms!</el-button
>`,
        maxWidth: `<el-button v-title="title" title-max-width="100">hover me!</el-button>`,
        trigger: `<el-button v-title="title" title-trigger="click">click me!</el-button>`,
        overflow: `
<p v-title.overflow="title">
  hover me! try toggle switch and hover me again!
</p>`,
        overflowMultiple: `
<p v-title.overflow.multiple="title">
  hover me! try toggle switch and hover me again!
</p>`
      }
    };
  }
};
</script>
