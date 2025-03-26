<template>
  <draggable
    :list="todos"
    item-key="title"
    tag="div"
    class="card-grid"
    :animation="200"
    ghost-class="drag-ghost"
    chosen-class="drag-chosen"
  >
    <template #item="{ element, index }">
      <TodoItem
        :todo="element"
        :readonly="readonly"
        @marcar-concluida="marcarConcluida(index)"
        @excluir="excluir(index)"
        @editar="editar(index, $event)"
        @voltar="voltar(index)"
      />
    </template>
  </draggable>
</template>

<script setup>
import TodoItem from "./TodoItem.vue";
import draggable from "vuedraggable";

const props = defineProps({
  todos: Array,
  readonly: Boolean,
});

const emit = defineEmits(["marcar-concluida", "excluir", "editar", "voltar"]);

function marcarConcluida(index) {
  emit("marcar-concluida", index);
}
function excluir(index) {
  emit("excluir", index);
}
function editar(index, dados) {
  emit("editar", index, dados);
}
function voltar(index) {
  emit("voltar", index);
}
</script>

<style scoped>
.card-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.card-grid > * {
  flex: 0 0 calc(33.33% - 1rem);
}

.drag-chosen {
  opacity: 0.8;
  transform: scale(1.02);
  transition: all 0.2s ease;
}

.drag-ghost {
  opacity: 0;
}
</style>
