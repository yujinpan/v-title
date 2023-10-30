<template>
  <div>
    <p
      :class="{ 'text-ellipsis-2': overflowAndMultipleMode }"
      :style="{ width: overflowAndMultipleMode ? '90px' : 'auto' }"
      v-title.overflow.multiple="'ABCDEFGABCDEFGABCDEFGABCDEFGABCDEFGABCDEFG'"
    >
      hover me! try toggle switch and hover me again!
    </p>
    <switch
      :value="overflowAndMultipleMode"
      @change="overflowAndMultipleMode = $event.value"
    ></switch>
  </div>
</template>

<script>
export default {
  data() {
    return {
      overflowAndMultipleMode: true,
    };
  },
};
</script>

<style>
.text-ellipsis-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
</style>
