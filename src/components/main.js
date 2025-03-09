import "../style.css";
import { createGrid } from "../services/grid.js";
import "../services/router.js";
import {cursorColors, setCursor, setCursorColors, showMyLocation} from "../services/cursorSetting.js";

//to do
// move common page functions, and import into page
/*
document.querySelector("#app").innerHTML = layout();

function layout() {
    return `
    <header>
        <h1>Cursor collaboration</h1>
        <a href="/cursor-collab-side-project/#/websocket">WebSocket</a>
        <a href="/cursor-collab-side-project/#/webrtc">WebRTC</a>
        <a href="/cursor-collab-side-project/#/colors">Colors</a>
<!--         <button onclick="navigate('/websocket')">WebSocket</button> -->
<!--           <button onclick="navigate('/webrtc')">WebRTC</button> -->
<!--           <button onclick="navigate('/colors')">Colors</button> -->

      </header>

      <main>
      </main>
`;
}
*/
document.querySelector("#myCursorCheckbox").addEventListener("change", showMyLocation);
