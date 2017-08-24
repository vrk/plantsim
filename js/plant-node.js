let counter = 0;
class PlantNode {
  constructor(col, row, canvasGrid, parent, parentIndex) {
    // PlantNode[] neighbors
    this.neighbors =
    [null, null, null,
     null, null,
     null, null, null];

    // PlantNode parent
    if (parent) {
      this.parentIndex = parentIndex;
      this.neighbors[parentIndex] = parent;
    }

    this.col = col;
    this.row = row;

    this.canvasGrid = canvasGrid;
  }

  // Returns a new random PlantNode that is connected to the current node.
  // Returns null if no new PlantNode could be grown.
  growNewNode() {
    const spaces = this.getValidFrontierNeighbors();
    if (spaces.length === 0) {
      return null;
    }

    const index = Math.floor(Math.random() * spaces.length);
    const deltas = this.getRowColDeltaFromIndex(spaces[index]);
    const newCol = this.col + deltas.colDelta;
    const newRow = this.row + deltas.rowDelta;

    this.canvasGrid.update(this.col, this.row, DARK_GREEN);
    this.canvasGrid.update(newCol, newRow, GREEN);

    const newNodeParentIndex = this.getParentIndex(index);
    const newNode = new PlantNode(
        newCol, newRow, this.canvasGrid, this, newNodeParentIndex);
    this.neighbors[index] = newNode;
    //newNode.drawFrontierNodes();

    return newNode;
  }

  drawFrontierNodes() {
    counter++;
    const spaces = this.getValidFrontierNeighbors();
    const color = counter % 2 === 1 ? '#FF77A8' : '#FF004D';
    for (const space of spaces) {
      const deltas = this.getRowColDeltaFromIndex(space);

      const neighborCol = this.col + deltas.colDelta;
      const neighborRow = this.row + deltas.rowDelta;
      this.canvasGrid.drawSquare(neighborCol, neighborRow, color);
    }
  }

  getParentIndex(nodeIndex) {

    //  * * *
    //  * . *
    //  * * *

    switch(nodeIndex) {
      case TOP_LEFT:
        return BOTTOM_RIGHT;
      case TOP_MIDDLE:
        return BOTTOM_MIDDLE;
      case TOP_RIGHT:
        return BOTTOM_LEFT;

      case MIDDLE_LEFT:
        return MIDDLE_RIGHT;
      case MIDDLE_RIGHT:
        return MIDDLE_LEFT;

      case BOTTOM_LEFT:
        return TOP_RIGHT;
      case BOTTOM_MIDDLE:
        return TOP_MIDDLE;
      case BOTTOM_RIGHT:
        return TOP_LEFT;
    }
  }


  getRowColDeltaFromIndex(nodeIndex) {
    let colDelta = 0;
    // Handle col position
    switch(nodeIndex) {
      case TOP_LEFT:
      case MIDDLE_LEFT:
      case BOTTOM_LEFT:
        colDelta--;
        break;
      case TOP_RIGHT:
      case MIDDLE_RIGHT:
      case BOTTOM_RIGHT:
        colDelta++;
        break;
    }

    let rowDelta = 0;
    // Handle row position
    switch(nodeIndex) {
      case TOP_LEFT:
      case TOP_MIDDLE:
      case TOP_RIGHT:
        rowDelta--;
        break;
      case BOTTOM_LEFT:
      case BOTTOM_MIDDLE:
      case BOTTOM_RIGHT:
        rowDelta++;
        break;
    }

    return { colDelta, rowDelta };
  }

  getValidFrontierNeighbors() {
    const spaces = [];
    for (const position of ALL_NODE_INDICES) {
      const deltas = this.getRowColDeltaFromIndex(position);

      const neighborCol = this.col + deltas.colDelta;
      const neighborRow = this.row + deltas.rowDelta;

      const potential = {
        col: neighborCol,
        row: neighborRow
      };

      if (!this.canvasGrid.isInBounds(neighborCol, neighborRow)) {
        continue;
      }

      if (this.canvasGrid.isOccupied(neighborCol, neighborRow)) {
        continue;
      }

      if (!this.hasSpaceForGrowth(potential, this.col, this.row)) {
        continue;
      }

      // Passes all checks! Add to spaces.
      spaces.push(position);
    }
    return spaces;
  }

  hasSpaceForGrowth(potential, parentCol, parentRow) {
    for (const position of ALL_NODE_INDICES) {
      const deltas = this.getRowColDeltaFromIndex(position);
      const neighborCol = potential.col + deltas.colDelta;
      const neighborRow = potential.row + deltas.rowDelta;

      // Ignore where you came from.
      if (neighborCol === parentCol && neighborRow === parentRow) {
        continue;
      }

      if (this.canvasGrid.isOccupied(neighborCol, neighborRow)) {
        return false;
      }
    }
    return true;
  }
}
