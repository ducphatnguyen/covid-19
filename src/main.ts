import Antd from 'ant-design-vue';
import { createPinia } from 'pinia';
import { createApp } from 'vue';

import App from './App.vue';
import router from './router';

// Ant design library
import 'ant-design-vue/dist/reset.css';

import './styles/index.scss';

const app = createApp(App);

app.use(createPinia())
app.use(router)
app.use(Antd)

app.mount('#app')
