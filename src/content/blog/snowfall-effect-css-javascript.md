---
title: "How to Add a Snowfall Effect to Your Website with CSS and JavaScript"
description: "A quick tutorial on creating a snowfall effect using CSS and JavaScript. Perfect for adding some holiday vibes to your site."
date: 2022-12-10T12:34:56.000Z
thumbnail: ../../assets/blog/pexels-kristin-vogt-54200.jpg
tags:
  - Frontend
  - JavaScript
  - CSS
---

## Table of Contents

- [Introduction](#introduction)
- [The CSS](#the-css)
- [The JavaScript](#the-javascript)
- [Using the Effect on Your Page](#using-the-effect-on-your-page)
- [Conclusion](#conclusion)

## Introduction

Want to add some winter vibes to your website? In this post I'll show you how to create a simple snowfall effect using just CSS and JavaScript. No libraries needed.

It's a pretty quick project and works great as a seasonal touch for the holidays. Whether you're just getting started with web dev or you've been at it for a while, this is a fun one to build. So grab some coffee and let's get into it.

## The CSS

First up, we need a container element that'll hold all our snowflakes. We'll give it a `.snow` class.

```css
.snow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 95%;
  pointer-events: none;
  z-index: 999;
  overflow: visible;
}
```

Then we'll create the `.snowflake` class for each individual snowflake. This handles the falling animation and a little side-to-side drift to make it look more natural.

```css
.snowflake {
  opacity: 0;
  animation:
    fall 12s ease-out infinite,
    move 4s ease-in-out infinite,
    fade-in 1s ease-in forwards;
}
```

We've got three animations going on here:

- `fall`: Moves the snowflake from top to bottom.
- `move`: Adds a gentle side-to-side sway.
- `fade-in`: Fades them in so they don't just pop into existence.

Now let's define the keyframes for each:

```css
@keyframes fall {
  from {
    top: 0;
  }
  to {
    top: 100%;
  }
}

@keyframes move {
  0% {
    transform: translateX(-8px);
  }
  50% {
    transform: translateX(8px);
  }
  100% {
    transform: translateX(-8px);
  }
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

With those keyframes in place, the snowflakes will fall and drift realistically on the page.

## The JavaScript

Now let's use JavaScript to actually create the snowflakes and add them to the page.

First, we'll set up some variables:

```js
// snowflake characters
const snow = ["❄", "❅", "❆"]
// snowflake colors
const colors = ["#aaa", "#bbb", "#ccc", "#ddd", "#eee"]
// number of snowflakes
const flakes = 24
```

Then we grab the container element with the `.snow` class:

```js
// snowflake container
const container = document.querySelector(".snow")
```

We also need the container width so we can position snowflakes randomly across it:

```js
// snowflake container width
const containerWidth = container?.clientWidth
```

And an array to keep track of our snowflakes:

```js
// snowflake array
const snowflakes = []
```

Now here's where the magic happens. We loop through and create each snowflake with some random styles:

```js
// create snowflakes
for (let i = 0; i < flakes; i++) {
  // create the snowflake element
  const flake = document.createElement("div")
  // set the snowflake character
  flake.innerHTML = snow[Math.floor(Math.random() * snow.length)]
  // add the common snowflake styles
  flake.classList.add("snowflake")
  // set the unique snowflake styles
  flake.style.position = "absolute"
  flake.style.left = `${Math.random() * containerWidth}px`
  flake.style.fontSize = `${Math.floor(Math.random() * 30) + 10}px`
  flake.style.color = colors[Math.floor(Math.random() * colors.length)]
  flake.style.animationDelay = `${Math.random() * 12}s`
  container.appendChild(flake)
  snowflakes.push(flake)
}
```

For each snowflake, we're creating a `div`, giving it a random snowflake character, applying the `.snowflake` class, and then randomizing its position, size, and color. The `animationDelay` makes them start falling at different times so it doesn't look robotic.

Here's the final JavaScript all together:

```js
const snow = ["❄", "❅", "❆"]
const colors = ["#aaa", "#bbb", "#ccc", "#ddd", "#eee"]
const flakes = 16
const container = document.querySelector(".snow")
const containerWidth = container?.clientWidth
const snowflakes = []
for (let i = 0; i < flakes; i++) {
  const flake = document.createElement("div")
  flake.innerHTML = snow[Math.floor(Math.random() * snow.length)]
  flake.classList.add("snowflake")
  flake.style.position = "absolute"
  flake.style.left = `${Math.random() * containerWidth}px`
  flake.style.fontSize = `${Math.floor(Math.random() * 30) + 10}px`
  flake.style.color = colors[Math.floor(Math.random() * colors.length)]
  flake.style.animationDelay = `${Math.random() * 12}s`
  container.appendChild(flake)
  snowflakes.push(flake)
}
```

## Putting it all together

Add the CSS to your stylesheet and the JavaScript to your script file. Then drop this HTML wherever you want the snow to show up:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Page Title</title>
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <-- css -->
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <-- apply .snow contaiener class here -->
    <div class="snow"></div>
    <-- js -->
    <script src="snow.js"></script>
  </body>
</html>
```

## That's a wrap

Pretty simple, right? Just some CSS animations and a bit of JavaScript, and you've got snowflakes falling on your page. It's a nice little touch for the holiday season and a fun project to mess around with. Happy coding!
