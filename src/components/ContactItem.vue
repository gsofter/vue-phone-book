<template>
  <v-hover :key="item.phone + 'n'">
    <v-card
      slot-scope="{ hover }"
      :class="`elevation-${hover ? 5 : 2}`"
      class="mx-auto contact-row py-4 px-4"
    >
      <!-- <div class="contact-item">  -->
      <v-flex class="row" xs12>
        <v-list-tile :key="item.name" avatar>
          <v-list-tile-avatar>
              <v-icon size="large">mdi-account-circle</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title v-html="item.name"></v-list-tile-title>
            <v-list-tile-sub-title v-html="item.phone"></v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
          <v-flex>
            <ActionButtons :item="item" @edit="editClick" @delete="deleteClick" />
          </v-flex>
      </v-flex>
      <!-- </div> -->
    </v-card>
  </v-hover>
</template>

<script>
import { mapMutations } from 'vuex';
import ActionButtons from './ActionButtons'
export default {
  name: "ContactItem",
  props: ["item"],
  components: {
    ActionButtons
  },
  data() {
    return {
      showDialog: false,
      isEditing: false
    };
  },

  methods: {
      ...mapMutations([
          'SET_ITEM',
          'DELETE_ITEM',
          'SET_SNACK_MSG'
      ]),
      editClick() {
          console.log("editClick => ", this.item.guid)
          this.isEditing = true;
          this.showDialog = true;
      },
      deleteClick() {
        this.DELETE_ITEM(this.item.guid)
        this.SET_SNACK_MSG('Contact has been deleted')
      },
      saveClick(newItem) {
        console.warn('save')
        this.SET_ITEM(newItem)
        this.isEditing = false
        this.SET_SNACK_MSG('Contact has been updated')
      },
  }
};
</script>

<style lang="scss" scoped>
.contact-row {
  cursor: pointer;
}
</style>