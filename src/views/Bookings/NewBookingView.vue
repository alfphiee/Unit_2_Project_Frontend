<script setup>
import { ref } from 'vue'
const booking = ref({
    coachId: '',
    athleteContact: '',
    date: '',
    duration: '',
    type: '',
    location: '',
    notes: '',
    status: 'pending',
})

const formErrors = ref([])

const validateBooking = () => {
    formErrors.value = []
    if(!booking.value.coachId) formErrors.value.push("A Coach is required to make a booking")
    if(!booking.value.athleteContact) formErrors.value.push("Athlete contact is required")
    if(!booking.value.date) formErrors.value.push("A Date is required")
    if(!booking.value.duration) formErrors.value.push("A Duration in minutes is required")
}

const submitBooking = async() => {
    validateBooking()
    if (formErrors.value.length === 0) {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${booking.value.coachId}/sessions`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(booking.value)
            })
            if(!response.ok) {
                throw new Error('Network response not ok')
            }
        } catch (err) {
            console.error(err)
        }
    }
}
</script>

<template>
<h3>Create new Booking</h3>
<form @submit.prevent="submitBooking">
    <label for="coachId">Coach:</label>
    <input type="text" id="coachId" placeholder="Coach" v-model="booking.coachId" required>
    <label for="athleteContact">athleteContact:</label>
    <input type="email" id="athleteContact" placeholder="name@example.com" v-model="booking.athleteContact" required>
    <label for="date">Date:</label>
    <input type="date" id="date" v-model="booking.date" required>
    <label for="duration">Duration (in minutes):</label>
    <input type="number" id="duration" placeholder="60" v-model="booking.duration" required>
    <label for="type">Type of Session:</label>
    <input type="text" id="type" placeholder="Fitness" v-model="booking.type" required>
    <label for="location">Location:</label>
    <input type="text" id="location" placeholder="Address of Location" v-model="booking.location" required>
    <label for="notes">Notes</label>
    <input type="text" id="notes" placeholder="Additional Info" v-model="booking.notes">
    <button type="submit">Submit Booking</button>
</form>
</template>