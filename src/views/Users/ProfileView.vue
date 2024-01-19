<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCookies } from 'vue3-cookies'
import { decodeCredential, googleLogout } from 'vue3-google-login'
import LoginViewVue from '../LoginView.vue';

const { cookies } = useCookies()

const router = useRouter()

const profile = ref({
  profileInfo: {
    fullName: '',
    contactNumber: '',
    bio: '',
    address: ''
  }
})

const handleLogout = () => {
    googleLogout()
    cookies.remove('user_session')
    isLoggedIn.value = false
    location.reload()
    router.push('/login')
}

const message = ref('')
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
        return fetch(`${import.meta.env.VITE_API_URL}/users/${userId.value}`)
    })
    .then(response => response.json())
    .then((data) => {
        profile.value = data
    })
}

onMounted(() => {
    checkSession()
    if(isLoggedIn) fetchData()
})

const editProfile = () => {
    message.value = 'Updating Profile Info'
    fetch(`${import.meta.env.VITE_API_URL}/users/${userId.value}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(profile.value)
    })
    .then(() => {
        fetchData()
        message.value = "Profile Updated"
    })
}

</script>

<template>
    <h4>Edit Profile</h4>
    <form class="row g-3" @submit.prevent="editProfile">
    <div class="col-md-6">
        <label class="form-label" for="fullName">Full Name:</label>
        <input type="text" class="form-control" id="fullName" v-model="profile.profileInfo.fullName" required>
    </div>
    <div class="col-md-6">
        <label class="form-label" for="contactNumber">Contact Number:</label>
        <input class="form-control" type="text" id="contactNumber" v-model="profile.profileInfo.contactNumber">
    </div>
    <div class="col-md-12">
        <label class="form-label" for="bio">Bio:</label>
        <textarea class="form-control" id="bio" v-model="profile.profileInfo.bio"></textarea>
    </div>
    <div class="col-md-12">
        <label class="form-label" for="address">Address:</label>
        <input class="form-control" type="text" id="address" v-model="profile.profileInfo.address">
    </div>
    <div class="col-md-12">
    <button class="btn btn-primary" type="submit">Edit Profile</button>
    {{ message }}
</div>
</form>
<button class="mt-2 btn btn-danger" @click="handleLogout">Logout</button>

</template>