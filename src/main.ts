import { createApp } from 'vue';
// eslint-disable-next-line import/extensions
import App from './App.vue';
import store from './store';
import '@/assets/scss/main.scss';

createApp(App)
  .use(store)
  .mount('#app');
