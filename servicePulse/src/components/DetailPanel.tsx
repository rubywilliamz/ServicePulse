import type { ServicePerformance } from "../types/servicePerformance";

type DetailPanelProps = {
  observation: ServicePerformance;
  onClose: () => void;
};

export function DetailPanel({ observation, onClose }: DetailPanelProps) {
  return (
    <aside className="detail-panel">
      <div className="detail-header">
        <h2 className="detail-title">Observation Details</h2>
        <button type="button" className="close-button" onClick={onClose} aria-label="Close details">
          ×
        </button>
      </div>

      <div className="detail-list">
        <div className="detail-item">
          <span className="detail-label">Event</span>
          <span className="detail-value">{observation.event_id}</span>
        </div>

        <div className="detail-item">
          <span className="detail-label">Service</span>
          <span className="detail-value">{observation.service}</span>
        </div>

        <div className="detail-item">
          <span className="detail-label">Region</span>
          <span className="detail-value">{observation.region}</span>
        </div>

        <div className="detail-item">
          <span className="detail-label">Environment</span>
          <span className="detail-value">{observation.environment}</span>
        </div>

        <div className="detail-item">
          <span className="detail-label">Transactions</span>
          <span className="detail-value">{observation.transactions.toLocaleString()}</span>
        </div>

        <div className="detail-item">
          <span className="detail-label">Avg latency</span>
          <span className="detail-value">{observation.avg_latency_ms} ms</span>
        </div>

        <div className="detail-item">
          <span className="detail-label">Error rate</span>
          <span className="detail-value">{observation.error_rate_pct}%</span>
        </div>

        <div className="detail-item">
          <span className="detail-label">Availability</span>
          <span className="detail-value">{observation.availability_pct}%</span>
        </div>

        <div className="detail-item">
          <span className="detail-label">Target latency</span>
          <span className="detail-value">{observation.target_latency_ms} ms</span>
        </div>

        <div className="detail-item">
          <span className="detail-label">Status</span>
          <span className="detail-value">{observation.status}</span>
        </div>
      </div>
    </aside>
  );
}
