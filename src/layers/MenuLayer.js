class MenuLayer extends Layer {
    constructor() {
        super();
        this.iniciar();
    }
    iniciar() {
        this.fondo =
            new Fondo(imagenes.menu_fondo,480*0.5,320*0.5);
        this.boton =
            new Boton(imagenes.boton_jugar,480*0.5,320*0.7);
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
