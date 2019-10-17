class Modelo {

    constructor(imagenRuta, x, y) {
        this.imagen = cache[imagenRuta];
        this.x = x;
        this.y = y;
        this.ancho = this.imagen.width;
        this.alto = this.imagen.height;
    }

    estaEnPantalla () {
        if ( this.x  - this.ancho/2 <= 900 &&
            (this.x)  + this.ancho/2 >= 0 &&
            this.y - this.alto/2 <= 600 &&
            this.y + this.alto/2 >= 0 ){
            return true;
        }
        return false;
    }

    dibujar (){
        contexto.drawImage(this.imagen,
            this.x - this.ancho /2,
            this.y - this.alto /2);
    }


    colisiona (modelo){
        var colisiona = false;

        if ( modelo.x - modelo.ancho/2 <=  this.x + this.ancho/2
            && modelo.x + modelo.ancho/2 >= this.x - this.ancho/2
            && this.y + this.alto/2 >= modelo.y - modelo.alto/2
            && this.y - this.alto/2 <= modelo.y + modelo.alto/2 ){

            colisiona = true;

        }
        return colisiona;
    }

}
