import { createGrid } from "../services/grid.js";
import { setUserData, userData } from "../services/userData.js";
import { cursorColors, setCursor, setCursorColors } from "../services/cursorSetting.js";
import "../services/cursorEvents.js"
export { WebSocketPage};



function WebSocketPage() {
    console.log("websocket page loaded");
    setTimeout(() => {
        createGrid();
        setUserData();
        // swatchGrid.innerHTML = getSwatches();
    }, 0);
    
    return `
        <div id="grid"></div>
    
          <h2 id="latency">
            50<span>MS Latency</span>
          </h2>
        
    `;
}

