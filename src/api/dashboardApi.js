export async function fetchDashboardData() {
  const SHEET_ID = "1V3bHZQuMr-irt-MZFLeAoDWAg7nLixWpLFDM3NKbtJg";
  const API_KEY = "AIzaSyBvjfsoD7BVMniPh0I-tpSnnl0cJIaNUR0";

  console.log("API Key being passed:", API_KEY);

  try {
    // Directly fetch data from the Google Sheets API
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Sheet1?key=${API_KEY}`
    );
    const data = await response.json();

    console.log("Fetched data from Google Sheets:", data);

    if (data && data.values) {
      const statsData = data.values.map((row) => ({
        name: row[0], // Assuming column 1 contains 'Name'
        value: row[1], // Assuming column 2 contains 'Value'
      }));

      console.log("Processed Stats Data:", statsData);
      return statsData;
    } else {
      console.log("No data found in the sheet.");
      return [];
    }
  } catch (error) {
    console.error("Error fetching Google Sheets data:", error);
    return [];
  }
}
