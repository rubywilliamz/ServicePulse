import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ServicePerformance } from "../types/servicePerformance";

type Metric = "latency" | "errorRate" | "availability";
type ChartMode = "line" | "scatter";

type PerformanceChartsProps = {
  data: ServicePerformance[];
  metric: Metric;
  chartMode: ChartMode;
  onMetricChange: (value: Metric) => void;
  onChartModeChange: (value: ChartMode) => void;
};

const metricMeta = {
  latency: {
    label: "Latency",
    unit: "ms",
    value: (item: ServicePerformance) => item.avg_latency_ms,
  },
  errorRate: {
    label: "Error Rate",
    unit: "%",
    value: (item: ServicePerformance) => item.error_rate_pct,
  },
  availability: {
    label: "Availability",
    unit: "%",
    value: (item: ServicePerformance) => item.availability_pct,
  },
};

export function PerformanceCharts({
  data,
  metric,
  chartMode,
  onMetricChange,
  onChartModeChange,
}: PerformanceChartsProps) {
  const activeMetric = metricMeta[metric];

  const chartData = data.map((item) => ({
    name: `${item.region} · ${item.service}`,
    value: activeMetric.value(item),
    transactions: item.transactions,
    status: item.status,
  }));

  const scatterData = data.map((item) => ({
    x: item.transactions,
    y: activeMetric.value(item),
    z: item.service,
  }));

  return (
    <div className="chart-card">
      <div className="chart-header">
        <h2 className="chart-title">Performance Trend</h2>

        <div className="chart-controls">
          <select
            className="metric-select"
            value={metric}
            onChange={(event) => onMetricChange(event.target.value as Metric)}
          >
            <option value="latency">Latency</option>
            <option value="errorRate">Error Rate</option>
            <option value="availability">Availability</option>
          </select>

          <div className="chart-mode-buttons">
            <button
              type="button"
              className={`chart-mode-button ${chartMode === "line" ? "active" : ""}`}
              onClick={() => onChartModeChange("line")}
            >
              Line
            </button>
            <button
              type="button"
              className={`chart-mode-button ${chartMode === "scatter" ? "active" : ""}`}
              onClick={() => onChartModeChange("scatter")}
            >
              Scatter
            </button>
          </div>
        </div>
      </div>

      <div className="chart-container">
        {chartMode === "line" ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid stroke="#e4e8ee" strokeDasharray="4 4" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} interval={0} angle={-18} textAnchor="end" height={64} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip
                formatter={(value: number | string | readonly (number | string)[] | undefined) => {
                  const numericValue = Array.isArray(value) ? value[0] : value;
                  return [`${numericValue ?? 0} ${activeMetric.unit}`, activeMetric.label];
                }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#172033"
                strokeWidth={3}
                dot={{ r: 4, fill: "#172033" }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart>
              <CartesianGrid stroke="#e4e8ee" strokeDasharray="4 4" />
              <XAxis
                type="number"
                dataKey="x"
                name="Transactions"
                tick={{ fontSize: 11 }}
              />
              <YAxis type="number" dataKey="y" name={activeMetric.label} tick={{ fontSize: 11 }} />
              <Tooltip
                cursor={{ strokeDasharray: "4 4" }}
                formatter={(value: number | string | readonly (number | string)[] | undefined) => {
                  const numericValue = Array.isArray(value) ? value[0] : value;
                  return [`${numericValue ?? 0} ${activeMetric.unit}`, activeMetric.label];
                }}
                labelFormatter={(_, payload) => {
                  const point = payload?.[0]?.payload as { z?: string } | undefined;
                  return point?.z ?? "Observation";
                }}
              />
              <Scatter data={scatterData} fill="#172033" />
            </ScatterChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
