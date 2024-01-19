<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useCookies } from 'vue3-cookies'
import { decodeCredential, googleLogout } from 'vue3-google-login'


const { cookies } = useCookies()

const athletes = ref([])
const isLoggedIn = ref(false)
const user = ref({})
const userId = ref('')

const checkSession = () => {
    if(cookies.isKey('user_session')) {
        isLoggedIn.value = true
        const userData = decodeCredential(cookies.get('user_session'))
        user.value = userData
    }
}

const fetchData = () => {
    fetch(`${import.meta.env.VITE_API_URL}/get-user-id?email=${encodeURIComponent(user.value.email)}`)
    .then((response) => response.json())
    .then((data) => {
        userId.value = data.userId
        return fetch(`${import.meta.env.VITE_API_URL}/users/${userId.value}/athletes`)
    })
    .then(response => response.json())
    .then((sessionsData) => {
        athletes.value = sessionsData
    })
}

onMounted(() => {
    checkSession()
    if(isLoggedIn) fetchData()
})

</script>

<template>
    <h3>Athletes</h3>
    <ul class="list-group">
        <li class="list-group-item" v-for="athlete in athletes" :key="athlete.id">
            <RouterLink :to="`/athletes/${userId}/${athlete._id}`">{{ athlete.email }}</RouterLink>
        </li>
    </ul>

</template>