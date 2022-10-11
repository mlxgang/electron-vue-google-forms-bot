<template>
  <section id="mrb-tasks-list" class="tab">
    <EditTaskItem v-if="toggleEdit" :index="indexEdit" @closeEdit="toggleEdit = false" />
    <div id="tasksInfo">
      <span>ID</span>
      <span>Profile Name</span>
      <span>Size</span>
      <span>Mode</span>
      <span>Store</span>
      <span>Status</span>
      <span>Options</span>
    </div>
    <div id="tasksContent">
      <TaskItem
          v-for="(task, index) in TASKS_LIST"
          :key="index"
          :index="index"
          :task="task"
          @editTask="editTask"
      />
    </div>
    <div id="mrb-tasks-list-footer">
      <button disabled>Start all</button>
      <button disabled>Edit all</button>
      <button @click="DELETE_ALL_TASKS">Delete all</button>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import TaskItem from './TaskItem.vue';
import EditTaskItem from './TheTaskEdit.vue';

export default {
  name: 'TheTasks',
  components: {
    TaskItem,
    EditTaskItem,
  },
  data() {
    return {
      toggleEdit: false,
      indexEdit: null,
    };
  },
  methods: {
    ...mapActions(['DELETE_ALL_TASKS']),
    editTask(index) {
      this.toggleEdit = true;
      this.indexEdit = index;
    },
  },
  computed:
      mapState(['TASKS_LIST']),
};
</script>

<style scoped>
#tasksInfo {
  display: grid;
  grid-template-columns: 60px 230px 150px 150px 230px auto 105px 10px;
  align-items: center;
  justify-items: center;

  position: fixed;
  top: 95px;

  width: 1150px;
  height: 30px;

  border: 1px solid aliceblue;
  border-top-style: none;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  background-color: #480088;
  /* background-color: #6c00ca; */
  z-index: 1;
}
</style>
