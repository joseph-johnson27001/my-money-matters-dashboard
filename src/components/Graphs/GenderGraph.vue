<template>
  <div class="chart-container">
    <canvas ref="genderChart"></canvas>
  </div>
</template>

<script>
import {
  Chart as ChartJS,
  PieController,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(PieController, ArcElement, Tooltip, Legend);

export default {
  name: "GenderGraph",
  props: {
    genderLabels: {
      type: Array,
      required: true,
    },
    genderCounts: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      chartInstance: null,
      isMounted: false,
      chartColors: [
        "rgba(133, 193, 233, 1)",
        "rgba(236, 112, 99, 1)",
        "rgba(187, 143, 206, 1)",
        "rgba(247, 220, 111, 1)",
      ],
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
      if (!this.isMounted || !this.$refs.genderChart) return;

      this.destroyChart();

      this.chartInstance = new ChartJS(this.$refs.genderChart, {
        type: "pie",
        data: {
          labels: this.genderLabels,
          datasets: [
            {
              label: "Employees",
              data: this.genderCounts,
              backgroundColor: this.chartColors,
              borderColor: "#fff",
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: "right",
            },
            tooltip: {
              callbacks: {
                label: (tooltipItem) =>
                  `${tooltipItem.label}: ${tooltipItem.raw} employees`,
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
  display: flex;
  justify-content: center;
  align-items: center;
}
canvas {
  width: 100% !important;
  height: 100% !important;
}
</style>
