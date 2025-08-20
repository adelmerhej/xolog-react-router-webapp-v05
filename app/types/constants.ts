/* eslint-disable @typescript-eslint/no-explicit-any */
export const PRIORITY_ITEMS = ['Low', 'Normal', 'High'];
export const STATUS_ITEMS = ['Open', 'In Progress', 'Deferred', 'Completed'];

export const ANALYTICS_PERIODS = {
  Week: {
    period: '2020-01-24/2020-01-31',
    index: 0,
  },
  '2 Weeks': {
    period: '2020-01-14/2020-01-31',
    index: 1,
  },
  Month: {
    period: '2020-01-01/2020-02-01',
    index: 2,
  },
  Year: {
    period: '2020-01-01/2021-01-01',
    index: 3,
  },
  All: {
    period: '2018-01-01/2022-01-01',
    index: 4,
  },
};

export const DEFAULT_ANALYTICS_PERIOD_KEY = 'All';

export const JOB_STATUS = [
  'To Be Loaded',
  'On Water',
  'Under Clearance',
];

export const JOB_STATUS_PAYMENT = [
  'Full Paid',
  'Not Paid',
];

export const INVOICE_PAYMENT = [
  'Invoices',
  'Drafts',
];

export const JOB_STATUS_LIST = [
  'New',
  'Delivered',
  'Cancelled',
];

export const JOB_STATUS_DEPARTMENTS = [
  'Sea Import',
  'Sea Export',
  'Air Import',
  'Air Export',
  'Sea Clearance',
  'Air Clearance',
  'Land Freight',
  'Sea Cross',
];

export const newJob = {
  JobNo: 0,
  DepartmentId: 0,
  JobDate: undefined,
  CustomerName: '',
  ConsigneeName: '',
  DepartmentName: '',
  StatusType: '',
  TotalProfit: 0,
  Eta: undefined,
  Ata: undefined,
  Arrival: undefined,
  UserName: '',
  Notes: '',
  CountryOfDeparture: '',
  Departure: '',
  Destination: '',
  ReferenceNo: '',
  vessel: '',
  TotalInvoices: 0,
  TotalCosts: 0,
  MemberOf: '',
  JobType: '',
  // Relationships
  status: undefined as any,
  state: undefined as any,
  opportunities: undefined as any,
  activities: [],
  tasks: [],
  image: '',
  firstName: '',
  lastName: '',
};
