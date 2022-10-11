<template>
  <svg
      :class="$attrs.class || 'icon'"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      v-html="path"
  ></svg>
</template>

<script>
import icons from '../assets/icons';

export default {
  name: 'BaseIcon',
  props: ['name'],
  computed: {
    path() {
      return icons[this.name];
    },
  },
};
</script>

<style scoped>
.icon {
  width: 30px;
  height: 30px;
  cursor: pointer;
}
</style>
