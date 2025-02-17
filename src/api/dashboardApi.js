export async function fetchDashboardData() {
  const SHEET_ID = "1V3bHZQuMr-irt-MZFLeAoDWAg7nLixWpLFDM3NKbtJg";
  const API_KEY = "AIzaSyBvjfsoD7BVMniPh0I-tpSnnl0cJIaNUR0";

  try {
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Sheet1?key=${API_KEY}`
    );
    const data = await response.json();
    if (data && data.values) {
      const statsData = data.values.slice(1).map((row) => ({
        name: row[0], // Getting data from first column
        value: row[1], // Getting data from second column
      }));

      const ageRangeData = data.values.slice(1).map((row) => ({
        ageRange: row[3], // Getting data from fourth column
        count: row[4], // Getting data from fifth column - follow formula for other rows
      }));

      const eNPData = data.values.slice(1).map((row) => ({
        eNPDates: row[6],
        enpValue: row[7],
      }));

      const employeePerformanceData = data.values.slice(1).map((row) => ({
        employeePerformanceScores: row[9],
      }));

      const employeeSatisfactionData = data.values.slice(1).map((row) => ({
        employeeSatisfactionDates: row[11],
        employeeSatisfactionScores: row[12],
      }));

      const genderData = data.values.slice(1).map((row) => ({
        genderlabels: row[14],
        genderCounts: row[15],
      }));

      const TotalEmployeeData = data.values.slice(1).map((row) => ({
        totalEmployeesLabels: row[17],
        totalEmployeesCounts: row[18],
      }));

      return {
        statsData,
        ageRangeData,
        eNPData,
        employeePerformanceData,
        employeeSatisfactionData,
        genderData,
        TotalEmployeeData,
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
