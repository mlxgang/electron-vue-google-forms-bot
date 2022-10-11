<template>
  <section class="tab" id="mrb-create-task">
    <div id="mrb-create-task-tabs">
      <button
        v-for="tab in createTabs"
        :key="tab"
        :class="['createTab', { active: currentTab === tab }]"
        @click="currentTab = tab"
      >
        {{ tab.name }}
      </button>
    </div>
    <component
      class="tab"
      :is="currentTab.component"
    />
  </section>
</template>

<script>
import createRaffles from './mrb-create-task-raffle.vue';

const createTabs = [
  { name: 'raffles', component: createRaffles },
];

export default {
  name: 'TheCreateTask',
  data() {
    return {
      createTabs,
      currentTab: createTabs[0],
    };
  },
};
</script>

<style scoped>
#mrb-create-task {
  width: 1210px;
  height: 590px;

  padding: 35px;

  display: grid;
  grid-template-columns: 130px 1000px;
  grid-template-rows: 615px;
  grid-auto-flow: column;
  column-gap: 80px;
}
#mrb-create-task-tabs {
  width: 130px;
  height: 615px;

  display: grid;
  grid-template-columns: 130px;
  grid-template-rows: 60px 60px;
  row-gap: 40px;

  justify-content: space-around;
  flex-direction: column;
  align-items: center;
}
.createTab {
  width: 130px;
  height: 30px;
}
.createTab.active {
  background-color: #6c00ca;
}
</style>
