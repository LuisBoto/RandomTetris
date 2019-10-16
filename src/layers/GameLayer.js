class GameLayer extends Layer {

    constructor() {
        super();
        this.iniciar();
    }

    iniciar() {
        //reproducirMusica();

        this.espacio = new Espacio(30);
        this.bloqueActual = new Bloque(imagenes.bloque, 435, -15);
        this.espacio.agregarCuerpoDinamico(this.bloqueActual);
        this.bloques = [];
        this.fondo = new Modelo(imagenes.fondo, 900 * 0.5, 600 * 0.5);
        this.puntos = new Texto(0, 900 * 0.9, 600 * 0.07);
        this.cargarMapa("res/"+nivelActual+".txt");
    }

    actualizar() {
        if (this.pausa){
            return;
        }
        this.espacio.actualizar();
        if (this.bloqueActual.choqueAbajo) {
            this.espacio.eliminarCuerpoDinamico(this.bloqueActual);
            this.espacio.agregarCuerpoEstatico(this.bloqueActual);
            this.bloques.push(this.bloqueActual);
            this.bloqueActual = new Bloque(imagenes.bloque, 435, -15);
            this.espacio.agregarCuerpoDinamico(this.bloqueActual);
        }
    }

    dibujar() {
        this.fondo.dibujar();
        for (var i = 0; i < this.bloques.length; i++) {
            this.bloques[i].dibujar();
        }
        this.bloqueActual.dibujar();

        // HUD
        this.puntos.dibujar();
        if ( this.pausa ) {
            this.mensaje.dibujar();
        }
    }

    cargarMapa(ruta) {
        var fichero = new XMLHttpRequest();
        fichero.open("GET", ruta, false);

        fichero.onreadystatechange = function () {
            var texto = fichero.responseText;
            var lineas = texto.split('\n');
            for (var i = 0; i < lineas.length; i++) {
                var linea = lineas[i];
                for (var j = 0; j < linea.length; j++) {
                    var simbolo = linea[j];
                    var x = 30 / 2 + j * 30 + 300; // x central
                    var y = 30 + i * 30; // y de abajo
                    this.cargarObjetoMapa(simbolo, x, y);
                }
            }
        }.bind(this);

        fichero.send(null);
    }

    cargarObjetoMapa(simbolo, x, y) {
        switch (simbolo) {
            case "B":
                var bloque = new Bloque(imagenes.bloque, x, y);
                bloque.y = bloque.y - bloque.alto / 2;
                // modificación para empezar a contar desde el suelo
                this.bloques.push(bloque);
                this.espacio.agregarCuerpoEstatico(bloque);
                break;
        }
    }

    procesarControles() {
        if (controles.continuar){
            controles.continuar = false;
            this.pausa = false;
        }

        // disparar
        if (controles.recolectable) {
           //Utilizar recolectable recogido...
        }

        if(controles.rotar == 1) {
            this.bloqueActual.rotar();
        }
        if (controles.bajar == 1) {
            //Debe caer más deprisa todas las cosas
            this.espacio.setGravedad(60);
        }

        // Eje X
        if (controles.moverX > 0)
            this.bloqueActual.vx = 30;
         else if (controles.moverX < 0)
            this.bloqueActual.vx = -30;

    }


}
