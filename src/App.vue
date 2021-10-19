<template>
  <div id="app">
    <EventForm v-if="display" />
    <CalendarGrid />
  </div>
</template>

<script>
import CalendarGrid from "./components/CalendarGrid.vue";
import EventForm from "./components/EventForm.vue";
import { mapActions, mapGetters } from "vuex";

import store from "./store";
export default {
  name: "App",
  store,
  components: {
    CalendarGrid,
    EventForm,
  },
  computed: {
    ...mapGetters("display", {
      display: "getDisplay",
    }),
  },
  data() {
    return {
      date: "",
    };
  },

  methods: {
    ...mapActions("event", ["addEventToEvents", event]),
  },
};
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}
</style>
