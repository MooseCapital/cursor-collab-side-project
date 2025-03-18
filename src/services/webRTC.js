import {socket} from "./websocket.js";
import { joinRoom } from "trystero/torrent";

export {webrtcDOM}
// import { selfId, joinRoom } from "trystero";
const config = { appId: "cursor-collab" };
let room;

const app = document.querySelector("#app");
// app.insertAdjacentHTML("beforeend", ``);



function joinWebRTC() {
    room = joinRoom(config, "mainRoom");
// log round-trip time every 2 seconds
    room.onPeerJoin((peerId) => {
        // addNewUser(peerId)
        // console.log(users)
        console.log(peerId, "connected")
        setInterval(async () => console.log(`took ${await room.ping(peerId)}ms `), 2000);
    });
    console.log(room);
    
    room.onPeerLeave((peerId) => console.log(`${peerId} left`));
}


function webrtcDOM() {
    const joinWebrtc = document.querySelector("#join-webrtc");
    const leaveWebrtc = document.querySelector("#leave-webrtc");
    console.log('webrtc dom')
    // joinWS.disabled = true;

    joinWebrtc.addEventListener("click", () => {
        socket.connect();
        joinWebrtc.disabled = true;
        leaveWebrtc.disabled = false;
    });
    leaveWebrtc.addEventListener("click", () => {
        socket.disconnect();
        joinWebrtc.disabled = false;
        leaveWebrtc.disabled = true;
    });
}
