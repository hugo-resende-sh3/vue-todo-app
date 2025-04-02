import { nanoid } from "nanoid";
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";
import { todos, concluidas } from "../../stores/tarefasStore";

carregar();

function carregar() {
  if (!todos.value.length) {
    const data = localStorage.getItem("todos");
    if (data) {
      todos.value = JSON.parse(data);
    }
  }
}

export function useTarefas() {
  const toast = useToast();
  const confirm = useConfirm();

  function salvar() {
    localStorage.setItem("todos", JSON.stringify(todos.value));
    todos.value = [...todos.value];
  }

  function adicionarNovaTarefa(dados, onFinalizado = null) {
    const tarefa = {
      id: nanoid(),
      title: dados.title,
      description: dados.description,
      done: false,
    };
    todos.value.push(tarefa);
    salvar();

    toast.add({
      severity: "success",
      summary: "Tarefa adicionada!",
      detail: tarefa.title,
      life: 3000,
    });

    if (onFinalizado) onFinalizado();
  }

  function editarTarefa(index, novosDados) {
    todos.value[index] = {
      ...todos.value[index],
      ...novosDados,
    };
    salvar();
  }

  function confirmarEdicao(tarefa, novosDados) {
    const index = todos.value.findIndex((t) => t.id === tarefa.id);
    if (index !== -1) {
      editarTarefa(index, novosDados);

      toast.add({
        severity: "success",
        summary: "Tarefa salva com sucesso",
        life: 3000,
      });
    }
  }

  function concluirTarefa(index) {
    const tarefa = todos.value.splice(index, 1)[0];
    tarefa.done = true;

    concluidas.value.push(tarefa);
    localStorage.setItem("concluidas", JSON.stringify(concluidas));

    salvar();

    toast.add({
      severity: "success",
      summary: "Tarefa concluída",
      detail: tarefa.title,
      life: 3000,
    });
  }

  function confirmarConclusao(tarefa) {
    confirm.require({
      message: "Deseja concluir esta tarefa?",
      header: "Confirmação",
      icon: "pi pi-check-circle",
      acceptLabel: "Sim",
      rejectLabel: "Cancelar",
      accept: () => {
        const index = todos.value.findIndex((t) => t.id === tarefa.id);
        if (index !== -1) concluirTarefa(index);
      },
    });
  }

  function excluirTarefa(index) {
    const tarefa = todos.value[index];
    todos.value.splice(index, 1);
    salvar();

    toast.add({
      severity: "warn",
      summary: "Tarefa excluída",
      detail: tarefa.title,
      life: 3000,
    });
  }

  function confirmarExclusao(tarefa) {
    confirm.require({
      message: "Tem certeza que deseja excluir?",
      header: "Excluir Tarefa",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Sim",
      rejectLabel: "Cancelar",
      accept: () => {
        const index = todos.value.findIndex((t) => t.id === tarefa.id);
        if (index !== -1) excluirTarefa(index);
      },
    });
  }

  return {
    adicionarNovaTarefa,
    editarTarefa,
    excluirTarefa,
    concluirTarefa,
    confirmarConclusao,
    confirmarExclusao,
    confirmarEdicao,
  };
}
