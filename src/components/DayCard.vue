<template>
  <div @click="handleToggle(day.fullDate)">
    <div>{{ datetime }}</div>

    <p class="day-number">{{ day.number }}</p>
    <div v-for="(w, index) in weather" :key="index">
      <div
        v-if="
          new Date(w.dt * 1000).getDate() ===
            new Date(Date.parse(day.fullDate)).getDate()
        "
      >
        <img width="30px" :icon="setImage(w.weather[0].icon)" :src="image" />
      </div>
    </div>
    <div v-for="(event, index) in events" v-bind:key="index">
      <div
        class="event-container"
        v-if="
          new Date(Date.parse(event.date)).getDate() ===
            new Date(Date.parse(day.fullDate)).getDate()
        "
      >
        <p class="event">{{ event.hour }}h : {{ event.content }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DayCard",
  components: {},
  props: ["day", "events", "weather", "datetime"],
  data() {
    return {
      display: false,
      icon: "",
      dayWeather: this.getWeather(),
      image: "",
    };
  },
  watch: {},

  methods: {
    setImage: function(icon) {
      const url = "http://openweathermap.org/img/wn/";
      this.image = url + icon + "@2x.png";
    },
    getWeather() {
      this.dayWeather = this.weather;
    },
    handleToggle: function(date) {
      let dateToEmit = date;
      this.display = !this.display;

      console.log("setting display on daycard");
      console.log(this.display);
      this.$emit("setDate", dateToEmit);
      this.$emit("setDisplay", this.display);
    },
  },
  mounted() {
    this.getWeather();
  },
};
</script>

<style scoped>
.day-number {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  font-size: 0.8em;
  padding: 0;
  margin: 0;
}
.event {
  display: flex;
  overflow: hidden;
  white-space: nowrap;
  overflow: hidden;
  background-color: lightblue;
}
</style>
