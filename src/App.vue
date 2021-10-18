<template>
  <div id="app">
    <EventForm
      v-if="display"
      :date="date"
      :display="display"
      v-on:setDisplay="onSetDisplay"
      v-on:setEvent="onSetEvent"
    />
    <CalendarGrid
      :events="events"
      v-on:setDate="onSetDate"
      v-on:setDisplay="onSetDisplay"
      v-on:setEventToDelete="onDeleteEvent"
    />
    <button @click="addEvent">add Event</button>
    <div>{{ eventsByDate }}</div>
  </div>
</template>

<script>
import CalendarGrid from "./components/CalendarGrid.vue";
import EventForm from "./components/EventForm.vue";
import store from "./store";
export default {
  name: "App",
  store,
  components: {
    CalendarGrid,
    EventForm,
  },
  computed: {
    eventsByDate() {
      return this.$store.getters.getEvents;
    },
  },
  data() {
    return {
      date: "",
      display: false,
      events: [],
    };
  },

  methods: {
    addEvent() {
      let event = { id: 3, date: "2021-10-04", hour: "22", content: "text 3" };
      return this.$store.commit("addEvent", event);
    },
    onSetEvent: function(event) {
      this.events.push(event);
    },
    onDeleteEvent: function(index) {
      this.events.splice(index, 1);
    },
    onSetDate: function(date) {
      this.date = new Date(date);
    },
    onSetDisplay: function(display) {
      this.display = display;
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
