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
  getEventsByDate: (state, date) => {
    return state.events.filter(
      (event) =>
        new Date(Date.parse(event.date)).getDate() ===
        new Date(Date.parse(date)).getDate()
    );
  },
};

// actions
const actions = {};

// mutations
const mutations = {
  addEvent: (state, event) => {
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
