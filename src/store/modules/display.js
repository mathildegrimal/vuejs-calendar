// initial state
const state = () => ({
  display: false,
  date: "",
  status: "",
});

// getters
const getters = {
  getDisplay: (state) => {
    return state.display;
  },
  getDate: (state) => {
    return state.date;
  },
  getStatus: (state) => {
    return state.status;
  },
};

// actions
const actions = {
  setStatusAndDisplay({ commit }, content) {
    if (content !== "") {
      commit("setDisplay");
    } else {
      commit("setStatus", { status: "Pas de contenu" });
    }
  },
};

// mutations
const mutations = {
  setDisplay: (state) => {
    state.display = !state.display;
  },
  setStatus: (state, status) => {
    state.status = status;
  },
  setDate: (state, date) => {
    state.date = new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000)
      .toISOString()
      .split("T00:00:00.000Z")[0];
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
