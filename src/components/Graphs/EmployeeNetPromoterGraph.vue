<template>
  <div class="chart-container">
    <canvas ref="eNpsChart"></canvas>
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
  name: "EmployeeNetPromoterGraph",
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      chartInstance: null,
      isDestroyed: false,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.renderChart();
      window.addEventListener("resize", this.handleResize);
    });
  },
  beforeUnmount() {
    this.isDestroyed = true;
    window.removeEventListener("resize", this.handleResize);
    this.destroyChart();
  },
  watch: {
    data(newData) {
      if (this.chartInstance && Array.isArray(newData)) {
        const eNPDates = newData.map((item) => item.eNPDates);
        const eNPValues = newData.map((item) => item.enpValue);
        this.chartInstance.data.labels = eNPDates;
        this.chartInstance.data.datasets[0].data = eNPValues;
      }
      this.renderChart();
    },
  },
  methods: {
    renderChart() {
      if (this.isDestroyed || !this.$refs.eNpsChart) return;
      this.destroyChart();
      const eNPDates = this.data.map((item) => item.eNPDates);
      const eNPValues = this.data.map((item) => item.enpValue);

      this.chartInstance = new ChartJS(this.$refs.eNpsChart, {
        type: "line",
        data: {
          labels: eNPDates,
          datasets: [
            {
              label: "eNPS Score",
              data: eNPValues,
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
              min: 0,
              max: 100,
              ticks: { stepSize: 20 },
            },
          },
          plugins: {
            title: { display: false },
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (tooltipItem) => `${tooltipItem.raw}`,
              },
            },
          },
        },
      });
    },

    destroyChart() {
      if (this.chartInstance && !this.isDestroyed) {
        this.chartInstance.destroy();
        this.chartInstance = null;
      }
    },

    handleResize() {
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
