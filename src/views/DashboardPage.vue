<script setup>
import { ref, onMounted } from "vue";
import StatCard from "@/components/StatCard.vue";
import GraphCard from "@/components/GraphCard.vue";
import EmployeePerformanceGraph from "@/components/Graphs/EmployeePerformanceGraph.vue";
import EmployeeSatisfactionGraph from "@/components/Graphs/EmployeeSatisfactionGraph.vue";
import TotalEmployeesGraph from "@/components/Graphs/TotalEmployeesGraph.vue";
import AgeRangeGraph from "@/components/Graphs/AgeRangeGraph.vue";
import GenderGraph from "@/components/Graphs/GenderGraph.vue";
import EmployeeNetPromoterGraph from "@/components/Graphs/EmployeeNetPromoterGraph.vue";
import { fetchDashboardData } from "@/api/dashboardApi"; // Importing the API function

const stats = ref([]);
const graphs = ref({});

const loadData = async () => {
  try {
    const data = await fetchDashboardData(); // Simulate API call
    stats.value = data.stats;
    graphs.value = data.graphs;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
  }
};

onMounted(() => {
  loadData(); // Load data when the component mounts
});
</script>

<template>
  <div class="dashboard">
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
        <TotalEmployeesGraph :data="graphs.totalEmployees" />
      </GraphCard>
      <GraphCard title="Employee Net Promoter Score">
        <EmployeeNetPromoterGraph :data="graphs.employeeNetPromoter" />
      </GraphCard>
      <GraphCard title="Employee Performance">
        <EmployeePerformanceGraph :data="graphs.employeePerformance" />
      </GraphCard>
      <GraphCard title="Employee Satisfaction">
        <EmployeeSatisfactionGraph :data="graphs.employeeSatisfaction" />
      </GraphCard>
      <GraphCard title="Employee Age Range">
        <AgeRangeGraph :data="graphs.ageRange" />
      </GraphCard>
      <GraphCard title="Employee Gender Breakdown">
        <GenderGraph :data="graphs.genderBreakdown" />
      </GraphCard>
    </div>
  </div>
</template>

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
    grid-template-columns: 1fr; /* Stack graphs vertically on small screens */
  }
}
</style>
