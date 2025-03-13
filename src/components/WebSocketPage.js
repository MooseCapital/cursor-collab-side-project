import { createGrid } from "../services/grid.js";
import { setUserData, myData } from "../services/userData.js";
import { cursorColors, setCursor, generateCursorColors } from "../services/cursorSetting.js";
import "../services/cursorEvents.js";
// import {wsSetup} from "../services/websocket.js";
import {socketDOM, socketioSetup} from "../services/websocket.js";
export { WebSocketPage };

function WebSocketPage() {
    // console.log("websocket page loaded");
    setTimeout(() => {
        createGrid();
        setUserData();
        socketioSetup();
        socketDOM();
    }, 0);

    return `
        <div id="grid"></div>
          <button class="serverbtn" id="join-websocket">Join websocket</button>
          <button class="serverbtn" id="leave-websocket">leave websocket</button>
          <div id="latencyContainer">
              <h2>0</h2>
              <p>MS Latency</p>
          </div>
          
          <div id="connections">
                <h2>0</h2>
                <p id="users-list">users</p>
          </div>
        
    `;
}
