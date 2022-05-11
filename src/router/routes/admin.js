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
    path: '/markets/websites',
    name: 'market_websites',
    component: () => import('@/views/admin/market_websites/List.vue'),
    meta: {
      resource: 'MarketWebsite',
      action: 'read',
    },
  },
  {
    path: '/markets/limit_settings',
    name: 'market_limit_settings',
    component: () => import('@/views/admin/market_limit_settings/Index.vue'),
    meta: {
      resource: 'MarketLimitSetting',
      action: 'read',
    },
  },
  {
    path: '/games/settings',
    name: 'game_settings',
    component: () => import('@/views/admin/game_settings/Index.vue'),
    meta: {
      resource: 'GameSetting',
      action: 'read',
    },
  },
]
