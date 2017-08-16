---
layout: default
title: Plant Sim Begins!
date: 2017-08-16
comments: true
id: 100
---

## Plant Sim Begins!
_August 16, 2017_

### Game design

- Start out a seed
- Water dynamics like [Falling Sand](http://nifty.stanford.edu/2017/feinberg-falling-sand/)
- Plant grows 1px? per day?
  - The plant grows in random directions, depending on space available
- If not watered, parts of the plant will wither and turn brown and fall off
- If healthy and watered: after a certain number of days, the vines flower - flowers turn green, then red
- Optional: Add a sun that can be dragged into different positions, which controls 

### Software design

- Milestone 1: `<canvas>` game with data saved to local storage (and a god mode to control age, etc.)
- Milestone 2: Port game to [PICO-8](https://www.lexaloffle.com/pico-8.php) ???
- Milestone 3: Run the PICO-8 on a Raspberry Pi [with a cute display](https://www.lexaloffle.com/bbs/?tid=3085)

### For tomorrow
- Start coding M1!
  - Decide on game world size
  - Create a canvas with pixel grid
  - Begin generating "complete" vines, as if they had been watered + grown
    - Start with 1 vine, then add branching
  - Flowering + strawberries to come next
