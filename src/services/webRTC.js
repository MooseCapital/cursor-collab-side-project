export {setUpWebRTC}
// import { selfId, joinRoom } from "trystero";
import { joinRoom } from "trystero/torrent";
const config = { appId: "cursor-collab" };
let room;

const app = document.querySelector("#app");
// app.insertAdjacentHTML("beforeend", ``);

//on join, we get and send data like
//cursor color/rgba , location flag, country, region,
//then start receiving their position and sending ours
function setUpWebRTC() {
    const joinButton = document.querySelector("#join-webrtc");
    // joinButton.addEventListener("click", joinWebRTC);
    // joinWebRTC();
}

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

