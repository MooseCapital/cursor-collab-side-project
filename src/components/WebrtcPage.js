// import {getSwatches} from "./WebSocketPage.js";
import {setUserData} from "../services/userData.js";
import {webrtcDOM} from "../services/webRTC.js";

export { WebrtcPage };


const swatchGrid = document.querySelector(".swatchGrid");

function WebrtcPage() {
    // console.log("Webrtc page loaded");
    setTimeout(() => {
        setUserData();
        webrtcDOM()
        // swatchGrid.innerHTML = getSwatches();
    }, 0);
    return `
         <button class="serverbtn" id="join-webrtc">Join webrtc</button>
          <button class="serverbtn" id="leave-webrtc">leave webrtc</button>
    `;
}

