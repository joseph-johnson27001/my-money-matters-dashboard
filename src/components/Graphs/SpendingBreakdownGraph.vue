<template>
  <div class="chart-container">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script>
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

export default {
  name: "SpendingBreakdownGraph",
  data() {
    return {
      chartInstance: null,
      isMounted: false, // Flag to track if the component is mounted
    };
  },
  mounted() {
    this.isMounted = true; // Set flag when the component is mounted
    this.$nextTick(() => {
      this.renderChart();
      window.addEventListener("resize", this.handleResize);
    });
  },
  beforeUnmount() {
    this.isMounted = false; // Set flag when the component is unmounted
    window.removeEventListener("resize", this.handleResize);
    this.destroyChart();
  },
  methods: {
    renderChart() {
      // Prevent rendering if the component is not mounted
      if (!this.isMounted) return;

      this.destroyChart(); // Prevents duplicate charts

      if (!this.$refs.chartCanvas) return; // Prevents null reference errors

      this.chartInstance = new Chart(this.$refs.chartCanvas, {
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
              label: "Salaries",
              data: [40, 42, 39, 45, 50, 46, 48, 49, 52, 53, 54, 55],
              backgroundColor: "rgb(255,224,230)",
              borderColor: "rgb(255, 99, 132)",
              borderWidth: 1,
            },
            {
              label: "Benefits",
              data: [15, 17, 16, 18, 20, 19, 21, 20, 22, 23, 24, 25],
              backgroundColor: "#ffecd9",
              borderColor: "rgb(255, 159, 64)",
              borderWidth: 1,
            },
            {
              label: "Training",
              data: [12, 13, 14, 15, 14, 13, 14, 15, 16, 17, 18, 19],
              backgroundColor: "#dbf2f2",
              borderColor: "rgb(75, 192, 192)",
              borderWidth: 1,
            },
            {
              label: "Recruitment",
              data: [8, 9, 7, 10, 8, 9, 8, 10, 9, 9, 8, 9],
              backgroundColor: "#d7ecfb",
              borderColor: "rgb(54, 162, 235)",
              borderWidth: 1,
            },
            {
              label: "Operations",
              data: [10, 11, 9, 12, 11, 12, 10, 11, 12, 13, 14, 15],
              backgroundColor: "#ebe0ff",
              borderColor: "rgb(153, 102, 255)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: { grid: { display: true }, stacked: true },
            y: {
              stacked: true,
              grid: { display: false },
              ticks: { stepSize: 20 },
            },
          },
          plugins: {
            legend: {
              display: false,
              position: "top",
              labels: { padding: 20 },
            },

            tooltip: {
              callbacks: {
                label: (tooltipItem) =>
                  `${tooltipItem.dataset.label}: ${tooltipItem.raw}%`,
              },
            },
          },
        },
      });
    },
    destroyChart() {
      // Ensure chart instance is valid before destroying
      if (this.chartInstance && this.isMounted) {
        this.chartInstance.destroy();
        this.chartInstance = null;
      }
    },
    handleResize() {
      // Ensure resize is triggered only if chart instance is valid
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
