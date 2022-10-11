import { createStore } from 'vuex';

const fs = window.require('fs');

export default createStore({
  state: {
    version: 'v0.1.4',
    TASKS_LIST: localStorage.getItem('tasks') !== null ? JSON.parse(localStorage.getItem('tasks')) : [],
    PROFILE_LIST_RAFFLE: [],
  },
  mutations: {
    ADD_TASK_TO_STATE(state, payload) {
      state.TASKS_LIST.push({ ...payload });
    },
    EDIT_TASK_IN_STATE(state, payload) {
      state.TASKS_LIST[payload.index] = payload.task;
    },
    DELETE_TASK_IN_STATE(state, payload) {
      state.TASKS_LIST.splice(payload, 1);
    },
    DELETE_ALL_TASKS_IN_STATE(state) {
      state.TASKS_LIST = [];
    },
    SET_STATUS_IN_STATE(state, payload) {
      state.TASKS_LIST[payload.index].status = payload.status;
    },
    SET_TASKS_TO_STORAGE(state) {
      localStorage.setItem('tasks', JSON.stringify(state.TASKS_LIST));
    },
    GET_PROFILE_LIST_RAFFLE(state) {
      state.PROFILE_LIST_RAFFLE = [];
      fs.readdirSync('profiles-raffle').forEach((file) => {
        state.PROFILE_LIST_RAFFLE.push(file.slice(0, -5));
      });
    },
  },
  actions: {
    ADD_TASK({ commit }, payload) {
      commit('ADD_TASK_TO_STATE', payload);
      commit('SET_TASKS_TO_STORAGE');
    },
    EDIT_TASK({ commit }, payload) {
      commit('EDIT_TASK_IN_STATE', payload);
      commit('SET_TASKS_TO_STORAGE');
    },
    DELETE_TASK({ commit }, payload) {
      commit('DELETE_TASK_IN_STATE', payload);
      commit('SET_TASKS_TO_STORAGE');
    },
    DELETE_ALL_TASKS({ commit }) {
      commit('DELETE_ALL_TASKS_IN_STATE');
      commit('SET_TASKS_TO_STORAGE');
    },
    SET_STATUS({ commit }, payload) {
      commit('SET_STATUS_IN_STATE', payload);
    },
    SET_TASKS_TO_STORAGE({ commit }) {
      commit('SET_TASKS_TO_STORAGE');
    },
    GET_PROFILE_LIST_RAFFLE({ commit }) {
      commit('SET_TASKS_TO_STORAGE');
    },
  },
});
