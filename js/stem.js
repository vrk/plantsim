class Stem {
  constructor(col, row, canvasGrid, parent) {
    this.initialNode = new PlantNode(col, row, canvasGrid);
    this.frontier = this.initialNode;
    this.canvasGrid = canvasGrid;

    this.isGrown = false;
    this.totalSteps = 0;
    this.hasReachedEdge = false;
    this.direction = null;
    this.hasSprouted = false;
  }

  setConstraints(nudge, opt_colBound) {
    this.direction = nudge;
    if (nudge === LEAN_LEFT) {
      this.maxCol = opt_colBound || this.initialCol;
      this.minRow = this.initialRow - 3;
    } else if (nudge === LEAN_RIGHT) {
      this.minCol = opt_colBound ||this.initialCol;
      this.minRow = this.initialRow - 3;
    } else if (nudge === LEAN_LEFT_MIDDLE) {
      this.maxCol = opt_colBound || this.initialCol;
    } else if (nudge === LEAN_RIGHT_MIDDLE) {
      this.minCol = opt_colBound || this.initialCol;
    }
  }

  setOnNewStemCallback(onNewStems) {
    this.onNewStems = onNewStems;
  }

  bloom() {
    if (!this.canBloom()) {
      return;
    }

    this.isGrown = true;

    // Set center to yellow.
    this.canvasGrid.update(this.frontierCol, this.frontierRow, BRIGHT_YELLOW);
    // Draw petals around the center.
    this.canvasGrid.update(this.frontierCol - 1, this.frontierRow, PICO_WHITE);
    this.canvasGrid.update(this.frontierCol + 1, this.frontierRow, PICO_WHITE);
    this.canvasGrid.update(this.frontierCol, this.frontierRow - 1, PICO_WHITE);
    this.canvasGrid.update(this.frontierCol, this.frontierRow + 1, PICO_WHITE);

    // Randomly choose two diagonal corners for the petals.
    // Prooooobably a more elegant way to do this but :shruggie_emoji:
    const options = [
      { colDelta: -1, rowDelta: -1 },
      { colDelta: -1, rowDelta: 1 },
      { colDelta: 1, rowDelta: -1 },
      { colDelta: 1, rowDelta: 1 }
    ];
    const petalIndex1 = Math.floor(Math.random() * options.length);
    const petal1 = options.splice(petalIndex1, 1)[0];
    const petalIndex2 = Math.floor(Math.random() * options.length);
    const petal2 = options.splice(petalIndex2, 1)[0];

    this.canvasGrid.update(this.frontierCol + petal1.colDelta, this.frontierRow + petal1.rowDelta, GREEN);
    this.canvasGrid.update(this.frontierCol + petal2.colDelta, this.frontierRow + petal2.rowDelta, GREEN);
  }

  canBloom() {
    // Check to see if there's space all around the edge
    for (let xDelta = -1; xDelta <= 1; xDelta++) {
      for (let yDelta = -1; yDelta <= -1; yDelta++) {

        const potential = {
          col: this.frontierCol + xDelta,
          row: this.frontierRow + yDelta
        };
        if (!this.canvasGrid.isInBounds(potential.col, potential.row)) {
          return false;
        }
      }
    }
    return true;
  }

  grow() {
    if (this.isGrown) {
      return;
    }
    this.totalSteps++;

    const nextNode = this.frontier.growNewNode();
    if (nextNode) {
      this.frontier = nextNode;
    } else {
      this.isGrown = true;
    }
  }

  sproutNewStem() {
    console.log('new stem!');
    let node = this.frontier;
    node = node.getParent();
    while (node) {
      if (node.getValidFrontierNeighbors().length > 0) {
        break;
      }
      node = node.getParent();
    }
    if (node) {
      const newNode = node.growNewNode();
      if (newNode) {
        const newStem =
                new Stem(newNode.col, newNode.row, this.canvasGrid, node);
        console.log('new node!');
        newStem.setOnNewStemCallback(this.onNewStems);
        this.onNewStems(newStem);
      }
    }
  }
}
