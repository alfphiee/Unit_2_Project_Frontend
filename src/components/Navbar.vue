<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useCookies } from 'vue3-cookies'
import { decodeCredential, googleLogout } from 'vue3-google-login'
import { ref, onMounted } from 'vue';

const { cookies } = useCookies()

const isLoggedIn = ref(false)
let userName = ref('')

const checkSession = () => {
    if(cookies.isKey('user_session')) {
        isLoggedIn.value = true
    }
}

onMounted(checkSession)
</script>

<template>
    <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
    </head>
    
    <nav>
        <ul>
            <li><RouterLink to="/new">Book Session</RouterLink></li>
            <li v-if="isLoggedIn"><RouterLink to="/bookings">My Bookings</RouterLink></li>
            <li v-if="isLoggedIn"><RouterLink to="/athletes">My Athletes</RouterLink></li>
            <li v-if="!isLoggedIn" class="login"><RouterLink to="/login">Login<span class="material-symbols-outlined">Login</span></RouterLink></li>
            <li v-if="isLoggedIn" class="login"><RouterLink to="/profile">My Profile<span class="material-symbols-outlined">Person</span></RouterLink></li>
        </ul>
    </nav>
</template>
s
<style scoped>

nav {
    margin: 0;
    padding: 0;
    background-color: #2196f3;
    width: 100%;
    height: 5rem;
    position: fixed;
    z-index: 999999999;
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