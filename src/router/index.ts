import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SecondAssessment from '@/views/SecondAssessment.vue'
import FirstAssessmentPage from '@/views/FirstAssessmentPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/second-assessment',
      component: SecondAssessment
    },
    {
      path: '/home',
      component: HomeView
    },
    {
      path: '/assessment-page',
      component: FirstAssessmentPage
    }
  ]
})

export default router
