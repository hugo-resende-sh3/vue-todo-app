<template>
  <form
    @submit.prevent="handleSubmit"
    class="bg-white rounded-2xl shadow-lg p-6 max-w-md mx-auto flex flex-col gap-5 border border-emerald-200"
  >
    <h2 class="text-xl font-bold text-emerald-700 flex items-center gap-2">
      <i class="pi pi-pencil"></i>
      Nova Tarefa
    </h2>

    <div class="flex flex-col">
      <label for="titulo" class="mb-1 font-semibold text-gray-700">Título:</label>
      <InputText
        id="titulo"
        v-model="title"
        placeholder="Título da tarefa"
        required
        class="w-full"
      />
    </div>

    <div class="flex flex-col">
      <label for="descricao" class="mb-1 font-semibold text-gray-700">Descrição:</label>
      <Textarea
        id="descricao"
        v-model="description"
        placeholder="Descrição da tarefa (opcional)"
        rows="3"
        autoResize
        class="w-full"
      />
    </div>

    <div class="flex justify-center gap-4 pt-2">
      <button
        type="submit"
        class="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-semibold"
      >
        <i class="pi pi-plus mr-2"></i>
        Adicionar
      </button>
      <button
        type="button"
        @click="cancelar"
        class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold"
      >
        <i class="pi pi-times mr-2"></i>
        Cancelar
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import { useTarefas } from '../components/composables/useTarefas'

const props = defineProps({ onCancel: Function })

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
