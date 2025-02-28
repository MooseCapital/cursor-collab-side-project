import "../styles/style.css";
import "./webRTC.js";
import "./cursor.js";
import {createGrid} from "./grid.js";

document.querySelector("#app").innerHTML = `
  <header>
    <h1>Cursor collaboration</h1>
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
