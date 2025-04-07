// Lista de equipos cargados desde el JSON
var equipos = [];
// Índice actual del equipo que se está viendo
var indiceActual = 0;

// Esta función se ejecuta cuando la página ha cargado
window.onload = function () {
  // Usamos fetch para leer el archivo JSON
  fetch("equips.json")
    .then(function (respuesta) {
      // Convertimos el texto a formato JSON (lista de objetos)
      return respuesta.json();
    })
    .then(function (datos) {
      // Guardamos los datos en la variable global
      equipos = datos;
      // Mostramos el primer equipo
      mostrarEquipo();
    })
    .catch(function (error) {
      // Si hay error, lo mostramos en la consola
      console.log("Error al cargar el JSON:", error);
    });

  // Asociar los botones con sus funciones
  document.getElementById("btnAnterior").onclick = anteriorEquipo;
  document.getElementById("btnSiguiente").onclick = siguienteEquipo;
  document.getElementById("btnGuardar").onclick = guardarCambios;
  document.getElementById("btnEliminar").onclick = eliminarEquipo;
  document.getElementById("btnBuscar").onclick = buscarEquipo;
};

// Mostrar el equipo en pantalla
function mostrarEquipo() {
  if (equipos.length === 0) {
    alert("No hay equipos para mostrar.");
    return;
  }

  var eq = equipos[indiceActual];

  document.getElementById("inventario").value = eq.inventari_numero;
  document.getElementById("serie").value = eq.num_serie;
  document.getElementById("marca").value = eq.marca;
  document.getElementById("modelo").value = eq.model;
  document.getElementById("procesador").value = eq.processador;
  document.getElementById("memoria").value = eq.memoria;
  document.getElementById("ubicacion").value = eq.ubicacio_magatzem;
  document.getElementById("estado").value = eq.estat;
  document.getElementById("fecha").value = eq.data_ultima_revisio;

  // Radio buttons: inventario OK
  var radios = document.getElementsByName("ok");
  for (var i = 0; i < radios.length; i++) {
    radios[i].checked = radios[i].value === (eq.inventariOk ? "Sí" : "No");
  }
}

// Botón anterior
function anteriorEquipo() {
  if (indiceActual > 0) {
    indiceActual--;
    mostrarEquipo();
  }
}

// Botón siguiente
function siguienteEquipo() {
  if (indiceActual < equipos.length - 1) {
    indiceActual++;
    mostrarEquipo();
  }
}

// Botón guardar
function guardarCambios() {
  var eq = equipos[indiceActual];

  eq.inventari_numero = document.getElementById("inventario").value;
  eq.num_serie = document.getElementById("serie").value;
  eq.marca = document.getElementById("marca").value;
  eq.model = document.getElementById("modelo").value;
  eq.processador = document.getElementById("procesador").value;
  eq.memoria = document.getElementById("memoria").value;
  eq.ubicacio_magatzem = document.getElementById("ubicacion").value;
  eq.estat = document.getElementById("estado").value;
  eq.data_ultima_revisio = document.getElementById("fecha").value;

  var radios = document.getElementsByName("ok");
  for (var i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      eq.inventariOk = radios[i].value === "Sí";
    }
  }

  alert("Cambios guardados.");
}

// Botón eliminar
function eliminarEquipo() {
  if (equipos.length === 0) return;

  equipos.splice(indiceActual, 1);

  if (indiceActual >= equipos.length) {
    indiceActual = equipos.length - 1;
  }

  mostrarEquipo();
}

// Botón buscar por inventario
function buscarEquipo() {
  var valor = document.getElementById("buscarInventario").value;

  for (var i = 0; i < equipos.length; i++) {
    if (equipos[i].inventari_numero === valor) {
      indiceActual = i;
      mostrarEquipo();
      return;
    }
  }

  alert("Equipo no encontrado.");
}
