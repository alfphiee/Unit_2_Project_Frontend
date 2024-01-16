<script setup>
import { useCookies } from 'vue3-cookies'
import { decodeCredential, googleLogout } from 'vue3-google-login'
import { onMounted, ref } from 'vue'

const { cookies } = useCookies()


let isLoggedIn = ref(false)
let userName = ''

const callback = (response) => {
    isLoggedIn.value = true
    const userData = decodeCredential(response.credential)
    userName = userData.given_name
    cookies.set('user_session', response.credential)
    console.log(userData)
    fetch(`${import.meta.env.VITE_API_URL}/users/`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body : JSON.stringify({
            email: userData.email
        })

    })
}

const checkSession = () => {
    if(cookies.isKey('user_session')) {
        isLoggedIn.value = true
        const userData = decodeCredential(cookies.get('user_session'))
        userName = userData.given_name
    }
}

const handleLogout = () => {
    googleLogout()
    cookies.remove('user_session')
    isLoggedIn.value = false
}

onMounted(checkSession)
</script>

<template>
    <h1>Login</h1>
    <div v-if="isLoggedIn">
        <h2>Hello {{  userName }}</h2>
        <button @click="handleLogout">Logout</button>
    </div>
    <div v-else>
        <GoogleLogin :callback="callback"/>
    </div>
</template>