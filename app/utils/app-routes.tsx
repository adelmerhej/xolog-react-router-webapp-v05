import {
  PlanningScheduler,
  PlanningTaskList,
  PlanningTaskDetails,
  AnalyticsDashboard,
  AnalyticsSalesReport,
  AnalyticsGeography,
  SignInPage,
  SignUpPage,
  ResetPasswordPage,
  UserProfile,
  JobStatusReport,
  TotalProfitReport,
  EmptyContainersReport,
  ClientInvoicesReport,
  OngoingJobsReport
} from './pages';
import { withNavigationWatcher } from './contexts/navigation';
import { TobeLoadedClientReport, OnWaterClientReport,
  UnderClearanceClientReport, InvoiceStatusClientReport } from './pages/client/reports';

const routes = [
  {
    path: '/total-profit',
    element: TotalProfitReport,
  },
  {
    path: '/job-status',
    element: JobStatusReport,
  },
  {
    path: '/empty-containers',
    element: EmptyContainersReport,
  },
  {
    path: '/client-invoices',
    element: ClientInvoicesReport,
  },
  {
    path: '/ongoing-jobs',
    element: OngoingJobsReport,
  },
  {
    path: '/client/reports/to-be-loaded',
    element: TobeLoadedClientReport,
  },
  {
    path: '/client/reports/on-water',
    element: OnWaterClientReport,
  },
  {
    path: '/client/reports/under-clearance',
    element: UnderClearanceClientReport,
  },
  {
    path: '/client/reports/invoice-status',
    element: InvoiceStatusClientReport,
  },
  {
    path: '/planning-task-list',
    element: PlanningTaskList,
  },
  {
    path: '/planning-task-details',
    element: PlanningTaskDetails,
  },
  {
    path: '/planning-scheduler',
    element: PlanningScheduler,
  },
  {
    path: '/analytics-dashboard',
    element: AnalyticsDashboard,
  },
  {
    path: '/analytics-sales-report',
    element: AnalyticsSalesReport,
  },
  {
    path: '/analytics-geography',
    element: AnalyticsGeography,
  },
  {
    path: '/sign-in-form',
    element: SignInPage,
  },
  {
    path: '/sign-up-form',
    element: SignUpPage,
  },
  {
    path: '/reset-password-form',
    element: ResetPasswordPage,
  },
  {
    path: '/user-profile',
    element: UserProfile,
  },
];

export const appRoutes = routes.map((route) => {
  return {
    ...route,
    element: withNavigationWatcher(route.element, route.path),
  };
});
