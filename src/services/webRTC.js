import {socket} from "./websocket.js";
import { joinRoom } from "trystero/supabase";
// import {SpreadGrid} from "js-spread-grid";
// import { selfId, joinRoom } from "trystero";
export {webrtcDOM, joinWebRTC}


const config = { appId: import.meta.env.VITE_SUPABASE_URL, supabaseKey: import.meta.env.VITE_SUPABASE_KEY };
let room;

function joinWebRTC() {
    // room = joinRoom(config, "mainRoom");
    
// log round-trip time every 2 seconds
    room.onPeerJoin((peerId) => {
        // addNewUser(peerId)
        // console.log(users)
        console.log(peerId, "connected")
        setInterval(async () => console.log(`took ${await room.ping(peerId)}ms `), 2000);
    });
    console.log(room);
    
    room.onPeerLeave((peerId) => {
        console.log(`${peerId} left`);
        
    });
}




function webrtcDOM() {
    const joinWebrtc = document.querySelector("#join-webrtc");
    const leaveWebrtc = document.querySelector("#leave-webrtc");
    console.log('webrtc dom')
    // joinWS.disabled = true;

    joinWebrtc.addEventListener("click", () => {
        joinWebRTC();
        joinWebrtc.disabled = true;
        leaveWebrtc.disabled = false;
    });
    
    leaveWebrtc.addEventListener("click", () => {
        room.leave();
        joinWebrtc.disabled = false;
        leaveWebrtc.disabled = true;
    });
    
   
}
