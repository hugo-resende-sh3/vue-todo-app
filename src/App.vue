<template>
  <div>
    <nav :class="['main-nav', isCompletedPage ? 'completed' : 'pendentes']">
      <RouterLink to="/todos" class="nav-link" exact-active-class="active-link">
        📝 Pendentes
      </RouterLink>
      <RouterLink
        to="/completed"
        class="nav-link"
        exact-active-class="active-link"
      >
        ✅ Concluídas
      </RouterLink>
    </nav>

    <RouterView />
    <Toast />
    <ConfirmDialog />
  </div>
</template>

<script setup>
import { RouterLink, RouterView, useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();

const isCompletedPage = computed(() => route.path.includes("/completed"));
</script>

<style>
.main-nav {
  padding: 1rem;
  display: flex;
  justify-content: center;
  gap: 2rem;
  border-bottom: 2px solid #ccc;
  margin-bottom: 2rem;
  transition: background-color 0.3s ease;
}

.main-nav.pendentes {
  background-color: #e0f2f1; /* verdinho claro */
}

.main-nav.completed {
  background-color: #fce8e6; /* vermelhinho claro */
}

.nav-link {
  font-weight: bold;
  text-decoration: none;
  font-size: 1.1rem;
  transition: color 0.2s;
  color: #2e7d32;
}

.main-nav.completed .nav-link {
  color: #c62828;
}

.nav-link:hover {
  text-decoration: underline;
}

.active-link {
  border-bottom: 2px solid currentColor;
  padding-bottom: 0.2rem;
}
</style>
