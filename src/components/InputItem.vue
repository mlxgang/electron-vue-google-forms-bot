<template>
  <div class="inputBox">
    <label :for="input.id">
      <span>{{ input.name }}</span>
      <input
        :id="input.id"
        @input="$emit('update:value', $event.target.value)"
        :value="value"
        :placeholder="input.placeholder"
        :type="input.type"
      />
    </label>
  </div>
</template>

<script>
export default {
  name: 'InputItem',
  props: {
    input: Object,
    value: String,
  },
  emits: ['update:value'],
};
</script>

<style scoped>

</style>
