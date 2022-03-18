export default [
  {
    title: 'Users Management',
    icon: 'UsersIcon',
    children: [
      {
        title: 'Users',
        icon: 'MinusIcon',
        route: 'users',
      },
      {
        title: 'Roles',
        icon: 'MinusIcon',
        route: 'roles',
      },
      {
        title: 'Clients',
        icon: 'MinusIcon',
        route: 'clients',
      },
      {
        title: 'Parent Groups',
        icon: 'MinusIcon',
        route: 'parent_groups',
      },
      {
        title: 'Front Websites',
        icon: 'MinusIcon',
        route: 'front_websites',
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
      },
      {
        title: 'Member Online',
        icon: 'MinusIcon',
        route: 'members.online',
      },
      {
        title: 'Referral List',
        icon: 'MinusIcon',
        route: 'members.referrals',
      },
      {
        title: 'Blacklist',
        icon: 'MinusIcon',
        route: 'members.blacklist',
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
      },
      {
        title: 'Deposit List',
        icon: 'MinusIcon',
        route: 'transactions.deposit_list',
      },
      {
        title: 'New Withdrawals',
        icon: 'MinusIcon',
        route: 'transactions.new_withdrawals',
      },
      {
        title: 'Withdrawal List',
        icon: 'MinusIcon',
        route: 'transactions.withdrawal_list',
      },
      {
        title: 'Adjustments',
        icon: 'MinusIcon',
        route: 'transactions.adjustments',
      },
    ],
  },
]
