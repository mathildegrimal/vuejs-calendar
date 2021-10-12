<template>
  <div id="calendarGrid">
    <h1>{{ month[0].toUpperCase() + month.slice(1) }}</h1>
    <div class="days-container">
      <div class="lundi">Lundi</div>
      <div class="mardi">Mardi</div>
      <div class="mercredi">Mercredi</div>
      <div class="jeudi">Jeudi</div>
      <div class="vendredi">Vendredi</div>
      <div class="samedi">Samedi</div>
      <div class="dimanche">Dimanche</div>
    </div>
    <div class="card-container">
      <DayCard
        :events="events"
        v-for="(day, index) in days"
        v-bind:key="index"
        :class="day.day.toLowerCase()"
        class="card"
        :weather="responsedata"
        v-on:setDate="onSetDate"
        v-on:setDisplay="onSetDisplay"
        v-bind:day="day"
      />
    </div>
  </div>
</template>

<script>
import DayCard from "./DayCard.vue";

export default {
  name: "CalendarGrid",
  components: { DayCard },
  props: ["events"],
  data() {
    return {
      days: this.getDays(),
      month: new Date().toLocaleDateString("default", { month: "long" }),
      responsedata: {},
    };
  },

  methods: {
    async fetchApi() {
      const datas = await fetch(
        "https://api.openweathermap.org/data/2.5/onecall?lat=43.610769&lon=3.876716&exclude=current,minutely,hourly,alerts&appid=8dcdaa455ecb0ec90a2a1128f2743e55",
        {
          method: "GET",
        }
      );
      const datasJson = await datas.json();
      this.responsedata = datasJson.daily;
    },
    onSetDate: function(date) {
      this.$emit("setDate", date);
    },
    onSetDisplay: function(display) {
      this.$emit("setDisplay", !display);
    },
    getDays: function() {
      const date = new Date();
      const numberOfDaysInMonth = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0
      ).getDate();
      console.log("days in month", numberOfDaysInMonth);
      let days = [];
      const weekDays = [
        "Dimanche",
        "Lundi",
        "Mardi",
        "Mercredi",
        "Jeudi",
        "Vendredi",
        "Samedi",
      ];

      for (let i = 1; i <= parseInt(numberOfDaysInMonth); i++) {
        let date = new Date(new Date().getFullYear(), new Date().getMonth(), i);
        //console.log(date);

        days.push({
          day: weekDays[date.getDay()],
          number: date.getDate(),
          fullDate: date,
        });
      }
      return days;
    },
  },
  mounted() {
    this.fetchApi();
  },
};
</script>

<style scoped>
#calendarGrid {
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 80%;
}
.card-container {
  display: grid;
  position: relative;
  width: 100%;
  grid-template-rows: minmax(80px, 130px), repeat(6);
  grid-template-columns: repeat(7, 1fr);
  border: 1px solid lightgrey;
  grid-gap: 2px;
  background-color: lightgrey;
}
.days-container {
  display: grid;
  width: 100%;
  grid-template-rows: minmax(40px, 140px), repeat(6);
  grid-template-columns: repeat(7, 1fr);
  border: 1px solid lightgrey;
  grid-gap: 2px;
}

.day-name {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  background-color: white;
  font-weight: bold;
}
.card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  background-color: white;
  height: 110px;
  padding: 3px;
}
.lundi {
  grid-column: 1;
}
.mardi {
  grid-column: 2;
}
.mercredi {
  grid-column: 3;
}
.jeudi {
  grid-column: 4;
}
.vendredi {
  grid-column: 5;
}
.samedi {
  grid-column: 6;
}
.dimanche {
  grid-column: 7;
}
</style>
