class GameLayer extends Layer {

    constructor() {
        super();
        this.iniciar();
    }

    iniciar() {
        //reproducirMusica();
        tocaTecho = false;
        this.espacio = new Espacio(25);
        this.bloqueActual = this.generarBloque();
        //this.espacio.agregarCuerpoDinamico(this.bloqueActual);
        this.bloqueActual.agregarDinamico(this.espacio);
        this.bloques = [];
        this.fondo = new Modelo(imagenes.fondo, 900 * 0.5, 600 * 0.5);
        this.puntos = new Texto(0, 900 * 0.9, 600 * 0.07);
        this.cargarMapa("./res/"+nivelActual+".txt");
    }

    actualizar() {
        if (this.pausa){
            return;
        }
        if(tocaTecho)
            this.iniciar();

        if (this.bloqueActual.choqueAbajo()) {
            this.bloqueActual.eliminarDinamico(this.espacio);
            this.bloqueActual.agregarEstatico(this.espacio);
            for (var i=0; i<this.bloqueActual.bloques.length; i++)
                this.bloques.push(this.bloqueActual.bloques[i]);
            this.bloqueActual = this.generarBloque();
            this.bloqueActual.agregarDinamico(this.espacio);
        }

        this.espacio.actualizar();

        this.buscarLineas();
    }

    buscarLineas() {
        var contador = 0;
        for (var j=0; j<20; j++) {
            for (var i=0; i<this.bloques.length; i++) {
                if (this.bloques[i].y == j*30+15)
                    contador++;
            }
            if(contador==10) {
                //Eliminamos linea de bloques
                for (var i=0; i<this.bloques.length; i++) {
                    if (this.bloques[i].y==j*30+15) {
                        this.espacio.eliminarCuerpoEstatico(this.bloques[i]);
                        this.bloques.splice(i, 1);
                        i=i-1;
                    }
                }
                //Movemos todos los bloques superiores una fila hacia abajo
                for (var i=0; i<this.bloques.length; i++) {
                    if (this.bloques[i].y < j*30+15) {
                        this.bloques[i].y=this.bloques[i].y+30;
                    }
                }
            }
            contador=0;
        }
    }

    generarBloque() {
        var seleccion = Math.floor(Math.random() * 5);
        return new BloqueAleatorio(rutasImagenes[seleccion],435, -15, 5);
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
                var bloque = new Bloque(imagenes.bloque6, x, y);
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

        if (controles.recolectable) {
           //Utilizar recolectable recogido...
        }

        if(controles.rotar == 1) {
            this.bloqueActual.rotar();
        }
        controles.rotar = 0;
        if (controles.bajar == 1) {
            //Deben caer más deprisa todas las cosas
            this.espacio.setGravedad(5);
        }
        else if (controles.bajar==0) {
            this.espacio.setGravedad(25);
        }

        // Eje X
        if (controles.moverX > 0)
            this.bloqueActual.setVX(30);
         else if (controles.moverX < 0)
            this.bloqueActual.setVX(-30);
        controles.moverX = 0;

    }


}
