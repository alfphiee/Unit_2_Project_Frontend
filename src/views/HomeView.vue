<script setup>
import { useCookies } from 'vue3-cookies'
import { decodeCredential, googleLogout } from 'vue3-google-login'
import { ref, onMounted } from 'vue';

const { cookies } = useCookies()

const isLoggedIn = ref(false)
let userName = ref('')

const checkSession = () => {
    if(cookies.isKey('user_session')) {
        isLoggedIn.value = true
        const userData = decodeCredential(cookies.get('user_session'))
        userName.value = userData.given_name
    }
}

onMounted(() => {
    checkSession()
})
</script>

<template>
  <main>
    <h1 v-if="isLoggedIn">You're logged in</h1>
  </main>
</template>
