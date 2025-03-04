import { createGrid } from "../services/grid.js";
import { setUserData, userData } from "../services/userData.js";

export { WebSocketPage };

function WebSocketPage() {
    console.log("color page loaded");
    setTimeout(() => createGrid(), 0);
    setUserData();

    return `
        <div id="grid"></div>
    
          <h2 id="latency">
            50<span>MS Latency</span>
          </h2>
        
          <div id="color-picker"></div>
    
    `;
}
