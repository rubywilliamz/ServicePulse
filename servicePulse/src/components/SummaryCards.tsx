type SummaryCardsProps = {
  totalTransactions: number;
  averageLatency: number;
  errorRate: number;
  availability: number;
};

export function SummaryCards({
  totalTransactions,
  averageLatency,
  errorRate,
  availability,
}: SummaryCardsProps) {
  return (
    <div className="summary-grid">
      <div className="summary-card summary-card-transactions">
        <div className="summary-label">Total Transactions</div>
        <div className="summary-value">{totalTransactions.toLocaleString()}</div>
      </div>

      <div className="summary-card summary-card-latency">
        <div className="summary-label">Average Latency</div>
        <div className="summary-value">
          {Math.round(averageLatency)}
          <span className="summary-unit">ms</span>
        </div>
      </div>

      <div className="summary-card summary-card-error">
        <div className="summary-label">Error Rate</div>
        <div className="summary-value">
          {errorRate.toFixed(2)}
          <span className="summary-unit">%</span>
        </div>
      </div>

      <div className="summary-card summary-card-availability">
        <div className="summary-label">Availability</div>
        <div className="summary-value">
          {availability.toFixed(2)}
          <span className="summary-unit">%</span>
        </div>
      </div>
    </div>
  );
}
