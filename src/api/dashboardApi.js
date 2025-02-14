// api/dashboardApi.js

export function fetchDashboardData() {
  return new Promise((resolve) => {
    const data = require("@/data/dashboardData.json"); // Importing the data from the JSON file
    resolve(data);
  });
}
