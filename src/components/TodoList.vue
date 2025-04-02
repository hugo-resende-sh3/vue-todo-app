<template>
  <draggable
    :list="todos"
    item-key="id"
    tag="div"
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 w-full"
    :animation="200"
    ghost-class="drag-ghost"
    chosen-class="drag-chosen"
  >
    <template #item="{ element }">
      <TodoItem :todo="element" :readonly="readonly" />
    </template>
  </draggable>
</template>

<script setup>
import TodoItem from "./TodoItem.vue";
import draggable from "vuedraggable";

defineProps({
  todos: Array,
  readonly: Boolean,
});
</script>

<style scoped>
.drag-chosen {
  opacity: 0.8;
  transform: scale(1.02);
  transition: all 0.2s ease;
}

.drag-ghost {
  opacity: 0;
}
</style>
