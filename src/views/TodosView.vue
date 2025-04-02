<script setup>
import { ref } from "vue";
import { todos } from "../stores/tarefasStore";
import TodoForm from "../components/TodoForm.vue";
import TodoList from "../components/TodoList.vue";
import Button from "primevue/button";
import Dialog from "primevue/dialog";

const mostrarDialog = ref(false);

function abrirDialog() {
  mostrarDialog.value = true;
}

function fecharDialog() {
  mostrarDialog.value = false;
}
</script>

<template>
  <div>
    <h1
      class="text-3xl font-bold text-emerald-700 mb-6 text-center flex items-center justify-center gap-2"
    >
      <i class="pi pi-check-circle text-emerald-500 text-2xl"></i>
      Lista de tarefas pendentes ✍️
    </h1>

    <div class="flex justify-center mb-6">
      <Button
        label="Nova Tarefa"
        icon="pi pi-plus"
        severity="success"
        @click="abrirDialog"
        class="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 text-lg font-semibold rounded-full shadow-md transition duration-200"
      />
    </div>

    <Dialog
      v-model:visible="mostrarDialog"
      modal
      header="Adicionar Nova Tarefa"
      :style="{ width: '400px' }"
      @hide="fecharDialog"
    >
      <TodoForm :onCancel="fecharDialog" />
    </Dialog>

    <TodoList :todos="todos" />
  </div>
</template>
