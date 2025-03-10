import { createGrid } from "../services/grid.js";
import { setUserData, myData } from "../services/userData.js";
import { cursorColors, setCursor, generateCursorColors } from "../services/cursorSetting.js";
import "../services/cursorEvents.js"
import {wsSetup} from "../services/websocket.js";

export { WebSocketPage};


function WebSocketPage() {
    // console.log("websocket page loaded");
    setTimeout(() => {
        createGrid();
        setUserData();
        wsSetup();
        // swatchGrid.innerHTML = getSwatches();
    }, 0);
    
    return `
        <div id="grid"></div>
          <button class="joinbtn" id="join-websocket">Join websocket</button>
          <div class="latencyContainer">
              <h2 id="latency">0</h2>
              <p>MS Latency</p>
          </div>
        
    `;
}

