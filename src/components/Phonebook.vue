<template>
  <v-layout row class="main-layout">
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <Toolbar />
        <v-card-title
          class="headline font-weight-regular blue-grey white--text"
        >
          Contacts
          <v-btn fab small absolute right dark color="pink" @click="newContact">
            <v-icon>mdi-plus</v-icon></v-btn
          >
        </v-card-title>
        <v-virtual-scroll
          :items="FILTERED_ITEMS"
          :item-height="65"
          height="500px"
        >
          <template v-slot:default="{ item }">
            <ContactItem :item="item" :key="item.guid" />
          </template>
        </v-virtual-scroll>
      </v-card>

      <ContactModal
        v-if="showDialog"
        isCreating="1"
        :item="{}"
        :show="showDialog"
        :isEditing="true"
        @close="closeModal"
        @cancel="closeModal"
        @save="saveClick"
      />
    </v-flex>
  </v-layout>
</template>

<script>
import Toolbar from "./Toolbar";
import ContactItem from "./ContactItem";
import ContactModal from "./ContactModal";
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "Phonebook",
  components: {
    Toolbar,
    ContactItem,
    ContactModal
  },
  computed: {
    ...mapGetters(["FILTERED_ITEMS"])
  },

  data: () => ({
    showDialog: false
  }),
  methods: {
    ...mapMutations(["NEW_ITEM"]),
    showSubheader(i, item) {
      if (!i) return true;
      const prevName =
        this.FILTERED_ITEMS[i - 1].name && this.FILTERED_ITEMS[i - 1].name[0];
      const nextName = item.name && item.name[0];
      return ("" + prevName).toUpperCase() != ("" + nextName).toUpperCase();
    },
    newContact() {
      this.showDialog = true;
    },
    closeModal() {
      this.showDialog = false;
    },
    saveClick(newItem) {
      this.showDialog = false;
      this.NEW_ITEM(newItem);
    }
  },
  filters: {
    subheaderFilter(e) {
      return (typeof e == "string" && e.toUpperCase()) || "";
    }
  }
};
</script>

<style scoped>
.main-layout {
  margin-top: 20px;
}

@media screen and (max-width: 576px) {
  .main-layout {
    margin-top: 0px;
  }
}
</style>
