import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import items from "./mock";
import createPersistedState from "vuex-persistedstate";
const { getGuid, compare } = require("@/common/functions");

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    items: items,
    loading: false,
    isSearchMode: false,
    filterItemsByName: false,
    snackMsg: false
  },
  getters: {
    items(state) {
      return state.items;
    },
    FILTERED_ITEMS(state) {
      return state.items.sort(compare);
    }
  },
  mutations: {
    NEW_ITEM(state, newItem) {
      newItem.createdAt = +new Date();
      newItem.guid = getGuid();
      state.items.push(newItem);
    }
  },
  actions: {}
});
