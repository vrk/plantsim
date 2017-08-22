class Stem {
  constructor(col, row, canvasGrid) {
    this.initialCol = col;
    this.initialRow = row;
    this.frontierCol = col;
    this.frontierRow = row;
    this.isGrown = false;
    this.canvasGrid = canvasGrid;
    this.totalSteps = 0;

    this.direction = null
  }

  setConstraints(nudge) {
    this.direction = nudge;
    this.maxRow = this.initialRow + 3;
    if (nudge === LEAN_LEFT) {
      console.log('left-leaning');
      this.maxCol = this.initialCol;
    } else if (nudge === LEAN_RIGHT) {
      this.minCol = this.initialCol;
      console.log('right-leaning');
      this.constraints = {};
    }
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
    } else {
      this.isGrown = true;
    }
  }

  filterByConstraints(spaces) {
    const filteredSpaces = [];
    for (const space of spaces) {
      if (this.direction === LEAN_LEFT && space.col > this.frontierCol) {
        continue;
      }
      if (this.direction === LEAN_RIGHT && space.col < this.frontierCol) {
        continue;
      }
      // Violates max col constraint.
      if (this.maxCol && space.col > this.maxCol) {
        console.log('violates max col');
        continue;
      }

      // Violates min col constraint.
      if (this.minCol && space.col < this.minCol) {
        console.log('violates min col');
        continue;
      }

      // Violates max row constraint.
      if (this.maxRow && space.row > this.maxRow) {
        console.log('violates max row');
        continue;
      }
      // Passes all constraints!
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
