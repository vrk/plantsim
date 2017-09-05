const PIXELS_WIDE = 64;
const CANVAS_SIZE = 640;
const PIXEL_SIZE = CANVAS_SIZE / PIXELS_WIDE;
const GROUND_HEIGHT = 16;

const DARK_GREEN = '#008751';
const GREEN = '#00E436';
const SEED_YELLOW = '#FFA300';
const BRIGHT_YELLOW = '#FFEC27';
const PICO_WHITE = '#FFF1E8';

const YOUNG_STRAWBERRY = '#FFCCAA';
const RED_STRAWBERRY = '#FF004D';
const PINK_STRAWBERRY = '#FF77A8';

const GROUND_LEVEL = PIXELS_WIDE -  GROUND_HEIGHT;
const SPROUT_POINT = GROUND_LEVEL - 4;

const LEAN_LEFT = Symbol('stem leans left');
const LEAN_RIGHT = Symbol('stem leans right');
const LEAN_LEFT_MIDDLE = Symbol('stem leans left and up');
const LEAN_RIGHT_MIDDLE = Symbol('stem leans right and up');


// Indexes into the PlantNodes array
const TOP_LEFT = 0;
const TOP_MIDDLE = 1;
const TOP_RIGHT = 2;
const MIDDLE_LEFT = 3;
const MIDDLE_RIGHT = 4;
const BOTTOM_LEFT = 5;
const BOTTOM_MIDDLE = 6;
const BOTTOM_RIGHT = 7;

const STRAWBERRY_HEIGHT = 5;
const STRAWBERRY_WIDTH = 5;

const SMALL_SIZE = 5;
const MEDIUM_SIZE = 6;
const LARGE_SIZE = 7;

// Set to an even number for even growth
const MAX_ACTIVE_STEMS = 6;

const ALL_NODE_INDICES = [
  TOP_LEFT,
  TOP_MIDDLE,
  TOP_RIGHT,
  MIDDLE_LEFT,
  MIDDLE_RIGHT,
  BOTTOM_LEFT,
  BOTTOM_MIDDLE,
  BOTTOM_RIGHT
];

const TRAVEL_UP = 0;
const TRAVEL_RIGHT = 1;
const TRAVEL_DOWN = 2;
const TRAVEL_LEFT = 3;
const TRAVEL_LEFT_UP = 4;
const TRAVEL_LEFT_DOWN = 5;
const TRAVEL_RIGHT_UP = 6;
const TRAVEL_RIGHT_DOWN = 7;

const BLOOM_STEPS = 5;

const STEM_COLORS = [
  {
    primary: DARK_GREEN,
    secondary: GREEN
  },
  {
    primary: '#7bacec',
    secondary: '#c6ebff'
  },
  {
    primary: '#de669c',
    secondary: '#f49bb3'
  },
  {
    primary: '#ffcb37',
    secondary: '#f0881f'
  },
  {
    primary: '#b6957c',
    secondary: '#d8bc99'
  },
  {
    primary: '#905860',
    secondary: '#d2c4cb'
  }
];
