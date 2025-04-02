<template>
  <div>
    <Card
      :style="cardStyle"
      class="mb-4 shadow-md p-4 min-h-[140px] w-full max-w-[1000px]"
    >
      <template #content>
        <div class="flex justify-between items-start gap-4">
          <div class="flex items-center gap-2 flex-1">
            <Button
              :icon="mostrarDetalhes ? 'pi pi-eye-slash' : 'pi pi-eye'"
              text
              rounded
              class="text-xl mt-1"
              :style="{ color: readonly ? '#d32f2f' : '#388e3c' }"
              @click="toggleDetalhes"
            />
            <span
              class="font-bold text-lg leading-tight break-words"
              :class="{ 'line-through text-gray-500': readonly }"
            >
              {{ todo.title }}
            </span>
          </div>

          <div class="flex gap-2" @click.stop>
            <Button
              v-if="readonly"
              icon="pi pi-undo"
              severity="warning"
              rounded
              text
              @click="emitirVoltar"
            />
            <Button
              v-if="!readonly"
              icon="pi pi-check"
              severity="success"
              rounded
              text
              @click="emitirConcluir"
            />
            <Button
              icon="pi pi-trash"
              severity="danger"
              rounded
              text
              @click="confirmarExclusao"
            />
            <Button
              v-if="!readonly"
              icon="pi pi-pencil"
              severity="info"
              rounded
              text
              @click="abrirModalEdicao"
            />
          </div>
        </div>

        <p
          v-if="mostrarDetalhes && todo.description"
          class="mt-3 text-gray-600 whitespace-pre-wrap break-words"
        >
          {{ todo.description }}
        </p>
      </template>
    </Card>

    <Dialog
      v-model:visible="editando"
      modal
      header="Editar Tarefa"
      :style="{ width: '400px' }"
    >
      <form @submit.prevent="salvarEdicao" class="flex flex-col gap-4">
        <div class="flex flex-col">
          <label for="edit-titulo" class="font-bold mb-1 text-left"
            >Título:</label
          >
          <InputText
            id="edit-titulo"
            v-model="tituloEditado"
            placeholder="Título da tarefa"
            class="w-full"
            required
          />
        </div>

        <div class="flex flex-col">
          <label for="edit-descricao" class="font-bold mb-1 text-left"
            >Descrição:</label
          >
          <Textarea
            id="edit-descricao"
            v-model="descricaoEditada"
            placeholder="Descrição (opcional)"
            autoResize
            rows="3"
            class="w-full"
          />
        </div>

        <div class="flex justify-center gap-4 mt-6">
          <Button
            label="Salvar"
            icon="pi pi-check"
            type="submit"
            class="bg-emerald-500 text-white px-4 py-2 rounded-md hover:bg-emerald-600"
          />
          <Button
            label="Cancelar"
            icon="pi pi-times"
            text
            @click="cancelarEdicao"
            class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          />
        </div>
      </form>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import Card from "primevue/card";
import Textarea from "primevue/textarea";

import { useTarefas } from "../components/composables/useTarefas";
import { useConcluidas } from "../components/composables/useConcluidas";

const props = defineProps({
  todo: Object,
  readonly: Boolean,
});

const mostrarDetalhes = ref(false);
const editando = ref(false);
const tituloEditado = ref("");
const descricaoEditada = ref("");

const tarefas = props.readonly ? useConcluidas() : useTarefas();

function toggleDetalhes() {
  mostrarDetalhes.value = !mostrarDetalhes.value;
}

function emitirConcluir() {
  tarefas.confirmarConclusao?.(props.todo);
}

function confirmarExclusao() {
  tarefas.confirmarExclusao?.(props.todo);
}

function emitirVoltar() {
  tarefas.confirmarVoltar?.(props.todo);
}

function abrirModalEdicao() {
  tituloEditado.value = props.todo.title || "";
  descricaoEditada.value = props.todo.description || "";
  editando.value = true;
}

function cancelarEdicao() {
  editando.value = false;
}

function salvarEdicao() {
  tarefas.confirmarEdicao?.(props.todo, {
    title: tituloEditado.value,
    description: descricaoEditada.value,
  });
  editando.value = false;
}

const cardStyle = computed(() =>
  props.readonly
    ? { backgroundColor: "#fce8e6" }
    : { backgroundColor: "#e6f4ea" }
);
</script>
