class BloqueAleatorio extends Modelo {

    constructor(imagenRuta, x, y, size) {
        super(imagenRuta, x, y);
        this.bloques = []; //Un bloque estara formado de bloques básicos
        this.generarForma(imagenRuta, x, y, size);
    }

    estaEnPantalla () {
        for (var i=0; i<this.bloques.length; i++) {
            if (this.bloques[i].estaEnPantalla())
                return true;
        }
        return false;
    }

    dibujar (){
        for (var i=0; i<this.bloques.length; i++) {
            this.bloques[i].dibujar();
        }
    }

    colisiona (modelo){
        for (var i=0; i<this.bloques.length; i++) {
            if (this.bloques[i].colisiona(modelo))
                return true;
        }
        return false;
    }

    generarForma(imagenRuta, x, y, size) {
        this.bloques.push(new Bloque(imagenRuta, x, y));
        var seleccion;
        var currentx = x;
        var currenty = y;
        for (var i=0; this.bloques.length<size; i++) {
            seleccion = Math.floor(Math.random() * 4);
            if (seleccion==0) {
                if (currentx+30 < 600 && !this.comprobarExisteBloque(currentx + 30, currenty)) {
                    currentx = currentx + 30;
                    currenty = currenty;
                    this.bloques.push(new Bloque(imagenRuta, currentx, currenty));
                }
            }
            if (seleccion==1) {
                if (currentx-30 > 300 && !this.comprobarExisteBloque(currentx - 30, currenty )) {
                    currentx = currentx - 30;
                    currenty = currenty;
                    this.bloques.push(new Bloque(imagenRuta, currentx, currenty));
                }
            }
            if (seleccion==2) {
                if (currentx+30 < 600 && !this.comprobarExisteBloque(currentx, currenty - 30)) {
                    currentx = currentx;
                    currenty = currenty - 30;
                    this.bloques.push(new Bloque(imagenRuta, currentx, currenty));
                }
            }
            if (seleccion==3) {
                if (currentx-30 > 300 && !this.comprobarExisteBloque(currentx, currenty - 30)) {
                    currentx = currentx;
                    currenty = currenty - 30;
                    this.bloques.push(new Bloque(imagenRuta, currentx, currenty));
                }
            }
        }
    }

    comprobarExisteBloque(x, y) {
        for (var i=0; i<this.bloques.length; i++) {
            if (this.bloques[i].x==x && this.bloques[i].y==y) {
                return true;
            }
        }
        return false;
    }

    agregarDinamico(espacio) {
        for (var i=0; i<this.bloques.length; i++) {
            espacio.agregarCuerpoDinamico(this.bloques[i]);
        }
    }

    agregarEstatico(espacio) {
        for (var i=0; i<this.bloques.length; i++) {
            espacio.agregarCuerpoEstatico(this.bloques[i]);
        }
    }

    eliminarDinamico(espacio) {
        for (var i=0; i<this.bloques.length; i++) {
            espacio.eliminarCuerpoDinamico(this.bloques[i]);
        }
    }

    eliminarEstatico(espacio) {
        for (var i=0; i<this.bloques.length; i++) {
            espacio.eliminarCuerpoEstatico(this.bloques[i]);
        }
    }

    choqueAbajo() {
        for (var i=0; i<this.bloques.length; i++) {
            if (this.bloques[i].choqueAbajo)
                return true;
        }
        return false;
    }

    setVX(val) {
        for (var i=0; i<this.bloques.length; i++) {
            this.bloques[i].vx=val;
        }
    }

    rotar() {
        //TODO: Rotacion de bloques
    }
}

