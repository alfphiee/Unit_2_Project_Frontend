<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
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

let coaches = ref([])

const fetchData = () => {
    fetch(`${import.meta.env.VITE_API_URL}/users`)
    .then((response) => response.json())
    .then((data) => coaches.value = data)
}

onMounted(fetchData)

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
            router.push('/success')
        } catch (err) {
            console.error(err)
        }
    }
}
</script>

<template>
<h3>Create new Booking</h3>
<form class="row g-3" @submit.prevent="submitBooking">
    <div class="col-md-6">
        <label class="form-label" for="coachId">Coach:</label>
        <select class="form-control" id="coachId" v-model="booking.coachId" required>
            <option disabled value="">Select a coach</option>
            <option v-for="coach in coaches" :key="coach._id" :value="coach._id">
                {{ coach.profileInfo.fullName }}
            </option>
        </select>
    </div>
    <div class="col-md-6">
        <label class="form-label" for="athleteContact">Athlete Contact:</label>
        <input class="form-control" type="email" id="athleteContact" placeholder="name@example.com" v-model="booking.athleteContact" required>
    </div>
    <div class="col-md-3">
        <label class="form-label" for="date">Date:</label>
        <input class="form-control" type="date" id="date" v-model="booking.date" required>
    </div>
    <div class="col-md-3">
        <label class="form-label" for="duration">Duration (in minutes):</label>
        <input class="form-control" type="number" id="duration" placeholder="60" v-model="booking.duration" required>
    </div>
    <div class="col-md-6">
        <label class="form-label" for="type">Type of Session:</label>
        <input class="form-control" type="text" id="type" placeholder="Fitness" v-model="booking.type" required>
    </div>
    <div class="col-md-6">
        <label class="form-label" for="location">Location:</label>
        <input class="form-control" type="text" id="location" placeholder="Address of Location" v-model="booking.location" required>
    </div>
    <div class="col-md-6">
        <label class="form-label" for="notes">Notes</label>
        <input class="form-control" type="text" id="notes" placeholder="Additional Info" v-model="booking.notes">
    </div>
    <div class="col-md-3">
    <button class="btn btn-primary" type="submit">Submit Booking</button>
</div>
</form>
</template>