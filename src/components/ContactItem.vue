<template>
  <v-hover :key="item.phone + 'n'">
    <v-card
      slot-scope="{ hover }"
      :class="`elevation-${hover ? 5 : 2}`"
      class="mx-auto contact-row px-4"
      v-on:click="itemClick($event)"
    >
      <v-divider :key="item.phone" :inset="true" />
      <div class="contact-item py-2">
        <div class="avatar">
          <span> <i class="fas fa-user-circle"></i> </span>
        </div>
        <div class="contact-info">
          <p class="username">{{ item.name }}</p>
          <p class="phone">{{ item.phone }}</p>
        </div>
        <div class="spacer"></div>
        <div class="actions">
          <ActionButtons :item="item" @edit="editClick" @delete="deleteClick" />
        </div>
      </div>

      <ContactModal
        :item="item"
        :show="showDialog"
        :isEditing="isEditing"
        @edit="editClick"
        @close="closeModal"
        @save="saveClick"
        @cancel="cancelClick"
      />

      <DeleteConfirmModal
        :show="showDeleteDialog"
        @close="closeDeleteConfirmModal"
        @delete="deleteConfirmClick"
      />
    </v-card>
  </v-hover>
</template>

<script>
import { mapMutations } from "vuex";
import ActionButtons from "./ActionButtons";
import ContactModal from "./ContactModal";
import DeleteConfirmModal from "./DeleteConfirmModal";

export default {
  name: "ContactItem",
  props: ["item"],
  components: {
    ActionButtons,
    ContactModal,
    DeleteConfirmModal
  },
  data() {
    return {
      showDialog: false,
      isEditing: false,
      showDeleteDialog: false
    };
  },

  methods: {
    ...mapMutations(["SET_ITEM", "DELETE_ITEM", "SET_SNACK_MSG"]),
    editClick() {
      console.log("editClick => ", this.item.guid);
      this.isEditing = true;
      this.showDialog = true;
    },
    deleteClick() {
      this.showDeleteDialog = true;
    },

    deleteConfirmClick() {
      this.DELETE_ITEM(this.item.guid);
      this.showDeleteDialog = false;
      this.SET_SNACK_MSG("Contact has been deleted");
    },
    saveClick(newItem) {
      console.warn("save");
      this.SET_ITEM(newItem);
      this.isEditing = false;
      this.SET_SNACK_MSG("Contact has been updated");
    },
    closeModal() {
      this.showDialog = false;
      this.isEditing = false;
    },
    cancelClick() {
      this.isEditing = false;
    },
    itemClick(event) {
      this.showDialog = true;
      this.isEditing = false;
      event.stopPropagation();
    },
    closeDeleteConfirmModal() {
      this.showDeleteDialog = false;
    }
  }
};
</script>

<style scoped>
.contact-row {
  cursor: pointer;
}

.contact-row .contact-item {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
}

.contact-row .contact-item .avatar span {
  align-self: center;
  font-size: 40px;
  color: green;
}

.contact-row .contact-item .spacer {
  flex-grow: 1;
}

.contact-row .contact-item .contact-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  display: flex;
  align-items: flex-start;
  margin-left: 20px;
  margin-top: 5px;
}

.contact-row .contact-item .contact-info p {
  padding: 0px;
  margin-bottom: 0px;
}

.contact-row .contact-item .contact-info p.name {
  font-weight: 500;
}
.contact-row .contact-item .contact-info p.phone {
  font-weight: 300;
  opacity: 0.5;
}
</style>