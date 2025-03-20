// import {getSwatches} from "./WebSocketPage.js";
import {setUserData} from "../services/userData.js";
import {joinWebRTC, webrtcDOM} from "../services/webRTC.js";

export { WebrtcPage };


const swatchGrid = document.querySelector(".swatchGrid");

function WebrtcPage() {
    // console.log("Webrtc page loaded");
    setTimeout(() => {
        setUserData();
        // joinWebRTC();
        webrtcDOM()
        // swatchGrid.innerHTML = getSwatches();
    }, 0);
    return `
         <button class="serverbtn" id="join-webrtc">Join webrtc</button>
          <button class="serverbtn" id="leave-webrtc">leave webrtc</button>
         <div id="grid">
              <table>
              <tr>
                <th>User</th>
                <th>Latency (ms)</th>
              </tr>
              <tr>
                <td>🇺🇸 Miami, FL</td>
                <td>40</td>
              </tr>
              <tr>
                <td>Centro comercial Moctezuma sdfsdf</td>
                <td>15</td>
              </tr>
              <tr>
                <td>Centro comercial Moctezuma sdfsdf</td>
                <td>15</td>
              </tr>
              <tr>
                <td>Centro comercial Moctezuma sdfsdf</td>
                <td>15</td>
              </tr>
            </table>
        </div>
    `;
}

