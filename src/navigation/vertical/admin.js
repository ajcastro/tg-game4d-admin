export default [
  // {
  //   title: 'Dashboard',
  //   route: 'dashboard',
  //   icon: 'HomeIcon',
  //   resource: 'Dashboard',
  //   action: 'view',
  // },
  {
    title: 'Games',
    icon: 'BoxIcon',
    route: 'games',
    resource: 'Game',
    action: 'read',
  },
  {
    title: 'Games Results',
    icon: 'AwardIcon',
    route: 'games.results',
    resource: 'GameResult',
    action: 'read',
  },
  {
    title: 'Bets List',
    icon: 'BarChart2Icon',
    route: 'bets.list',
    resource: 'BetList',
    action: 'read',
  },
  {
    title: 'Market List',
    icon: 'ListIcon',
    route: 'markets',
    resource: 'Market',
    action: 'read',
  },
  {
    title: 'Users',
    icon: 'UsersIcon',
    route: 'users',
    resource: 'User',
    action: 'read',
  },

]
