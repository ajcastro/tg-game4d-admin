export default [
  {
    path: '/clients',
    name: 'clients',
    component: () => import('@/views/admin/clients/List.vue'),
  },
  {
    path: '/front_websites',
    name: 'front_websites',
    component: () => import('@/views/admin/front_websites/List.vue'),
  },
]
