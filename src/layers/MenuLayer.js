class MenuLayer extends Layer {
    constructor() {
        super();
        this.iniciar();
    }
    iniciar() {
        this.fondo =
            new Fondo(imagenes.menu_fondo,900*0.5,600*0.5);
    }

    procesarControles( ) {
        // siguiente pantalla
        if (controles.continuar) {
            gameLayer = new GameLayer();
            layer = gameLayer;
            controles.continuar = false;
        }
    }

    dibujar (){
        this.fondo.dibujar();
        this.boton.dibujar();
    }
}
