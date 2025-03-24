import { socket } from "./websocket.js";
import { joinRoom, selfId } from "trystero/supabase";
import { myData, User, otherUsers } from "./userData.js";
// import {SpreadGrid} from "js-spread-grid";
// import { selfId, joinRoom } from "trystero";
export { webrtcDOM, joinWebRTC };

//get user connections number

const config = { appId: import.meta.env.VITE_SUPABASE_URL, supabaseKey: import.meta.env.VITE_SUPABASE_KEY };
let room;

function joinWebRTC() {
    room = joinRoom(config, "mainRoom");

    myData.webrtcId = selfId;
    localStorage.setItem("userData", JSON.stringify(myData));
    // console.log("myData", myData);

    const [sendUser, getUser] = room.makeAction("user:new");
    //once connected,send our user data to everyone
    sendUser({
        id: myData.id,
        webrtcId: myData.webrtcId,
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
                webrtcId: myData.webrtcId,
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
        
        setInterval(async () => {
            console.log(`took ${await room.ping(peerId)}ms `)
            }, 2000);
    });

    room.onPeerLeave((peerId) => {
        console.log(`${peerId} left`);
        delete otherUsers[peerId];
        //remove users cursor
        
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
function updateTable() {
    const tableBody = document.querySelector("#grid tbody");
    let tableItems = "";
    for (const user in otherUsers) {
        console.log(otherUsers[user])
        tableItems += `
          <tr data-id="${user.webrtcId}">
            <td>${user.flag} ${user.region}, ${user.countryCode}</td>
            <td id="latency">0</td>
          </tr>
        `
    }
    
}
updateTable();
console.log("otherUsers", otherUsers)
function webrtcDOM() {
    const joinWebrtc = document.querySelector("#join-webrtc");
    const leaveWebrtc = document.querySelector("#leave-webrtc");
    // console.log("webrtc dom");
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
