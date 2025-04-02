<template>
  <form @submit.prevent="handleSubmit" class="todo-form">
    <div class="form-group">
      <label for="titulo">Título:</label>
      <InputText
        id="titulo"
        v-model="title"
        placeholder="Título da tarefa"
        required
        class="w-full"
      />
    </div>

    <div class="form-group">
      <label for="descricao">Descrição:</label>
      <Textarea
        id="descricao"
        v-model="description"
        placeholder="Descrição da tarefa (opcional)" 
        rows="3"
        autoResize
        class="w-full"
      />
    </div>

    <div class="form-actions">
      <Button label="Adicionar" icon="pi pi-plus" type="submit" />
      <Button label="Cancelar" icon="pi pi-times" text @click="cancelar" />
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Textarea from 'primevue/textarea'

import { useTarefas } from '../components/composables/useTarefas'

const props = defineProps({
  onCancel: Function
})

const { adicionarNovaTarefa } = useTarefas()

const title = ref('')
const description = ref('')

function handleSubmit() {
  if (!title.value.trim()) return

  adicionarNovaTarefa({
    title: title.value,
    description: description.value
  })

  title.value = ''
  description.value = ''

  if (props.onCancel) props.onCancel()
}

function cancelar() {
  if (props.onCancel) props.onCancel()
}
</script>

<style scoped>
.todo-form {
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 0.25rem;
  font-weight: bold;
  text-align: left;
}

.form-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
}
</style>
