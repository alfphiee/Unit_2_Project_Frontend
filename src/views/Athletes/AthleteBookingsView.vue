<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { formatDate } from '@/utils/dateUtils';

const route = useRoute()
const coachId = route.params.coachId
const athleteId = route.params.athleteId

const sessions = ref([])

const fetchData = () => {
    fetch(`${import.meta.env.VITE_API_URL}/users/${coachId}/athletes/${athleteId}/sessions`)
    .then((response) => response.json())
    .then((data) => sessions.value = data)
    .then(() => console.log(sessions.value))
}

onMounted(fetchData)
</script>

<template>
    <h3 v-if="sessions.length > 0">Sessions with {{ sessions[0].athleteId.email }}</h3>
    <h3 v-else>No Session Information Available for this athlete</h3>
    <div class="card" v-for="session in sessions" :key="session.id">
            <div class="card-body">
                <h5 style="text-transform: capitalize" class="card-title">{{ formatDate(session.date) }} - {{ session.status }}</h5>
                <h6 class="card-subtitle">Location: {{ session.location }}</h6>
                <p class="card-text">Duration: {{ session.duration }}m</p>
                <p class="card-text">Type: {{ session.type }}</p>
                <RouterLink class="btn btn-secondary" :to="`/bookings/${coachId}/${session._id}/notes`">View Notes</RouterLink>
            </div>
            </div>
</template>