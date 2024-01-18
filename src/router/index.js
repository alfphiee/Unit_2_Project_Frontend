import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'

import AthleteListView from '@/views/Athletes/AthleteListView.vue'

import NewBookingView from '@/views/Bookings/NewBookingView.vue'
import ConfirmedBookingView from '@/views/Bookings/ConfirmedBookingView.vue'
import CompletedBookingView from '@/views/Bookings/CompletedBookingView.vue'
import PendingBookingView from '@/views/Bookings/PendingBookingView.vue'
import SingleBookingView from '@/views/Bookings/SingleBookingView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/new',
      name: 'newbooking',
      component: NewBookingView
    },
    {
      path: '/bookings',
      name: 'bookings',
      component: ConfirmedBookingView
    },
    { path: '/bookings/complete', component: CompletedBookingView },
    { path: '/bookings/pending', component: PendingBookingView },
    { path: '/bookings/:coachId/:bookingId', component: SingleBookingView },
    { path: '/athletes', component: AthleteListView }
  ]
})

export default router
