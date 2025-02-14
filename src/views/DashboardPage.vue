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
        <TotalEmployeesGraph />
      </GraphCard>
      <GraphCard title="Employee Net Promotor Score">
        <EmployeeNetPromoterGraph />
      </GraphCard>
      <GraphCard title="Employee Performance">
        <EmployeePerformanceGraph />
      </GraphCard>
      <GraphCard title="Employee Satisfaction">
        <EmployeeSatisfactionGraph />
      </GraphCard>
      <GraphCard title="Employee Age Range">
        <AgeRangeGraph />
      </GraphCard>
      <GraphCard title="Employee Gender Breakdown">
        <GenderGraph />
      </GraphCard>
    </div>
  </div>
</template>

<script setup>
import StatCard from "@/components/StatCard.vue";
import GraphCard from "@/components/GraphCard.vue";
import EmployeePerformanceGraph from "@/components/Graphs/EmployeePerformanceGraph.vue";
import EmployeeSatisfactionGraph from "@/components/Graphs/EmployeeSatisfactionGraph.vue";
import TotalEmployeesGraph from "@/components/Graphs/TotalEmployeesGraph.vue";
import AgeRangeGraph from "@/components/Graphs/AgeRangeGraph.vue";
import GenderGraph from "@/components/Graphs/GenderGraph.vue";
import EmployeeNetPromoterGraph from "@/components/Graphs/EmployeeNetPromoterGraph.vue";

const stats = [
  {
    name: "Total Employees",
    value: 120,
    icon: "fas fa-users",
    iconColor: "#006ba6",
  },
  {
    name: "New Hires This Month",
    value: 5,
    icon: "fa-user-plus",
    iconColor: "#4caf50",
  },
  {
    name: "Employee Turnover Rate",
    value: "8%",
    icon: "fa-user-minus",
    iconColor: "#ff9800",
  },
  {
    name: "Total Monthly Payroll",
    value: "£50,000",
    icon: "fa-dollar-sign",
    iconColor: "#f44336",
  },
  {
    name: "Employee Satisfaction",
    value: "90%",
    icon: "fa-smile",
    iconColor: "#2196f3",
  },
  {
    name: "Absenteeism Rate",
    value: "5%",
    icon: "fa-calendar-times",
    iconColor: "#9c27b0",
  },
  {
    name: "Roles Recruiting",
    value: "5",
    icon: "fa-briefcase",
    iconColor: "#9c27b0",
  },
  {
    name: "Retention Rate",
    value: "95%",
    icon: "fa-handshake",
    iconColor: "#9c27b0",
  },
];
</script>

<style scoped>
.stats-container {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 10px;
}

@media (max-width: 1400px) {
  .stats-container {
    grid-template-columns: repeat(4, 1fr);
  }
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
