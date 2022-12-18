// Helper function
let domReady = (cb: any) => {
  document.readyState === 'interactive'
    ? cb()
    : window.addEventListener('DOMContentLoaded', cb);
};
domReady(() => {
  // Display body when DOM is loaded
  document.body.style.visibility = 'visible';
});

export {};
