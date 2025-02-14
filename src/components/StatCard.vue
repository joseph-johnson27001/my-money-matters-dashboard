<template>
  <div class="stat-card">
    <div class="stat-header">
      <span class="stat-name">{{ name }}</span>
      <i :class="['fa', icon, 'stat-icon']"></i>
      <!-- Use the <i> tag with dynamic icon class -->
    </div>
    <div class="stat-value">
      {{ value }}
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

// Props to accept name, value, and icon class
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
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.stat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stat-name {
  font-size: 14px;
  font-weight: 400;
  color: #0f3659;
}

.stat-icon {
  font-size: 0.8rem;
  color: #006ba6;
  margin-left: 20px;
}

.stat-value {
  font-size: 16px;
  color: #0288d1;
}
</style>
