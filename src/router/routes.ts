import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [

  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }]
  },
  // Route to /fullscreen, using layouts/FullScreen.vue
  {
    path: '/fullscreen',
    component: () => import('layouts/FullScreen.vue'),
    children: [{ path: '', component: () => import('pages/FullScreen.vue') }]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
];

export default routes;
