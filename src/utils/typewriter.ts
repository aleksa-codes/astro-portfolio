import Typewriter from 'typewriter-effect/dist/core';
document.addEventListener('DOMContentLoaded', () => {
  const tw = new Typewriter(document.querySelector('#typed-logo'), {
    loop: false,
    autoStart: true
  });
  tw.typeString('aleksa.codes').start();
});
