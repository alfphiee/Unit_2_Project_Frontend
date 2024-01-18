<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useCookies } from 'vue3-cookies'
import { decodeCredential, googleLogout } from 'vue3-google-login'

import { formatDate } from '@/utils/dateUtils.js'

import BookingNavbar from '@/components/BookingNavbar.vue'

const { cookies } = useCookies()

const bookings = ref([])
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
        return fetch(`${import.meta.env.VITE_API_URL}/users/${userId.value}/sessions?status=completed`)
    })
    .then(response => response.json())
    .then((sessionsData) => {
        bookings.value = sessionsData
    })
}

onMounted(() => {
    checkSession()
    if(isLoggedIn) fetchData()
})


const updateBooking = (booking) => {
    fetch(`${import.meta.env.VITE_API_URL}/users/${userId.value}/sessions/${booking._id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(booking)
    })
} 

const completeBooking = (booking) => {
    booking.status = 'pending'
    updateBooking(booking)
    fetchData()
}

const cancelBooking = (booking) => {
    booking.value.status = 'cancelled'
    updateBooking(booking.value)
    fetchData()
}





</script>

<template>
<BookingNavbar />
<div class="booking">
    <h3>Completed Bookings:</h3>
    <ul>
        <li v-for="booking in bookings" :key="booking.id">
        <p>{{ formatDate(booking.date) }}</p>
        <button @click="completeBooking(booking)">Pending</button>
        <button @click="cancelBooking(booking)">Cancel</button>
        </li>
    </ul>
</div>
</template>