<template>
  <div class="stat-card">
    <div class="stat-header">
      <span class="stat-name">{{ name }}</span>
      <i :class="['fa', icon, 'stat-icon']"></i>
    </div>
    <div class="stat-value">
      {{ value }}
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  name: String,
  value: [String, Number],
  icon: String,
});
</script>

<style scoped>
.stat-card {
  background-color: white;
  border-radius: 4px;
  border: 1px solid #ccc;
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
  justify-content: space-between;
}

.stat-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.stat-name {
  font-size: 15px;
  font-weight: 400;
  color: #0f3659;
}

.stat-icon {
  font-size: 1rem;
  color: #006ba6;
  margin-left: 5px;
}

.stat-value {
  font-size: 16px;
  color: #0288d1;
  display: flex;
  align-self: flex-start;
}
</style>
