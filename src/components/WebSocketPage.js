import { createGrid } from "../services/grid.js";
import { setUserData, userData } from "../services/userData.js";
import { cursorColors, setCursor, setCursorColors } from "../services/colorPicker.js";
// import "../services/floater.js"
export { WebSocketPage };

function WebSocketPage() {
    console.log("websocket page loaded");
    createGrid();
    setUserData();
    
    document.querySelector("main").insertAdjacentHTML("beforeend", latencyEl());
}

function latencyEl() {
    return `<h2 id="latency">50 <span>MS Latency</span> </h2>`
}
