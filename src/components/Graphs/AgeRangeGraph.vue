<template>
  <div class="chart-container">
    <canvas ref="ageRangeChart"></canvas>
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
  name: "AgeRangeGraph",
  data() {
    return {
      chartInstance: null,
      isMounted: false,
      ageRanges: [
        "18-21",
        "22-24",
        "25-29",
        "30-34",
        "35-39",
        "40-44",
        "45-49",
        "50-54",
        "55-59",
        "60-64",
        "65-69",
        "70+",
      ],
      employeeCounts: [8, 7, 20, 22, 15, 15, 12, 13, 7, 5, 3, 2],
    };
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
      if (!this.isMounted || !this.$refs.ageRangeChart) return;

      this.destroyChart();

      this.chartInstance = new ChartJS(this.$refs.ageRangeChart, {
        type: "bar",
        data: {
          labels: this.ageRanges,
          datasets: [
            {
              label: "Employees",
              data: this.employeeCounts,
              backgroundColor: "rgb(255,224,230)",
              borderColor: "rgb(255, 99, 132)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: { grid: { display: false } },
            y: { grid: { display: true }, ticks: { stepSize: 5 } },
          },
          plugins: {
            title: { display: false },
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (tooltipItem) => `Employees: ${tooltipItem.raw}`,
              },
            },
          },
        },
      });
    },

    destroyChart() {
      if (this.chartInstance && this.isMounted) {
        this.chartInstance.destroy();
        this.chartInstance = null;
      }
    },

    handleResize() {
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
