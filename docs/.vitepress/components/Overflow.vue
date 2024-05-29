<template>
  <div>
    <p
      :class="{ 'text-ellipsis': overflowMode }"
      :style="{ width: overflowMode ? '90px' : 'auto' }"
      v-title.overflow="'ABCDEFGABCDEFGABCDEFGABCDEFGABCDEFGABCDEFG'"
    >
      hover me! try toggle switch and hover me again!
    </p>
    <label>
      overflow mode
      <input
        type="checkbox"
        :checked="overflowMode"
        @change="(e) => (overflowMode = e.target.checked)"
    /></label>
  </div>
</template>

<script>
export default {
  data() {
    return {
      overflowMode: true,
    };
  },
};
</script>

<style>
.text-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
