<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router';

const { fetchData } = defineProps(['fetchData'])

const route = useRoute();
const coachId = route.params.coachId;
const bookingId = route.params.bookingId;

const note = ref({
    content: ''
})

function addNote() {
    if( note.value.content === '') {
        alert('all values needed')
        return
    }
    fetch(`${import.meta.env.VITE_API_URL}/users/${coachId}/sessions/${bookingId}/notes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body : JSON.stringify(note.value)
    })
    .then((res) => {
        note.value.content = ''
        fetchData()
    })
    .catch((err) => console.error(err))
}

</script>

<template>
    <hr>
    <h3>Add a new Note</h3>
<div class="authorForm">
    <label class="form-label" for="content">Content:</label>
    <textarea class="form-control" name="content" placeholder="..." v-model="note.content" required rows="4" cols="50"></textarea>
    <button  class="mt-3 btn btn-success" @click="addNote">Add Note</button>
</div>
</template>