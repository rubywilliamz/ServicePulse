import type { ServicePerformance } from "../types/servicePerformance";

export function calculateSummary(filteredData: ServicePerformance[]) {
  if (filteredData.length === 0) {
    return {
      totalTransactions: 0,
      averageLatency: 0,
      errorRate: 0,
      availability: 0,
    };
  }

  const totalTransactions = filteredData.reduce((sum, item) => sum + item.transactions, 0);
  const averageLatency =
    filteredData.reduce((sum, item) => sum + item.avg_latency_ms, 0) / filteredData.length;
  const errorRate =
    filteredData.reduce((sum, item) => sum + item.error_rate_pct, 0) / filteredData.length;
  const availability =
    filteredData.reduce((sum, item) => sum + item.availability_pct, 0) / filteredData.length;

  return {
    totalTransactions,
    averageLatency,
    errorRate,
    availability,
  };
}
