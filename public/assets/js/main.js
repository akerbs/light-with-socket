"use strict";
{
  const $ = (qs) => document.querySelector(qs);
  const $$ = (qs) => Array.from(document.querySelectorAll(qs));

  const socket = io.connect();

  const DOM = {
    imageLight: $('.m-light .img-light')
  };


  const init = () => {
    socket.emit('get light status');
    DOM.imageLight.addEventListener('click', onLightClick)
  }

  const onLightClick = (event) => {
    socket.emit('toggle light status');
  }

  socket.on('set light status', (status) => {
    console.log(status);
    setLight(status);
  });

  const setLight = (status) => {
    if (status) {
      DOM.imageLight.src = 'assets/img/light-on.png';
    } else {
      DOM.imageLight.src = 'assets/img/light-off.png';
    }
  }

  init();
}