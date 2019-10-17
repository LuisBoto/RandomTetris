class Espacio {

    constructor(gravedad) {
        //A mas baja gravedad, más rapido caerán los bloques
        //La gravedad representa mas bien la iteraciones minimas de caida, que una
        //gravedad al uso
        this.gravedad = gravedad;
        this.dinamicos = [];
        this.estaticos = [];
    }

    setGravedad(g) {
        this.gravedad = g;
    }

    agregarCuerpoDinamico(modelo) {
        this.dinamicos.push(modelo);
    }

    agregarCuerpoEstatico(modelo) {
        this.estaticos.push(modelo);
    }

    eliminarCuerpoDinamico(modelo) {
        for (var i = 0; i < this.dinamicos.length; i++) {
            if (this.dinamicos[i] == modelo) {
                this.dinamicos.splice(i, 1);
            }
        }
    }

    eliminarCuerpoEstatico(modelo) {
        for (var i = 0; i < this.estaticos.length; i++) {
            if (this.estaticos[i] == modelo) {
                this.estaticos.splice(i, 1);
            }
        }
    }

    actualizar() {
        for (var i = 0; i < this.dinamicos.length; i++) {
            // reiniciar choques
            this.dinamicos[i].choqueAbajo = false;

            this.moverDerecha(i);
            this.moverIzquierda(i);
            this.moverArriba(i);
            this.moverAbajo(i);

            //Aumentar gravedad
            if (this.dinamicos[i].vy > this.gravedad) {
                this.dinamicos[i].vy=0;
            }
            this.dinamicos[i].vy = this.dinamicos[i].vy+1;
        }

    }

    comprobarChoqueAbajo() {
        var res = false;
        for (var i = 0; i < this.dinamicos.length; i++) {
            var movimientoPosible = 30;
            for (var j = 0; j < this.estaticos.length; j++) {
                var arribaDinamico = this.dinamicos[i].y - this.dinamicos[i].alto / 2;
                var abajoDinamico = this.dinamicos[i].y + this.dinamicos[i].alto / 2;
                var derechaDinamico = this.dinamicos[i].x + this.dinamicos[i].ancho / 2;
                var izquierdaDinamico = this.dinamicos[i].x - this.dinamicos[i].ancho / 2;
                var arribaEstatico = this.estaticos[j].y - this.estaticos[j].alto / 2;
                var abajoEstatico = this.estaticos[j].y + this.estaticos[j].alto / 2;
                var derechaEstatico = this.estaticos[j].x + this.estaticos[j].ancho / 2;
                var izquierdaEstatico = this.estaticos[j].x - this.estaticos[j].ancho / 2;

                if ((abajoDinamico + this.dinamicos[i].vy) >= arribaEstatico
                    && arribaDinamico < abajoEstatico
                    && izquierdaDinamico < derechaEstatico
                    && derechaDinamico > izquierdaEstatico) {
                        if (movimientoPosible >= arribaEstatico - abajoDinamico) {
                            this.dinamicos[i].choqueAbajo = true;
                            if (this.dinamicos[i].y < -30)
                                tocaTecho = true;
                            res = true;
                        }
                }
            }
        }
        return res;
    }

    moverDerecha(i) {
        //Derecha
        if (this.dinamicos[i].x + this.dinamicos[i].ancho/2  >= 600)
            return; //No puede moverse pues esta en el limite
        if (this.dinamicos[i].vx > 0) {
            var movimientoPosible = this.dinamicos[i].vx;
            // El mejor "idealmente" vx partimos de ese
            for (var j = 0; j < this.estaticos.length; j++) {
                var derechaDinamico
                    = this.dinamicos[i].x + this.dinamicos[i].ancho / 2;
                var arribaDinamico
                    = this.dinamicos[i].y - this.dinamicos[i].alto / 2;
                var abajoDinamico
                    = this.dinamicos[i].y + this.dinamicos[i].alto / 2;
                var izquierdaEstatico
                    = this.estaticos[j].x - this.estaticos[j].ancho / 2;
                var arribaEstatico
                    = this.estaticos[j].y - this.estaticos[j].alto / 2;
                var abajoEstatico
                    = this.estaticos[j].y + this.estaticos[j].alto / 2;
                // Alerta!, Elemento estático en la trayectoria.
                if ((derechaDinamico + this.dinamicos[i].vx) >= izquierdaEstatico
                    && derechaDinamico <= izquierdaEstatico
                    && arribaEstatico < abajoDinamico
                    && abajoEstatico > arribaDinamico) {
                    // Comprobamos si la distancia al estático es menor
                    // que nuestro movimientoPosible actual
                    if (movimientoPosible >= izquierdaEstatico - derechaDinamico) {
                        // La distancia es MENOR que nuestro movimiento posible
                        // Tenemos que actualizar el movimiento posible a uno menor
                        movimientoPosible = izquierdaEstatico - derechaDinamico;
                    }
                }
            }
            // Ya se han comprobado todos los estáticos
            this.dinamicos[i].x = this.dinamicos[i].x + movimientoPosible;
            this.dinamicos[i].vx = 0;
        }
    }

    moverIzquierda(i) {
        // Izquierda
        if (this.dinamicos[i].x - this.dinamicos[i].ancho/2  <= 300)
            return; //No puede moverse pues esta en el limite
        if (this.dinamicos[i].vx < 0) {
            var movimientoPosible = this.dinamicos[i].vx;
            // El mejor "idealmente" vx partimos de ese
            for (var j = 0; j < this.estaticos.length; j++) {
                var izquierdaDinamico
                    = this.dinamicos[i].x - this.dinamicos[i].ancho / 2;
                var arribaDinamico
                    = this.dinamicos[i].y - this.dinamicos[i].alto / 2;
                var abajoDinamico
                    = this.dinamicos[i].y + this.dinamicos[i].alto / 2;
                var derechaEstatico
                    = this.estaticos[j].x + this.estaticos[j].ancho / 2;
                var arribaEstatico
                    = this.estaticos[j].y - this.estaticos[j].alto / 2;
                var abajoEstatico
                    = this.estaticos[j].y + this.estaticos[j].alto / 2;

                // Alerta!, Elemento estático en la trayectoria.
                if ((izquierdaDinamico + this.dinamicos[i].vx) <= derechaEstatico
                    && izquierdaDinamico >= derechaEstatico
                    && arribaEstatico < abajoDinamico
                    && abajoEstatico > arribaDinamico) {
                    // Comprobamos si la distancia al estático es mayor
                    // que nuestro movimientoPosible actual
                    if (movimientoPosible <= derechaEstatico - izquierdaDinamico) {
                        // La distancia es MAYOR que nuestro movimiento posible
                        // Tenemos que actualizar el movimiento posible a uno mayor
                        movimientoPosible = derechaEstatico - izquierdaDinamico;
                    }
                }
            }
            // Ya se han comprobado todos los estaticos
            this.dinamicos[i].x = this.dinamicos[i].x + movimientoPosible;
            this.dinamicos[i].vx = 0;
        }
    }

    moverAbajo(i) {
        if (this.dinamicos[i].y >= 600 - this.dinamicos[i].alto/2) {
            this.dinamicos[i].choqueAbajo = true;
            return; //Toca el fondo y no debe moverse mas (pasara a estatico en GameLayer)
        }
        if (this.dinamicos[i].vy == this.gravedad) {
            //Siempre nos moveremos solamente una casilla
            var movimientoPosible = 30;
            // El mejor "idealmente" es la velocidad vy.
            for (var j = 0; j < this.estaticos.length; j++) {
                var arribaDinamico
                    = this.dinamicos[i].y - this.dinamicos[i].alto / 2;
                var abajoDinamico
                    = this.dinamicos[i].y + this.dinamicos[i].alto / 2;
                var derechaDinamico
                    = this.dinamicos[i].x + this.dinamicos[i].ancho / 2;
                var izquierdaDinamico
                    = this.dinamicos[i].x - this.dinamicos[i].ancho / 2;
                var arribaEstatico
                    = this.estaticos[j].y - this.estaticos[j].alto / 2;
                var abajoEstatico
                    = this.estaticos[j].y + this.estaticos[j].alto / 2;
                var derechaEstatico
                    = this.estaticos[j].x + this.estaticos[j].ancho / 2;
                var izquierdaEstatico
                    = this.estaticos[j].x - this.estaticos[j].ancho / 2;
                // Alerta!, Elemento estático en la trayectoria.
                if ((abajoDinamico + this.dinamicos[i].vy) >= arribaEstatico &&
                    arribaDinamico < abajoEstatico
                    && izquierdaDinamico < derechaEstatico
                    && derechaDinamico > izquierdaEstatico) {
                    // Comprobamos si la distancia al estático es menor
                    // que nuestro movimientoPosible actual
                    if (movimientoPosible >= arribaEstatico - abajoDinamico) {
                        // La distancia es MENOR que nuestro movimiento posible
                        movimientoPosible = 0;
                        this.dinamicos[i].choqueAbajo = true;
                    }
                }
            }
            // Ya se han comprobado todos los estáticos
            this.dinamicos[i].y = this.dinamicos[i].y + movimientoPosible;
            this.dinamicos[i].vy = 0;
        }
    }

    moverArriba(i) {
        if (this.dinamicos[i].vy < 0) {
            var movimientoPosible = this.dinamicos[i].vy;
            // El mejor "idealmente" es la velocidad vy.
            for (var j = 0; j < this.estaticos.length; j++) {
                var arribaDinamico
                    = this.dinamicos[i].y - this.dinamicos[i].alto / 2;
                var abajoDinamico
                    = this.dinamicos[i].y + this.dinamicos[i].alto / 2;
                var derechaDinamico
                    = this.dinamicos[i].x + this.dinamicos[i].ancho / 2;
                var izquierdaDinamico
                    = this.dinamicos[i].x - this.dinamicos[i].ancho / 2;
                var arribaEstatico
                    = this.estaticos[j].y - this.estaticos[j].alto / 2;
                var abajoEstatico
                    = this.estaticos[j].y + this.estaticos[j].alto / 2;
                var derechaEstatico
                    = this.estaticos[j].x + this.estaticos[j].ancho / 2;
                var izquierdaEstatico
                    = this.estaticos[j].x - this.estaticos[j].ancho / 2;
                // Alerta!, Elemento estático en la trayectoria
                if ((arribaDinamico + this.dinamicos[i].vy) <= abajoEstatico &&
                    abajoDinamico > arribaEstatico
                    && izquierdaDinamico < derechaEstatico
                    && derechaDinamico > izquierdaEstatico) {
                    // Comprobamos si la distancia al estático es MAYOR
                    // que nuestro movimientoPosible actual
                    if (movimientoPosible <= abajoEstatico - arribaDinamico) {
                        // La distancia es MAYOR que nuestro movimiento posible
                        // Tenemos que actualizar el movimiento posible a uno mayor
                        movimientoPosible = abajoEstatico - arribaDinamico;
                    }
                }
            }
            this.dinamicos[i].y = this.dinamicos[i].y + movimientoPosible;
            this.dinamicos[i].vy = movimientoPosible;
        }

    }
}
