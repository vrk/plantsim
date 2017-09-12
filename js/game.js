class Game {
  constructor() {
    this.world = new World();
  }

  start() {
    this.world.initialize();
    this.world.draw();
  }
}
