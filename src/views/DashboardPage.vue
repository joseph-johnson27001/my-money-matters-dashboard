<template>
  <div class="dashboard">
    <div class="stats-container">
      <StatCard
        v-for="(stat, index) in stats"
        :key="index"
        :name="stat.name"
        :value="stat.value"
        :icon="stat.icon"
      />
    </div>
  </div>
</template>

<script setup>
import StatCard from "@/components/StatCard.vue";

const stats = [
  { name: "Total Employees", value: 120, icon: "fas fa-users" },
  { name: "New Hires This Month", value: 5, icon: "fa-user-plus" },
  { name: "Employee Turnover Rate", value: "8%", icon: "fa-percent" },
  { name: "Total Monthly Payroll", value: "$50,000", icon: "fa-dollar-sign" },
  { name: "Employee Satisfaction", value: "90%", icon: "fa-smile" },
  { name: "Absenteeism Rate", value: "5%", icon: "fa-calendar-times" },
];
</script>

<style scoped>
.stats-container {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
}

@media (max-width: 1000px) {
  .stats-container {
    grid-template-columns: repeat(3, 1fr);
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
</style>
