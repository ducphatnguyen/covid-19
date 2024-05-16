import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";

import { APP_STEPS, LOCAL_STORAGE } from "@/constants";
import { usePayload } from "@/stores";
import {
  Intro,
  Location,
  OfficeGuidelines,
  HealthChecklist,
  PersonalInformation,
  Successfully,
  Review,
  Error404,
} from "@/views";

const AppLayout = () => import("@/layouts/AppLayout.vue");

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "intro",
    component: Intro,
    meta: { step: APP_STEPS.Intro },
  },
  {
    path: "/",
    component: AppLayout,
    children: [
      {
        path: "/location",
        name: "location",
        component: Location,
        meta: { step: APP_STEPS.Location },
      },
      {
        path: "/office-guidelines",
        name: "office-guidelines",
        component: OfficeGuidelines,
        meta: { step: APP_STEPS.OfficeGuidelines },
      },
      {
        path: "/health-checklist",
        name: "health-checklist",
        component: HealthChecklist,
        meta: { step: APP_STEPS.HealthChecklist },
      },
      {
        path: "/personal-information",
        name: "personal-information",
        component: PersonalInformation,
        meta: { step: APP_STEPS.PersonalInformation },
      },
      {
        path: "/successfully",
        name: "successfully",
        component: Successfully,
        meta: { step: APP_STEPS.Successfully },
      },
      {
        path: "/review",
        name: "review",
        component: Review,
        meta: { step: APP_STEPS.Review },
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: Error404,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from) => {
  const payloadStore = usePayload();

  const currentStep = to.meta.step as APP_STEPS;
  const previousStep = localStorage.getItem(
    LOCAL_STORAGE.SavedCurrentStep,
  ) as APP_STEPS;
  const lastedReachableStep = localStorage.getItem(
    LOCAL_STORAGE.LastedReachableStep,
  ) as APP_STEPS;
  const appStepValues = Object.values(APP_STEPS);

  // Listen when reloading
  const checkReloadRoutes: APP_STEPS[] = [
    APP_STEPS.Location,
    APP_STEPS.OfficeGuidelines,
  ];
  if (
    checkReloadRoutes.includes(currentStep) &&
    !payloadStore.$state.isStep2Navigated
  ) {
    window.addEventListener("beforeunload", beforeUnloadHandler);
  } else {
    window.removeEventListener("beforeunload", beforeUnloadHandler);
  }

  // Check direction to the pages that never reach
  const previousStepIndex = appStepValues.indexOf(previousStep);
  const currentStepIndex = appStepValues.indexOf(currentStep);
  const lastedReachableStepIndex = appStepValues.indexOf(lastedReachableStep);

  if (
    previousStepIndex < currentStepIndex &&
    from.meta.step === undefined &&
    currentStepIndex > lastedReachableStepIndex
  )
    router.go(-1);
});

router.afterEach((to, from) => {
  const payloadStore = usePayload();

  const currentStep = to.meta.step as APP_STEPS;
  const previousStep = from.meta.step as APP_STEPS;
  const isStep2Navigated = payloadStore.$state.isStep2Navigated;
  const appStepValues = Object.values(APP_STEPS);

  const checkReloadRoutes: APP_STEPS[] = [
    APP_STEPS.Location,
    APP_STEPS.OfficeGuidelines,
  ];
  const checkDirectRoutes: APP_STEPS[] = [
    APP_STEPS.HealthChecklist,
    APP_STEPS.PersonalInformation,
    APP_STEPS.Successfully,
    APP_STEPS.Review,
  ];

  // Check reload
  if (
    previousStep === undefined &&
    checkReloadRoutes.includes(currentStep) &&
    !isStep2Navigated
  )
    router.push({ name: "intro" });

  // Check direction
  if (checkDirectRoutes.includes(currentStep) && !isStep2Navigated)
    router.push({ name: "intro" });

  // Save current step and lasted reachable step
  if (
    to.name !== "notfound" &&
    appStepValues.indexOf(
      localStorage.getItem(LOCAL_STORAGE.SavedCurrentStep) as APP_STEPS,
    ) < appStepValues.indexOf(currentStep)
  ) {
    const lastedReachableStep = currentStep;
    localStorage.setItem(
      LOCAL_STORAGE.LastedReachableStep,
      lastedReachableStep!,
    );
  }
  localStorage.setItem(LOCAL_STORAGE.SavedCurrentStep, currentStep);
});

// Function to handle beforeunload event
const beforeUnloadHandler = (e: BeforeUnloadEvent) => {
  e.preventDefault();
};

export default router;
