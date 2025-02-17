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
        name: row[0], // Getting data from first column
        value: row[1], // Getting data from second column
      }));

      const ageRangeData = data.values.slice(1).map((row) => ({
        ageRange: row[3], // Getting data from fourth column
        count: row[4], // Getting data from fifth column
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
