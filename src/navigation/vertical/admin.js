export default [
  {
    title: 'Users Management',
    icon: 'UsersIcon',
    children: [
      {
        title: 'Users',
        icon: 'MinusIcon',
        route: 'users',
        resource: 'User',
        action: 'read',
      },
      {
        title: 'Roles',
        icon: 'MinusIcon',
        route: 'roles',
        resource: 'Role',
        action: 'read',
      },
      {
        title: 'Clients',
        icon: 'MinusIcon',
        route: 'clients',
        resource: 'Client',
        action: 'read',
      },
      {
        title: 'Parent Groups',
        icon: 'MinusIcon',
        route: 'parent_groups',
        resource: 'ParentGroup',
        action: 'read',
      },
      {
        title: 'Front Websites',
        icon: 'MinusIcon',
        route: 'front_websites',
        resource: 'Website',
        action: 'read',
      },
      {
        title: 'Edit Website Credit',
        icon: 'MinusIcon',
        route: 'front_websites.set_credit',
        resource: 'Website',
        action: 'set_credit',
      },
    ],
  },

  {
    title: 'Members',
    icon: 'Share2Icon',
    children: [
      {
        title: 'Member List',
        icon: 'MinusIcon',
        route: 'members.list',
        resource: 'Member',
        action: 'read',
      },
      {
        title: 'Member Online',
        icon: 'MinusIcon',
        route: 'members.online',
        resource: 'Member',
        action: 'read_online',
      },
      {
        title: 'Referral List',
        icon: 'MinusIcon',
        route: 'members.referrals',
        resource: 'Member',
        action: 'read_referrals',
      },
      {
        title: 'Blacklist',
        icon: 'MinusIcon',
        route: 'members.blacklist',
        resource: 'Member',
        action: 'read_blacklist',
      },
    ],
  },
  {
    title: 'Transactions',
    icon: 'BookOpenIcon',
    children: [
      {
        title: 'New Deposits',
        icon: 'MinusIcon',
        route: 'transactions.new_deposits',
        resource: 'MemberTransaction',
        action: 'read_new_deposits',
      },
      {
        title: 'Deposit List',
        icon: 'MinusIcon',
        route: 'transactions.deposit_list',
        resource: 'MemberTransaction',
        action: 'read_deposit_list',
      },
      {
        title: 'New Withdrawals',
        icon: 'MinusIcon',
        route: 'transactions.new_withdrawals',
        resource: 'MemberTransaction',
        action: 'read_new_withdrawals',
      },
      {
        title: 'Withdrawal List',
        icon: 'MinusIcon',
        route: 'transactions.withdrawal_list',
        resource: 'MemberTransaction',
        action: 'read_withdrawal_list',
      },
      {
        title: 'Adjustments',
        icon: 'MinusIcon',
        route: 'transactions.adjustments',
        resource: 'MemberTransaction',
        action: 'read_adjustments',
      },
    ],
  },
  {
    title: 'Promotions',
    icon: 'CodesandboxIcon',
    children: [
      {
        title: 'Promotion List',
        icon: 'MinusIcon',
        route: 'promotions.index',
        resource: 'Promotion',
        action: 'read',
      },
      {
        title: 'Summary',
        icon: 'MinusIcon',
        route: 'promotions.summary',
        resource: 'Promotion',
        action: 'read_summary',
      },
      {
        title: 'Release',
        icon: 'MinusIcon',
        route: 'promotions.release',
        resource: 'Promotion',
        action: 'read_release',
      },
      {
        title: 'Manual Bonus',
        icon: 'MinusIcon',
        route: 'promotions.manual',
        resource: 'Promotion',
        action: 'read_manual',
      },
    ],
  },
  {
    title: 'Banking System',
    icon: 'BriefcaseIcon',
    children: [
      {
        title: 'Bank Groups',
        icon: 'MinusIcon',
        route: 'banks.groups',
        resource: 'BankGroup',
        action: 'read',
      },
      {
        title: 'Bank List',
        icon: 'MinusIcon',
        route: 'banks.list',
        resource: 'Bank',
        action: 'read',
      },
    ],
  },
]
