export default [
  {
    path: '/users',
    name: 'users',
    component: () => import('@/views/admin/users/List.vue'),
    meta: {
      resource: 'User',
      action: 'read',
    },
  },
  {
    path: '/roles',
    name: 'roles',
    component: () => import('@/views/admin/users-roles/List.vue'),
    meta: {
      resource: 'Role',
      action: 'read',
    },
  },
  {
    path: '/roles/:id/set_permissions',
    name: 'roles.set_permissions',
    component: () => import('@/views/admin/users-roles/SetPermissions.vue'),
    meta: {
      resource: 'Role',
      action: 'set_permissions',
      pageTitle: 'Set Permissions',
      breadcrumb: [
        {
          text: 'Roles',
          to: '/roles',
        },
        {
          text: 'Set Permissions',
          active: true,
        },
      ],
    },
  },
  {
    path: '/user_logs',
    name: 'user_logs',
    component: () => import('@/views/admin/user_logs/List.vue'),
    meta: {
      resource: 'TransferLog',
      action: 'read',
    },
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/admin/dashboard/Index.vue'),
    meta: {
      resource: 'Dashboard',
      action: 'view',
    },
  },
  {
    path: '/markets/list',
    name: 'markets',
    component: () => import('@/views/admin/markets/List.vue'),
    meta: {
      resource: 'Market',
      action: 'read',
    },
  },
  {
    path: '/games/list',
    name: 'games',
    component: () => import('@/views/admin/games/List.vue'),
    meta: {
      resource: 'Game',
      action: 'read',
    },
  },
  {
    path: '/games/results',
    name: 'games.results',
    component: () => import('@/views/admin/games-results/List.vue'),
    meta: {
      resource: 'GameResult',
      action: 'read',
    },
  },
  {
    path: '/bets/list',
    name: 'bets.list',
    component: () => import('@/views/admin/bets-list/List.vue'),
    meta: {
      resource: 'BetList',
      action: 'read',
    },
  },
  {
    path: '/bets/numbers',
    name: 'bets.numbers',
    component: () => import('@/views/admin/bets-numbers/List.vue'),
    meta: {
      resource: 'BetList',
      action: 'read',
    },
  },
]
