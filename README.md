# ToDo Refactor Starter

Proyecto inicial para **ToDo Refactor Lab**: refactorización, pruebas unitarias y Pair Programming.

## Inicio

```bash
npm install
npm test
```

Durante el desarrollo:

```bash
npm run test:watch
```

La primera prueba está preparada para fallar: es el punto de partida de la **Misión 2** y del ciclo **RED → GREEN → REFACTOR**.

## Estructura

- `src/legacy.js`: código funcional simple para analizar antes de cambiar.
- `src/taskService.js`: lógica de dominio que completarás misión por misión.
- `src/app.js`: interfaz inicial; en la Misión 9 deberá delegar la lógica a `taskService.js`.
- `tests/taskService.test.js`: suite incremental de pruebas unitarias con Vitest.

## Misión 0 · Antes de modificar código

Responde aquí:

1. ¿Dónde almacenarías ahora el estado `completada` de una tarea?
en la propia tarea como propiedad de un objeto. 
Con strings no hay dónde ponerla sin un arreglo paralelo de caracteristica de booleanos que habría que mantener sincronizado

2. ¿Qué ocurriría si mañana cada tarea necesita prioridad, fecha o responsable?
Con objeto solo se agrega una propiedad, usando strings se necesita agregar mas arreglos

3. ¿Qué parte del código representa datos y qué parte representa interfaz?
Los datos los representa el arreglo "tareas" y la interfaz el "mostrarTareas()" que usa "queryseñector".

4. ¿Qué comportamiento debemos conservar durante el refactor?

### Tres comportamientos observables que NO deben cambiar

1. Un titulo que aparece en la lista
2. un titulo vacio se rechaza
3. eliminar una tarea quita solo la tarea deseada

## Misión 1 . Tareas con formato de objeto
Aquí trate de modificar la forma que tenian las tareas, que eran unicamente un arreglo de string, lo que ahora cambia a un objeto con forma, (id, titulo, completada)

## Registro RED → GREEN → REFACTOR

Documenta al menos una iteración:

## Mision 2 . test

- **RED:** ¿qué prueba escribiste y por qué falló?
escribí la prueba “crea una tarea pendiente con id y título” y falló porque crearTarea lanzaba un error y no devolvía el objeto esperado.

- **GREEN:** ¿cuál fue el cambio mínimo que la hizo pasar?
el cambio mínimo fue return { id, titulo, completada: false };

- **REFACTOR:** ¿qué mejoraste sin cambiar el comportamiento?
no hizo falta cambiar nada porque la función ya es corta y expresa su intención. Volví a ejecutar las pruebas y siguen en verde.

## Mision 3 . Casos para la funcion

- **RED:** ¿qué prueba escribiste y por qué falló?
Integre tres casos para la funcion "agregarTare" y fallo porque aún no no esta exportada la función

- **GREEN:** ¿cuál fue el cambio mínimo que la hizo pasar?
En el arvhivo de taskService.js exporte la funcion con el interior que ahora le debe de corresponder, ya que antes hacia caso a lo que tenia inicialmente, ahora retorna lo que deberia y antes retornaba un error

return [...tareas, nuevaTarea];

- **REFACTOR:** ¿qué mejoraste sin cambiar el comportamiento?

No hay necesidad de mejorar algo mas

## Mision 3 . Casos para la funcion

- **RED:** ¿qué prueba escribiste y por qué falló?
Pasa la misma situacion que con la otra mision, unicamete se agregan los casos, pero no se exportan

- **GREEN:** ¿cuál fue el cambio mínimo que la hizo pasar?


- **REFACTOR:** ¿qué mejoraste sin cambiar el comportamiento?

