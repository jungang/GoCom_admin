const state = {
  count: 0,
  nodeCurrentSelected: []
  // logs: []
}

const mutations = {

  increment(state, n) {
    state.count += n
  },

  setNodeCurrentSelected(state, arr) {
    state.nodeCurrentSelected = arr
  }

/*  ADD_ERROR_LOG: (state, log) => {
    state.logs.push(log)
  }*/
}

const actions = {
  incrementAsync({ commit, state, rootState }, n) {
    setTimeout(() => {
      commit('increment', n)
    }, 5000)
  }

  /*  addErrorLog({ commit }, log) {
    commit('ADD_ERROR_LOG', log)
  }*/

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
