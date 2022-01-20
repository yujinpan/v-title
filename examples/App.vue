<template>
  <div class="app padding-medium text-center">
    <h2>v-title</h2>
    <p class="text-secondary">author: yujinpan - version: v{{ version }}</p>
    <el-divider></el-divider>
    <el-row class="text-left" type="flex">
      <el-col :span="12">
        <Highlight :code="code" lang="xml" />
      </el-col>
      <el-col class="text-left" :span="12">
        <div class="flex-center-align">
          <label>Dark effect:</label>
          <p class="margin-left-large" v-title="title">
            hover me!
          </p>
        </div>
        <el-divider></el-divider>
        <div class="flex-center-align">
          <label>Light effect:</label>
          <p class="margin-left-large" v-title.light="title">
            hover me!
          </p>
        </div>
        <el-divider></el-divider>
        <div class="flex-center-align">
          <label>Show delay(200ms):</label>
          <p class="margin-left-large" v-title.delay="title">
            hover me and hold some time!
          </p>
        </div>
        <el-divider></el-divider>
        <div class="flex-center-align">
          <label>Show delay(custom 1000ms):</label>
          <p
            class="margin-left-large"
            v-title.delay="title"
            title-delay-time="1000"
          >
            hover me and hold some time!
          </p>
        </div>
        <el-divider></el-divider>
        <div class="flex-center-align">
          <label>Max width(100):</label>
          <p class="margin-left-large" v-title="title" title-max-width="100">
            hover me!
          </p>
        </div>
        <el-divider></el-divider>
        <div class="flex-center-align">
          <label>Light effect:</label>
          <p class="margin-left-large" v-title.light="title">
            hover me!
          </p>
        </div>
        <el-divider></el-divider>
        <div class="flex-center-align">
          <label>Overflow mode:</label>
          <p
            :class="{ 'text-ellipsis': overflowMode }"
            :style="{ width: overflowMode ? '90px' : 'auto' }"
            class="margin-left-large"
            v-title.overflow="title"
          >
            hover me! try toggle switch and hover me again!
          </p>
          <el-switch
            class="margin-left-large"
            v-model="overflowMode"
          ></el-switch>
        </div>
        <el-divider></el-divider>
        <div class="flex-center-align">
          <label>Overflow and multiple mode:</label>
          <p
            :class="{ 'text-ellipsis-2': overflowAndMultipleMode }"
            :style="{ width: overflowAndMultipleMode ? '90px' : 'auto' }"
            class="margin-left-large"
            v-title.overflow.multiple="title"
          >
            hover me! try toggle switch and hover me again!
          </p>
          <el-switch
            class="margin-left-large"
            v-model="overflowAndMultipleMode"
          ></el-switch>
        </div>
        <el-divider></el-divider>
        <div class="flex-center-align">
          <label>Placement:</label>
          <p class="margin-left-large" v-title="title" title-placement="bottom">
            top(-start, -end), right(-start, -end), bottom(-start, -end),
            left(-start, -end)，default: top
          </p>
        </div>
        <el-divider></el-divider>
        <el-link
          type="primary"
          href="https://github.com/yujinpan/v-title#attributes"
          >https://github.com/yujinpan/v-title</el-link
        >
      </el-col>
    </el-row>
  </div>
</template>

<script>
import VTitle from '../src';

const version = require('../package').version;

export default {
  directives: {
    title: VTitle
  },
  data() {
    return {
      overflowMode: true,
      overflowAndMultipleMode: true,
      title: 'ABCDEFGABCDEFGABCDEFGABCDEFGABCDEFGABCDEFG',
      version,
      code: require('./template/example1').default
    };
  }
};
</script>

<style lang="scss">
.test-class {
  font-size: 20px;
}
</style>

<style lang="scss" scoped>
@import './styles/common-variables';

.app {
  .el-col {
    padding: $spacing-medium;
    border-right: $border-base;
    &:last-of-type {
      border-right: 0;
    }
  }
  p {
    line-height: 1.3;
  }
  p.text-ellipsis-2 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2; //这里是在第二行有省略号
    overflow: hidden;
  }
}
</style>
