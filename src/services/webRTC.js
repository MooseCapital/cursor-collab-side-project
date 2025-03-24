import { socket } from "./websocket.js";
import { joinRoom, selfId } from "trystero/supabase";
import { myData, User, otherUsers } from "./userData.js";
// import {SpreadGrid} from "js-spread-grid";
// import { selfId, joinRoom } from "trystero";
export { webrtcDOM, joinWebRTC, updateTable };

//get user connections number

const config = { appId: import.meta.env.VITE_SUPABASE_URL, supabaseKey: import.meta.env.VITE_SUPABASE_KEY };
let room;
let myLatencyInterval;
//bad practice, have a single interval for all users latency, then loop over all users peerId somehow
//then call the ping function for each user, then update the table

//remove users cursor on leave

function joinWebRTC() {
    room = joinRoom(config, "mainRoom");
    
    myData.webrtcId = selfId;

    const [sendUser, getUser] = room.makeAction("user:new");
    //once connected,send our user data to everyone
    sendUser({
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
    });

    room.onPeerLeave((peerId) => {
        console.log(`${peerId} left`);
        delete otherUsers[peerId];
        updateTable();
        //remove users cursor
    });

    getUser((data, peerId) => {
        // new User(data);
        new User({ ...data, webrtcId: peerId });
        updateTable();
        console.log("getUser received, peerId:",peerId, otherUsers);
    });
    
    myLatencyInterval = setInterval(async () => {
            console.log("latency interval ran", room.getPeers());
        for (const peerId in room.getPeers()) {
            updateUserLatency(peerId, await room.ping(peerId))
        }
    }, 3000);
    
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

function updateUserLatency(peerId, latency) {
    const latencyCell = document.querySelector(` tr[data-webrtcid="${peerId}"] #latency `);
    latencyCell.textContent = latency;
}

function updateTable() {
    const tableBody = document.querySelector("#grid tbody");
    let tableItems = "";
    for (let user in otherUsers) {
        user = otherUsers[user];
        tableItems += `
          <tr data-webrtcid="${user.webrtcId}">
            <td>${user.flag} ${user.region}, ${user.countryCode}</td>
            <td id="latency">0</td>
          </tr>
        `;
    }
    tableBody.innerHTML = tableItems;
}


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
        clearInterval(myLatencyInterval);
    });
}



