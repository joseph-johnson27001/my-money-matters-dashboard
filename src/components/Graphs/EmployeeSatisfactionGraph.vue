<template>
  <div class="chart-container">
    <canvas ref="satisfactionChart"></canvas>
  </div>
</template>

<script>
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  LineController,
} from "chart.js";

ChartJS.register(
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

export default {
  name: "SatisfactionGraph",
  data() {
    return {
      chartInstance: null,
      isDestroyed: false, // Track destruction state
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.renderChart();
      window.addEventListener("resize", this.handleResize);
    });
  },
  beforeUnmount() {
    this.isDestroyed = true; // Set flag when component is unmounted
    window.removeEventListener("resize", this.handleResize);
    this.destroyChart();
  },
  methods: {
    renderChart() {
      // Check if the component is destroyed or if the chart reference is invalid
      if (this.isDestroyed || !this.$refs.satisfactionChart) return;
      this.destroyChart(); // Prevents duplicate charts
      this.chartInstance = new ChartJS(this.$refs.satisfactionChart, {
        type: "line",
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
              label: "Employee Satisfaction (%)",
              data: [85, 88, 82, 90, 87, 89, 92, 91, 85, 87, 89, 92],
              fill: false,
              borderColor: "#0288d1",
              tension: 0.2,
              borderWidth: 2,
              pointBackgroundColor: "#0288d1",
              pointBorderColor: "#fff",
              pointBorderWidth: 2,
              pointRadius: 5,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: { grid: { display: false } },
            y: {
              grid: { display: true },
              min: 70,
              max: 100,
              ticks: { stepSize: 5 },
            },
          },
          plugins: {
            title: { display: false },
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (tooltipItem) => `${tooltipItem.raw}%`,
              },
            },
          },
        },
      });
    },

    destroyChart() {
      // Ensure that the chart instance is valid before attempting to destroy
      if (this.chartInstance && !this.isDestroyed) {
        this.chartInstance.destroy();
        this.chartInstance = null;
      }
    },

    handleResize() {
      // Ensure resize is triggered only if the chart instance is valid
      if (this.chartInstance && !this.isDestroyed) {
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
