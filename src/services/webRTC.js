import { socket } from "./websocket.js";
import { joinRoom } from "trystero/supabase";
import { myData, User, otherUsers } from "./userData.js";
// import {SpreadGrid} from "js-spread-grid";
// import { selfId, joinRoom } from "trystero";
export { webrtcDOM, joinWebRTC };

//get user connections number

const config = { appId: import.meta.env.VITE_SUPABASE_URL, supabaseKey: import.meta.env.VITE_SUPABASE_KEY };
let room;

async function joinWebRTC() {
    const start = Date.now();
    room = await joinRoom(config, "mainRoom");
    console.log("connected to room in:", Date.now() - start);
    
    console.log("my webrtc id", room.selfId)
    // myData.webrtcId = room.selfId;
    // localStorage.setItem("userData", JSON.stringify(myData));
    
    const [sendUser, getUser] = room.makeAction("user:new");
    //once connected,send our user data to everyone
    await sendUser({
        id: myData.id,
        cursorColor: myData.cursorColor,
        cursorRGBA: myData.cursorRGBA,
        flag: myData.flag,
        countryCode: myData.countryCode,
        region: myData.region,
    });
    room.onPeerJoin((peerId) => {
        sendUser(
            {
                id: myData.id,
                cursorColor: myData.cursorColor,
                cursorRGBA: myData.cursorRGBA,
                flag: myData.flag,
                countryCode: myData.countryCode,
                region: myData.region,
            },
            peerId,
        );

        console.log(peerId, "connected");
        console.log("get peers", room.getPeers());
        setInterval(async () => console.log(`took ${await room.ping(peerId)}ms `), 2000);
    });
    console.log(room);

    room.onPeerLeave((peerId) => {
        console.log(`${peerId} left`);
    });

    getUser((data, peerId) => {
        console.log("getUser received", otherUsers);
        new User(data);
    });
}

/*
const [sendDrink, getDrink] = room.makeAction('drink')

// buy drink for a friend
sendDrink({drink: 'negroni', withIce: true}, friendId)

// buy round for the house (second argument omitted)
sendDrink({drink: 'mezcal', withIce: false})

// listen for drinks sent to you
getDrink((data, peerId) =>
  console.log(
    `got a ${data.drink} with${data.withIce ? '' : 'out'} ice from ${peerId}`
  )
)
}) */

function webrtcDOM() {
    const joinWebrtc = document.querySelector("#join-webrtc");
    const leaveWebrtc = document.querySelector("#leave-webrtc");
    console.log("webrtc dom");
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
