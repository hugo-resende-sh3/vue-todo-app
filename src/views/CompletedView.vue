<script setup>
import TodoList from "../components/TodoList.vue"
import { concluidas } from '../stores/tarefasStore'

</script>

<template>
  <div>
    <h1 class="page-title">Tarefas Concluídas</h1>

    <TodoList
      :todos="concluidas"
      :readonly="true"
    />
  </div>
</template>

<style scoped>
.page-title {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #d32f2f;
  font-weight: bold;
}
</style>
