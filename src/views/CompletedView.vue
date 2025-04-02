<script setup>
import TodoList from "../components/TodoList.vue"
import { concluidas } from '../stores/tarefasStore'
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold text-red-600 mb-6 text-center flex items-center justify-center gap-2">
      <i class="pi pi-check text-red-500 text-2xl"></i>
      Tarefas já realizadas
    </h1>

    <TodoList :todos="concluidas" :readonly="true" />
  </div>
</template>
