<script setup>
import { useCookies } from 'vue3-cookies'
import { decodeCredential, googleLogout } from 'vue3-google-login'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router';

const { cookies } = useCookies()

const router = useRouter()


let isLoggedIn = ref(false)
let userName = ''

const callback = (response) => {
    isLoggedIn.value = true
    const userData = decodeCredential(response.credential)
    userName = userData.given_name
    cookies.set('user_session', response.credential)
    console.log(userName)
    fetch(`${import.meta.env.VITE_API_URL}/users/`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body : JSON.stringify({
            email: userData.email,
            profileInfo: {
                fullName: userName
            }
        })

    })
    .then(() => router.push('/'))
}

const checkSession = () => {
    if(cookies.isKey('user_session')) {
        isLoggedIn.value = true
        const userData = decodeCredential(cookies.get('user_session'))
        userName = userData.given_name
    }
}

onMounted(checkSession)
</script>

<template>
    <div v-if="isLoggedIn">
        <div class="d-flex justify-content-center align-items-center" style="height: 60vh">
        <div class="text-center">
        <h3>Welcome {{ userName }}</h3>
        </div>
        </div>
    </div>
    <div v-else>
        <div class="d-flex justify-content-center align-items-center" style="height: 60vh">
        <div class="text-center">
        <h3>Login to manage Coaching Sessions</h3>
        <GoogleLogin :callback="callback"/>
        </div>
    </div>
        
    </div>
</template>