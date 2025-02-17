// src/api/dashboardApi.js
const SHEET_ID = "1V3bHZQuMr-irt-MZFLeAoDWAg7nLixWpLFDM3NKbtJg";
const SHEET_NAME = "Sheet1"; // Change if your sheet name is different
const URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${SHEET_NAME}`;

export async function fetchDashboardData() {
  try {
    const response = await fetch(URL);
    const text = await response.text();

    // Google Sheets API wraps the JSON in some extra characters, so we need to clean it
    const json = JSON.parse(text.substring(47).slice(0, -2));

    // Extract data from Google Sheets response
    const rows = json.table.rows;

    // Convert into usable format
    const stats = [];
    const graphs = { totalEmployees: { labels: [], data: [] } };

    rows.forEach((row) => {
      const [name, value] = row.c.map((cell) => (cell ? cell.v : null));

      if (name === "Total Employees") {
        graphs.totalEmployees.labels.push(name);
        graphs.totalEmployees.data.push(value);
      } else {
        stats.push({ name, value });
      }
    });

    return { stats, graphs };
  } catch (error) {
    console.error("Error fetching Google Sheets data:", error);
    return { stats: [], graphs: {} };
  }
}
