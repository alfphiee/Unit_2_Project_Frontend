<script setup>
import { RouterLink, RouterView } from 'vue-router'
let isLoggedIn = false;
</script>

<template>
    <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
    </head>
    
    <nav>
        <ul>
            <li><RouterLink to="/">Book</RouterLink></li>
            <li><RouterLink to="/about">Test</RouterLink></li>
            <li v-if="!isLoggedIn" class="login"><RouterLink to="/login">Login<span class="material-symbols-outlined">Login</span></RouterLink></li>
        </ul>
    </nav>
</template>

<style scoped>

nav {
    margin: 0;
    padding: 0;
    background-color: #2196f3;
    width: 100%;
    height: 5rem;
    position: fixed;
}

 ul {
    display: flex;
    list-style: none;
    margin: 0;
    margin-top: 1.5rem;
    width: 100%;
    height: 3rem;
 }

 .login {
    margin-left: auto;
    margin-right: 3rem;
 }
 
 li {
    padding: 0 1rem;
    height: 100%;
 }

 a {
    color: #fff;
    text-decoration: none;
 }
.material-symbols-outlined {
  font-variation-settings:
  'FILL' 0,
  'wght' 400,
  'GRAD' 0,
  'opsz' 24;
  vertical-align: middle;
  margin-left: 0.5rem;
  font-size: 18;
}

</style>