import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    events: [],
  },
  getters: {
    getEvents: (state) => {
      return state.events;
    },
  },
  mutations: {
    addEvent: (state, event) => {
      state.events.push(event);
    },
    deleteEvent: (state, index) => {
      state.events.splice(index, 1);
    },
  },
});
