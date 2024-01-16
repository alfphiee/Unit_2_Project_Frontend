<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useCookies } from 'vue3-cookies'
import { decodeCredential, googleLogout } from 'vue3-google-login'

const { cookies } = useCookies()

const bookings = ref([])
const isLoggedIn = ref(false)

const checkSession = () => {
    if(cookies.isKey('user_session')) {
        isLoggedIn.value = true
        const userData = decodeCredential(cookies.get('user_session'))
        userEmail.value = userData.email
    }
}

</script>

<template>
    <h1>hello</h1>
</template>