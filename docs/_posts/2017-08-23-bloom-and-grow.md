---
layout: default
title: Bloom and grow
date: 2017-08-23
comments: true
id: 103
---

## <a href="{{ site.baseurl }}{{ page.url }}">{{ page.title }}</a>
#### {{ page.date | date: '%B %d, %Y' }}

I completed my TODOs from yesterday: plants now grow in 4 directions (well, up to 4 directions) and blossom into flowers!

- [Live demo here]({{ site.url }}{{ site.baseurl }}/demos/aug23/index.html): Click click click click click -- after 30ish clicks you'll have a plant with 2-4 flowers!
- [Source code at this point in history](https://github.com/vrk/plantsim/tree/83b5b6cd7438fe925980770cf2abea8dae763454)

Latest video:

<video src="{{ site.url }}{{ site.baseurl }}/assets/videos/4-sprout-grow.mp4" height="300" autoplay loop></video>

🎵 _blossom of snow may you bloom and grow_ 🎵

I guess technically this is grow-and-blooming, but the blooms will turn into strawberries tomorrow, I think!

### Implementation Notes

I chose a straightforward implementation that's slightly broken in the following ways:

1. Sometimes there are less than 4 growing stems:  
<img src="{{ site.url }}{{ site.baseurl }}/assets/images/three-stems.png"/>

2. Sometimes a stem gets stuck and doesn't end up blossoming:  
<img src="{{ site.url }}{{ site.baseurl }}/assets/images/plant-stub.png" />

I think I want to fix issue (1) and possibly also issue (2), but since it's kind of a tricky problem, I decided I won't fix them right away. I'm going to focus on finishing a simple version of the game first. After I get a mostly-good-enough version of that, I'll work on polishing up the grow behavior!

### Console debugging

I also added some debug functions that you can call via the DevTools console:

<img src="{{ site.url }}{{ site.baseurl }}/assets/images/debug-mode.png" />

And I looked up how to [add style](https://davidwalsh.name/add-styles-console) to your console messages! The code is not super elegant:

```
const consoleStyle = 'color: #008751; font-size: 12px';
console.log('%c------------------------------------------------------', consoleStyle);
console.log('%c                Welcome to PLANTSIM', consoleStyle);
console.log('%c------------------------------------------------------', consoleStyle);
console.log('%c  You can use the following commands to debug:', consoleStyle);
const commandStyle = 'color: #FF004D; font-size: 12px';
console.log('%c  > %cworld.debugStep(n)%c: Draw n steps of the plant (must plant seed first)', consoleStyle, commandStyle, consoleStyle);
console.log('%c  > %cworld.bloom()%c: Try to draw flowers at the stems', consoleStyle, commandStyle, consoleStyle);
```

But it's pretty fun!

### TODOs for next time

- Add some decorative leaves and stumps
- Grow the flowers into strawberries
- For Friday (probably): Fiddle with cosmetic improvements, such as guiding the shape of each stem to dip then grow upward
