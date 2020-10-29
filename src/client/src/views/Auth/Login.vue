<template>
  <div>
    <div class="container">
      <h1>Signin</h1>
      <form @submit.prevent>
        <input class="input is-large" type="text" placeholder="Email" autofocus v-model="email" />
        <input class="input is-large" type="password" placeholder="Password" v-model="password" />

        <button class="button is-block is-danger is-large is-fullwidth" :disabled="!validateForm" @click="login">
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
    email: '',
    password: '',
    error: '',
  }),
  computed: {
    validateForm() {
      return this.email != '' && this.password != '';
    },
  },
  methods: {
    login() {
      this.$store
        .dispatch('auth/login', {
          email: this.email,
          password: this.password,
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
