<template>
  <div :class="pageBackground">
    <nav class="flex justify-center gap-8 p-4 border-b border-gray-300 shadow-sm">
      <RouterLink
        to="/todos"
        class="font-semibold text-lg transition-colors duration-200"
        :class="[
          isCompletedPage ? 'text-gray-400' : 'text-emerald-600',
          route.path === '/todos' && !isCompletedPage ? 'border-b-2 border-emerald-600 pb-1' : ''
        ]"
      >
        📝 Pendentes
      </RouterLink>

      <RouterLink
        to="/completed"
        class="font-semibold text-lg transition-colors duration-200"
        :class="[
          isCompletedPage ? 'text-red-600' : 'text-gray-400',
          route.path === '/completed' && isCompletedPage ? 'border-b-2 border-red-600 pb-1' : ''
        ]"
      >
        ✅ Concluídas
      </RouterLink>
    </nav>

    <main class="w-full px-6 py-6">
      <RouterView />
    </main>

    <Toast />
    <ConfirmDialog />
  </div>
</template>

<script setup>
import { RouterLink, RouterView, useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();
const isCompletedPage = computed(() => route.path.includes("/completed"));

const pageBackground = computed(() =>
  isCompletedPage.value ? "bg-red-50 min-h-screen" : "bg-emerald-50 min-h-screen"
);
</script>
