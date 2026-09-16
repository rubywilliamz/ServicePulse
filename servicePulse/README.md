# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  # ServicePulse

  ServicePulse is a React and TypeScript dashboard for exploring service performance observations from a CSV dataset. It presents summary metrics, filters, charts, an observation table, and a detail panel for individual records.

  ## Setup

  ### Prerequisites

  - Node.js 20 or newer
  - npm

  Install the project dependencies from the repository root:

  ```bash
  npm install
  ```

  ## Run

  Start the Vite development server:

  ```bash
  npm run dev
  ```

  Open the local URL printed by Vite, normally `http://localhost:5173`.

  Create a production build:

  ```bash
  npm run build
  ```

  Preview the production build locally:

  ```bash
  npm run preview
  ```

  ## Test

  Run the automated tests once:

  ```bash
  npm test
  ```

  The tests are located in `tests/` and use Vitest with Testing Library. They currently cover:

  - Summary data transformation: transaction totals and arithmetic averages.
  - Filter interaction: region selection and reset callbacks.

  Run ESLint across the project:

  ```bash
  npm run lint
  ```

  ## Implemented Scope

  - Loads `public/service_performance_data.csv` in the browser and parses it with Papa Parse.
  - Shows total transactions, average latency, average error rate, and average availability.
  - Filters observations by region, service, and environment.
  - Displays the active filter count and supports resetting all filters.
  - Visualizes latency, error rate, or availability as either a line chart or scatter plot.
  - Displays filtered observations in a table with localized timestamps and status badges.
  - Opens a detail panel when an observation is selected and closes it with the close control.
  - Handles loading, CSV loading failure, empty filtered results, and selected observations that are removed by filtering.

  ## Assumptions

  - The dataset is a static asset available at `/service_performance_data.csv`.
  - CSV headers and field types match `src/types/servicePerformance.ts`.
  - `event_id` uniquely identifies an observation.
  - Numeric fields are valid numbers, and `status` is `Healthy`, `Watch`, or `Critical`.
  - Summary averages are simple arithmetic means across the filtered rows; they are not weighted by transaction volume.
  - Timestamps can be parsed by the browser and are displayed in the user’s local locale.

  ## Known Limitations

  - There is no backend, authentication, persistence, live ingestion, or database integration. Updating the CSV requires rebuilding or serving the changed asset.
  - CSV schema validation and row-level data-quality reporting are not implemented.
  - The dashboard does not currently provide pagination, sorting, export, date-range filtering, or user-configurable thresholds.
  - Charts and the full dashboard workflow do not yet have automated test coverage; the current tests focus on one transformation and one filter interaction.
  - The repository-wide lint command currently reports a React hooks warning in `src/App.tsx` for synchronously clearing a selected observation inside an effect.

  ## AI and Tool Usage

  This project was developed with assistance from GitHub Copilot in VS Code. The assistant was used to inspect the repository, implement focused changes, write Testing Library coverage, and update accessibility labels.

  Tools used during development included:

  - VS Code workspace file search and file inspection.
  - `apply_patch` for focused source.
  - Vitest, Testing Library, ESLint, TypeScript, and Vite for validation.

  The application does not call an AI service at runtime. All generated changes and test results should be reviewed by a project maintainer before production use.
