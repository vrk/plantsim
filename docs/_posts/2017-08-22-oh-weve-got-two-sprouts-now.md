---
layout: default
title: Oh we've got two sprouts now
date: 2017-08-22
comments: true
id: 102
---

## <a href="{{ site.baseurl }}{{ page.url }}">{{ page.title }}</a>
#### {{ page.date | date: '%B %d, %Y' }}

- [Live demo here]({{ site.url }}{{ site.baseurl }}/demos/aug22/index.html): Same as last time: click within the top half of the soil to plant a seed, then keep clicking the `<canvas>` to make the plant grow from the seed! But now with **two (2!)** semi-randomly growing stems.
- [Source code at this point in history](https://github.com/vrk/plantsim/tree/bbd94068bfd1b222a34c4b50dafcb0f1ef5cde6f)

### Implementation Notes

It's really fun to figure out the algorithm for strawberry pixel plant growth! It's being driven from my pixel art, actually. I start drawing a random pixel strawberry plant, then I try to figure out what decisions I'm making as I'm manually making a pretty pixel picture. Then I try to figure out how to code them up!

I rewrote the guts of the `Plant` class today to get both stems growing:
- The `Plant` is composed of different parts, starting with a single `Stalk`.
- When the `Stalk` is fully grown, it [creates two `Stem`s](https://github.com/vrk/plantsim/blob/bbd94068bfd1b222a34c4b50dafcb0f1ef5cde6f/js/plant.js#L24).
- Right now the two `Stem`s will grow and grow and grow until they get stuck, but in the next versions I'll add logic to do the following:
  - a) Make the plant split into 2 more `Stem`s, for a total of 4
  - b) Blossom into flowers after 7-10 steps
  - c) Grow from flowers to strawberries!

At some point I'll also play around with adding little leaves and smaller offshoot stems for appearance.

### Pixel Art Notes

Drew a little more concept art, to help me understand how plants should grow:

<img src="{{ site.url }}{{ site.baseurl }}/assets/images/mock5-strawberries2.png" height="300" />

Also decided on colors for the "unripe" strawberries!

### TODOs for next time

Basically what I wrote in the implementation notes!

- Generate 2 more `Stem`s for a total of 4
- Blossom into flowers after 7-10 steps
  - Perhaps spawn a new `Stem` if one of them get stuck before 7-10 steps
