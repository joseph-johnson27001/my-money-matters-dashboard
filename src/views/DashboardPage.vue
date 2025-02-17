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
        />
      </div>

      <!-- Graphs Section -->
      <div class="graphs-container">
        <GraphCard title="Total Employees">
          <TotalEmployeesGraph
            :labels="totalEmployeesLabels"
            :counts="totalEmployeesCounts"
          />
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
          <EmployeeSatisfactionGraph
            :satisfactionData="employeeSatisfactionGraphData"
          />
        </GraphCard>
        <GraphCard title="Employee Age Range">
          <AgeRangeGraph :data="ageRangeGraphData" />
        </GraphCard>
        <GraphCard title="Employee Gender Breakdown">
          <!-- Pass genderLabels and genderCounts as props -->
          <GenderGraph
            :genderLabels="genderLabels"
            :genderCounts="genderCounts"
          />
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
  },
  {
    name: "New Hires This Month",
    value: "",
    icon: "fa-user-plus",
  },
  {
    name: "Employee Turnover Rate",
    value: "",
    icon: "fa-user-minus",
  },
  {
    name: "Total Monthly Payroll",
    value: "",
    icon: "fa-dollar-sign",
  },
  {
    name: "Employee Satisfaction",
    value: "",
    icon: "fa-smile",
  },
  {
    name: "Absenteeism Rate",
    value: "",
    icon: "fa-calendar-times",
  },
  {
    name: "Roles Currently Recruiting",
    value: "",
    icon: "fa-briefcase",
  },
  {
    name: "Retention Rate",
    value: "",
    icon: "fa-handshake",
  },
]);

const ageRangeGraphData = ref([]);
const eNPGraphData = ref([]);
const employeePerformanceGraphData = ref([]);
const employeeSatisfactionGraphData = ref({});
const genderLabels = ref([]);
const genderCounts = ref([]);
const totalEmployeesLabels = ref([]);
const totalEmployeesCounts = ref([]);

const loadData = async () => {
  try {
    const {
      statsData,
      ageRangeData,
      eNPData,
      employeePerformanceData,
      employeeSatisfactionData,
      genderData,
      TotalEmployeeData,
    } = await fetchDashboardData();

    // Filter out empty or blank values for statsData, ageRangeData, eNPData, employeePerformanceData, and employeeSatisfactionData
    stats.value = stats.value.map((stat, index) => {
      const updatedStat = statsData[index];
      return {
        ...stat,
        value: updatedStat?.value || stat.value,
        name: updatedStat?.name || stat.name,
      };
    });

    // Filter out entries with blank labels or counts
    const filteredGenderData = genderData.filter(
      (item) => item.genderlabels && item.genderCounts
    );

    genderLabels.value = filteredGenderData.map((item) => item.genderlabels);
    genderCounts.value = filteredGenderData.map((item) => item.genderCounts);

    // Filter out any entries that have empty values in other datasets
    ageRangeGraphData.value = ageRangeData.filter(
      (item) => item.ageRange && item.count
    );
    eNPGraphData.value = eNPData.filter(
      (item) => item.eNPDates && item.enpValue
    );
    employeePerformanceGraphData.value = employeePerformanceData
      .filter((item) => item.employeePerformanceScores)
      .map((item) => parseFloat(item.employeePerformanceScores));
    employeeSatisfactionGraphData.value = employeeSatisfactionData.filter(
      (item) =>
        item.employeeSatisfactionDates && item.employeeSatisfactionScores
    );
    const filteredTotalEmployeeData = TotalEmployeeData.filter(
      (item) => item.totalEmployeesLabels && item.totalEmployeesCounts !== null
    );

    totalEmployeesLabels.value = filteredTotalEmployeeData.map(
      (item) => item.totalEmployeesLabels
    );
    totalEmployeesCounts.value = filteredTotalEmployeeData.map(
      (item) => item.totalEmployeesCounts
    );

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
