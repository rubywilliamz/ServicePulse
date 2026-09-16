import { describe, expect, it } from "vitest";
import { calculateSummary } from "../src/utils/calculations";
import type { ServicePerformance } from "../src/types/servicePerformance";

describe("calculateSummary", () => {
  it("aggregates transactions and averages performance metrics", () => {
    const data: ServicePerformance[] = [
      {
        event_id: "evt-1",
        timestamp_utc: "2026-01-01T00:00:00Z",
        region: "us-east",
        service: "payments",
        environment: "production",
        transactions: 100,
        avg_latency_ms: 40,
        error_rate_pct: 1,
        availability_pct: 99.9,
        target_latency_ms: 50,
        status: "Healthy",
      },
      {
        event_id: "evt-2",
        timestamp_utc: "2026-01-01T01:00:00Z",
        region: "eu-west",
        service: "checkout",
        environment: "production",
        transactions: 50,
        avg_latency_ms: 60,
        error_rate_pct: 3,
        availability_pct: 99.5,
        target_latency_ms: 70,
        status: "Watch",
      },
    ];

    expect(calculateSummary(data)).toEqual({
      totalTransactions: 150,
      averageLatency: 50,
      errorRate: 2,
      availability: 99.7,
    });
  });
});