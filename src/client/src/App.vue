<template>
  <div id="app">
    <navBar />
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import navBar from '@/components/navbar/NavBarMain.vue';

export default Vue.extend({
  components: {
    navBar,
  },
});
</script>

<style lang="scss">
@import '@/design/index.scss';
</style>
