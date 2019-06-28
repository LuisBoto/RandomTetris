class Board {
    constructor(height, width) {
        this.height = height;
        this.width = width;
        this.mainBoard = bool[width][height];
        this.auxBoard = bool[width][height];
    }
}

