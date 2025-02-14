<template>
  <div class="app">
    <NavBar />
    <main class="content">
      <slot />
    </main>
  </div>
</template>

<script setup>
import NavBar from "@/components/NavBar.vue";
</script>

<style>
* {
  font-family: "Assistant", serif;
  font-optical-sizing: auto;
}

body {
  padding: 0px;
  margin: 0px;
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
  background-color: white;
  flex-grow: 1;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border: 1px solid #ccc;
}
</style>
