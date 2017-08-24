const PIXELS_WIDE = 64;
const CANVAS_SIZE = 640;
const PIXEL_SIZE = CANVAS_SIZE / PIXELS_WIDE;
const GROUND_HEIGHT = 16;

const DARK_GREEN = '#008751';
const GREEN = '#00E436';
const SEED_YELLOW = '#FFA300';
const BRIGHT_YELLOW = '#FFEC27';
const PICO_WHITE = '#FFF1E8';

const GROUND_LEVEL = PIXELS_WIDE -  GROUND_HEIGHT;
const SPROUT_POINT = GROUND_LEVEL - 4;

const LEAN_LEFT = Symbol('stem leans left');
const LEAN_RIGHT = Symbol('stem leans right');
const LEAN_LEFT_MIDDLE = Symbol('stem leans left and up');
const LEAN_RIGHT_MIDDLE = Symbol('stem leans right and up');


// Indexces into the PlantNodes array
const TOP_LEFT = 0;
const TOP_MIDDLE = 1;
const TOP_RIGHT = 2;
const MIDDLE_LEFT = 3;
const MIDDLE_RIGHT = 4;
const BOTTOM_LEFT = 5;
const BOTTOM_MIDDLE = 6;
const BOTTOM_RIGHT = 7;
