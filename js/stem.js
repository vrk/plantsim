class Stem {
  constructor(col, row, canvasGrid) {
    this.initialCol = col;
    this.initialRow = row;
    this.frontierCol = col;
    this.frontierRow = row;
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
    if (this.totalSteps > 10) {
      this.bloom();
    }

    let spaces = this.getValidFrontierNeighbors();
    spaces = this.filterByConstraints(spaces);
    const index = Math.floor(Math.random() * spaces.length);
    if (spaces.length > 0) {
      this.canvasGrid.update(this.frontierCol, this.frontierRow, DARK_GREEN);
      this.frontierCol = spaces[index].col;
      this.frontierRow = spaces[index].row;
      this.canvasGrid.update(this.frontierCol, this.frontierRow, GREEN);

      if (this.direction === LEAN_LEFT && this.frontierCol === 1 ||
          this.direction === LEAN_RIGHT && this.frontierCol === PIXELS_WIDE - 2) {
        this.hasReachedEdge = true;
      }
    } else {
      this.isGrown = true;
    }

    if (!this.hasSprouted) {
      // Save potential sprout point
      if (!this.sproutCol) {
        this.sproutCol = this.frontierCol;
        this.sproutRow = this.frontierRow;
      } else {
        // Save the highest point we've seen.
        if (this.frontierRow < this.sproutRow) {
          this.sproutCol = this.frontierCol;
          this.sproutRow = this.frontierRow;
        }
      }

      if (this.totalSteps > 4 && this.onNewStems) {
        this.hasSprouted = true;
        const newStem = new Stem(this.sproutCol, this.sproutRow, this.canvasGrid);
        if (this.direction === LEAN_LEFT) {
          newStem.setConstraints(LEAN_LEFT_MIDDLE, this.initialCol + 1);
        } else {
          console.assert(this.direction === LEAN_RIGHT);
          newStem.setConstraints(LEAN_RIGHT_MIDDLE, this.initialCol - 1);
        }
        this.onNewStems(newStem);
      }
    }
  }

  filterByConstraints(spaces) {
    const filteredSpaces = [];
    for (const space of spaces) {
      // Ignore deadends.
      if (space.col === this.frontierCol) {
        if (space.row === GROUND_LEVEL - 2) {
          continue;
        }
        if (space.row === this.minRow || space.row === this.maxRow) {
          continue;
        }
      }

      if (space.row === this.frontierRow) {
        if (space.col === this.minCol || space.col === this.maxCol) {
          continue;
        }
      }

      if (!this.hasReachedEdge) {
        if (this.direction === LEAN_LEFT && space.col > this.frontierCol) {
          continue;
        }
        if (this.direction === LEAN_RIGHT && space.col < this.frontierCol) {
          continue;
        }
        // Violates max col constraint.
        if (this.maxCol && space.col > this.maxCol) {
          continue;
        }

        // Violates min col constraint.
        if (this.minCol && space.col < this.minCol) {
          continue;
        }

        // Violates min row constraint.
        if (this.minRow && space.row < this.minRow) {
          continue;
        }
      }
      filteredSpaces.push(space);
    }
    return filteredSpaces;
  }

  getValidFrontierNeighbors() {
    const spaces = [];
    let endY = 1;
    if (this.direction === LEAN_LEFT_MIDDLE ||
      this.direction === LEAN_RIGHT_MIDDLE) {
      endY = 0;
    }
    for (let xDelta = -1; xDelta <= 1; xDelta++) {
      for (let yDelta = -1; yDelta <= endY; yDelta++) {
        // Ignore current frontier.
        if (yDelta === 0 && xDelta === 0) {
          continue;
        }

        const potential = {
          col: this.frontierCol + xDelta,
          row: this.frontierRow + yDelta
        };

        if (!this.canvasGrid.isInBounds(potential.col, potential.row)) {
          continue;
        }
        if (this.canvasGrid.isOccupied(potential.col, potential.row)) {
          continue;
        }

        if (!this.hasSpaceForGrowth(potential)) {
          continue;
        }

        // Passes all checks! Add to spaces.
        spaces.push(potential);
      }
    }
    return spaces;
  }

  hasSpaceForGrowth(potential) {
    for (let xDelta = -1; xDelta <= 1; xDelta++) {
      for (let yDelta = -1; yDelta <= 1; yDelta++) {
        // Ignore current space.
        if (yDelta === 0 && xDelta === 0) {
          continue;
        }

        const neighbor = {
          col: potential.col + xDelta,
          row: potential.row + yDelta
        };

        // Ignore where you came from.
        if (neighbor.col === this.frontierCol && neighbor.row === this.frontierRow) {
          continue;
        }

        if (this.canvasGrid.isOccupied(neighbor.col, neighbor.row)) {
          return false;
        }
      }
    }
    return true;
  }
}
