import "../style.css";
import { createGrid } from "../services/grid.js";
import "../services/router.js";
import {cursorColors, setCursor, setCursorColors} from "../services/colorPicker.js";
import {userData} from "../services/userData.js";

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
const swatchGrid = document.querySelector(".swatchGrid");
swatchGrid.innerHTML = getSwatches();
swatchGrid.addEventListener("click", (e) => {
    if (e.target.closest(".swatch")) {
        const swatch = e.target.closest(".swatch");

        setCursorColors(userData, swatch.dataset.color, swatch.dataset.rgba);
        setTimeout(() => {
            setCursor(swatch.dataset.color);
        }, 0);

        swatchGrid.innerHTML = getSwatches();
    }
});

function getSwatches() {
    let swatches = "";
    cursorColors.map((color) => {
        const currentSwatch = userData.cursorColor === color.name ? "currentSwatch" : "";
        swatches += `<div class="swatch ${currentSwatch}" data-color="${color.name}" data-rgba="${color.rgba}"  style="background: ${color.rgba}"></div>`;
    });
    return swatches;
}


