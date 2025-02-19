import { createRouter, createWebHistory } from 'vue-router';
import LoginResults from '../components/LoginResults.vue';
import ViewResults from '../components/ViewResults.vue';

const routes = [
  { path: '/', component: LoginResults },
  { path: '/loginResults', component: LoginResults },
  { path: '/viewResults', component: ViewResults },
  //{ path: '/logoutResults', component: LogoutResults },
];


const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;