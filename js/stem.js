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

  setConstraints(nudge) {
    this.direction = nudge;
    this.minRow = this.initialRow - 3;
    if (nudge === LEAN_LEFT) {
      this.maxCol = this.initialCol;
    } else if (nudge === LEAN_RIGHT) {
      this.minCol = this.initialCol;
    }
  }

  setOnNewStemCallback(onNewStems) {
    this.onNewStems = onNewStems;
  }

  grow() {
    if (this.isGrown) {
      return;
    }

    this.totalSteps++;

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

      if (this.totalSteps > 7) {
        this.hasSprouted = true;
        const newStem = new Stem(this.sproutCol, this.sproutRow, this.canvasGrid);
        if (this.onNewStems) {
          this.onNewStems(newStem);
        }
      }
    }
  }

  filterByConstraints(spaces) {
    const filteredSpaces = [];
    for (const space of spaces) {
      // This is a dead-end so ignore.
      // TODO: Ignore all deadends?
      if (space.col === this.frontierCol && space.row === GROUND_LEVEL - 2) {
        continue;
      }

      if (space.col === this.frontierCol && space.row === this.minRow) {
        continue;
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
    for (let xDelta = -1; xDelta <= 1; xDelta++) {
      for (let yDelta = -1; yDelta <= 1; yDelta++) {
        // Ignore current frontier.
        if (yDelta === 0 && xDelta === 0) {
          continue;
        }

        const potential = {
          col: this.frontierCol + xDelta,
          row: this.frontierRow + yDelta
        };
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
