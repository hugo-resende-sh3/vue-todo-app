<template>
  <div>
    <nav>
      <RouterLink to="/todos">Tarefas Pendentes</RouterLink> |
      <RouterLink to="/completed">Tarefas Concluídas</RouterLink>
    </nav>

    <RouterView />
    <Toast />
    <ConfirmDialog />
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<style>
nav {
  padding: 1rem;
  background: #f4f4f4;
  text-align: center;
  margin-bottom: 2rem;
}

nav a {
  margin: 0 10px;
  font-weight: bold;
  text-decoration: none;
  color: #42b983;
}

nav a.router-link-exact-active {
  color: #35495e;
}
</style>
