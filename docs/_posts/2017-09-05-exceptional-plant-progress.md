---
layout: default
title: Exceptional plant progress
date: 2017-09-05
comments: true
id: 104
---

## <a href="{{ site.baseurl }}{{ page.url }}">{{ page.title }}</a>
#### {{ page.date | date: '%B %d, %Y' }}

- [Live demo here]({{ site.url }}{{ site.baseurl }}/demos/sept05/index.html): generate some strawberry plants!
- [Source code at this point in history](https://github.com/vrk/plantsim/tree/5a1c126a31688cd8ce6703fc030c473bdec8762b)

Latest video, plant timelapse:

<video src="{{ site.url }}{{ site.baseurl }}/assets/videos/plant-timelapse.mp4" height="300" controls autoplay muted loop></video>

SO MUCH PROGRESS since the last update!!

### Implementation Notes

A few weeks ago, I had been struggling with exactly what data structure to use for the plant. It *felt* like the NxN grid was the wrong data structure -- code was hard to write, the abstraction just didn't feel quite right, etc. I wanted something that could more properly represent each "node" of plant, and I wanted something that contained pointers to the next node(s) of the plant, and a pointer to the parent node...

And then I realized...

Clearly the right data structure was a TREE!

<img src="{{ site.url }}{{ site.baseurl }}/assets/images/tree-data-structure.jpg" height="500" />

- The plant is now represented as a 7-ary tree, where each node of the tree maps to a "plant pixel".
- Every plant pixel can be connected to another pixel in 8 directions, but it's a 7-ary tree because one of these directions will be the parent pointer, and then 7 child pointers, many of which will be null.
- The `PlantNode` looks basically like this:
  ```
  PlantNode {
    PlantNode[8] nodes;
    int parentIndex;
  }

  const TOP_LEFT = 0;
  const TOP_MIDDLE = 1;
  const TOP_RIGHT = 2;
  const MIDDLE_LEFT = 3;
  const MIDDLE_RIGHT = 4;
  const BOTTOM_LEFT = 5;
  const BOTTOM_MIDDLE = 6;
  const BOTTOM_RIGHT = 7;
  ```
  - `nodes` is an array of `PlantNode` references that are connected to the current node. The `nodes` array is ordered consistently, where the 0th index represents the `TOP_LEFT` space, the 1st index represents the `TOP_MIDDLE` space, etc.
  - The `parentIndex` indicates which of the `nodes` references is the parent node.
- The canvas is still represented as an NxN grid, and the plant tree checks against the canvas to see where it is possible to grow in that space

Once I got the plant represented as a 7-ary tree (and once I finally got all the bugs out...), the rest of the code was pretty straightforward, though it's not too pretty.

Things I could (but probably won't) clean up later:
- Code redundancy between the 4 orientations of strawberry
- Smarten up some of the arbitrary growth heuristics (e.g. when strawberries bloom)

### A fun intermediate stage

When I was playing around with plant growth algorithms, I made this happen:

<video src="{{ site.url }}{{ site.baseurl }}/assets/videos/greenery-growth.mp4" height="300" loop controls></video>

Didn't stick with this algorithm, but it's fun to watch!

- ([play with it live!]({{ site.url }}{{ site.baseurl }}/demos/aug28/index.html))

### Console debugging

I was having trouble getting my 7-ary tree working perfectly, and honestly what I *should* have done was written a unit test for the `PlantNode` data structure itself. Had I gone that direction from the beginning, I am certain it would have saved me time. But that's not what I did!

Instead, I mostly suffered through print-statement debugging, until I realized that the tree growth would be easier to "see" with a little bit of color.

So I wrote a debug mode that was kind of cool, where I color-coded each branch of the tree, and matched the console log statements to the color of the branch:

<video src="{{ site.url }}{{ site.baseurl }}/assets/videos/plant-debug.mp4" height="300" loop controls></video>

- ([see it live - open the console, docked right!]({{ site.url }}{{ site.baseurl }}/demos/debug/index.html))

### TODOs for next time
- START MAKING AN ACTUAL GAME! Like watering the plant, trimming the plant, plant growth each day, etc.
- Add roots?
- Add more speckles to strawberries
