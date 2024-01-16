<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
</script>

<template>
  <head>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
  </head>
  <Navbar />
  <main>
    <RouterView />
  </main>
</template>

<style scoped>

main {
  padding-top: 5rem;
}

</style>
