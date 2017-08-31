let colorIndex = 0;

class Stem {
  constructor(col, row, canvasGrid, parent) {
    this.initialNode = new PlantNode(col, row, canvasGrid);
    this.initialNode.setColorIndex(colorIndex);
    this.myColor = colorIndex;
    colorIndex = (colorIndex + 1) % STEM_COLORS.length;
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
    // Prooooobably a more elegant way to do this but :shruggies:
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
    const trajectory = this.frontier.getTrajectory();
  }

  grow() {
    if (this.isGrown) {
      return;
    }
    this.totalSteps++;

    const nextNode = this.frontier.growNewNode();
    if (nextNode) {
      this.frontier = nextNode;
      let trajectory = 'unknown';
      switch(this.frontier.getTrajectory()) {
        case TRAVEL_UP:
          trajectory = 'up';
          break;
        case TRAVEL_RIGHT:
          trajectory = 'right';
          break;
        case TRAVEL_DOWN:
          trajectory = 'down';
          break;
        case TRAVEL_LEFT:
          trajectory = 'left';
          break;
      }
      this.printDebug(`trajectory: ${trajectory}`);
      this.frontier.canBloom();
    } else {
      this.isGrown = true;
    }
  }

  printDebug(message) {
    const colorChoice = STEM_COLORS[this.myColor];
    const highlightStyle = `color: ${colorChoice.secondary}; background-color: ${colorChoice.primary};`;
    console.log('%c' + message, highlightStyle);
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
        newStem.setOnNewStemCallback(this.onNewStems);
        this.onNewStems(newStem);
      }
    }
  }
}
