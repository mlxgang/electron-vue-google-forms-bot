<template>
  <div id="mrb-create-task-raffle">
    <raffle-inputs
        v-model:link="task.link"
        v-model:mode="task.mode"
        v-model:profile="task.profile"
        v-model:size="task.size"
        v-model:store="task.store"
    />
    <button id="createTaskBtn" @click="ADD_TASK(task)">Create task</button>
  </div>
</template>

<script>
/* eslint-disable */
import { mapActions, mapState } from 'vuex';
import { sizes, stores, task } from '@/assets/raffle';
import RaffleInputs from '@/components/RaffleInputs.vue';

export default {
  name: 'TheCreateTaskRaffle',
  created() {
    this.task.profile = this.$store.state.PROFILE_LIST_RAFFLE[0];
  },
  components: {
    RaffleInputs,
  },
  mounted() {
    this.task.type = 'Raffle';
    this.task.link = 'https://docs.google.com/forms/d/e/1FAIpQLSe1_k6HNwXTZxryQmJPEAZ7JJB7jEGKpVq2Vzv6OUZI5fRLWg/viewform';
    this.task.size = this.sizes[6];
    this.task.store = this.stores[0].value;
  },
  data() {
    return {
      sizes,
      stores,
      task,
    };
  },
  computed:
      mapState(['PROFILE_LIST_RAFFLE']),
  methods: {
    ...mapActions(['ADD_TASK']),
  },
};

</script>

<style>
#mrb-create-task-raffle {
  display: grid;
  grid-template-rows: 60px 60px 60px 60px 60px;
  grid-template-columns: 550px 130px;
  row-gap: 50px;
  grid-template-areas:
        "link"
        "profile"
        "size"
        "store"
        "mode";
  width: 1000px;
  height: 550px;
}
</style>
