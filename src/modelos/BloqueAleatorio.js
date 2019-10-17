class BloqueAleatorio extends Modelo {

    constructor(imagenRuta, x, y, size) {
        super(imagenRuta, x, y);
        this.bloques = []; //Un bloque estara formado de bloques básicos
        generarForma(imagenRuta, x, y, size);
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
                if (currentx+30 < 600 && !this.comprobarExisteBloque(currentx + 30, currenty + 30)) {
                    currentx = currentx + 30;
                    currenty = currenty + 30;
                    this.bloques.push(new Bloque(imagenRuta, currentx, currenty));
                }
            }
            if (seleccion==1) {
                if (currentx-30 > 300 && !this.comprobarExisteBloque(currentx - 30, currenty + 30)) {
                    currentx = currentx - 30;
                    currenty = currenty + 30;
                    this.bloques.push(new Bloque(imagenRuta, currentx, currenty));
                }
            }
            if (seleccion==2) {
                if (currentx+30 < 600 && !this.comprobarExisteBloque(currentx + 30, currenty - 30)) {
                    currentx = currentx + 30;
                    currenty = currenty - 30;
                    this.bloques.push(new Bloque(imagenRuta, currentx, currenty));
                }
            }
            if (seleccion==3) {
                if (currentx-30 > 300 && !this.comprobarExisteBloque(currentx - 30, currenty - 30)) {
                    currentx = currentx - 30;
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

    rotar() {
        //TODO: Rotacion de bloques
    }
}

