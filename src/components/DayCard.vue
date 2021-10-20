<template>
  <div
    @click="
      setDisplay();
      setDate(day.fullDate);
    "
  >
    <div class="card-header">
      <p class="day-number">{{ day.number }}</p>
      <div v-for="(w, index) in weather" :key="index">
        <img
          class="weather-icon"
          :icon="setImage(w.weather[0].icon)"
          :src="image"
          v-if="
            new Date(w.dt * 1000).getDate() ===
              new Date(Date.parse(day.fullDate)).getDate()
          "
        />
      </div>
    </div>
    <div
      class="event-container"
      v-for="(event, index) in events"
      :key="event + index"
    >
      <Event :event="event" :index="index" />
    </div>
  </div>
</template>

<script>
import Event from "./Event.vue";
import store from "../store";

import { mapMutations, mapGetters } from "vuex";

export default {
  name: "DayCard",
  store,
  components: { Event },
  props: ["day", "weather", "datetime"],
  data() {
    return {};
  },
  computed: {
    ...mapGetters({ getEventsByDate: "event/getEventsByDate" }),
    events() {
      const events = this.getEventsByDate(this.day.fullDate);
      return events;
    },
  },
  methods: {
    ...mapMutations("display", ["setDisplay", "setDate"]),

    setImage: function(icon) {
      const url = "http://openweathermap.org/img/wn/";
      this.image = url + icon + "@2x.png";
    },
  },
  mounted() {},
};
</script>

<style scoped>
.card-header {
  display: flex;
}
.day-number {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  font-size: 0.8em;
  padding: 0;
  margin: 0;
}

.weather-icon {
  width: 20px;
}
</style>
