<template>
  <v-row justify="center">
    <v-dialog v-model="isShowing" persistent max-width="500" width="500">
      <v-card>
        <v-img :src="randomImage" height="100px"> </v-img>
        <v-card-title class="card-header">
          <div class="headline">{{ headline }}</div>
          <div class="date">
            <span class="grey--text" v-if="itemCreatedDate"
              >Created: {{ itemCreatedDate }}</span
            >
            <span class="grey--text" v-if="itemUpdatedDate"
              >Updated: {{ itemUpdatedDate }}</span
            >
          </div>
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
          <v-btn
            class="ma-2"
            outlined
            tile
            color="cyan"
            v-if="!isEditing"
            @click="$emit('edit')"
          >
            Edit
          </v-btn>
          <v-btn
            :disabled="!isSaveBtnActive"
            outlined
            tile
            color="cyan"
            v-if="isEditing"
            @click="saveClick"
            >Save</v-btn
          >
          <v-btn v-if="isEditing" outlined tile @click="cancelClick"
            >Cancel</v-btn
          >

          <v-spacer></v-spacer>
          <v-btn color="primary" outlined tile @click="$emit('close')">
            Close
          </v-btn>
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

    randomImage() {
      return "https://picsum.photos/500?" + this.item.phone;
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
      const name = this.itemBuffer.name;
      const phone = this.itemBuffer.phone;
      return (
        typeof name == "string" && typeof phone == "string" && name && phone
      );
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
    saveClick() {
      if (this.isSaveBtnActive) this.$emit("save", this.itemBuffer);
    },
    cancelClick() {
      this.refreshItems();
      this.$emit("cancel");
    }
  }
};
</script>

<style scoped>
.grey--text {
  font-size: 1rem;
}

.card-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
}

.card-header .headline {
  align-items: flex-start;
  font-size: 2rem;
}

.card-header .date {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>