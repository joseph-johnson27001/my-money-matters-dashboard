<template>
  <div class="app">
    <NavBar />
    <main class="content">
      <Dashboard />
    </main>
  </div>
</template>

<script setup>
import NavBar from "@/components/NavBar.vue";
import Dashboard from "@/views/DashboardPage.vue";
</script>

<style>
* {
  font-family: "Assistant", serif;
  font-optical-sizing: auto;
}

body {
  padding: 0;
  margin: 0;
}

.app {
  background-color: #f4f4f4;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
}

.content {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  background-color: #fbfbfb;
  flex-grow: 1;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border: 1px solid #ccc;
  padding: 20px;
  box-sizing: border-box;
}
</style>
