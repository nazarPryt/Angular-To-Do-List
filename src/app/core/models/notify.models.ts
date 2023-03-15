export type NotifySeverityType = 'success' | 'error' | 'info';
export interface Notify {
  message: string;
  severity: NotifySeverityType;
}
