export interface ComparisonRow {
  feature: string;
  monthly: string | boolean;
  sixMonth: string | boolean;
  yearly: string | boolean;
  tooltip?: string;
}

export const planComparison: ComparisonRow[] = [
  {
    feature: 'Check-in Calls with Parents',
    monthly: 'Once a Week',
    sixMonth: 'Twice a Week',
    yearly: 'Daily',
    tooltip: "Regular calls to check on your parents' wellbeing",
  },
  {
    feature: 'Wellbeing Updates to Family',
    monthly: 'Once a Week',
    sixMonth: 'Twice a Week',
    yearly: 'Daily',
    tooltip: "Updates sent to you about your parents' health and mood",
  },
  {
    feature: '24/7 Access to Support',
    monthly: false,
    sixMonth: true,
    yearly: true,
    tooltip: 'Round-the-clock access to care support team',
  },
  {
    feature: 'Assisted Medical Visits',
    monthly: false,
    sixMonth: true,
    yearly: true,
    tooltip: 'Coordinator accompanies parents to doctor visits',
  },
  {
    feature: 'Dedicated CareBow Coordinator',
    monthly: true,
    sixMonth: true,
    yearly: true,
    tooltip: 'Single point of contact for all care needs',
  },
  {
    feature: 'Medication Reminders',
    monthly: true,
    sixMonth: true,
    yearly: true,
  },
  {
    feature: 'Doctor Appointment Scheduling',
    monthly: true,
    sixMonth: true,
    yearly: true,
  },
  {
    feature: 'Priority Response Time',
    monthly: false,
    sixMonth: true,
    yearly: true,
  },
  {
    feature: 'Detailed Care Reports',
    monthly: false,
    sixMonth: 'Fortnightly',
    yearly: 'Monthly',
  },
  {
    feature: 'Emergency Support Coordination',
    monthly: 'Standard',
    sixMonth: 'Priority',
    yearly: 'Priority',
  },
];
