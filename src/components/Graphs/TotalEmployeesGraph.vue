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
  data() {
    return {
      chartInstance: null,
      isMounted: false, // Track mount state
    };
  },
  mounted() {
    this.isMounted = true; // Set flag when component is mounted
    this.$nextTick(() => {
      this.renderChart();
      window.addEventListener("resize", this.handleResize);
    });
  },
  beforeUnmount() {
    this.isMounted = false; // Set flag when component is unmounted
    window.removeEventListener("resize", this.handleResize);
    this.destroyChart();
  },
  methods: {
    renderChart() {
      // Prevent chart rendering if the component is not mounted or canvas reference is null
      if (!this.isMounted || !this.$refs.totalEmployeesChart) return;

      this.destroyChart(); // Prevents duplicate charts

      this.chartInstance = new ChartJS(this.$refs.totalEmployeesChart, {
        type: "bar",
        data: {
          labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          datasets: [
            {
              label: "Number of Employees",
              data: [50, 55, 50, 55, 60, 55, 60, 65, 65, 70, 85, 70],
              backgroundColor: "rgba(2, 136, 209, 0.2)",
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
      // Ensure chart instance is valid before attempting to destroy
      if (this.chartInstance && this.isMounted) {
        this.chartInstance.destroy();
        this.chartInstance = null;
      }
    },

    handleResize() {
      // Ensure resize is triggered only if the chart instance is valid and the component is mounted
      if (this.chartInstance && this.isMounted) {
        requestAnimationFrame(() => {
          if (this.chartInstance) this.chartInstance.resize();
        });
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
