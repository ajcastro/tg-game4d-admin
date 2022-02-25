export default [
  {
    title: 'Clients',
    route: 'clients',
    // icon: 'UserIcon',
  },
  {
    title: 'Parent Groups',
    route: 'parent_groups',
    // icon: 'UserIcon',
  },
  {
    title: 'Front Websites',
    route: 'front_websites',
    // icon: 'UserIcon',
  },

  {
    title: 'Member',
    icon: 'Share2Icon',
    children: [
      {
        title: 'Member List',
        route: 'members.list',
      },
      {
        title: 'Member Online',
        route: 'members.online',
      },
      {
        title: 'Referral List',
        route: 'members.referral-list',
      },
      {
        title: 'Blacklist',
        route: 'members.blacklist',
      },
    ],
  },
]
