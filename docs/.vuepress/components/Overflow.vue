<template>
  <div>
    <p
      :class="{ 'text-ellipsis': overflowMode }"
      :style="{ width: overflowMode ? '90px' : 'auto' }"
      v-title.overflow="'ABCDEFGABCDEFGABCDEFGABCDEFGABCDEFGABCDEFG'"
    >
      hover me! try toggle switch and hover me again!
    </p>
    <switch
      :value="overflowMode"
      @change="overflowMode = $event.value"
    ></switch>
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
}
</style>
