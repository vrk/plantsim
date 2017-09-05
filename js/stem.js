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
    return this.frontier.canBloom(STRAWBERRY_WIDTH, STRAWBERRY_HEIGHT);
  }

  bloom() {
    if (!this.frontier.canBloom(STRAWBERRY_WIDTH, STRAWBERRY_HEIGHT))  {
      return false;
    }
    console.assert(STRAWBERRY_WIDTH === STRAWBERRY_HEIGHT);
    let size = STRAWBERRY_WIDTH;
    if (this.frontier.canBloom(STRAWBERRY_WIDTH + 1, STRAWBERRY_HEIGHT + 1)) {
      size++;
    }
    if (Math.random() < 0.25 && this.frontier.canBloom(STRAWBERRY_WIDTH + 2, STRAWBERRY_HEIGHT + 2)) {
      size++;
    }
    this.frontier.reserveSpaceInRectangle(size - 2, size - 1 - ((size + 1) % 2));
    this.strawberry = new Strawberry(this.frontier, this.canvasGrid, size);
    this.hasStrawberry = true;
    return true;
  }

  grow() {
    if (this.isGrown) {
      return;
    }

    this.totalSteps++;

    if (this.strawberry) {
      if (this.strawberry.isGrown) {
        this.isGrown = true;
        return;
      } else {
        this.strawberry.grow();
      }
    } else {
      const nextNode = this.frontier.growNewNode();
      if (nextNode) {
        if (Math.random() < 0.25) {
          this.frontier.growLeaves();
        }
        this.frontier = nextNode;
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
    const node = this.getFirstViableSproutNode();
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

  isSproutable() {
    if (this.frontier.getValidFrontierNeighbors().length > 0) {
      return true;
    }
    return this.getFirstViableSproutNode() !== null;
  }

  getFirstViableSproutNode() {
    let node = this.frontier;
    while (node) {
      if (node.getValidFrontierNeighbors().length > 0) {
        break;
      }
      node = node.getParent();
    }
    return node;
  }

  getRandomViableSproutNode() {
    let node = this.frontier;
    node = node.getParent();

    const viableNodes = [];
    while (node) {
      if (node.getValidFrontierNeighbors().length > 0) {
        viableNodes.push(node);
      }
      node = node.getParent();
    }
    if (viableNodes.length > 0) {
      const chosen = Math.floor(Math.random() * viableNodes.length);
      return viableNodes[chosen];
    }
    return null;
  }

  colorParentPath() {
    let node = this.frontier;
    node = node.getParent();
    while (node) {
      this.canvasGrid.drawSquare(node.col, node.row, GREEN);
      node = node.getParent();
    }
    return node;
  }

}
