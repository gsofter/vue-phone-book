<template>
  <v-row justify="center">
    <v-dialog v-model="isShowing" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">
          Contact Info
          <span class="grey--text" v-if="itemCreatedDate"
            >Created: {{ itemCreatedDate }}</span
          >
          <span class="grey--text" v-if="itemUpdatedDate"
            ><br />Updated: {{ itemUpdatedDate }}</span
          >
          <span class="grey--text" v-if="itemImportedDate"
            ><br />Imported: {{ itemImportedDate }}</span
          >
        </v-card-title>
        <v-card-text>
          <v-text-field
            label="Name"
            prepend-icon="mdi-account"
            :rules="nameRules"
            :disabled="!isEditing"
            @keyup.enter="saveClick"
            required
            :validate="false"
            v-model.trim="itemBuffer.name"
          />
          <v-text-field
            label="Phone"
            prepend-icon="mdi-phone"
            :rules="phoneRules"
            :disabled="!isEditing"
            @keyup.enter="saveClick"
            required
            :validate="false"
            v-model.trim="itemBuffer.phone"
          />
        </v-card-text>

        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn v-if="!isEditing" flat  @click="$emit('edit')"> Edit </v-btn>
          <v-btn v-if="!isEditing" flat @click="$emit('delete')" color="purple">Delete</v-btn>
          <v-btn v-if="!isEditing" flat @click="$emit('delete')" color="purple">Delete</v-btn>
          <v-btn :disabled="!isSaveBtnActive" v-if="isEditing" flat @click="saveClick">Save</v-btn>
          <v-btn v-if="isEditing" flat @click="cancelClick">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: ["show", "item", "isEditing", "isCreating"],
  data() {
    return {
      itemBuffer: {},
      nameRules: [(v) => !!v || "Name is required"],
      phoneRules: [(v) => !!v || "Phone is required"]
    };
  },

  mounted() {
    this.refreshItems();
  },

  computed: {
    headline() {
      return (
        (this.isCreating && "New contact") ||
        (this.isEditing && "Edit contact ") ||
        "Contact info"
      );
    },
    isShowing: {
      get() {
        return this.show;
      },
      set(e) {
        !e && this.$emit("close");
      }
    },
    itemCreatedDate() {
      return this.dateParse(this.item.createdAt);
    },
    itemUpdatedDate() {
      return this.dateParse(this.item.updatedAt);
    },
    itemImportedDate() {
      return this.dateParse(this.item.importedAt);
    },
    isSaveBtnActive() {
        const name = this.itemBuffer.name
        const phone = this.itemBuffer.phone
        return typeof name == 'string' && typeof phone == 'string' && name && phone
    }
  },
  methods: {
    refreshItems() {
      this.itemBuffer = { ...this.item };
    },
    dateParse(date) {
      const dt = date && new Date(date);
      return dt && !isNaN(+dt) && dt.toLocaleString();
    },
    saveClick(){
        if(this.isSaveBtnActive) this.$emit('save', this.itemBuffer)
    },
    cancelClick() {
        this.refreshItems()
        this.$emit('cancel')
    }
  }
};
</script>