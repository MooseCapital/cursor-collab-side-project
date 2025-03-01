import "../style.css";
import "./webRTC.js";
import "./cursor.js";
import {createGrid} from "./grid.js";
import "./router.js"

//layout
document.querySelector("#app").innerHTML = `
  <header>
    <h1>Cursor collaboration</h1>
    <a href="/cursor-collab-side-project/#/websocket">WebSocket</a>
    <a href="/cursor-collab-side-project/#/webrtc">WebRTC</a>
    <a href="/cursor-collab-side-project/#/colors">Colors</a>

  </header>
  <main>
    <div id="grid"></div>
  </main>

  <h2 id="latency">
    50<span>MS Latency</span>
  </h2>

  <div id="color-picker"></div>
`

createGrid();
