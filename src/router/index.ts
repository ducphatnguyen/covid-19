import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import { usePayload } from "@/stores";

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
const Intro = () => import("@/views/Intro/index.vue");
const Location = () => import("@/views/Location/index.vue");
const OfficeGuidelines = () => import("@/views/OfficeGuidelines/index.vue");

const AppLayout = () => import("@/layouts/AppLayout.vue");

const HealthChecklist = () => import("@/views/HealthChecklist/index.vue");
const PersonalInformation = () =>
  import("@/views/PersonalInformation/index.vue");
const Successfully = () => import("@/views/Successfully/index.vue");
const Review = () => import("@/views/Review/index.vue");

const Error404 = () => import("@/views/404/index.vue");

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "intro",
    component: Intro,
    meta: { step: AppSteps.Intro },
  },
  {
    path: "/",
    component: AppLayout,
    children: [
      {
        path: "/location",
        name: "location",
        component: Location,
        meta: { step: AppSteps.Location },
      },
      {
        path: "/office-guidelines",
        name: "office-guidelines",
        component: OfficeGuidelines,
        meta: { step: AppSteps.OfficeGuidelines },
      },
      {
        path: "/health-checklist",
        name: "health-checklist",
        component: HealthChecklist,
        meta: { step: AppSteps.HealthChecklist },
      },
      {
        path: "/personal-information",
        name: "personal-information",
        component: PersonalInformation,
        meta: { step: AppSteps.PersonalInformation },
      },
      {
        path: "/successfully",
        name: "successfully",
        component: Successfully,
        meta: { step: AppSteps.Successfully },
      },
      {
        path: "/review",
        name: "review",
        component: Review,
        meta: { step: AppSteps.Review },
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

  const currentStep = to.meta.step as AppSteps;
  const previousStep = localStorage.getItem("savedCurrentStep") as AppSteps;
  const lastedReachableStep = localStorage.getItem(
    "lastedReachableStep",
  ) as AppSteps;
  const appStepValues = Object.values(AppSteps);

  // Listen when reloading
  const checkReloadRoutes: AppSteps[] = [
    AppSteps.Location,
    AppSteps.OfficeGuidelines,
  ];
  if (checkReloadRoutes.includes(currentStep)) {
    if (!payloadStore.$state.isStep2Navigated) {
      window.addEventListener("beforeunload", beforeUnloadHandler);
    }
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

  const currentStep = to.meta.step as AppSteps;
  const previousStep = from.meta.step as AppSteps;
  const isStep2Navigated = payloadStore.$state.isStep2Navigated;
  const appStepValues = Object.values(AppSteps);

  const checkReloadRoutes: AppSteps[] = [
    AppSteps.Location,
    AppSteps.OfficeGuidelines,
  ];
  const checkDirectRoutes: AppSteps[] = [
    AppSteps.HealthChecklist,
    AppSteps.PersonalInformation,
    AppSteps.Successfully,
    AppSteps.Review,
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
  if (to.name !== "notfound") {
    if (
      appStepValues.indexOf(
        localStorage.getItem("savedCurrentStep") as AppSteps,
      ) < appStepValues.indexOf(currentStep)
    ) {
      const lastedReachableStep = currentStep;
      localStorage.setItem("lastedReachableStep", lastedReachableStep!);
    }
  }
  localStorage.setItem("savedCurrentStep", currentStep);
});

// Function to handle beforeunload event
const beforeUnloadHandler = (e: BeforeUnloadEvent) => {
  e.preventDefault();
};

export default router;
