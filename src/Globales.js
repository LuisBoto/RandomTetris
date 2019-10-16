var tocaTecho = false;
var entradas = {}; // tipos

var tipoPulsacion = {}; // tipos
tipoPulsacion.inicio = 1;
tipoPulsacion.mantener = 2;

var nivelActual = 0;
var nivelMaximo = 0;

var estados = {};
estados.moviendo= 2; // Incluye parado, derecha , izquierda
estados.saltando = 3;
estados.muriendo = 4;
estados.muerto = 5;
estados.disparando = 6;
estados.impactado = 7;

