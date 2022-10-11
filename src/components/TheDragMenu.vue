<template>
  <div id="dragMenu">
    <div style="-webkit-app-region: drag"></div>
    <div id="programTitle">{{ 'mrb • ' + $store.state.version }}</div>
    <button id="minimize " class="dragButton" @click="minimize">-</button>
    <button id="close" class="dragButton" @click="close">X</button>
  </div>
</template>

<script>
const { remote } = window.require('electron');

export default {
  name: 'TheDragMenu',
  methods: {
    minimize() {
      remote.getCurrentWindow().minimize();
    },
    close() {
      // const key = localStorage.getItem('appKey');
      remote.getCurrentWindow().destroy();
    },
  },
};
</script>

<style scoped>
#dragMenu {
  position: fixed;
  top: 0;
  width: 100%;
  height: 25px;
  background-color: #141414;

  display: grid;
  grid-template-columns: 60px auto 30px 30px;
}

#programTitle {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6c00ca;
  -webkit-app-region: drag;
}

.dragButton {
  background-color: #141414;
  color: #6c00ca;
  width: 30px;
  height: 25px;

  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
