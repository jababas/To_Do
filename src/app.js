

import {
  crearTarea,
  agregarTarea,
  obtenerPendientes,
  obtenerTerminadas,
  cambiarEstado,
  eliminarTarea,
  obtenerResumen,
  obtenerPorcentajeAvance
} from "./taskService.js";

const form = document.querySelector("#task-form");
const input = document.querySelector("#task-input");
const list = document.querySelector("#task-list");
const message = document.querySelector("#message");
const summary = document.querySelector("#summary");
const filters = [...document.querySelectorAll("[data-filter]")];

let tareas = [
  crearTarea(1, "Revisar requisitos"),
  crearTarea(2, "Diseñar pruebas"),
  crearTarea(3, "Refactorizar código")
];
let siguienteId = 4;
let filtro = "todas";

const selectoresDeFiltro = {
  todas: (lista) => lista,
  pendientes: obtenerPendientes,
  terminadas: obtenerTerminadas
};

function crearElementoTarea(tarea) {
  const li = document.createElement("li");
  li.className = tarea.completada ? "task done" : "task";
  li.innerHTML = `<span class="title"></span>
    <span class="task-actions">
      <button data-toggle="${tarea.id}">${tarea.completada ? "Reabrir" : "Completar"}</button>
      <button data-delete="${tarea.id}">Eliminar</button>
    </span>`;
  li.querySelector(".title").textContent = tarea.titulo;
  return li;
}

function renderResumen() {
  const { total, pendientes, terminadas } = obtenerResumen(tareas);
  const avance = obtenerPorcentajeAvance(tareas);
  summary.textContent = `Total: ${total} · Pendientes: ${pendientes} · Terminadas: ${terminadas} · Avance: ${avance}%`;
}

function render() {
  list.innerHTML = "";
  const visibles = selectoresDeFiltro[filtro](tareas);
  visibles.forEach((tarea) => list.appendChild(crearElementoTarea(tarea)));
  renderResumen();
}

function mostrarMensaje(texto = "") {
  message.textContent = texto;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const titulo = input.value.trim();
  if (!titulo) {
    mostrarMensaje("Escribe un título antes de agregar.");
    return;
  }
  tareas = agregarTarea(tareas, crearTarea(siguienteId++, titulo));
  input.value = "";
  mostrarMensaje();
  render();
});

list.addEventListener("click", (event) => {
  const { toggle, delete: borrar } = event.target.dataset;
  if (toggle !== undefined) tareas = cambiarEstado(tareas, Number(toggle));
  else if (borrar !== undefined) tareas = eliminarTarea(tareas, Number(borrar));
  else return;
  render();
});

filters.forEach(button => button.addEventListener("click", () => {
  filtro = button.dataset.filter;
  filters.forEach(b => b.classList.toggle("active", b === button));
  mostrarMensaje();
  render();
}));

render();
