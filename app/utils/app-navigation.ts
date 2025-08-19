export const navigation = [
  {
    text: 'Dashboard',
    icon: 'dashboard',
    path: '',
    role: 'all',
    items: [
      {
        text: 'Dashboard',
        path: '/dashboard',
      }
    ],
  },  {
    text: 'Admin Reports',
    icon: 'refresh',
    path: '',
    role: 'admin',
    items: [
      {
        text: 'Total Profit',
        path: '/total-profit',
      },
      {
        text: 'Job Status',
        path: '/job-status',
      },
      {
        text: 'Empty Containers',
        path: '/empty-containers',
      },
      {
        text: 'Client Invoices',
        path: '/client-invoices',
      },
      {
        text: 'Ongoing Jobs',
  path: '/reports/ongoing-jobs',
      },
    ],
  },
  {
    text: 'Client Reports',
    icon: 'user',
    path: '',
    role: 'customer',
    items: [
      {
        text: 'To be loaded',
        path: '/reports/to-be-loaded',
      },
      {
        text: 'On Water',
        path: '/reports/on-water',
      },
      {
        text: 'Under Clearance',  
        path: '/reports/under-clearance',
      },
      {
        text: 'Invoice Status',
        path: '/reports/invoice-status',
      },
    ],
  },
  {
    text: 'KPI Analytics',
    icon: 'chart',
    path: '',
    role: 'all',
    items: [
      {
        text: 'Sales Report',
        path: '/dashboard',
      },
      {
        text: 'Geography',
        path: '/dashboard',
      },
    ],
  },
  {
    text: 'Settings',
    icon: 'box',
    path: '',
    role: 'all',
    items: [
      {
        text: 'User Profile',
        path: '/user-profile',
      }
    ]
  },
];

export type UserRole = 'admin' | 'user' | 'customer';

export function getNavigationForRole(role: UserRole) {
  if (role === 'admin') return navigation;
  if (role === 'user') {
    // Users see KPI Analytics + Settings
    return navigation.filter((g) => ['KPI Analytics', 'Settings'].includes(g.text));
  }
  if (role === 'customer') {
    // Customers see only Client Reports + Settings
    return navigation.filter((g) => ['Dashboard', 'Client Reports', 'Settings'].includes(g.text));
  }
}
