import type { ServicePerformance } from "../types/servicePerformance";

type DataTableProps = {
  data: ServicePerformance[];
  selectedObservation: ServicePerformance | null;
  onSelectObservation: (observation: ServicePerformance) => void;
};

function getStatusClassName(status: ServicePerformance["status"]) {
  switch (status) {
    case "Healthy":
      return "status-healthy";
    case "Watch":
      return "status-watch";
    case "Critical":
      return "status-critical";
    default:
      return "status-healthy";
  }
}

export function DataTable({ data, selectedObservation, onSelectObservation }: DataTableProps) {
  if (data.length === 0) {
    return (
      <div className="table-card">
        <div className="table-header">
          <h2 className="table-title">Observations</h2>
        </div>
        <div className="empty-state">
          <h3 className="empty-state-title">No matching records</h3>
          <p className="empty-state-text">Adjust the filters to view service performance data.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="table-card">
      <div className="table-header">
        <h2 className="table-title">Observations</h2>
      </div>

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Region</th>
              <th>Service</th>
              <th>Environment</th>
              <th>Transactions</th>
              <th>Latency</th>
              <th>Error Rate</th>
              <th>Availability</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr
                key={item.event_id}
                className={selectedObservation?.event_id === item.event_id ? "selected" : ""}
                onClick={() => onSelectObservation(item)}
              >
                <td>{new Date(item.timestamp_utc).toLocaleString()}</td>
                <td>{item.region}</td>
                <td>{item.service}</td>
                <td>{item.environment}</td>
                <td>{item.transactions.toLocaleString()}</td>
                <td>{item.avg_latency_ms} ms</td>
                <td>{item.error_rate_pct}%</td>
                <td>{item.availability_pct}%</td>
                <td>
                  <span className={`status-badge ${getStatusClassName(item.status)}`}>{item.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
