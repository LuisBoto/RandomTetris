// Canvas y contexto del Canvas
var canvas = document.getElementById("canvas");
var contexto = canvas.getContext("2d");
var escaladoMinimo = 1;

// Capas
var layer;
var gameLayer;
var menuLayer;

// Controles
var controles = {};


// Capas
var gameLayer;

// Inicio capas y bucle del juego
function iniciarJuego() {
    menuLayer = new MenuLayer();
    layer=menuLayer;
    setInterval(loop, 1000 / 10);
}

function loop(){
    layer.actualizar();
    layer.procesarControles()
    layer.dibujar();
}

// Cambio de escalado
window.addEventListener('load', resize, false);

function resize() {
    console.log("Resize")
    var escaladoAncho = parseFloat(window.innerWidth / canvas.width);
    var escaladoAlto = parseFloat(window.innerHeight / canvas.height);

    escaladoMinimo = Math.min(escaladoAncho, escaladoAlto);

    canvas.width = canvas.width*escaladoMinimo;
    canvas.height = canvas.height*escaladoMinimo;

    contexto.scale(escaladoMinimo,escaladoMinimo);
}
