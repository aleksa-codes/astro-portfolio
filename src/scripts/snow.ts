// snowflake characters
const snow = ['❄', '❅', '❆'];
// snowflake colors
const colors = ['#aaa', '#bbb', '#ccc', '#ddd', '#eee'];
// number of snowflakes
const flakes = 16;
// snowflake container
const container = document.querySelector('.snow') as HTMLElement;
// snowflake container width
const containerWidth = container?.clientWidth;
// snowflake array
const snowflakes: HTMLElement[] = [];

// create snowflakes
for (let i = 0; i < flakes; i++) {
  // create the snowflake element
  const flake = document.createElement('div');
  // set the snowflake character
  flake.innerHTML = snow[Math.floor(Math.random() * snow.length)];
  // add the common snowflake styles
  flake.classList.add('snowflake');
  // set the unique snowflake styles
  flake.style.position = 'absolute';
  flake.style.left = `${Math.random() * containerWidth}px`;
  flake.style.fontSize = `${Math.floor(Math.random() * 30) + 10}px`;
  flake.style.color = colors[Math.floor(Math.random() * colors.length)];
  flake.style.animationDelay = `${Math.random() * 12}s`;
  container?.appendChild(flake);
  snowflakes.push(flake);
}

export {};
