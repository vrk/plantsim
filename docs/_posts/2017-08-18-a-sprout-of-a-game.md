---
layout: default
title: A sprout of a game
date: 2017-08-18
comments: true
id: 101
---

## <a href="{{ site.baseurl }}{{ page.url }}">{{ page.title }}</a>
#### {{ page.date | date: '%B %d, %Y' }}

Wooooo, I started coding!

- [Live demo here]({{ site.url }}{{ site.baseurl }}/demos/aug17/index.html): Click within the top half of the soil to plant a seed, then keep clicking the `<canvas>` to make the plant grow from the seed! It'll grow in a different random walk each time.
- [Source code at this point in history](https://github.com/vrk/plantsim/tree/1e3086acc75adb8c7d666378514624b4090eb7db)

And here's a video of the action:

<video src="{{ site.url }}{{ site.baseurl }}/assets/videos/plant-grow.mp4" height="300" autoplay loop></video>

The actual game will not involve clicking a canvas to make the plant grow - you'll need to give it water and love and attention etc. But I'm going with this for now, just to get the random generation part working.

### Implementation Notes

- I'm just coding everything in raw HTML, CSS and JavaScript (ES6+), using `canvas` and `fillRect`.
- I made this [`CanvasGrid`](https://github.com/vrk/plantsim/blob/1e3086acc75adb8c7d666378514624b4090eb7db/js/canvas-grid.js) object that keeps track of each "pixel" of the world, then different objects (such as [`Plant`](https://github.com/vrk/plantsim/blob/1e3086acc75adb8c7d666378514624b4090eb7db/js/plant.js) and [`Ground`](https://github.com/vrk/plantsim/blob/1e3086acc75adb8c7d666378514624b4090eb7db/js/ground.js)) update it. We'll see if this structure works long-term.
- Hehe object-oriented design for games is fun. You have code [like this](https://github.com/vrk/plantsim/blob/1e3086acc75adb8c7d666378514624b4090eb7db/js/world.js#L28), where `ground.addSeed` returns a `Plant` :)

### Pixel Art Notes

The art of this game is important to me (and to the game!), but I'm very new to pixel art. I found [MortMort](https://www.youtube.com/channel/UCsn9MzwyPKeCE6MEGtMU4gg)'s YouTube channel super helpful for tips on creating pixel drawings, esp this video:

<iframe width="480" height="270" src="https://www.youtube.com/embed/gW1G_FLsuEs?rel=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>

I've already incorporated the "Avoiding doubles" tip in my plant generation, for a smoother pixel line. I think on Monday I'll try to incorporate his "Avoid jaggies" suggestion as well.

### Presentation

- I also gave a little presentation on Thursday on "Beginning" a project, for the beginner-themed Thursday presentations.
- lol rambled too much about Tamagotchis and the "millenials and plants" phenomenon to get to much _actual_ content, but it was fun! Giving a talk was a nice way to force me to make some progress on the game, haha, and it sparked some super fun conversations afterward.
- ([Sparse slides here](https://docs.google.com/presentation/d/1ZibJ7lA2lLQ4fQMFGMlAGcARnvbOYZY3IShjKJMQKJU/edit#slide=id.p), if you insist)

### For Monday
- Decide how vines should split
- Avoid [Jaggies](https://www.youtube.com/embed/gW1G_FLsuEs) when growing vines
- Implement!
