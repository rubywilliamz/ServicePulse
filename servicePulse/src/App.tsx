import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { DataTable } from "./components/DataTable";
import { DetailPanel } from "./components/DetailPanel";
import { Filters } from "./components/Filters";
import { PerformanceCharts } from "./components/PerformanceCharts";
import { SummaryCards } from "./components/SummaryCards";
import type { ServicePerformance } from "./types/servicePerformance";
import { loadPerformanceData } from "./utils/csvParser";

export default function App() {
  const [data, setData] = useState<ServicePerformance[]>([]);
  const [region, setRegion] = useState("");
  const [service, setService] = useState("");
  const [environment, setEnvironment] = useState("");
  const [metric, setMetric] = useState<"latency" | "errorRate" | "availability">("latency");
  const [chartMode, setChartMode] = useState<"line" | "scatter">("line");
  const [selectedObservation, setSelectedObservation] = useState<ServicePerformance | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPerformanceData()
      .then(setData)
      .catch(() => setError("Failed to load data"))
      .finally(() => setLoading(false));
  }, []);

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const regionMatch = !region || item.region === region;
      const serviceMatch = !service || item.service === service;
      const environmentMatch = !environment || item.environment === environment;

      return regionMatch && serviceMatch && environmentMatch;
    });
  }, [data, region, service, environment]);

  const activeFilterCount = [region, service, environment].filter(Boolean).length;

  const summary = useMemo(() => {
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
  }, [filteredData]);

  const uniqueRegions = Array.from(new Set(data.map((item) => item.region)));
  const uniqueServices = Array.from(new Set(data.map((item) => item.service)));
  const uniqueEnvironments = Array.from(new Set(data.map((item) => item.environment)));

  useEffect(() => {
    if (selectedObservation && !filteredData.some((item) => item.event_id === selectedObservation.event_id)) {
      setSelectedObservation(null);
    }
  }, [filteredData, selectedObservation]);

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1 className="header-title">ServicePulse Dashboard</h1>
          <p className="header-subtitle">Operational tracking for core service health</p>
        </div>

        <div className="header-status">
          <span className="status-dot" />
          <span>Live feed</span>
        </div>
      </header>

      <main className="dashboard-container">
        {loading ? (
          <div className="loading-state">Loading service performance data...</div>
        ) : error ? (
          <div className="error-state">
            <h2 className="error-state-title">Unable to load service data</h2>
            <p className="error-state-text">{error}</p>
          </div>
        ) : (
          <>
            <SummaryCards
              totalTransactions={summary.totalTransactions}
              averageLatency={summary.averageLatency}
              errorRate={summary.errorRate}
              availability={summary.availability}
            />

            <Filters
              region={region}
              service={service}
              environment={environment}
              activeFilterCount={activeFilterCount}
              regionOptions={uniqueRegions}
              serviceOptions={uniqueServices}
              environmentOptions={uniqueEnvironments}
              onRegionChange={setRegion}
              onServiceChange={setService}
              onEnvironmentChange={setEnvironment}
              onReset={() => {
                setRegion("");
                setService("");
                setEnvironment("");
              }}
            />

            <PerformanceCharts
              data={filteredData}
              metric={metric}
              chartMode={chartMode}
              onMetricChange={setMetric}
              onChartModeChange={setChartMode}
            />

            <DataTable
              data={filteredData}
              selectedObservation={selectedObservation}
              onSelectObservation={setSelectedObservation}
            />
          </>
        )}
      </main>

      {selectedObservation ? (
        <DetailPanel
          observation={selectedObservation}
          onClose={() => setSelectedObservation(null)}
        />
      ) : null}
    </div>
  );
}
