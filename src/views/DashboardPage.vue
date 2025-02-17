<template>
  <div>
    <LoadingAnimation v-if="isLoading" />

    <div v-if="!isLoading" class="dashboard">
      <!-- Stats Cards Section -->
      <div class="stats-container">
        <StatCard
          v-for="(stat, index) in stats"
          :key="index"
          :name="stat.name"
          :value="stat.value"
          :icon="stat.icon"
          :iconColor="stat.iconColor"
        />
      </div>

      <!-- Graphs Section -->
      <div class="graphs-container">
        <GraphCard title="Total Employees">
          <TotalEmployeesGraph />
        </GraphCard>
        <GraphCard title="Employee Net Promoter Score">
          <EmployeeNetPromoterGraph :data="eNPGraphData" />
        </GraphCard>
        <GraphCard title="Employee Performance">
          <EmployeePerformanceGraph
            :performanceScores="employeePerformanceGraphData"
          />
        </GraphCard>

        <GraphCard title="Employee Satisfaction">
          <EmployeeSatisfactionGraph />
        </GraphCard>
        <GraphCard title="Employee Age Range">
          <AgeRangeGraph :data="ageRangeGraphData" />
        </GraphCard>
        <GraphCard title="Employee Gender Breakdown">
          <GenderGraph />
        </GraphCard>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { fetchDashboardData } from "@/api/dashboardApi";
import StatCard from "@/components/StatCard.vue";
import GraphCard from "@/components/GraphCard.vue";
import EmployeePerformanceGraph from "@/components/Graphs/EmployeePerformanceGraph.vue";
import EmployeeSatisfactionGraph from "@/components/Graphs/EmployeeSatisfactionGraph.vue";
import TotalEmployeesGraph from "@/components/Graphs/TotalEmployeesGraph.vue";
import AgeRangeGraph from "@/components/Graphs/AgeRangeGraph.vue";
import GenderGraph from "@/components/Graphs/GenderGraph.vue";
import EmployeeNetPromoterGraph from "@/components/Graphs/EmployeeNetPromoterGraph.vue";
import LoadingAnimation from "@/components/LoadingAnimation.vue";

const isLoading = ref(true);

const stats = ref([
  {
    name: "Total Employees",
    value: "",
    icon: "fas fa-users",
    iconColor: "#006ba6",
  },
  {
    name: "New Hires This Month",
    value: "",
    icon: "fa-user-plus",
    iconColor: "#4caf50",
  },
  {
    name: "Employee Turnover Rate",
    value: "",
    icon: "fa-user-minus",
    iconColor: "#ff9800",
  },
  {
    name: "Total Monthly Payroll",
    value: "",
    icon: "fa-dollar-sign",
    iconColor: "#f44336",
  },
  {
    name: "Employee Satisfaction",
    value: "",
    icon: "fa-smile",
    iconColor: "#2196f3",
  },
  {
    name: "Absenteeism Rate",
    value: "",
    icon: "fa-calendar-times",
    iconColor: "#9c27b0",
  },
  {
    name: "Roles Currently Recruiting",
    value: "",
    icon: "fa-briefcase",
    iconColor: "#9c27b0",
  },
  {
    name: "Retention Rate",
    value: "",
    icon: "fa-handshake",
    iconColor: "#9c27b0",
  },
]);

const ageRangeGraphData = ref([]);
const eNPGraphData = ref([]);
const employeePerformanceGraphData = ref([]);

const loadData = async () => {
  try {
    const { statsData, ageRangeData, eNPData, employeePerformanceData } =
      await fetchDashboardData();

    // Filter out empty or blank values for statsData, ageRangeData, eNPData, and employeePerformanceData
    stats.value = statsData
      .filter((stat) => stat.name && stat.value) // Only include stats with both name and value
      .map((stat) => ({
        ...stat,
      }));

    // Filter out any entries that have empty values in ageRangeData
    ageRangeGraphData.value = ageRangeData.filter(
      (item) => item.ageRange && item.count
    );

    // Filter out any entries that have empty values in eNPData
    eNPGraphData.value = eNPData.filter(
      (item) => item.eNPDates && item.enpValue
    );

    // Filter out any entries that have empty values in employeePerformanceData
    employeePerformanceGraphData.value = employeePerformanceData
      .filter((item) => item.employeePerformanceScores)
      .map((item) => parseFloat(item.employeePerformanceScores)); // Convert to float to handle numeric data

    console.log(employeePerformanceGraphData.value); // Check the final array format

    console.log(employeePerformanceData);
    isLoading.value = false;
  } catch (error) {
    console.error("Error loading dashboard data:", error);
    isLoading.value = false;
  }
};

onMounted(loadData);
</script>

<style scoped>
.stats-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

@media (max-width: 768px) {
  .stats-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .stats-container {
    grid-template-columns: 1fr;
  }
}

/* Graphs container */
.graphs-container {
  display: grid;
  gap: 10px;
  margin-top: 10px;
  grid-template-columns: repeat(2, 1fr);
}

/* Stack graphs on smaller screens */
@media (max-width: 768px) {
  .graphs-container {
    grid-template-columns: 1fr;
  }
}
</style>
