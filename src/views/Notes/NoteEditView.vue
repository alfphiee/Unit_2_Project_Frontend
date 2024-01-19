<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const coachId = route.params.coachId
const bookingId = route.params.bookingId
const noteId = route.params.noteId

const note = ref({})

const fetchData = () => {
    fetch(`${import.meta.env.VITE_API_URL}/users/${coachId}/sessions/${bookingId}/notes/${noteId}`)
    .then((response) => response.json())
    .then((data) => note.value = data)
}

const editNote = () => {
    fetch(`${import.meta.env.VITE_API_URL}/users/${coachId}/sessions/${bookingId}/notes/${noteId}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(note.value)
    })
    .then(() => router.push(`/bookings/${coachId}/${bookingId}/notes`))
}

onMounted(fetchData)

</script>

<template>
<h3>Edit Note</h3>
<div class="authorForm">
    <label class="form-label" for="content">Content:</label>
    <textarea class="form-control" name="content" placeholder="..." v-model="note.content" required rows="4" cols="50"></textarea>
    <button  class="mt-3 btn btn-primary" @click="editNote">Edit Note</button>
</div>
</template>