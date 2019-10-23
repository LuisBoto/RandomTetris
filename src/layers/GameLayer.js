class GameLayer extends Layer {

    constructor() {
        super();
        this.iniciar();
    }

    iniciar() {
        //reproducirMusica();
        this.limitScore = 500*(nivelActual+1);
        tocaTecho = false;
        this.espacio = new Espacio(25);
        this.bloqueActual = this.generarBloque();
        this.bloqueActual.agregarDinamico(this.espacio);
        this.bloques = [];
        this.enemigos = [];
        this.iteracionesEnemigo = 700;
        this.iteracionesRecolectable = 500;
        this.score = 0;
        this.lines = 0;
        this.tieneRecolectable = false;
        this.recolectable = null;
        this.fondo = new Modelo(imagenes.fondo, 900 * 0.5, 600 * 0.5);
        this.puntos = new Texto(this.score, 765, 30*14+15/2);
        this.lineas = new Texto(this.lines, 765, 30*6+15/2);
        this.level = new Texto(nivelActual,135,30*8+15/2);
        this.mensaje = new Modelo(imagenes.mensaje_pausa, 900*0.5, 600*0.5);
        this.cargarMapa("./res/"+nivelActual+".txt");
    }

    actualizar() {
        if (this.score>= this.limitScore) {
            nivelActual = nivelActual+1;
            if (nivelActual>nivelMaximo)
                nivelActual = 0;
            this.iniciar();
        }
        if (this.pausa){
            return;
        }
        if(tocaTecho) {
            nivelActual = 0;
            this.iniciar();
        }

        this.iteracionesEnemigo=this.iteracionesEnemigo-1;
        if(!this.tieneRecolectable)
            this.iteracionesRecolectable=this.iteracionesRecolectable-1;

        if (this.iteracionesEnemigo<=0) {
            this.iteracionesEnemigo = 700;
            this.enemigos.push(new Enemigo(imagenes.enemigo));
        }
        for(var i=0; i<this.enemigos.length; i++) {
            this.enemigos[i].y = this.enemigos[i].y+4;
            for (var j=0; j<this.espacio.estaticos.length; j++) {
                if (this.enemigos[i].colisiona(this.espacio.estaticos[j])) {
                    this.destruirEnemigo(this.enemigos[i]);
                    this.enemigos.splice(i, 1);
                    i=i-1;
                }
            }
        }

        if (!this.tieneRecolectable && this.recolectable == null && this.iteracionesRecolectable<=0) {
            this.iteracionesRecolectable = 500;
            this.crearRecolectable();
        }

        if (this.recolectable!=null && this.bloqueActual.colisiona(this.recolectable)) {
            this.tieneRecolectable = true;
            this.recolectable = null;
        }

        for (var i =0; i<this.bloques.length; i++) {
            this.bloques[i].actualizar();
            if (this.bloques[i].estado == estados.destruido) {
                this.espacio.eliminarCuerpoEstatico(this.bloques[i]);
                this.bloques.splice(i, 1);
                i=i-1;
            }
        }

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

    destruirEnemigo(enemigo) {
        for (var i=0; i<this.espacio.estaticos.length; i++) {
            if (Math.abs(enemigo.x - this.espacio.estaticos[i].x)<60
            && Math.abs(enemigo.y - this.espacio.estaticos[i].y)<60) {
                this.espacio.estaticos[i].estado = estados.destruyendo;
                this.espacio.eliminarCuerpoEstatico(this.espacio.estaticos[i]);
            }
        }
    }

    crearRecolectable() {
        var x = 315;
        var mod = Math.floor(Math.random()*10);
        x = x+(mod*30);
        var recolec;
        for (var y=15; y<600; y=y+30) {
            recolec = new Recolectable(imagenes.recolectable, x, y);
            for (var j =0; j<this.espacio.estaticos.length; j++) {
                if (recolec.colisiona(this.espacio.estaticos[j])) {
                    this.recolectable = new Recolectable(imagenes.recolectable, x, y);
                    return;
                }
            }
        }
        this.recolectable = new Recolectable(imagenes.recolectable, x, 585);
        return;
    }

    buscarLineas() {
        var contador = 0;
        for (var j=0; j<20; j++) {
            for (var i=0; i<this.bloques.length; i++) {
                if (this.bloques[i].y == j*30+15 && this.bloques[i].estado==estados.normal)
                    contador++;
            }
            if(contador==10) {
                this.score = this.score + 100;
                this.lines = this.lines+1;
                this.puntos.setValor(this.score);
                this.lineas.setValor(this.lines);
                //Eliminamos linea de bloques
                for (var i=0; i<this.bloques.length; i++) {
                    if (this.bloques[i].y==j*30+15 && this.bloques[i].estado==estados.normal) {
                        this.bloques[i].estado = estados.destruyendo;
                    }
                }
                //Movemos todos los bloques superiores una fila hacia abajo
                for (var i=0; i<this.bloques.length; i++) {
                    if (this.bloques[i].y < j*30+15) {
                        this.bloques[i].y=this.bloques[i].y+30;
                    }
                }
                this.buscarLineas();
                return;
            }
            contador=0;
        }
    }

    generarBloque() {
        var seleccion = Math.floor(Math.random() * 5);
        var tam=4;
        if(Math.random() >= 0.5)
            tam = 5;
        return new BloqueAleatorio(rutasImagenes[seleccion],435, -15, tam);
    }

    dibujar() {
        this.fondo.dibujar();
        for (var i = 0; i < this.bloques.length; i++) {
            this.bloques[i].dibujar();
        }
        this.bloqueActual.dibujar();
        if (this.recolectable!=null)
            this.recolectable.dibujar();
        for (var i = 0; i < this.enemigos.length; i++) {
            this.enemigos[i].dibujar();
        }
        if (this.tieneRecolectable)
            new Modelo(imagenes.recolectable, 135, 345).dibujar();

        // HUD
        this.puntos.dibujar();
        this.lineas.dibujar();
        this.level.dibujar();
        if (this.pausa) {
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
        if (controles.pausa) {
            this.pausa = true;
        }

        if (controles.continuar){
            this.pausa = false;
            controles.continuar = false;
        }

        if (controles.recolectable) {
           //Utilizar recolectable recogido...
            if (this.tieneRecolectable) {
                for (var j=0; j<this.bloqueActual.bloques.length; j++) {
                    this.bloqueActual.bloques[j].estado = estados.destruyendo;
                }
                this.bloqueActual.eliminarDinamico(this.espacio);
                for (var i=0; i<this.bloqueActual.bloques.length; i++)
                    this.bloques.push(this.bloqueActual.bloques[i]);
                this.bloqueActual = this.generarBloque();
                this.bloqueActual.agregarDinamico(this.espacio);
                this.tieneRecolectable = false;
            }
        }

        if(controles.rotar == 1) {
            this.bloqueActual.rotar(this.espacio);
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
