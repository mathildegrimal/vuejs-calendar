<template>
  <div @click="handleToggle(day.fullDate)">
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
      <Event
        :event="event"
        :index="index"
        v-on:setEventToDelete="onDeleteEvent"
        v-if="
          new Date(Date.parse(event.date)).getDate() ===
            new Date(Date.parse(day.fullDate)).getDate()
        "
      />
    </div>
  </div>
</template>

<script>
import Event from "./Event.vue";
export default {
  name: "DayCard",
  components: { Event },
  props: ["day", "events", "weather", "datetime"],
  data() {
    return {
      display: false,
    };
  },
  watch: {},

  methods: {
    onDeleteEvent: function(index) {
      this.$emit("setEventToDelete", index);
    },
    setImage: function(icon) {
      const url = "http://openweathermap.org/img/wn/";
      this.image = url + icon + "@2x.png";
    },
    handleToggle: function(date) {
      let dateToEmit = date;
      this.$emit("setDate", dateToEmit);
      this.$emit("setDisplay", !this.display);
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
