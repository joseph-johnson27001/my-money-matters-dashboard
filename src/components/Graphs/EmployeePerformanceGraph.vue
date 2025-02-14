<template>
  <div class="chart-container">
    <canvas ref="performanceRangeChart"></canvas>
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
  name: "PerformanceRangeChart",
  data() {
    return {
      chartInstance: null,
      isMounted: false, // Track mount state
      performanceScores: [
        0.5, 2.5, 3.8, 4.5, 1.2, 3.1, 6.7, 8.9, 2.3, 5.4, 6.1, 7.5, 8.0, 4.3,
        3.9,
      ],
      scoreRanges: ["8-10", "6-8", "4-6", "2-4", "0-2"],
      chartData: {
        labels: [],
        datasets: [
          {
            label: "Number of Employees",
            data: [],
            borderColor: "rgba(34, 139, 34, 1)",
            backgroundColor: "rgba(34, 139, 34, 0.2)",
            borderWidth: 1,
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: "y",
        scales: {
          x: {
            title: {
              display: true,
              text: "Number of Employees",
            },
            ticks: {
              beginAtZero: true,
              stepSize: 1,
            },
          },
          y: {
            title: {
              display: true,
              text: "Score Range",
            },
          },
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
    };
  },
  mounted() {
    this.isMounted = true; // Set flag when component is mounted
    this.$nextTick(() => {
      this.prepareChartData();
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
    prepareChartData() {
      const frequency = Array(this.scoreRanges.length).fill(0);
      this.performanceScores.forEach((score) => {
        if (score >= 0 && score < 2) frequency[4]++;
        else if (score >= 2 && score < 4) frequency[3]++;
        else if (score >= 4 && score < 6) frequency[2]++;
        else if (score >= 6 && score < 8) frequency[1]++;
        else if (score >= 8 && score <= 10) frequency[0]++;
      });

      this.chartData.labels = this.scoreRanges;
      this.chartData.datasets[0].data = frequency;
    },

    renderChart() {
      // Prevent chart rendering if the component is not mounted or if the canvas reference is invalid
      if (!this.isMounted || !this.$refs.performanceRangeChart) return;

      this.destroyChart(); // Prevents duplicate charts

      this.chartInstance = new ChartJS(this.$refs.performanceRangeChart, {
        type: "bar",
        data: this.chartData,
        options: this.chartOptions,
      });
    },

    destroyChart() {
      // Ensure that the chart instance is valid before attempting to destroy
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
