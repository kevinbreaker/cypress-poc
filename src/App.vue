<script setup lang="ts">
import { onBeforeMount } from 'vue';

import { UI } from './store'
import Loader from './components/Loader.vue'

const ui = UI()

onBeforeMount(() => {
  ui.value.isLoading = false
})
</script>

<template>
  <router-view />

  <Loader v-show="ui.isLoading" />
</template>

<style lang="scss">
body {
  @apply bg-neutral-low-medium;
}
</style>
