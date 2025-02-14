<template>
  <div class="graph-card">
    <h3 class="graph-card-title">{{ title }}</h3>
    <div class="chart-container">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "graphCard",
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.graph-card {
  background-color: white;
  border-radius: 5px;
  padding: 10px 20px 20px 20px;
  border: 1px solid #ccc;
  box-shadow: rgba(0, 0, 0, 0.04) 0px 1px 4px;
  display: flex;
  flex-direction: column;
  max-height: 300px;
}

.chart-container {
  flex: 1;
  min-height: 200px;
  width: 100%;
}

.graph-card-title {
  font-size: 14px;
  font-weight: 400;
  padding-bottom: 10px;
  color: #0f3659;
}

@media (max-width: 400px) {
  .graph-card {
    padding: 20px 10px;
  }
}
</style>
