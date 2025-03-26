<template>
  <form @submit.prevent="handleSubmit" class="todo-form">
    <div class="field">
      <InputText
        v-model="title"
        placeholder="Título da tarefa"
        required
        class="w-full"
      />
    </div>

    <div class="field">
      <InputText
        v-model="description"
        placeholder="Descrição (opcional)"
        class="w-full"
      />
    </div>

    <Button label="Adicionar" icon="pi pi-plus" type="submit" />
  </form>
</template>

<script setup>
import { ref } from "vue";

// IMPORTS CORRETOS para PrimeVue 3.x
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'


const title = ref("");
const description = ref("");

const emit = defineEmits(["add-todo"]);

function handleSubmit() {
  if (!title.value.trim()) return;

  emit("add-todo", {
    
    title: title.value,
    description: description.value,
    done: false,
  });

  title.value = "";
  description.value = "";
}
</script>

<style scoped>
.todo-form {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.field {
  flex: 1;
  min-width: 200px;
}
</style>
