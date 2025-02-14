<template>
  <nav class="navbar">
    <div class="nav-content">
      <img
        src="/my-money-matters-logo.png"
        alt="My Money Matters Logo"
        class="logo"
      />
      <i class="fas fa-bars menu-icon"></i>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  width: 100%;
  background-color: #391474;
  height: 35px;
  display: flex;
  justify-content: center;
  margin: 0 auto;
  padding: 10px 0px;
}

.nav-content {
  max-width: 1400px;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 20px;
  color: white;
  justify-content: space-between;
  box-sizing: border-box;
}

.logo {
  max-height: 35px;
  height: auto;
  width: auto;
}

.menu-icon {
  font-size: 22px;
  color: white;
  cursor: pointer;
}
</style>
