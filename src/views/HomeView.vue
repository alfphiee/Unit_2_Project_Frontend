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
    <div v-if="isLoggedIn" class="d-flex justify-content-center align-items-center" style="height: 60vh">
        <div class="text-center">
        <h3>Welcome to Coach Tracker</h3>
        <h4>The aim of this site is to help you manage your individual bookings & athletes all in one place</h4>
        </div>
    </div>
    <div v-else class="d-flex justify-content-center align-items-center" style="height: 60vh">
        <div class="text-center">
        <h3>Welcome to Coach Tracker</h3>
        <h4>As a Non signed in User you are able to make Bookings with a Coach</h4>
        </div>
    </div>
  </main>
</template>
