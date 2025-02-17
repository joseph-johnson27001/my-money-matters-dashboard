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
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      chartInstance: null,
      isMounted: false,
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
  watch: {
    data(newData) {
      if (this.chartInstance && Array.isArray(newData)) {
        const ageRanges = newData.map((item) => item.ageRange);
        const employeeCounts = newData.map((item) => item.count);
        this.chartInstance.data.labels = ageRanges;
        this.chartInstance.data.datasets[0].data = employeeCounts;
      }
      // Re-render chart
      this.renderChart();
    },
  },
  methods: {
    renderChart() {
      if (!this.isMounted || !this.$refs.ageRangeChart) return;

      this.destroyChart();

      const ageRanges = this.data.map((item) => item.ageRange);
      const employeeCounts = this.data.map((item) => item.count);

      this.chartInstance = new ChartJS(this.$refs.ageRangeChart, {
        type: "bar",
        data: {
          labels: ageRanges,
          datasets: [
            {
              label: "Employees",
              data: employeeCounts,
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
            y: { grid: { display: true } },
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
