<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router'

import { formatDate } from '@/utils/dateUtils.js'

const route = useRoute()
const coachId = route.params.coachId
const bookingId = route.params.bookingId
const booking = ref({})

const fetchData = () => {
    fetch(`${import.meta.env.VITE_API_URL}/users/${coachId}/sessions/${bookingId}`)
    .then((response) => response.json())
    .then((data) => booking.value = data)
    .catch((err) => console.error(err))
}

onMounted(fetchData)
</script>


<template>
<h3>{{ formatDate(booking.date) }}</h3>
</template>