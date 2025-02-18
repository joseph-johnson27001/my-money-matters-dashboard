<template>
  <div class="chart-container">
    <canvas ref="totalEmployeesChart"></canvas>
  </div>
</template>

<script>
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  BarController,
} from "chart.js";

ChartJS.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

export default {
  name: "TotalEmployeesChart",
  props: {
    labels: Array, // Pass in months
    counts: Array, // Pass in employee numbers
  },
  data() {
    return {
      chartInstance: null,
      isMounted: false, // Track mount state
    };
  },
  watch: {
    labels: "renderChart",
    counts: "renderChart",
  },
  mounted() {
    this.isMounted = true;
    this.$nextTick(() => {
      this.renderChart();
      window.addEventListener("resize", this.handleResize);
    });
  },
  beforeUnmount() {
    this.isMounted = false;
    window.removeEventListener("resize", this.handleResize);
    this.destroyChart();
  },
  methods: {
    renderChart() {
      // Prevent chart rendering if component is not mounted or canvas is null
      if (!this.isMounted || !this.$refs.totalEmployeesChart) return;

      this.destroyChart(); // Avoid duplicate charts

      this.chartInstance = new ChartJS(this.$refs.totalEmployeesChart, {
        type: "bar",
        data: {
          labels: this.labels || [], // Use dynamic labels
          datasets: [
            {
              label: "Number of Employees",
              data: this.counts || [], // Use dynamic data
              backgroundColor: "rgb(204,231,246)",
              hoverBackgroundColor: "rgba(2, 136, 209)",
              borderColor: "rgba(2, 136, 209)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: { grid: { display: false } },
            y: { grid: { display: true }, ticks: { stepSize: 20 } },
          },
          plugins: {
            title: { display: false },
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (tooltipItem) => `${tooltipItem.raw.toLocaleString()}`,
              },
            },
          },
        },
      });
    },

    destroyChart() {
      if (this.chartInstance) {
        this.chartInstance.destroy();
        this.chartInstance = null;
      }
    },

    handleResize() {
      if (this.chartInstance) {
        requestAnimationFrame(() => this.chartInstance?.resize());
      }
    },
  },
};
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 100%;
  min-height: 250px;
}
canvas {
  width: 100% !important;
  height: 100% !important;
}
</style>
