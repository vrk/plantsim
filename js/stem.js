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

    this.strawberry = null;
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

  canBloom() {
    return this.frontier.canBloom();
  }

  bloom() {
    console.assert(this.frontier.canBloom());
    this.strawberry = new Strawberry(this.frontier, this.canvasGrid);
    this.hasStrawberry = true;
  }

  grow() {
    if (this.isGrown) {
      return;
    }
    this.totalSteps++;

    if (this.strawberry) {
      this.strawberry.grow();
    } else {
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
      } else {
        this.isGrown = true;
      }
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
