export default [
  // {
  //   title: 'Dashboard',
  //   route: 'dashboard',
  //   icon: 'HomeIcon',
  //   resource: 'Dashboard',
  //   action: 'view',
  // },
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
      // {
      //   title: 'Roles',
      //   icon: 'MinusIcon',
      //   route: 'roles',
      //   resource: 'Role',
      //   action: 'read',
      // },
    ],
  },

  {
    title: '4D Setting',
    icon: 'SettingsIcon',
    children: [
      {
        title: 'Market List',
        icon: 'MinusIcon',
        route: 'markets',
        resource: 'Market',
        action: 'read',
      },
      {
        title: 'Market Websites',
        icon: 'MinusIcon',
        route: 'market_websites',
        resource: 'MarketWebsite',
        action: 'read',
      },
    ],
  },
]
