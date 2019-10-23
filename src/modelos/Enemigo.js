class Enemigo extends Modelo {

    constructor(rutaImagen) {
        var x = 315;
        var mod = Math.floor(Math.random()*10);
        x = x+(mod*30);
        super(rutaImagen, x, -15);
        this.vy = 30;
        this.vx = 0;
    }

}
