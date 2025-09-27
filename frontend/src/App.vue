<script setup lang="ts">
// Root layout — wired to router and pinia in main.ts
</script>

<template>
  <div>
    <header>
      <nav>
        <router-link to="/">Home</router-link>
        |
        <router-link to="/about">About</router-link>
        |
        <router-link to="/main">Main</router-link>
      </nav>
    </header>

    <main>
      <router-view />
    </main>
  </div>
</template>

<style scoped>
header {
  padding: 1rem;
  background: #f6f8fa;
}
nav a {
  margin-right: 0.5rem;
  color: #42b883;
  text-decoration: none;
}
main {
  padding: 1rem;
}
</style>
