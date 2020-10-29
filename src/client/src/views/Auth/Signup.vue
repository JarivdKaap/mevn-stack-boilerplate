<template>
  <div>
    <div class="container">
      <h1>Signup</h1>
      <form @submit.prevent>
        <input class="input is-large" type="text" placeholder="Name" autofocus v-model="name" />
        <input class="input is-large" type="text" placeholder="Email" v-model="email" />
        <input class="input is-large" type="password" placeholder="Password" autofocus v-model="password" />

        <button class="button is-block is-danger is-large is-fullwidth" :disabled="!validateForm" @click="signup">
          Login
        </button>

        <p v-if="error">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  data: () => ({
    name: '',
    email: '',
    password: '',
    error: '',
  }),
  computed: {
    validateForm() {
      return this.name != '' && this.email != '' && this.password != '';
    },
  },
  methods: {
    signup() {
      this.$store
        .dispatch('auth/signup', {
          email: this.email,
          password: this.password,
          name: this.name,
        })
        .then(() => {
          this.$router.push('/');
        })
        .catch(err => {
          this.error = err.response ? err.response.data.message : err.message;
        });
    },
  },
});
</script>
