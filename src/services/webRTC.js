import { socket } from "./websocket.js";
import { joinRoom, selfId } from "trystero/supabase";
import { myData, User, otherUsers } from "./userData.js";
// import {SpreadGrid} from "js-spread-grid";
// import { selfId, joinRoom } from "trystero";
export { webrtcDOM, joinWebRTC, updateTable };

//get user connections number

const config = { appId: import.meta.env.VITE_SUPABASE_URL, supabaseKey: import.meta.env.VITE_SUPABASE_KEY };
let room;

//bad practice, have a single interval for all users latency, then loop over all users peerId somehow
//then call the ping function for each user, then update the table

function joinWebRTC() {
    room = joinRoom(config, "mainRoom");
    console.log("room", room)
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
            console.log(`took ${await room.ping(peerId)}ms `);
            updateUserLatency(peerId, await room.ping(peerId))
            //run user latency update function for this user here
        }, 2000);
    });

    room.onPeerLeave((peerId) => {
        console.log(`${peerId} left`);
        delete otherUsers[peerId];
        updateTable();
        //remove users cursor
    });

    getUser((data, peerId) => {
        console.log("getUser received", otherUsers);
        new User(data);
        updateTable();
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

console.log("otherUsers", otherUsers);

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
