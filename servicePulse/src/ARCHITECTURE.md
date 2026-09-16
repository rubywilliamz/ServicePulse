# ServicePulse Architecture

## Component and State Structure

ServicePulse uses a small React component hierarchy with `App` as the page-level coordinator. The UI is split into focused presentational components:

- `SummaryCards` displays aggregate transaction, latency, error-rate, and availability values.
- `Filters` renders controlled selects for region, service, and environment, plus the reset action.
- `PerformanceCharts` renders the selected metric in line or scatter mode using Recharts.
- `DataTable` renders the filtered observations and reports the selected row.
- `DetailPanel` displays the complete record for the selected observation.

`App` owns the state that affects more than one component:

- `data`: all parsed `ServicePerformance` records.
- `region`, `service`, and `environment`: active filter values.
- `metric` and `chartMode`: chart presentation choices.
- `selectedObservation`: the row currently shown in the detail panel.
- `loading` and `error`: data-loading status.

Child components are intentionally stateless for these workflows. They receive current values through props and communicate user actions through callbacks. This keeps filter and selection behavior in one place and prevents separate components from developing inconsistent copies of the same state.

## Data Flow

1. On mount, `App` calls `loadPerformanceData` from `src/utils/csvParser.ts`.
2. The loader fetches `/service_performance_data.csv` from the public assets and parses it with Papa Parse using header rows, skipped empty lines, and dynamic typing.
3. Parsed records are stored in `data`. Loading and fetch errors update the corresponding status state.
4. `filteredData` is derived with `useMemo` from `data` and the three active filters. Empty filter values mean “all”.
5. Unique regions, services, and environments are derived from the raw dataset to populate filter options.
6. Summary values are derived from the filtered records and passed to `SummaryCards`. Transactions are summed; latency, error rate, and availability use arithmetic means.
7. The same `filteredData` is passed to the charts and table. Selecting a table row stores that record in `selectedObservation`, which causes `DetailPanel` to render.
8. When filtering removes the selected record, an effect clears the selection so the detail panel cannot display an observation outside the current view.

The data flow is one-way: source data and state live at the page level, derived data flows downward, and events flow upward through callback props.

## Chart Choice

Recharts was chosen because it provides React-native chart components, responsive sizing, axes, tooltips, and both line and scatter visualizations without requiring manual SVG or canvas management.

- **Line chart:** shows one selected metric for each region/service observation in the current filtered result. It is useful for scanning the metric across labeled observations.
- **Scatter chart:** maps transactions to the x-axis and the selected metric to the y-axis. It is useful for comparing volume with latency, error rate, or availability and for spotting outliers.

Metric metadata centralizes the label, unit, and value accessor for latency, error rate, and availability. This allows both chart modes to use the same metric selection while presenting different visual encodings.

## Performance Considerations

The current implementation favors clarity and is appropriate for the included static dataset:

- Filtering, summary calculation, unique-option generation, and chart data mapping are linear operations over the in-memory records.
- `useMemo` avoids recalculating filtered records and summaries when unrelated state changes, such as opening or closing the detail panel.
- The table and charts render only the filtered subset, reducing work when filters are active.
- `ResponsiveContainer` lets Recharts adapt to the available layout without measuring or redrawing the page manually.

For substantially larger or frequently changing datasets, the current approach would need to evolve. Likely next steps would be server-side filtering or pagination, virtualization for the table, precomputed indexes for filter options, and more selective chart rendering. Chart points and table rows currently scale directly with the number of filtered records, and there is no caching, pagination, or aggregation layer.
