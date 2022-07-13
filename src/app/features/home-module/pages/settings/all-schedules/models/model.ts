export interface Time {
  from: string;
  to: string;
}
export interface Schedules {
  day: string;
  active: boolean;
  times: Time[];
}
export interface Calender {
  name: string;
  timezone: '';
  id: number;
  schedules: Schedules[];
}
