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
    },
    SET_ITEM(state, newItem) {
      newItem.updatedAt = +new Date();
      for (const item of state.items) {
        if (item.guid === newItem.guid) {
          Object.assign(item, newItem);
          break;
        }
      }
    },
    DELETE_ITEM(state, guid) {
      state.items.some((item, index) => {
        if (item.guid === guid) {
          return Vue.delete(state.items, index);
        }
      });
    },
    SET_SNACK_MSG(state, msg) {
      state.snackMsg = msg;
    }
  },
  actions: {}
});
