const game = new Game();
game.start();

const consoleStyle = 'color: #008751; font-size: 12px';
console.log('%c------------------------------------------------------', consoleStyle);
console.log('%c                Welcome to PLANTSIM', consoleStyle);
console.log('%c------------------------------------------------------', consoleStyle);
console.log('%c  You can use the following commands to debug:', consoleStyle);
const commandStyle = 'color: #FF004D; font-size: 12px';
console.log('%c  > %cworld.debugStep(n)%c: Draw n steps of the plant (must plant seed first)', consoleStyle, commandStyle, consoleStyle);
console.log('%c  > %cworld.bloom()%c: Try to draw flowers at the stems', consoleStyle, commandStyle, consoleStyle);
