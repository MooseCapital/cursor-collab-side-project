import {io} from "socket.io-client";

export {wsSetup}

function wsSetup() {
const socket = io(import.meta.env.VITE_WSSERVER);
localStorage.debug = 'socket.io-client:socket'


setInterval(() => {
  const start = Date.now();

  socket.emit("ping", () => {
      document.querySelector("#latency").textContent = Date.now() - start;
  });
}, 3000);

}