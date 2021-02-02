<template>
  <v-app light app>
    <v-main>
      <Phonebook/>
    </v-main>
  </v-app>
</template>

<script>
import Phonebook from './components/Phonebook';
export default {
  name: 'App',

  components: {
    Phonebook,
  },

  data: () => ({
    //
  }),
};
</script>
