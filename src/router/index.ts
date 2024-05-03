import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import { usePayload } from '@/stores';

enum AppSteps {
  Intro = "intro",
  Location = "location",
  OfficeGuidelines = "office-guidelines",
  HealthChecklist = "health-checklist",
  PersonalInformation = "personal-information",
  Successfully = "successfully",
  Review = "review",
}

// Lazy Loading
const Intro = () => import('@/views/Intro/index.vue');
const Location = () => import('@/views/Location/index.vue');
const OfficeGuidelines = () => import('@/views/OfficeGuidelines/index.vue');

// Layout
const AppLayout = () => import('@/layouts/AppLayout.vue');

// Children (Layout)
const HealthChecklist = () => import('@/views/HealthChecklist/index.vue');
const PersonalInformation = () => import('@/views/PersonalInformation/index.vue');
const Successfully = () => import('@/views/Successfully/index.vue');
const Review = () => import('@/views/Review/index.vue');
// Page Results
const Error404 = () => import('@/views/404/index.vue');

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'intro',
    component: Intro,
    meta: { step: AppSteps.Intro }
  },
  // Layout 
  {
    path: '/',
    component: AppLayout,
    children: [
      {
        path: '/location',
        name: 'location',
        component: Location,
        meta: { step: AppSteps.Location }
      },
      {
        path: '/office-guidelines',
        name: 'office-guidelines',
        component: OfficeGuidelines,
        meta: { step: AppSteps.OfficeGuidelines }
      },
      {
        path: '/health-checklist',
        name: 'health-checklist',
        component: HealthChecklist,
        meta: { step: AppSteps.HealthChecklist },
        beforeEnter: (to, from, next) => {
          const payloadStore = usePayload();
          if (!payloadStore.$state.isStep2Navigated) {
            router.push({ name: "intro" });
          }
        },
      },
      {
        path: '/personal-information',
        name: 'personal-information',
        component: PersonalInformation,
        meta: { step: AppSteps.PersonalInformation },
        beforeEnter: (to, from, next) => {
          const payloadStore = usePayload();
          if (!payloadStore.$state.isStep2Navigated) {
            router.push({ name: "intro" });
          }
        },
      },
      {
        path: '/successfully',
        name: 'successfully',
        component: Successfully,
        meta: { step: AppSteps.Successfully },
        beforeEnter: (to, from, next) => {
          const payloadStore = usePayload();
          if (!payloadStore.$state.isStep2Navigated) {
            router.push({ name: "intro" });
          }
        },
      },
      {
        path: '/review',
        name: 'review',
        component: Review,
        meta: { step: AppSteps.Review },
        beforeEnter: (to, from, next) => {
          const payloadStore = usePayload();
          if (!payloadStore.$state.isStep2Navigated) {
            router.push({ name: "intro" });
          }
        },
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
});


router.beforeEach((to, from) => {
  console.log(to.meta.step)
  if (to.meta.step === AppSteps.Location || to.meta.step === AppSteps.OfficeGuidelines) {
    const payloadStore = usePayload();
    if (!payloadStore.$state.isStep2Navigated) {
      window.addEventListener("beforeunload", beforeUnloadHandler);
    }
  } else {
    window.removeEventListener("beforeunload", beforeUnloadHandler);
  }
});

router.afterEach((to, from) => {
  console.log(from.meta.step)
  console.log(to.meta.step)
  if ((from.meta.step === undefined) && (to.meta.step === AppSteps.Location || to.meta.step === AppSteps.OfficeGuidelines)) {
    const payloadStore = usePayload();
    if (!payloadStore.$state.isStep2Navigated) {
      router.push({ name: "intro" });
    }
  }
});

// Function to handle beforeunload event
const beforeUnloadHandler = (e: BeforeUnloadEvent) => {
  e.preventDefault();
};

export default router;
