<template>
  <div class="background">
    <div class="edit-box">
      <div class="input-edit-box">
        <raffle-inputs
            v-model:link="task.link"
            v-model:profile="task.profile"
            v-model:size="task.size"
            v-model:store="task.store"
            v-model:mode="task.mode"
        />
      </div>
      <div class="button-edit-box">
        <button @click="$emit('closeEdit')">Close</button>
        <button @click="editTask">Save</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { sizes, stores, task } from '@/assets/raffle';
import RaffleInputs from '@/components/RaffleInputs.vue';

export default {
  name: 'EditTaskItem',
  components: {
    RaffleInputs,
  },
  created() {
    this.task = { ...this.$store.state.TASKS_LIST[this.index] };
  },
  data() {
    return {
      sizes,
      stores,
      task,
    };
  },
  methods: {
    ...mapActions(['EDIT_TASK']),
    editTask() {
      this.EDIT_TASK({ index: this.index, task: this.task });
      this.$emit('closeEdit');
    },
  },
  computed:
      mapState(['PROFILE_LIST_RAFFLE']),
  emits: ['closeEdit'],
  props: ['index'],
};
</script>

<style scoped>
.background {
  position: absolute;
  top: 95px;
  width: 1280px;
  height: 660px;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
}

.edit-box {
  background-color: rgba(72, 0, 136);
  width: 650px;
  height: 280px;
  margin-bottom: 100px;
  border-radius: 10px;
  border: 1px solid aliceblue;
  padding: 20px 20px;
}

.input-edit-box {
  display: grid;
  grid-template-columns: 200px 200px 200px;
  grid-template-rows: 1fr 1fr;
  column-gap: 25px;
  row-gap: 30px;
  grid-template-areas:
      "link    link link"
      "profile size store"
      ".       mode .    ";
  margin-bottom: 15px;
}

.button-edit-box {
  float: right;
  display: flex;
  justify-content: space-between;
  width: 200px;
}
button {
  width: 90px;
}
</style>
