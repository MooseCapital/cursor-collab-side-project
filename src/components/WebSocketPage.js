import { createGrid } from "../services/grid.js";
import { setUserData, userData } from "../services/userData.js";
import { cursorColors, setCursor, setCursorColors } from "../services/colorPicker.js";
import "../services/floater.js"
export { WebSocketPage, userData };
const swatchGrid = document.querySelector(".swatchGrid");


function WebSocketPage() {
    console.log("websocket page loaded");
    
    return `
        <div id="grid"></div>
    
          <h2 id="latency">
            50<span>MS Latency</span>
          </h2>
        
          <div id="color-picker"></div>
          
          
          
          
    `;
}
setTimeout(() => {
    createGrid();
    setUserData();
    swatchGrid.innerHTML = getSwatches();
    
}, 0);

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
