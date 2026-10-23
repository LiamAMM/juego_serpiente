
// 1. Capturamos el canvas y su contexto de dibujo
const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");

let TAMANIO_CELDA = 25;


// Primera pintura del juego al cargar la página
dibujarTodo();

// =========================
// FUNCIONES DE DIBUJO
// =========================

function limpiarCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function dibujarTablero() {
  ctx.strokeStyle = "#3b3363";
  ctx.beginPath();
  for (let x = 0; x <= canvas.width; x += TAMANIO_CELDA) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
  }
  for (let y = 0; y <= canvas.height; y += TAMANIO_CELDA) {
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
  }
  ctx.stroke();
}

function pintarParte(lineaX, lineaY) {
  let x = lineaX * TAMANIO_CELDA;
  let y = lineaY * TAMANIO_CELDA;

  // Configurar color de relleno y pintar el cuadrado
  ctx.fillStyle = "#ef4444"; // Color rojo (según la prueba obligatoria)
  ctx.fillRect(x, y, TAMANIO_CELDA, TAMANIO_CELDA);

  // Configurar color del borde y dibujar borde
  ctx.strokeStyle = "#000000";
  ctx.strokeRect(x, y, TAMANIO_CELDA, TAMANIO_CELDA);
}

function dibujarTodo() {
  limpiarCanvas();
  dibujarTablero();
  pintarParte(5, 5);
  pintarParte(10, 2);
  pintarParte(10, 23);
  pintarParte(23, 15);
  pintarParte(0, 15);
  pintarParte(23, 23);
}



