import { createGrid } from "../services/grid.js";
import { setUserData, userData } from "../services/userData.js";
import {cursorColors} from "../services/colorPicker.js";

export { WebSocketPage, userData };
const swatchGrid = document.querySelector(".swatchGrid");

function WebSocketPage() {
    console.log("color page loaded");
    setTimeout(() => createGrid(), 0);
    setUserData();
    swatchGrid.innerHTML = getSwatches();
    
    return `
        <div id="grid"></div>
    
          <h2 id="latency">
            50<span>MS Latency</span>
          </h2>
        
          <div id="color-picker"></div>
          <div id="cursorFloat">🇺🇸 Miami, FL</div>
          
          
          
    `;
}

swatchGrid.addEventListener("click", (e) => {
    if (e.target.closest(".swatch")) {
        
        
        // localStorage.setItem("userData", JSON.stringify(userData));
    }
})



function getSwatches() {
    let swatches = "";
    cursorColors.map((color) => {
        const currentSwatch = userData.cursorColor === color.name ? "currentSwatch" : "";
        swatches += `<div class="swatch ${currentSwatch}" data-color="${color.name}" style="background: ${color.rgba}"></div>`
    })
    return swatches;
}

