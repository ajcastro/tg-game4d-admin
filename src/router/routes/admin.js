export default [
  {
    path: '/users',
    name: 'users',
    component: () => import('@/views/admin/users/List.vue'),
  },
  {
    path: '/roles',
    name: 'roles',
    component: () => import('@/views/admin/users-roles/List.vue'),
  },
  {
    path: '/roles/:id/set_permissions',
    name: 'roles.set_permissions',
    component: () => import('@/views/admin/users-roles/SetPermissions.vue'),
    meta: {
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
  {
    path: '/members/list',
    name: 'members.list',
    component: () => import('@/views/admin/members-list/List.vue'),
  },
  {
    path: '/members/online',
    name: 'members.online',
    component: () => import('@/views/admin/members-online/List.vue'),
  },
  {
    path: '/members/referrals',
    name: 'members.referrals',
    component: () => import('@/views/admin/members-referrals/List.vue'),
  },
  {
    path: '/members/blacklist',
    name: 'members.blacklist',
    component: () => import('@/views/admin/members-blacklist/List.vue'),
  },
  {
    path: '/transactions/new_deposits',
    name: 'transactions.new_deposits',
    component: () => import('@/views/admin/transactions-new_deposits/List.vue'),
  },
  {
    path: '/transactions/new_withdrawals',
    name: 'transactions.new_withdrawals',
    component: () => import('@/views/admin/transactions-new_withdrawals/List.vue'),
  },
  {
    path: '/transactions/deposit_list',
    name: 'transactions.deposit_list',
    component: () => import('@/views/admin/transactions-deposit_list/List.vue'),
  },
  {
    path: '/transactions/withdrawal_list',
    name: 'transactions.withdrawal_list',
    component: () => import('@/views/admin/transactions-withdrawal_list/List.vue'),
  },
]
