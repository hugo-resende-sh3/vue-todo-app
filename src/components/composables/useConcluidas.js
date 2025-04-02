import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";
import { todos, concluidas } from "../../stores/tarefasStore";

carregar();

function carregar() {
  if (!concluidas.value.length) {
    const data = localStorage.getItem("concluidas");
    if (data) {
      concluidas.value = JSON.parse(data);
    }
  }
}

export function useConcluidas() {
  const toast = useToast();
  const confirm = useConfirm();

  function salvar() {
    localStorage.setItem("concluidas", JSON.stringify(concluidas.value));
  }

  function confirmarExclusao(tarefa) {
    confirm.require({
      message: "Tem certeza que deseja excluir esta tarefa?",
      header: "Confirmar Exclusão",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Sim",
      rejectLabel: "Cancelar",
      acceptClass: "bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600",
      rejectClass: "bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300",
      accept: () => {
        const index = concluidas.value.findIndex((t) => t.id === tarefa.id);
        if (index !== -1) excluir(index);
      },
    });
  }

  function confirmarVoltar(tarefa) {
    confirm.require({
      message: "Deseja mover esta tarefa para pendentes?",
      header: "Confirmar Ação",
      icon: "pi pi-undo",
      acceptLabel: "Sim",
      rejectLabel: "Cancelar",
      acceptClass: 'bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-600',
      rejectClass: 'bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300',
      accept: () => {
        const index = concluidas.value.findIndex((t) => t.id === tarefa.id);
        if (index !== -1) voltarParaPendentes(index);
      },
    });
  }

  function excluir(index) {
    const tarefa = concluidas.value[index];
    concluidas.value.splice(index, 1);
    salvar();

    toast.add({
      severity: "warn",
      summary: "Tarefa excluída",
      detail: tarefa.title,
      life: 3000,
    });
  }

  function voltarParaPendentes(index) {
    const tarefa = concluidas.value.splice(index, 1)[0];
    tarefa.done = false;

    todos.value.push(tarefa);
    localStorage.setItem("todos", JSON.stringify(todos.value));

    salvar();

    toast.add({
      severity: "success",
      summary: "Tarefa movida para pendentes",
      detail: tarefa.title,
      life: 3000,
    });
  }

  return {
    excluir,
    confirmarExclusao,
    confirmarVoltar,
    voltarParaPendentes,
  };
}
