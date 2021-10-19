import Vue from "vue";
import Vuex from "vuex";
import events from "./modules/events";
import display from "./modules/display";

Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    event: events,
    display: display,
  },
  strict: true,
});
