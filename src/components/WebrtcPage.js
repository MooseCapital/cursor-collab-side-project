// import {getSwatches} from "./WebSocketPage.js";
import {setUserData} from "../services/userData.js";
import {joinWebRTC, webrtcDOM, updateTable} from "../services/webRTC.js";

export { WebrtcPage };


const swatchGrid = document.querySelector(".swatchGrid");

function WebrtcPage() {
    // console.log("Webrtc page loaded");
    setTimeout(() => {
        setUserData();
        joinWebRTC();
        webrtcDOM()
        updateTable();
        // swatchGrid.innerHTML = getSwatches();
    }, 0);
    return `
         <button class="serverbtn" id="join-webrtc">Join webrtc</button>
          <button class="serverbtn" id="leave-webrtc">leave webrtc</button>
         <div id="grid">
              <table>
              <thead>
                  <tr>
                    <th>User</th>
                    <th>Latency (ms)</th>
                  </tr>
              </thead>
              
              <tbody>
                  <tr>
                    <td>🇺🇸 Miami, FL</td>
                    <td>40</td>
                  </tr>
              </tbody>
             
            </table>
        </div>
        
        <div id="connections">
                <h2>0</h2>
                <p id="users-list">users</p>
          </div>
    `;
}

