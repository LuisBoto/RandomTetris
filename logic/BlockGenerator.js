class BlockGenerator {
    constructor(maxHeight, maxWidth, maxPieces) {
        this.maxH = maxHeight;
        this.maxW = maxWidth;
        //maxPieces dictates max block size
        this.maxPieces = maxPieces;
    }

    /*
    * This method will generate a random block piece by piece on a
    * maxHeight-X-maxWidth grid and return the final bool matrix representing it
    */
    generateBlock() {
        var block = bool[this.maxW][this.maxH];
        var pieces = 0;
        var lastPiece;
        while (pieces<this.maxPieces) {
            if (pieces == 0) {
                //Create the initial piece
                block[this.maxW/2][this.maxH/2] = true;
                lastPiece.width = this.maxW/2;
                lastPiece.height = this.maxH/2;
                pieces++;
            } else {
                var rnd = Math.random()*10;
                if (rnd >= 5) {
                    //Diagonal movement
                    rnd = Math.random()*10;
                    switch (rnd) {
                        case (rnd<2.5):
                            if (lastPiece.width-1 >= 0 && lastPiece.height-1 >= 0) {
                                block[lastPiece.width-1][lastPiece.height-1] = true;
                                lastPiece.width =  lastPiece.width-1;
                                lastPiece.height = lastPiece.height-1;
                                pieces++;
                            }
                            break;
                        case (rnd>=2.5 && rnd <5):
                            if (lastPiece.width+1 < this.maxW && lastPiece.height+1 < this.maxH) {
                                block[lastPiece.width+1][lastPiece.height+1] = true;
                                lastPiece.width =  lastPiece.width+1;
                                lastPiece.height = lastPiece.height+1;
                                pieces++;
                            }
                            break;
                        case (rnd>=5 && rnd <7.5):
                            if (lastPiece.width+1 < this.maxW && lastPiece.height-1 >= 0) {
                                block[lastPiece.width+1][lastPiece.height-1] = true;
                                lastPiece.width =  lastPiece.width+1;
                                lastPiece.height = lastPiece.height-1;
                                pieces++;
                            }
                            break;
                        case (rnd>7.5):
                            if (lastPiece.width-1 >= 0 && lastPiece.height+1 < this.maxH) {
                                block[lastPiece.width-1][lastPiece.height+1] = true;
                                lastPiece.width =  lastPiece.width-1;
                                lastPiece.height = lastPiece.height+1;
                                pieces++;
                            }
                            break;
                    }
                } else {
                    //Straight movement
                    rnd = Math.random()*10;
                    switch (rnd) {
                        case (rnd<2.5):
                            if (lastPiece.width-1 >= 0) {
                                block[lastPiece.width-1][lastPiece.height] = true;
                                lastPiece.width =  lastPiece.width-1;
                                pieces++;
                            }
                            break;
                        case (rnd>=2.5 && rnd <5):
                            if (lastPiece.width+1 < this.maxW) {
                                block[lastPiece.width+1][lastPiece.height] = true;
                                lastPiece.width =  lastPiece.width+1;
                                pieces++;
                            }
                            break;
                        case (rnd>=5 && rnd <7.5):
                            if (lastPiece.height-1 >= 0) {
                                block[lastPiece.width][lastPiece.height-1] = true;
                                lastPiece.height = lastPiece.height-1;
                                pieces++;
                            }
                            break;
                        case (rnd>7.5):
                            if (lastPiece.height+1 < this.maxH) {
                                block[lastPiece.width][lastPiece.height+1] = true;
                                lastPiece.height = lastPiece.height+1;
                                pieces++;
                            }
                            break;
                    }
                }
            }
        }
        return block;
    }
}