<template>
  <v-layout row class="mt-5">
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <Toolbar />
        <v-card-title
          class="headline font-weight-regular blue-grey white--text"
        >
          Contacts
          <v-btn fab small absolute right dark color="pink">
            <v-icon>mdi-plus</v-icon></v-btn
          >
        </v-card-title>

         <v-list two-line>
            <template v-for="(item,i) in FILTERED_ITEMS">

              <v-subheader
                v-if="showSubheader(i,item)"
                :key="item.guid+2">
                {{ item.name&&item.name[0] | subheaderFilter}}
              </v-subheader>
              <contact
                :item="item"
                :key="item.guid"
              />
            </template>

            <v-alert
                v-if="!FILTERED_ITEMS.length"
                :value="true"
                type="warning"
                outline
              >{{noItems}}
              </v-alert>
          </v-list> 
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Toolbar from "./Toolbar";
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: "Phonebook",
  components: {
    Toolbar
  },
  computed: {
    ...mapGetters([
        'FILTERED_ITEMS'
      ]),
  },

  data: () => ({
    items: [
      {
        color: '#2196F3',
        fullName: 'RRRR',
        initials: 'SS',
      },
      {
        color: '#2196F3',
        fullName: 'RRRR',
        initials: 'SS',
      },
      {
        color: '#2196F3',
        fullName: 'RRRR',
        initials: 'SS',
      },
    ]
  }),
  methods: {
    ...mapMutations([
        'NEW_ITEM'
      ]),
    showSubheader(i,item) {
        if(!i) return true
        const prevName = this.FILTERED_ITEMS[i-1].name && this.FILTERED_ITEMS[i-1].name[0]
        const nextName = item.name&&item.name[0]
        return (""+prevName).toUpperCase() != (""+nextName).toUpperCase()
      },
  }
};
</script>

<style scoped>
</style>