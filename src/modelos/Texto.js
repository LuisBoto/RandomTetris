class Texto {

    constructor(valor, x, y) {
        this.valor = valor;
        this.x = x;
        this.y = y;
    }

    setValor(valor) {
        this.valor = valor;
    }

    dibujar (){
        contexto.font = "30px Monospace";
        contexto.fillStyle = "white";
        contexto.textAlign = "center";
        contexto.fillText(this.valor,this.x,this.y);
    }

}
