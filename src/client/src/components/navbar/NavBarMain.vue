<template>
  <b-navbar>
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <img src="../../assets/logo.png" alt="Logo of the brand" />
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item>
        <router-link to="/">Home</router-link>
      </b-navbar-item>
      <b-navbar-item>
        <router-link to="/about">About</router-link>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({});
</script>
