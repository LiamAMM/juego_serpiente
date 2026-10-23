
// 1. Capturamos el canvas y su contexto de dibujo
const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");
const serpiente = [
  { x: 11, y: 10 },
  { x: 11, y: 9 },
  { x: 10, y: 9 },
  { x: 9, y: 9 },
];

let TAMANIO_CELDA = 25;
let intervaloSerpiente = null;
let direccionActual = "derecha";
let comida = { x: 5, y: 5 };
let puntaje = 0;


// Primera pintura del juego al cargar la página
pintarComida();
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

function pintarParte(lineaX, lineaY, color) {
  let x = lineaX * TAMANIO_CELDA;
  let y = lineaY * TAMANIO_CELDA;

  ctx.fillStyle = color;
  ctx.fillRect(x, y, TAMANIO_CELDA, TAMANIO_CELDA);
  ctx.strokeStyle = "#000000";
  ctx.strokeRect(x, y, TAMANIO_CELDA, TAMANIO_CELDA);
}

function pintarSerpiente() {
  let parte;
  for (let i = 0; i < serpiente.length; i++) {
    parte = serpiente[i];
    if (i == 0) {
      pintarParte(parte.x, parte.y, "#facc15");
    } else {
      pintarParte(parte.x, parte.y, "#ef4444");
    }
  }
}

function pintarComida() {
  let xAleatoria = Math.floor(Math.random() * (canvas.width / TAMANIO_CELDA));
  let yAleatoria = Math.floor(Math.random() * (canvas.height / TAMANIO_CELDA));
  comida = { x: xAleatoria, y: yAleatoria };
  pintarParte(comida.x, comida.y, "#38bdf8"); // Color celeste
}

function atrapaComida() {
  let cabeza = serpiente[0];
  if (cabeza.x === comida.x && cabeza.y === comida.y) {
    return true;
  }
  return false;
}

function moverDerecha() {
  let cabezaActual = serpiente[0];
  let nuevaCabeza = { x: cabezaActual.x + 1, y: cabezaActual.y };

  serpiente.unshift(nuevaCabeza);
  serpiente.pop();
}

function moverIzquierda() {
  let cabezaActual = serpiente[0];
  let nuevaCabeza = { x: cabezaActual.x - 1, y: cabezaActual.y };

  serpiente.unshift(nuevaCabeza);
  serpiente.pop();
}

function moverArriba() {
  let cabezaActual = serpiente[0];
  let nuevaCabeza = { x: cabezaActual.x, y: cabezaActual.y - 1 };

  serpiente.unshift(nuevaCabeza);
  serpiente.pop();
}

function moverAbajo() {
  let cabezaActual = serpiente[0];
  let nuevaCabeza = { x: cabezaActual.x, y: cabezaActual.y + 1 };

  serpiente.unshift(nuevaCabeza);
  serpiente.pop();
}

function cambiarDireccion(direccion) {
  direccionActual = direccion;
}

function moverSerpiente() {
  console.log("moviendo");

  limpiarCanvas();
  dibujarTablero();
  
  // Dibuja la comida fija en su posición actual en cada frame
  pintarParte(comida.x, comida.y, "#38bdf8");

  if (direccionActual === "derecha") {
    moverDerecha();
  } else if (direccionActual === "izquierda") {
    moverIzquierda();
  } else if (direccionActual === "arriba") {
    moverArriba();
  } else if (direccionActual === "abajo") {
    moverAbajo();
  }

  if (atrapaComida()) {
    puntaje++;
    document.getElementById("puntaje").textContent = puntaje;

    let cola = serpiente[serpiente.length - 1];
    let nuevoSegmento = { x: cola.x, y: cola.y };

    if (direccionActual === "derecha") {
      nuevoSegmento = { x: cola.x - 1, y: cola.y };
    } else if (direccionActual === "izquierda") {
      nuevoSegmento = { x: cola.x + 1, y: cola.y };
    } else if (direccionActual === "arriba") {
      nuevoSegmento = { x: cola.x, y: cola.y + 1 };
    } else if (direccionActual === "abajo") {
      nuevoSegmento = { x: cola.x, y: cola.y - 1 };
    }

    serpiente.push(nuevoSegmento);
    pintarComida();
  }

  pintarSerpiente();
}

function iniciarJuego() {
  if (intervaloSerpiente === null) {
    intervaloSerpiente = setInterval(moverSerpiente, 1000);
  }
}

function pausarJuego() {
  clearInterval(intervaloSerpiente);
  intervaloSerpiente = null;
}

function dibujarTodo() {
  limpiarCanvas();
  dibujarTablero();
  pintarComida();
  pintarSerpiente();
}



