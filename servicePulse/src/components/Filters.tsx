type FiltersProps = {
  region: string;
  service: string;
  environment: string;
  activeFilterCount: number;
  regionOptions: string[];
  serviceOptions: string[];
  environmentOptions: string[];
  onRegionChange: (value: string) => void;
  onServiceChange: (value: string) => void;
  onEnvironmentChange: (value: string) => void;
  onReset: () => void;
};

export function Filters({
  region,
  service,
  environment,
  activeFilterCount,
  regionOptions,
  serviceOptions,
  environmentOptions,
  onRegionChange,
  onServiceChange,
  onEnvironmentChange,
  onReset,
}: FiltersProps) {
  return (
    <div className="filters-card">
      <div className="filters-header">
        <h2 className="filters-title">Filters</h2>
        <span className="active-filter-count">{activeFilterCount} active</span>
      </div>

      <div className="filters-row">
        <div className="filter-group">
          <label className="filter-label" htmlFor="region-filter">Region</label>
          <select
            id="region-filter"
            className="filter-select"
            value={region}
            onChange={(event) => onRegionChange(event.target.value)}
          >
            <option value="">All regions</option>
            {regionOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label" htmlFor="service-filter">Service</label>
          <select
            id="service-filter"
            className="filter-select"
            value={service}
            onChange={(event) => onServiceChange(event.target.value)}
          >
            <option value="">All services</option>
            {serviceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label" htmlFor="environment-filter">Environment</label>
          <select
            id="environment-filter"
            className="filter-select"
            value={environment}
            onChange={(event) => onEnvironmentChange(event.target.value)}
          >
            <option value="">All environments</option>
            {environmentOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <button type="button" className="reset-button" onClick={onReset}>
          Reset Filters
        </button>
      </div>
    </div>
  );
}
