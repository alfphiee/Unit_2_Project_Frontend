<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
    </head>
    
    <nav>
        <ul>
            <li><RouterLink to="/bookings/pending">Pending</RouterLink></li>
            <li><RouterLink to="/bookings">Confirmed</RouterLink></li>
            <li><RouterLink to="/bookings/complete">Completed</RouterLink></li>
        </ul>
    </nav>
</template>

<style scoped>

nav {
    margin: 0;
    padding: 0;
    background-color: #1f7ecc;
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

</style>