<template>
  <div
    id="eventForm"
    class="toggle"
    draggable="draggable"
    @dragstart="startDrag($event)"
    @dragover.stop
  >
    <div class="close-icon">
      <svg
        @click="$emit('setDisplay', false)"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
          fill="currentColor"
          fill-rule="evenodd"
          clip-rule="evenodd"
        ></path>
      </svg>
    </div>
    <div class="datetime">
      <h2>Date :</h2>
      <input
        type="date"
        :value="
          date &&
            new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000)
              .toISOString()
              .split('T00:00:00.000Z')[0]
        "
      />
      <input type="time" v-model="time" />
    </div>
    <h2>Description :</h2>
    <textarea v-model="content"></textarea>
    <button class="button" @click="addEvent">
      Enregistrer
    </button>
    <div>{{ status }}</div>
  </div>
</template>

<script>
import store from "../store";

export default {
  name: "EventForm",
  store,
  props: ["date", "display"],
  components: {},
  data() {
    return {
      content: "",
      status: "",
      time: "08:00",
    };
  },

  computed: {},

  methods: {
    startDrag: (evt) => {
      evt.dataTransfer.dropEffect = "move";
      evt.dataTransfer.effectAllowed = "move";
      evt.dataTransfer.setData("itemID", evt.target.id);
    },
    addEvent: function() {
      if (this.date != "" && this.content != "") {
        let event1 = {
          date: this.date,
          hour: this.time,
          content: this.content,
        };
        this.$store.commit("addEvent", event1);
        let event = {
          date: this.date,
          hour: this.time,
          content: this.content,
        };
        this.$emit("setEvent", event);
        this.$emit("setDisplay", false);
      } else {
        this.status = "Pas de contenu";
      }
    },
  },
  mounted() {},
};
</script>

<style scoped>
.toggle {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: move;
  position: absolute;
  z-index: 100;
  width: 400px;
  top: 200px;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.toggle > .close-icon {
  cursor: pointer;
}

.toggle > .datetime {
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
  height: 50px;
}

.toggle > input {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin: 10px;
  flex: 1;
  height: 30px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
.toggle > textarea {
  display: flex;
  border-radius: 10px;
  margin: 10px;
  height: 60px;
  width: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
.button {
  display: flex;
  border-style: none;
  width: 80px;
  padding: 10px;
  border-radius: 10px;
  margin: 20px;
  cursor: pointer;
}
.button:hover {
  background-color: lightblue;
  border-radius: 15px;
  transition: border-radius, 0.5s ease-in-out;
}
</style>
