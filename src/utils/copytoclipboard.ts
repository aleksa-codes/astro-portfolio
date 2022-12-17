const copyButtonLabel = `<span class="flex flex-row px-1 gap-1">Copy<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-copy" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
<rect x="8" y="8" width="12" height="12" rx="2" />
<path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2" />
</svg>
</span>`;

// use a class selector if available
let blocks = document.querySelectorAll('pre');

blocks.forEach((block) => {
  // only add button if browser supports Clipboard API
  if (navigator.clipboard) {
    let button = document.createElement('button');

    button.innerHTML = copyButtonLabel;
    block.appendChild(button);
    block.setAttribute('tabindex', '0');

    button.addEventListener('click', async () => {
      await copyCode(block, button);
    });
  }
});

async function copyCode(block: any, button: any) {
  let code = block.querySelector('code');
  let text = code.innerText;

  await navigator.clipboard.writeText(text);

  // visual feedback that task is completed
  button.innerHTML = `<span class="flex flex-row px-1 gap-1">Copied<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-check" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#B4E657" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <path d="M7 12l5 5l10 -10" />
    <path d="M2 12l5 5m5 -5l5 -5" />
  </svg>
</span>`;

  setTimeout(() => {
    button.innerHTML = copyButtonLabel;
  }, 700);
}

export {};
