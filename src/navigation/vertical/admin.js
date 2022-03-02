export default [
  {
    title: 'User Management',
    icon: 'UsersIcon',
    children: [
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
    title: 'Member',
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
]
