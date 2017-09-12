class Game {
  constructor() {
    this.world = new World();

    this.godButtonElement = document.querySelector('#god-button');
    this.onGodButtonClicked = this.onGodButtonClicked.bind(this);
    this.godButtonElement.addEventListener('click', this.onGodButtonClicked);

    this.onWaterButtonClicked = this.onWaterButtonClicked.bind(this);
    this.waterButtonElement = document.querySelector('#water-button');
    this.waterButtonElement.addEventListener('click', this.onWaterButtonClicked);
  }

  onGodButtonClicked() {
    console.log('god clicked');
    this.godButtonElement.classList.add('selected');
    this.waterButtonElement.classList.remove('selected');
    this.world.setIsActive(true);
  }

  onWaterButtonClicked() {
    console.log('water clicked');
    this.waterButtonElement.classList.add('selected');
    this.godButtonElement.classList.remove('selected');
    this.world.setIsActive(false);
  }

  start() {
    this.world.initialize();
    this.world.draw();
  }
}
