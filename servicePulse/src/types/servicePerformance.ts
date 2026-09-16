export interface ServicePerformance {
  event_id: string;
  timestamp_utc: string;
  region: string;
  service: string;
  environment: string;
  transactions: number;
  avg_latency_ms: number;
  error_rate_pct: number;
  availability_pct: number;
  target_latency_ms: number;
  status: "Healthy" | "Watch" | "Critical";
}