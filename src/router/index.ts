import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

// Lzl
const Intro = () => import('@/views/Intro/index.vue');

// Layout
const AppLayout = () => import('@/layouts/AppLayout.vue');
// Children (Layout)
const Location = () => import('@/views/Location/index.vue');
const Checklist = () => import('@/views/HealthChecklist/index.vue');
const OfficeGuidelines = () => import('@/views/OfficeGuidelines/index.vue');
const PersonalInformation = () => import('@/views/PersonalInformation/index.vue');
const Successfully = () => import('@/views/Successfully/index.vue');

// Page Results
const Error404 = () => import('@/views/404/index.vue');

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'intro',
    component: Intro
  },
    // Layout 
  {
    path: '/',
    component: AppLayout,
    children: [
      {
        path: '/location',
        name: 'location',
        component: Location
      },
      {
        path: '/office-guidelines',
        name: 'office-guidelines',
        component: OfficeGuidelines
      },
      {
        path: '/health-checklist',
        name: 'health-checklist',
        component: Checklist
      },
      {
        path: '/personal-information',
        name: 'personal-information',
        component: PersonalInformation
      },
      {
        path: '/successfully',
        name: 'successfully',
        component: Successfully
      },
    ]
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: Error404
  },

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
