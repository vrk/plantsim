class Stem {
  constructor(col, row, canvasGrid) {
    this.frontierCol = col;
    this.frontierRow = row;
    this.isGrown = false;
    this.canvasGrid = canvasGrid;
  }

  grow() {
    if (this.isGrown) {
      return;
    }

    const spaces = this.getValidFrontierNeighbors();
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
          console.log(`first level occupied: ${potential.col}, ${potential.row}`);
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
          console.log(`second level occupied: ${neighbor.col}, ${neighbor.row}`);
          return false;
        }
      }
    }
    return true;
  }
}
