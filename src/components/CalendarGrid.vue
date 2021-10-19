<template>
  <div
    id="calendarGrid"
    @drop="onDrop($event)"
    @dragover.prevent
    @dragenter.prevent
  >
    <div class="month-wrapper">
      <svg
        @click="changeMonth(-1)"
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z"
          fill="currentColor"
          fill-rule="evenodd"
          clip-rule="evenodd"
        ></path>
      </svg>
      <h1>
        {{ month[0].toUpperCase() + month.slice(1) + " " + date.getFullYear() }}
      </h1>
      <svg
        @click="changeMonth(1)"
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
          fill="currentColor"
          fill-rule="evenodd"
          clip-rule="evenodd"
        ></path>
      </svg>
    </div>
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
        class="card"
        :class="day.day.toLowerCase()"
        :events="events"
        :weather="responsedata"
        :day="day"
        v-for="(day, index) in days"
        :key="index"
      />
    </div>
  </div>
</template>

<script>
import DayCard from "./DayCard.vue";
import store from "../store";
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "CalendarGrid",
  store,
  components: { DayCard },
  props: ["events"],
  data() {
    return {
      //days: this.getDays(),
      responsedata: {},
    };
  },
  computed: {
    ...mapGetters("event", {
      month: "getMonth",
      date: "getDate",
      days: "getDays",
    }),
  },
  methods: {
    ...mapMutations("event", ["changeMonth"]),
    async fetchApi() {
      const datas = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=43.610769&lon=3.876716&exclude=current,minutely,hourly,alerts&appid=${process.env.VUE_APP_API_KEY}`,
        {
          method: "GET",
        }
      );
      const datasJson = await datas.json();
      this.responsedata = datasJson.daily;
    },
    onDrop(evt) {
      const form = evt.dataTransfer.getData("itemID");
      const formEl = document.getElementById(form);
      evt.target.appendChild(formEl);
    },
    getDays: function() {
      const date = new Date();
      const numberOfDaysInMonth = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0
      ).getDate();

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

.month-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.month-wrapper > * {
  margin: 10px;
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
  grid-template-columns: repeat(7, 1fr);
  font-weight: bold;
  grid-gap: 2px;
}

.card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  background-color: white;
  overflow-x: hidden;
  overflow-y: scroll;
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
