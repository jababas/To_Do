import { describe, it, expect } from "vitest";
import {
  crearTarea,
  agregarTarea,
  buscarTarea,
  obtenerPendientes,
  obtenerTerminadas,
  cambiarEstado,
  eliminarTarea,
  obtenerResumen
} from "../src/taskService.js";

/*
 * TODO REFACTOR LAB · SUITE STARTER
 *
 * Activa/crea pruebas misión por misión. No escribas todas las soluciones de
 * una vez. Para cada comportamiento sigue RED → GREEN → REFACTOR.
 */

describe("crearTarea", () => {
  it("crea una tarea pendiente con id y título", () => {
    // Arrange
    const id = 10;
    const titulo = "Diseñar pruebas";

    // Act
    const tarea = crearTarea(id, titulo);

    // Assert
    expect(tarea).toEqual({ id: 10, titulo: "Diseñar pruebas", completada: false });
  });
});

describe("agregarTarea", () => {
  it("devuelve la colección con la nueva tarea al final", () => {
    const base = [{ id: 1, titulo: "A", completada: false }];
    const nueva = { id: 2, titulo: "B", completada: false };
    expect(agregarTarea(base, nueva)).toEqual([...base, nueva]);
  });

  it("devuelve un elemento más que la original", () => {
    const base = [{ id: 1, titulo: "A", completada: false }];
    const resultado = agregarTarea(base, { id: 2, titulo: "B", completada: false });
    expect(resultado).toHaveLength(base.length + 1);
  });

  it("no modifica el arreglo original", () => {
    const base = [{ id: 1, titulo: "A", completada: false }];
    agregarTarea(base, { id: 2, titulo: "B", completada: false });
    expect(base).toHaveLength(1);
  });
});

// MISIÓN 3: agrega al menos dos pruebas para agregarTarea().
// MISIÓN 4: prueba id existente e inexistente para buscarTarea().
// MISIÓN 5: prueba colección mixta, sin coincidencias y vacía.
// MISIÓN 6: prueba cambio correcto, otra tarea intacta e id inexistente.
// MISIÓN 7: prueba eliminar existente, inexistente y colección vacía.
// MISIÓN 8: prueba obtenerResumen(), incluyendo colección vacía.

// Los imports anteriores quedan preparados para que construyas la suite de forma incremental.
void buscarTarea;
void obtenerPendientes;
void obtenerTerminadas;
void cambiarEstado;
void eliminarTarea;
void obtenerResumen;
