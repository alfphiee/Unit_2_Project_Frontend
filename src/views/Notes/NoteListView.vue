<script setup>

import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

import AddNote from '@/components/AddNote.vue'

const route = useRoute()
const coachId = route.params.coachId
const bookingId = route.params.bookingId

const notes = ref([])

const fetchData = () => {
    fetch(`${import.meta.env.VITE_API_URL}/users/${coachId}/sessions/${bookingId}/notes`)
    .then((response) => response.json())
    .then((data) => notes.value = data)
}

const deleteNote = (id) => {
    fetch(`${import.meta.env.VITE_API_URL}/users/${coachId}/sessions/${bookingId}/notes/${id}`,{
        method: 'DELETE'
    })
    .then(() => fetchData())
}

onMounted(() => {
    fetchData()
})

</script>


<template>
    <h3>Notes for Session</h3>
    <p v-if="notes.length === 0">No Notes available for this session</p>
    <ul class="list-group">
        <li class="list-group-item d-flex justify-content-between align-items-center" v-for="note in notes" :key="note.id">
            <span>{{ note.content }}</span>
            <div>
            <RouterLink :to="`/bookings/${coachId}/${bookingId}/notes/${note._id}`" class="btn btn-primary">Edit</RouterLink>
            <button @click="deleteNote(note._id)" class="m-1 btn btn-danger">Delete</button>
        </div>
        </li>
    </ul>
    <AddNote :fetchData="fetchData"/>
</template>