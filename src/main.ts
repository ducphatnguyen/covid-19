import Antd from "ant-design-vue";
import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "ant-design-vue/dist/reset.css";
import "./styles/index.scss";

import "@/plugins/vee-validate";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Antd);

app.mount("#app");
