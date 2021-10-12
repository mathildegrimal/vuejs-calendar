<template>
  <div id="app">
    <EventForm
      v-if="display"
      :date="date"
      v-on:setDisplay="onSetDisplay"
      :display="display"
      v-on:setEvent="onSetEvent"
    />
    <CalendarGrid
      :events="events"
      v-on:setDate="onSetDate"
      v-on:setDisplay="onSetDisplay"
    />
  </div>
</template>

<script>
import CalendarGrid from "./components/CalendarGrid.vue";
import EventForm from "./components/EventForm.vue";

export default {
  name: "App",
  components: {
    CalendarGrid,
    EventForm,
  },
  data() {
    return {
      date: "",
      display: false,
      events: [],
    };
  },

  methods: {
    onSetEvent: function(event) {
      console.log(event);
      this.events.push(event);
    },
    onSetDate: function(date) {
      this.date = new Date(date);
    },
    onSetDisplay: function(display) {
      console.log("setting display on app");

      this.display = !display;
      console.log(display);
    },
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
