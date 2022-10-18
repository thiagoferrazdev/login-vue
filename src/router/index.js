import Vue from 'vue'
import Router from 'vue-router'
import store from "../store/modules/index";
import Login from '../components/Login.vue'
import DashboardPanel from '../components/DashboardPanel.vue'
Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login,
    meta: { guest: true },
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardPanel,
    props: {},
    meta: { requiresAuth: true },
  }
];


const router = new Router({
  routes,
  mode: "history", 
});


router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.isAuthenticated) {
      next();
      return;
    }
    next("/");
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.guest)) {
    if (store.getters.isAuthenticated) {
      next("/dashboard");
      return;
    }
    next();
  } else {
    next();
  }
});

export default router;