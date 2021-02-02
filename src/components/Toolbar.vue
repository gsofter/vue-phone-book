<template>
  <v-app-bar app flat color="cyan">
    <v-app-bar-nav-icon></v-app-bar-nav-icon>
    <v-toolbar-title> Phone book </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn
      text
      href="https://github.com/gsofter/vue-phone-book"
      target="_blank"
    >
      <span class="mr-2 ml-1"> Repository</span>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "Toolbar",
  data() {
    return {};
  },
  methods: {}
};
</script>