import { CarbonLog } from '../models/carbon.model';

export const MOCK_CARBON_LOGS: CarbonLog[] = [
  { id: 1, activity_type: 'Electricity', month: 'มกราคม', year: 2568, type: 'Electricity', amount: 1200, unit: 'kWh', emission: 599.88, status: 'Approved' },
  { id: 2, activity_type: 'Water Supply', month: 'มกราคม', year: 2568, type: 'Water', amount: 45, unit: 'm3', emission: 13.5, status: 'Approved' },
  { id: 3, activity_type: 'Electricity', month: 'กุมภาพันธ์', year: 2568, type: 'Electricity', amount: 1150, unit: 'kWh', emission: 574.88, status: 'Submitted' },
  { id: 4, activity_type: 'Diesel Fuel', month: 'กุมภาพันธ์', year: 2568, type: 'Fuel', amount: 50, unit: 'Litre', emission: 120.5, status: 'Draft' },
];