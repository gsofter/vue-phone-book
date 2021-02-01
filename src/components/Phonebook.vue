<template>
  <v-layout row class="mt-5">
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
        <v-list two-line>
          <template v-for="(item, i) in FILTERED_ITEMS">
            <v-subheader v-if="showSubheader(i, item)" :key="item.guid + 2">
              {{ item.name && item.name[0] | subheaderFilter }}
            </v-subheader>
            <ContactItem :item="item" :key="item.guid" />
          </template>

          <v-alert
            v-if="!FILTERED_ITEMS.length"
            :value="true"
            type="warning"
            outline
            >{{ noItems }}
          </v-alert>
        </v-list>
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
      console.log("newContact");
    },
    closeModal() {
      this.showDialog = false;
      console.log('closeModal')
    },
    saveClick(newItem) {
      this.showDialog = false;
      this.NEW_ITEM(newItem)
    }
  },
  filters: {
    subheaderFilter(e) {
        return typeof e == 'string' && e.toUpperCase() || ''
      }
  }
};
</script>

<style scoped>
</style>