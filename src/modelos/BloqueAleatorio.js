class BloqueAleatorio extends Modelo {

    constructor(imagenRuta, x, y, size) {
        super(imagenRuta, x, y);
        this.imagenRuta = imagenRuta;
        this.size=size;
        this.bloques = []; //Un bloque estara formado de bloques básicos
        this.direcciones = [];
        this.generarForma(imagenRuta, x, y, size);
        this.posPivote = this.seleccionarPivote();
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
            //Seleccionamos un bloque al azar existente
            seleccion = Math.floor(Math.random() * this.bloques.length);
            var bloque = this.bloques[seleccion];
            currentx = bloque.x;
            currenty = bloque.y;
            //Seleccionamos una dirección al azar y colocamos un bloque si no hay ahi
            seleccion = Math.floor(Math.random() * 4);
            if (seleccion==0) {
                if (currentx+30 < 600 && !this.comprobarExisteBloque(currentx + 30, currenty)) {
                    currentx = currentx + 30;
                    currenty = currenty;
                    this.bloques.push(new Bloque(imagenRuta, currentx, currenty));
                    this.direcciones.push(0);
                }
            }
            if (seleccion==1) {
                if (currentx-30 > 300 && !this.comprobarExisteBloque(currentx - 30, currenty )) {
                    currentx = currentx - 30;
                    currenty = currenty;
                    this.bloques.push(new Bloque(imagenRuta, currentx, currenty));
                    this.direcciones.push(1);
                }
            }
            if (seleccion==2) {
                if (currentx+30 < 600 && !this.comprobarExisteBloque(currentx, currenty - 30)) {
                    currentx = currentx;
                    currenty = currenty - 30;
                    this.bloques.push(new Bloque(imagenRuta, currentx, currenty));
                    this.direcciones.push(2);
                }
            }
            if (seleccion==3) {
                if (currentx-30 > 300 && !this.comprobarExisteBloque(currentx, currenty - 30)) {
                    currentx = currentx;
                    currenty = currenty - 30;
                    this.bloques.push(new Bloque(imagenRuta, currentx, currenty));
                    this.direcciones.push(3);
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

    rotar(espacio) {
        var bloquesOriginales = []; //Copia por si fuese necesario deshacer
        for (var i=0; i<this.bloques.length; i++)
            bloquesOriginales.push(new Bloque(this.imagenRuta, this.bloques[i].x, this.bloques[i].y));

        var xoriginal;
        var yoriginal;
        var pivote = this.bloques[this.posPivote];

        //Calcularemos el pivote antes
        xoriginal = pivote.x;
        yoriginal = pivote.y;
        //IMPORTANTE usar estas variables
        var xbloque = pivote.x;
        var ybloque = pivote.y;
        //pivote.x = -ybloque;
        //pivote.y = xbloque;

        var correccionx = xoriginal+yoriginal;
        var correcciony = -(xoriginal-yoriginal);
        //pivote.x = pivote.x+correccionx;
        //pivote.y = pivote.y+correcciony;

        for (var i=0; i<this.bloques.length; i++) {
            if (i==this.posPivote)
                continue;

            xoriginal = this.bloques[i].x;
            yoriginal = this.bloques[i].y;
            var xbloque = this.bloques[i].x;
            var ybloque = this.bloques[i].y;

            this.bloques[i].x = -ybloque;
            this.bloques[i].y = xbloque;

            this.bloques[i].x = this.bloques[i].x+correccionx;
            this.bloques[i].y = this.bloques[i].y+correcciony;
        }

        //Corrección de ajuste a cuadrícula
        for (var i=0; i<this.bloques.length; i++) {
            if (this.bloques[i].x%15!=0) {
                this.bloques[i].x = this.bloques[i].x+15;
            }
            if (this.bloques[i].y%30==0) {
                this.bloques[i].y = this.bloques[i].y-15;
            }
        }

        for (var i=0; i<this.bloques.length; i++) {
            while (this.bloques[i].x<315) {
                //Recolocar bloque completo
                for (var i=0; i<this.bloques.length; i++) {
                    this.bloques[i].x=this.bloques[i].x+30;
                }
            }
        }
        for (var i=0; i<this.bloques.length; i++) {
            while (this.bloques[i].x>585) {
                //Recolocar bloque completo
                for (var i=0; i<this.bloques.length; i++) {
                    this.bloques[i].x=this.bloques[i].x-30;
                }
                i=i-1;
            }
        }
        for (var i=0; i<this.bloques.length; i++) {
            if (this.bloques[i].y>600) {
                //Recolocar bloque completo
                for (var i=0; i<this.bloques.length; i++) {
                    this.bloques[i].y=this.bloques[i].y-30;
                }
                i=i-1;
            }
        }

        //Si tras todas las correciones se superpone con algun bloque apilado, deshacer
        for (var i=0; i<this.bloques.length; i++) {
            for (var j=0; j<espacio.estaticos.length; j++) {
                if (this.bloques[i].colisiona(espacio.estaticos[j])) {
                    this.eliminarDinamico(espacio);
                    this.bloques = bloquesOriginales;
                    this.agregarDinamico(espacio);
                    return;
                }
            }
        }
    }

    seleccionarPivote() {
        //Haremos la media de las coordenadas de cada mini bloque,
        //y la posicion del que tenga una coordenada mas centrica
        //sera devuelta
        var media= 0;
        for (var i=0; i<this.bloques.length; i++) {
            media = media+this.bloques[i].x+this.bloques[i].y;
        }
        media = media/this.bloques.length;
        var diferencia = 100;
        var res = this.bloques.length/2;
        for (var i=0; i<this.bloques.length; i++) {
            if (Math.abs(media - this.bloques[i].x+this.bloques[i].y) < diferencia) {
                diferencia = Math.abs(media - this.bloques[i].x+this.bloques[i].y);
                res = i;
            }
        }
        return res;
    }

}

