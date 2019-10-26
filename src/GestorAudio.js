var musicaAmbiente = new Audio("res/musica_ambiente.mp3");
musicaAmbiente.loop = true;

var efectos = {
    linea : "res/efecto_linea.mp3",
    nivel : "res/efecto_nivel.mp3"
}

function reproducirMusica() {
    musicaAmbiente.volume = 0.3;
    musicaAmbiente.play();
}

function pararMusica() {
    musicaAmbiente.stop();
}

function reproducirEfecto( srcEfecto ) {
    var efecto = new Audio( srcEfecto );
    efecto.play();
}
