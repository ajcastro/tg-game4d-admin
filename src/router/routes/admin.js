export default [
  {
    path: '/parent_groups',
    name: 'parent_groups',
    component: () => import('@/views/admin/parent_groups/List.vue'),
  },
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
