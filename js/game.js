class Game {
  constructor() {
    this.world = new World();

    this.godButtonElement = document.querySelector('#god-button');
    this.onGodButtonClicked = this.onGodButtonClicked.bind(this);
    this.godButtonElement.addEventListener('click', this.onGodButtonClicked);

    this.onWaterButtonClicked = this.onWaterButtonClicked.bind(this);
    this.waterButtonElement = document.querySelector('#water-button');
    this.waterButtonElement.addEventListener('click', this.onWaterButtonClicked);

    this.onShearButtonClicked = this.onShearButtonClicked.bind(this);
    this.shearButtonElement = document.querySelector('#shear-button');
    this.shearButtonElement.addEventListener('click', this.onShearButtonClicked);
  }

  onGodButtonClicked() {
    this.godButtonElement.classList.add('selected');
    this.waterButtonElement.classList.remove('selected');
    this.shearButtonElement.classList.remove('selected');
    this.world.setMode(GOD_MODE);
  }

  onWaterButtonClicked() {
    this.waterButtonElement.classList.add('selected');
    this.godButtonElement.classList.remove('selected');
    this.shearButtonElement.classList.remove('selected');
    this.world.setMode(WATER_MODE);
  }

  onShearButtonClicked() {
    this.shearButtonElement.classList.add('selected');
    this.waterButtonElement.classList.remove('selected');
    this.godButtonElement.classList.remove('selected');
    this.world.setMode(SHEAR_MODE);
  }


  start() {
    this.world.initialize();
    this.world.draw();
  }
}
