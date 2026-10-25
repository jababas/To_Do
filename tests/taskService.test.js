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

describe("buscarTarea", () => {
  const tareas = [
    { id: 1, titulo: "A", completada: false },
    { id: 2, titulo: "B", completada: true }
  ];

  it("encuentra una tarea con id existente", () => {
    expect(buscarTarea(tareas, 2)).toEqual({ id: 2, titulo: "B", completada: true });
  });

  it("devuelve undefined si el id no existe", () => {
    expect(buscarTarea(tareas, 99)).toBeUndefined();
  });
});

describe("obtenerPendientes", () => {
  const pendiente = { id: 1, titulo: "A", completada: false };
  const terminada = { id: 2, titulo: "B", completada: true };

  it("devuelve solo las pendientes en una colección mixta", () => {
    expect(obtenerPendientes([pendiente, terminada])).toEqual([pendiente]);
  });

  it("devuelve [] si ninguna está pendiente", () => {
    expect(obtenerPendientes([terminada])).toEqual([]);
  });

  it("devuelve [] con colección vacía", () => {
    expect(obtenerPendientes([])).toEqual([]);
  });
});

describe("obtenerTerminadas", () => {
  const pendiente = { id: 1, titulo: "A", completada: false };
  const terminada = { id: 2, titulo: "B", completada: true };

  it("devuelve solo las terminadas en una colección mixta", () => {
    expect(obtenerTerminadas([pendiente, terminada])).toEqual([terminada]);
  });

  it("devuelve [] si ninguna está terminada", () => {
    expect(obtenerTerminadas([pendiente])).toEqual([]);
  });

  it("devuelve [] con colección vacía", () => {
    expect(obtenerTerminadas([])).toEqual([]);
  });
});

describe("cambiarEstado", () => {
  it("cambia el estado de la tarea indicada", () => {
    const tareas = [
      { id: 1, titulo: "A", completada: false },
      { id: 2, titulo: "B", completada: true }
    ];
    const resultado = cambiarEstado(tareas, 1);
    expect(resultado[0].completada).toBe(true);
    expect(cambiarEstado(tareas, 2)[1].completada).toBe(false);
  });

  it("no altera las demás tareas", () => {
    const tareas = [
      { id: 1, titulo: "A", completada: false },
      { id: 2, titulo: "B", completada: true }
    ];
    const resultado = cambiarEstado(tareas, 1);
    expect(resultado[1]).toEqual({ id: 2, titulo: "B", completada: true });
  });

  it("con id inexistente conserva el contenido", () => {
    const tareas = [{ id: 1, titulo: "A", completada: false }];
    expect(cambiarEstado(tareas, 99)).toEqual(tareas);
  });

  it("no muta el objeto original", () => {
    const original = { id: 1, titulo: "A", completada: false };
    cambiarEstado([original], 1);
    expect(original.completada).toBe(false);
  });
});
// MISIÓN 3: agrega al menos dos pruebas para agregarTarea().
// MISIÓN 4: prueba id existente e inexistente para buscarTarea().
// MISIÓN 5: prueba colección mixta, sin coincidencias y vacía.
// MISIÓN 6: prueba cambio correcto, otra tarea intacta e id inexistente.
// MISIÓN 7: prueba eliminar existente, inexistente y colección vacía.
// MISIÓN 8: prueba obtenerResumen(), incluyendo colección vacía.

// Los imports anteriores quedan preparados para que construyas la suite de forma incremental.


void eliminarTarea;
void obtenerResumen;
