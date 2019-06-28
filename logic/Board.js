class Board {
    constructor(height, width) {
        if (height <20 || width<10)
            console.log("Throw an exception here...");
        this.height = height;
        this.width = width;
        this.mainBoard = bool[width][height];
        this.auxBoard = bool[width][height];
        this.maxBlockHeight = 8;
        this.maxBlockWidth = 8;
        this.maxBlockPieces = 6;
        this.blockGenerator = new BlockGenerator(this.maxBlockHeight, this.maxBlockWidth, this.maxBlockPieces);
    }

    spawnBlock() {
        var block = this.blockGenerator.generateBlock();

    }


}

