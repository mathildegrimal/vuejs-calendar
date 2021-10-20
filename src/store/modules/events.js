// initial state
const state = () => ({
  events: [],
  date: new Date(),
  eventToEdit: { date: "", time: "", content: "" },
});

// getters
const getters = {
  getEventsByDate: (state) => (date) => {
    let result = state.events.filter(
      (event) =>
        new Date(Date.parse(event.date)).getDate() ===
          new Date(Date.parse(date)).getDate() &&
        new Date(Date.parse(event.date)).getFullYear() ===
          new Date(Date.parse(date)).getFullYear() &&
        new Date(Date.parse(event.date)).getMonth() ===
          new Date(Date.parse(date)).getMonth()
    );

    return result;
  },
  getMonth: (state) => {
    let month = state.date.toLocaleDateString("default", { month: "long" });
    return month;
  },
  getDate: (state) => {
    return state.date;
  },
  getDays: (state) => {
    const numberOfDaysInMonth = new Date(
      state.date.getFullYear(),
      state.date.getMonth() + 1,
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
      let date = new Date(state.date.getFullYear(), state.date.getMonth(), i);

      days.push({
        day: weekDays[date.getDay()],
        number: date.getDate(),
        fullDate: date,
      });
    }
    return days;
  },
};

// actions
const actions = {
  addEventToEvents({ commit }, event) {
    if (event.date !== "" && event.content !== "") {
      commit("pushEventToEvents", event);
    }
  },
};

// mutations
const mutations = {
  pushEventToEvents: (state, event) => {
    let id = 0;
    if (state.events.length != 0) {
      id = state.events[state.events.length - 1].id + 1;
    }
    state.events.push({ id: id, ...event });
  },
  deleteEvent: (state, index) => {
    const indexToDelete = state.events.findIndex((event) => event.id == index);
    state.events.splice(indexToDelete, 1);
  },
  changeMonth: (state, value) => {
    state.date = new Date(
      state.date.getFullYear(),
      state.date.getMonth() + value
    );

    let newMonth = state.date.toLocaleDateString("default", { month: "long" });
    return newMonth;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
