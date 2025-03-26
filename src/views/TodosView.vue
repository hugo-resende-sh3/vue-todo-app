<template>
  <div>
    <h1>Tarefas Pendentes</h1>

    <!-- Botão para abrir o modal -->
    <Button
      label="Nova Tarefa"
      icon="pi pi-plus"
      @click="abrirDialog"
      class="mb-3"
    />

    <!-- Dialog com formulário -->
    <Dialog
      v-model:visible="mostrarDialog"
      modal
      header="Adicionar Nova Tarefa"
      :style="{ width: '400px' }"
      @hide="fecharDialog"
    >
      <TodoForm @add-todo="handleAdicionar" />
    </Dialog>

    <!-- Lista de tarefas -->
    <TodoList
      :todos="todos"
      @marcar-concluida="concluirTarefa"
      @excluir="excluirTarefa"
      @editar="editarTarefa"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import TodoForm from "../components/TodoForm.vue";
import TodoList from "../components/TodoList.vue";

import Button from "primevue/button";
import Dialog from "primevue/dialog";

import { nanoid } from 'nanoid'

const todos = ref([]);
const mostrarDialog = ref(false);

function abrirDialog() {
  mostrarDialog.value = true;
}

function fecharDialog() {
  mostrarDialog.value = false;
}

function handleAdicionar(novaTarefa) {
  novaTarefa.id = nanoid();
  addTodo(novaTarefa);
  fecharDialog();
}

function addTodo(novaTarefa) {
  todos.value.push(novaTarefa);
  salvarLocalStorage();
}

function editarTarefa(index, novosDados) {
  todos.value[index].title = novosDados.title;
  todos.value[index].description = novosDados.description;
  salvarLocalStorage();
}

function concluirTarefa(index) {
  const tarefa = todos.value.splice(index, 1)[0];
  tarefa.done = true;

  const concluídas = JSON.parse(localStorage.getItem("concluidas") || "[]");
  concluídas.push(tarefa);
  localStorage.setItem("concluidas", JSON.stringify(concluídas));

  salvarLocalStorage();
}

function excluirTarefa(index) {
  todos.value.splice(index, 1);
  salvarLocalStorage();
}

function salvarLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(todos.value));
}

onMounted(() => {
  const data = localStorage.getItem("todos");
  if (data) {
    todos.value = JSON.parse(data);
  }
});
</script>
