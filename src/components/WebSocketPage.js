import { setUserData, myData } from "../services/userData.js";
import { cursorColors, generateCursorColors } from "../services/cursorSetting.js";
import "../services/cursorEvents.js";
// import {wsSetup} from "../services/websocket.js";
import {socketDOM, socketioSetup} from "../services/websocket.js";
export { WebSocketPage };

//we can simply emit every 100ms for websocket and webrtc, or try to positions in an array queue
// for websocket to reduce server load every 300-500ms.
//our server just emits our event instantly, eventually it will group everyones and emit 1 event every 300-500ms
//100 users at 3 events per second = 300 events per second , if the server groups them
//it may consider a broadcast to all users 1 single event, so 3 per second out, but 300 events intake.


function WebSocketPage() {
    // console.log("websocket page loaded");
    setTimeout(() => {
        setUserData();
        socketioSetup();
        socketDOM();
    }, 0);

    return `
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
