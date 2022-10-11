<template>
  <div class="mrb-task task">
    <p>{{ index + 1 }}</p>
    <p>{{ task.profile }}</p>
    <p>{{ isNaN(task.size) ? 'PS5' : task.size + ' US' }}</p>
    <p>{{ taskMode }}</p>
    <p>{{ task.store }}</p>
    <p>{{ task.status }}</p>
    <BaseIcon name="edit" @click="$emit('editTask', (index))"/>
    <BaseIcon :name="taskStatus" @click="SET_STATUS({index: this.index, status: 'starting'})"/>
    <BaseIcon name="delete" @click="DELETE_TASK(index)"/>
  </div>
</template>

<script>
import BaseIcon from '@/components/BaseIcon.vue';
import { mapActions } from 'vuex';

export default {
  name: 'TaskItem',
  components: {
    BaseIcon,
  },
  methods: {
    ...mapActions(['DELETE_TASK', 'SET_STATUS']),
  },
  computed: {
    taskStatus() {
      switch (this.task.status) {
        case 'idle':
          return 'start';
        case 'starting':
          return 'pause';
        default:
          return 'don`t work';
      }
    },
    taskMode() {
      return this.task.mode === true ? 'Headless' : 'Browser';
    },
  },
  emits: ['editTask'],
  props: ['index', 'task'],
};
</script>

<style scoped>
.task {
  display: grid;
  grid-template-columns: 60px 230px 150px 150px 230px auto 35px 35px 35px 10px;
  align-items: center;
  justify-items: center;

  margin-top: 20px;
  border: 1px solid aliceblue;
  width: 1150px;
  height: 50px;

  border-radius: 10px;
}
</style>
