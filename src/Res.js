// Lista re recursos a precargar
var cache = [];
var imagenes = {
    bloque1 : "res/bloque1.png",
    bloque2 : "res/bloque2.png",
    bloque3 : "res/bloque3.png",
    bloque4 : "res/bloque4.png",
    bloque5 : "res/bloque5.png",
    bloque6 : "res/bloque6.png",
    fondo : "res/fondo.png",
    mensaje_pausa : "res/pause.png",
    menu_fondo : "res/menu_fondo.png",
    mensaje_ganar : "res/mensaje_ganar.png",
    mensaje_perder : "res/mensaje_perder.png",
    bloque_destruyendose : "res/bloque_destruyendose.png",
    recolectable : "res/recolectable.png",
    enemigo : "res/enemigo.png"
};

var rutasImagenes = Object.values(imagenes);
cargarImagenes(0);

function cargarImagenes(indice){
    cache[rutasImagenes[indice]] = new Image();
    cache[rutasImagenes[indice]].src = rutasImagenes[indice];
    cache[rutasImagenes[indice]].onload = function(){
        if ( indice < rutasImagenes.length-1 ){
            indice++;
            cargarImagenes(indice);
        } else {
            iniciarJuego();
        }
    }
}
