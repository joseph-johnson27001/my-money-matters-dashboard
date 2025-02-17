export async function fetchDashboardData() {
  const SHEET_ID = "1V3bHZQuMr-irt-MZFLeAoDWAg7nLixWpLFDM3NKbtJg";
  const API_KEY = "AIzaSyBvjfsoD7BVMniPh0I-tpSnnl0cJIaNUR0";

  try {
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Sheet1?key=${API_KEY}`
    );
    const data = await response.json();
    if (data && data.values) {
      const statsData = data.values.map((row) => ({
        name: row[0],
        value: row[1],
      }));

      const ageRangeData = data.values.slice(1).map((row) => ({
        ageRange: row[3],
        count: row[4],
      }));

      return {
        statsData,
        ageRangeData,
      };
    } else {
      console.log("No data found in the sheet.");
      return { statsData: [], ageRangeData: [] };
    }
  } catch (error) {
    console.error("Error fetching Google Sheets data:", error);
    return { statsData: [], ageRangeData: [] };
  }
}
