// initial state
// shape: [{ id, quantity }]
const state = () => ({
  events: [],
});

// getters
const getters = {
  getEvents: (state) => {
    return state.events;
  },
  getEventsByDate: (state) => (date) => {
    let result = state.events.filter(
      (event) =>
        new Date(Date.parse(event.date)).getDate() ===
        new Date(Date.parse(date)).getDate()
    );

    return result;
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
    state.events.push(event);
  },
  deleteEvent: (state, index) => {
    state.events.splice(index, 1);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
