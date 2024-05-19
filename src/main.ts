import Antd from "ant-design-vue";
import { createApp } from "vue";
import { createPinia } from "pinia";
import { createPersistedState } from "pinia-plugin-persistedstate";

import App from "./App.vue";
import router from "./router";

import "ant-design-vue/dist/reset.css";
import "./styles/index.scss";

import "@/plugins/vee-validate";
import { i18n } from "@/plugins/i18n";

const app = createApp(App);
const pinia = createPinia();
pinia.use(createPersistedState());

app.use(pinia);
app.use(router);
app.use(Antd);
app.use(i18n);

app.mount("#app");
