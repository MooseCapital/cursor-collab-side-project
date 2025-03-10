// import {getSwatches} from "./WebSocketPage.js";
import {createGrid} from "../services/grid.js";
import {setUserData} from "../services/userData.js";
import {setUpWebRTC} from "../services/webRTC.js";

export { WebrtcPage };


const swatchGrid = document.querySelector(".swatchGrid");

function WebrtcPage() {
    // console.log("Webrtc page loaded");
    setTimeout(() => {
        createGrid();
        setUserData();
        setUpWebRTC()
        // swatchGrid.innerHTML = getSwatches();
    }, 0);
    return `
        <button id="join-webrtc">Join webrtc</button>
        <div id="grid"></div>
    `;
}
