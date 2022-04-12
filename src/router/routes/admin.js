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
    path: '/parent_groups',
    name: 'parent_groups',
    component: () => import('@/views/admin/parent_groups/List.vue'),
    meta: {
      resource: 'ParentGroup',
      action: 'read',
    },
  },
  {
    path: '/clients',
    name: 'clients',
    component: () => import('@/views/admin/clients/List.vue'),
    meta: {
      resource: 'Client',
      action: 'read',
    },
  },
  {
    path: '/front_websites',
    name: 'front_websites',
    component: () => import('@/views/admin/front_websites/List.vue'),
    meta: {
      resource: 'Website',
      action: 'read',
    },
  },
  {
    path: '/front_websites/set_credit',
    name: 'front_websites.set_credit',
    component: () => import('@/views/admin/front_websites-set_credit/List.vue'),
    meta: {
      resource: 'Website',
      action: 'set_credit',
    },
  },
  {
    path: '/members/list',
    name: 'members.list',
    component: () => import('@/views/admin/members-list/List.vue'),
    meta: {
      resource: 'Member',
      action: 'read',
    },
  },
  {
    path: '/members/online',
    name: 'members.online',
    component: () => import('@/views/admin/members-online/List.vue'),
    meta: {
      resource: 'Member',
      action: 'read_online',
    },
  },
  {
    path: '/members/referrals',
    name: 'members.referrals',
    component: () => import('@/views/admin/members-referrals/List.vue'),
    meta: {
      resource: 'Member',
      action: 'read_referrals',
    },
  },
  {
    path: '/members/blacklist',
    name: 'members.blacklist',
    component: () => import('@/views/admin/members-blacklist/List.vue'),
    meta: {
      resource: 'Member',
      action: 'read_blacklist',
    },
  },
  {
    path: '/transactions/new_deposits',
    name: 'transactions.new_deposits',
    component: () => import('@/views/admin/transactions-new_deposits/List.vue'),
    meta: {
      resource: 'MemberTransaction',
      action: 'read_new_deposits',
    },
  },
  {
    path: '/transactions/new_withdrawals',
    name: 'transactions.new_withdrawals',
    component: () => import('@/views/admin/transactions-new_withdrawals/List.vue'),
    meta: {
      resource: 'MemberTransaction',
      action: 'read_new_withdrawals',
    },
  },
  {
    path: '/transactions/deposit_list',
    name: 'transactions.deposit_list',
    component: () => import('@/views/admin/transactions-deposit_list/List.vue'),
    meta: {
      resource: 'MemberTransaction',
      action: 'read_deposit_list',
    },
  },
  {
    path: '/transactions/withdrawal_list',
    name: 'transactions.withdrawal_list',
    component: () => import('@/views/admin/transactions-withdrawal_list/List.vue'),
    meta: {
      resource: 'MemberTransaction',
      action: 'read_withdrawal_list',
    },
  },
  {
    path: '/transactions/adjustments',
    name: 'transactions.adjustments',
    component: () => import('@/views/admin/transactions-adjustments/List.vue'),
    meta: {
      resource: 'MemberTransaction',
      action: 'read_adjustments',
    },
  },
  {
    path: '/promotions/list',
    name: 'promotions.index',
    component: () => import('@/views/admin/promotions/List.vue'),
    meta: {
      resource: 'Promotion',
      action: 'read',
    },
  },
  {
    path: '/promotions/manual',
    name: 'promotions.manual',
    component: () => import('@/views/admin/promotions-manual/List.vue'),
    meta: {
      resource: 'Promotion',
      action: 'read_manual',
    },
  },
  {
    path: '/promotions/summary',
    name: 'promotions.summary',
    component: () => import('@/views/admin/promotions-summary/List.vue'),
    meta: {
      resource: 'Promotion',
      action: 'read_summary',
    },
  },
  {
    path: '/promotions/release',
    name: 'promotions.release',
    component: () => import('@/views/admin/promotions-release/List.vue'),
    meta: {
      resource: 'Promotion',
      action: 'read_release',
    },
  },
  {
    path: '/banks/groups',
    name: 'banks.groups',
    component: () => import('@/views/admin/banks-groups/List.vue'),
    meta: {
      resource: 'BankGroup',
      action: 'read',
    },
  },
  {
    path: '/banks/list',
    name: 'banks.list',
    component: () => import('@/views/admin/banks-list/List.vue'),
    meta: {
      resource: 'Bank',
      action: 'read',
    },
  },
]
