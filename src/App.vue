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
  background-color: #f9f9f9;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
}

.content {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  background-color: #f9f9f9;
  flex-grow: 1;
  padding: 20px;
  box-sizing: border-box;
}
</style>
