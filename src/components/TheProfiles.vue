<template>
  <section class="tab" id="mrb-profiles">
    <div id="mrb-profiles-tabs">
      <button
        v-for="tab in profilesTabs"
        :key="tab"
        :class="['profileTab', { active: currentTab === tab }]"
        @click="currentTab = tab"
      >
        {{ tab.name }}
      </button>
    </div>
    <component class="tab" :is="currentTab.component"></component>
  </section>
</template>

<script>
import profileRaffles from './mrb-profiles-raffle.vue';

const profilesTabs = [
  { name: 'raffles', component: profileRaffles },
];

export default {
  name: 'TheProfiles',
  data() {
    return {
      profilesTabs,
      currentTab: profilesTabs[0],
    };
  },
};
</script>

<style>
#mrb-profiles {
  width: 1210px;
  height: 615px;

  padding: 35px;

  display: grid;
  grid-template-columns: 130px 1000px;
  grid-template-rows: 615px;
  grid-auto-flow: column;
  column-gap: 80px;
}
#mrb-profiles-tabs {
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
.profileTab {
  width: 130px;
  height: 30px;
}
.profileTab .active {
  background-color: #6c00ca;
}
</style>
