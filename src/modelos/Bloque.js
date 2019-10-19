class Bloque extends Modelo {

    constructor(rutaImagen, x, y) {
        super(rutaImagen, x, y);
        this.vy = 0;
        this.vx = 0;
        this.aDestruir = new Animacion(imagenes.bloque_destruyendose,
            this.ancho, this.alto, 1, 4, this.finAnimacionDestruir.bind(this));
        this.estado = estados.normal;
    }

    finAnimacionDestruir () {
        this.estado = estados.destruido;
    }

    actualizar() {
        if (this.estado==estados.destruyendo)
            this.aDestruir.actualizar();
    }

    dibujar() {
        if (this.estado==estados.destruyendo)
            this.aDestruir.dibujar(this.x, this.y);
        else
            super.dibujar();
    }
}
