<template>
  <div>
    <Card class="task-card" :style="cardStyle">
      <template #content>
        <div class="task-header">
          <div class="title-area">
            <Button
              :icon="mostrarDetalhes ? 'pi pi-eye-slash' : 'pi pi-eye'"
              class="toggle-btn"
              text
              rounded
              :style="{ color: readonly ? '#d32f2f' : '#388e3c' }"
              @click="toggleDetalhes"
            />
            <span class="titulo" :class="{ riscado: readonly }">
              {{ todo.title }}
            </span>
          </div>

          <div class="actions" @click.stop>
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

        <p v-if="mostrarDetalhes && todo.description" class="task-description">
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
      <div class="edit-form">
        <div class="form-group">
          <label for="edit-titulo">Título:</label>
          <InputText id="edit-titulo" v-model="tituloEditado" class="w-full" />
        </div>

        <div class="form-group">
          <label for="edit-descricao">Descrição:</label>
          <Textarea
            id="edit-descricao"
            v-model="descricaoEditada"
            autoResize
            rows="3"
            class="w-full"
          />
        </div>
      </div>

      <div class="form-actions">
        <Button label="Adicionar" icon="pi pi-plus" @click="salvarEdicao" />
        <Button
          label="Cancelar"
          icon="pi pi-times"
          text
          @click="cancelarEdicao"
        />
      </div>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import Card from "primevue/card";
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";
import { nextTick } from "vue";
import Textarea from "primevue/textarea";

const toast = useToast();
const confirm = useConfirm();

const props = defineProps({
  todo: Object,
  readonly: Boolean,
});

const mostrarDetalhes = ref(false);
const editando = ref(false);
const tituloEditado = ref("");
const descricaoEditada = ref("");

function toggleDetalhes() {
  mostrarDetalhes.value = !mostrarDetalhes.value;
}

function emitirConcluir() {
  confirm.require({
    message: "Deseja concluir esta tarefa?",
    header: "Confirmação",
    icon: "pi pi-check-circle",
    acceptLabel: "Sim",
    rejectLabel: "Cancelar",
    accept: () => {
      emit("marcar-concluida");
      toast.add({
        severity: "success",
        summary: "Tarefa concluída",
        life: 3000,
      });
    },
  });
}

function confirmarExclusao() {
  confirm.require({
    message: "Tem certeza que deseja excluir?",
    header: "Excluir Tarefa",
    icon: "pi pi-exclamation-triangle",
    acceptLabel: "Sim",
    rejectLabel: "Cancelar",
    accept: () => {
      emit("excluir");
      toast.add({
        severity: "warn",
        summary: "Tarefa excluída",
        life: 3000,
      });
    },
  });
}

function emitirVoltar() {
  confirm.require({
    message: "Deseja mover a tarefa para pendentes?",
    header: "Confirmar Ação",
    icon: "pi pi-question-circle",
    acceptLabel: "Sim",
    rejectLabel: "Cancelar",
    accept: () => {
      toast.add({
        severity: "success",
        summary: "Tarefa movida",
        life: 3000,
      });
      nextTick(() => {
        emit("voltar");
      });
    },
  });
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
  emit("editar", {
    title: tituloEditado.value,
    description: descricaoEditada.value,
  });
  editando.value = false;
  toast.add({
    severity: "success",
    summary: "Tarefa adicionada com sucesso",
    life: 3000,
  });
}

const cardStyle = computed(() =>
  props.readonly
    ? { backgroundColor: "#fce8e6" }
    : { backgroundColor: "#e6f4ea" }
);

const emit = defineEmits(["marcar-concluida", "excluir", "editar", "voltar"]);
</script>

<style scoped>
.riscado {
  text-decoration: line-through;
  color: #888;
}

.task-card {
  margin-bottom: 1rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  padding: 1rem;
  min-height: 140px;
  width: 100%;
  max-width: 1000px; /* define limite de largura */
}

.task-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
}

.title-area {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  flex: 1;
}

.titulo {
  font-weight: bold;
  font-size: 1.1rem;
  line-height: 1.4;
  word-break: break-word;
}

.actions {
  display: flex;
  gap: 0.3rem;
}

.task-description {
  margin-top: 0.75rem;
  color: #555;
  white-space: pre-wrap;
  word-break: break-word;
}

.toggle-btn {
  font-size: 1.2rem;
  margin-top: 0.1rem;
}

.modal-body {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.edit-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.label {
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
