<template>
  <header>
    <div id="logo"></div>
    <div id="buttons">
      <button
        v-for="(tab, index) in tabs"
        :key="tab"
        :class="['topButton', { active: currentTab === tab }]"
        @click="$emit('changeCurrentTab', index)"
      >
        {{ tab.title }}
      </button>
    </div>
  </header>
</template>

<script>
export default {
  name: 'TheHeader',
  props: {
    tabs: Array,
    currentTab: Object,
  },
  emits: ['changeCurrentTab'],
};
</script>
