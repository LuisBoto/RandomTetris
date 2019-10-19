var teclas = [];

window.addEventListener('keydown', onKeyDown, false);
window.addEventListener('keyup', onKeyUp, false);

function onKeyDown( event) {
    entrada = entradas.teclado;
    // agregar la tecla pulsada si no estaba
    var posicion = teclas.indexOf(event.keyCode);
    if ( posicion == -1 ) {
        teclas.push(event.keyCode);
        switch ( event.keyCode ){
            case 80:
                controles.pausa = true;
                break;
            case 32:
                controles.pausa = false;
                controles.recolectable = true;
                controles.continuar = true;
                break;
            case 38:
                controles.rotar = 1;
                break;
            case 40:
                controles.bajar = 1;
                break;
            case 39:
                controles.moverX = 1;
                break;
            case 37:
                controles.moverX = -1;
                break;
        }

    }

}

function onKeyUp( event) {
    // sacar la tecla pulsada
    var posicion = teclas.indexOf(event.keyCode);
    teclas.splice( posicion, 1);
    switch ( event.keyCode ){
        case 32:
            controles.recolectable = false;
            break;
        case 40:
            if ( controles.bajar == 1 ){
                controles.bajar = 0;
            }
            break;
        case 38:
            if ( controles.rotar == 1 ){
                controles.rotar= 0;
            }
            break;
        case 39:
            if ( controles.moverX == 1 ){
                controles.moverX = 0;
            }
            break;
        case 37:
            if ( controles.moverX == -1 ){
                controles.moverX = 0;
            }
            break;
    }

}
