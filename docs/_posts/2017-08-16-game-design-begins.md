---
layout: default
title: Plant Sim Begins!
date: 2017-08-16
comments: true
id: 100
---

## <a href="{{ site.baseurl }}{{ page.url }}">{{ page.title }}</a>
#### {{ page.date | date: '%B %d, %Y' }}

I'm creating a game I'm temporarily calling **Plant Sim**\*, which lets you plant a strawberry plant from seed and follow its growth!

It's like a [Tamagotchi](https://en.wikipedia.org/wiki/Tamagotchi), but with a strawberry plant: if you water the plant daily, you'll see it grow! You'll get a score that reflects how healthy and happy your plant is.

The plant will grow in random directions, depending on watering + space available (and maybe the sun). No two plants will be the same!

*\*argh I really need a better name.*

### Mock plants

I drew these by hand in PICO-8's sprite editor:

<img src="{{ site.url }}{{ site.baseurl }}/assets/images/mock1-seed.png" height="300" />
<img src="{{ site.url }}{{ site.baseurl }}/assets/images/mock2-sprout.png" height="300" />
<img src="{{ site.url }}{{ site.baseurl }}/assets/images/mock3-flowers.png" height="300" />
<img src="{{ site.url }}{{ site.baseurl }}/assets/images/mock4-strawberries.png" height="300" />

### Vague game ideas

- Start out a seed
- Plant grows 1px? per day?
  - The plant grows in random directions, depending on space available
- Water the plant by clicking the area of the screen above the plant
  - Water dynamics like [Falling Sand](http://nifty.stanford.edu/2017/feinberg-falling-sand/)
- If not watered, parts of the plant will wither and turn brown and fall off
- If healthy and watered: after a certain number of days, the vines flower - flowers turn green, then red
- Optional: Add a sun that can be dragged into different positions, which controls 

### Software design

- Milestone 1: `<canvas>` game with data saved to local storage (and a god mode to control age, etc.)
- Milestone 2: Port game to [PICO-8](https://www.lexaloffle.com/pico-8.php) ???
- Milestone 3: Run the PICO-8 on a Raspberry Pi [with a cute display](https://www.lexaloffle.com/bbs/?tid=3085)

---

### For tomorrow
- Start coding M1!
  - Decide on game world size
  - Create a canvas with pixel grid
  - Begin generating "complete" vines, as if they had been watered + grown
    - Start with 1 vine, then add branching
  - Flowering + strawberries to come next
