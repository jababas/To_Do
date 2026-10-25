import { describe, it, expect } from "vitest";
import {
  crearTarea,
  agregarTarea,
  buscarTarea,
  obtenerPendientes,
  obtenerTerminadas,
  cambiarEstado,
  eliminarTarea,
  obtenerResumen,
  obtenerPorcentajeAvance
} from "../src/taskService.js";

/*
 * TODO REFACTOR LAB · SUITE STARTER
 *
 * Activa/crea pruebas misión por misión. No escribas todas las soluciones de
 * una vez. Para cada comportamiento sigue RED → GREEN → REFACTOR.
 */

describe("obtenerPorcentajeAvance", () => {
  it("con colección vacía devuelve 0", () => {
    expect(obtenerPorcentajeAvance([])).toBe(0);
  });

  it("devuelve 0 si ninguna está terminada", () => {
    expect(obtenerPorcentajeAvance([
      { id: 1, titulo: "A", completada: false }
    ])).toBe(0);
  });

  it("devuelve 100 si todas están terminadas", () => {
    expect(obtenerPorcentajeAvance([
      { id: 1, titulo: "A", completada: true }
    ])).toBe(100);
  });

  it("redondea el porcentaje (1 de 3 = 33)", () => {
    expect(obtenerPorcentajeAvance([
      { id: 1, titulo: "A", completada: true },
      { id: 2, titulo: "B", completada: false },
      { id: 3, titulo: "C", completada: false }
    ])).toBe(33);
  });
});

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

describe("eliminarTarea", () => {
  const tareas = [
    { id: 1, titulo: "A", completada: false },
    { id: 2, titulo: "B", completada: true }
  ];

  it("elimina la tarea con id existente", () => {
    expect(eliminarTarea(tareas, 1)).toEqual([
      { id: 2, titulo: "B", completada: true }
    ]);
  });

  it("con id inexistente devuelve el mismo contenido", () => {
    expect(eliminarTarea(tareas, 99)).toEqual(tareas);
  });

  it("con colección vacía devuelve []", () => {
    expect(eliminarTarea([], 1)).toEqual([]);
  });
});

describe("obtenerResumen", () => {
  it("cuenta total, pendientes y terminadas", () => {
    const tareas = [
      { id: 1, titulo: "A", completada: false },
      { id: 2, titulo: "B", completada: true },
      { id: 3, titulo: "C", completada: false }
    ];
    expect(obtenerResumen(tareas)).toEqual({ total: 3, pendientes: 2, terminadas: 1 });
  });

  it("con colección vacía devuelve ceros", () => {
    expect(obtenerResumen([])).toEqual({ total: 0, pendientes: 0, terminadas: 0 });
  });
});

