<template>
  <div>
    <h1>Tarefas Concluídas</h1>

    <TodoList
      :todos="concluidas"
      :readonly="true"
      @excluir="excluirConcluida"
      @voltar="voltarParaPendentes"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import TodoList from "../components/TodoList.vue";

const concluidas = ref([]);

onMounted(() => {
  const data = localStorage.getItem("concluidas");
  if (data) {
    concluidas.value = JSON.parse(data);
  }
});

function excluirConcluida(index) {
  concluidas.value.splice(index, 1);
  localStorage.setItem("concluidas", JSON.stringify(concluidas.value));
}

function voltarParaPendentes(index) {
  const tarefa = concluidas.value[index];

  concluidas.value.splice(index, 1);

  tarefa.done = false;

  const pendentes = JSON.parse(localStorage.getItem("todos") || "[]");
  pendentes.push(tarefa);
  localStorage.setItem("todos", JSON.stringify(pendentes));

  localStorage.setItem("concluidas", JSON.stringify(concluidas.value));
}
</script>
