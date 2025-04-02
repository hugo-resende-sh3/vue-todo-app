<template>
  <div>
    <h1 class="page-title">Tarefas Pendentes</h1>

    <Button label="Nova Tarefa" icon="pi pi-plus" @click="abrirDialog" class="mb-3" />

    <Dialog
      v-model:visible="mostrarDialog"
      modal
      header="Adicionar Nova Tarefa"
      :style="{ width: '400px' }"
      @hide="fecharDialog"
    >
      <TodoForm :onCancel="fecharDialog" />
    </Dialog>

    <div class="spacer"></div>

    <TodoList :todos="todos" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { todos } from '../stores/tarefasStore'
import TodoForm from '../components/TodoForm.vue';
import TodoList from '../components/TodoList.vue';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';

const mostrarDialog = ref(false);

function abrirDialog() {
  mostrarDialog.value = true;
}

function fecharDialog() {
  mostrarDialog.value = false;
}

</script>

