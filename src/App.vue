<template>
  <div v-if="auth === false">
    <TheAuth @authApp="authApp"/>
  </div>
  <div v-else>
  <TheDragMenu/>
  <TheHeader
      :currentTab="currentTab"
      :tabs="tabs"
      @changeCurrentTab="changeCurrentTab"
  />
  <keep-alive>
    <component :is="currentTab.component" class="tab"/>
  </keep-alive>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import TheAuth from './components/TheAuth.vue';
import TheDragMenu from './components/TheDragMenu.vue';
import TheHeader from './components/TheHeader.vue';
import TheCreateTask from './components/TheCreateTask.vue';
import TheTasks from './components/TheTasks.vue';
import TheProfiles from './components/TheProfiles.vue';
import TheSettings from './components/TheSettings.vue';

const tabs = [
  { title: 'create', component: TheCreateTask },
  { title: 'tasks', component: TheTasks },
  { title: 'profiles', component: TheProfiles },
  { title: 'settings', component: TheSettings },
];

export default {
  name: 'App',
  data() {
    return {
      auth: false,
      tabs,
      currentTab: tabs[0],
    };
  },
  components: {
    TheDragMenu,
    TheHeader,
    TheAuth,
  },
  beforeMount() {
    this.GET_PROFILE_LIST_RAFFLE();
  },
  methods: {
    ...mapMutations(['GET_PROFILE_LIST_RAFFLE']),
    changeCurrentTab(index) {
      this.currentTab = this.tabs[index];
    },
    authApp() {
      // window.ipc.send('createBrowser');
      this.auth = true;
    },
  },
};
</script>
