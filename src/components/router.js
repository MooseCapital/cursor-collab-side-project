const routes = {
  '/websocket': () => 1,
  '/webrtc': () => 1,
  '/colors': () => 1
};

function router(url) {
  const path = url.substring(1);
  if (routes[path]) {
    routes[path]();
  } else {
    console.log('Route not found');
  }
}

window.addEventListener('hashchange', () => {
  router(window.location.hash);
  console.log("hash change", window.location.hash)
});

function updateURL(path) {
  window.history.pushState({}, '', path);
  // router(path);
}

// Initial route
updateURL('/#/websocket');


// router("#/websocket")

