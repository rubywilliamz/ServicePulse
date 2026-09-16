import Papa from "papaparse";
import type { ServicePerformance } from "../types/servicePerformance";

export const loadPerformanceData = async (): Promise<ServicePerformance[]> => {
  const response = await fetch("/service_performance_data.csv");
  const csvText = await response.text();

  return new Promise((resolve, reject) => {
    Papa.parse<ServicePerformance>(csvText, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: (results) => {
        resolve(results.data);
      },
      error: (error: Error) => {
        reject(error);
      },
    });
  });
};
