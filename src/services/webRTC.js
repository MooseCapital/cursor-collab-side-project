import { socket } from "./websocket.js";
import { joinRoom, selfId } from "trystero/supabase";
// import { joinRoom, selfId } from "trystero";
import { myData, User, otherUsers } from "./userData.js";
import {initializeCursorEvents, moveCursorGsap} from "./cursorEvents.js";

export { webrtcDOM, joinWebRTC, updateTable };


//get proper cursor position for screen sizes

const config = { appId: import.meta.env.VITE_SUPABASE_URL, supabaseKey: import.meta.env.VITE_SUPABASE_KEY };
let room;
let latencyInterval;
let connectedUsers = 0;

function joinWebRTC() {
    // room = joinRoom({appId: "cursors"}, "mainRoom");
    room = joinRoom(config, "mainRoom");
    
    myData.webrtcId = selfId;

    const [sendUser, getUser] = room.makeAction("user:new");
    const [sendPosition, getPosition] = room.makeAction("position");
    //once connected,send our user data to everyone
    
    sendUser({
        id: myData.id,
        // cursorColor: myData.cursorColor,
        // cursorRGBA: myData.cursorRGBA,
        flag: myData.flag,
        countryCode: myData.countryCode,
        region: myData.region,
    });

    room.onPeerJoin((peerId) => {
        sendUser(
            {
                id: myData.id,
                // cursorColor: myData.cursorColor,
                // cursorRGBA: myData.cursorRGBA,
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
        const user = document.querySelector(`.cursorContainer[data-webrtcid="${peerId}"]`) ||
        document.querySelector(`.single-svg-cursor[data-webrtcid="${peerId}"]`);
        user.remove();
    });

    getUser((data, peerId) => {
        // new User(data);
        new User({ ...data, webrtcId: peerId });
        updateTable();
        console.log("getUser received, peerId:",peerId, otherUsers);
    });
    
    getPosition((data, peerId) => {
        // console.log("get position", data)
        moveCursorGsap({x: data.x, y: data.y, webrtcId: peerId});
    })
    
    latencyInterval = setInterval(async () => {
        for (const peerId in room.getPeers()) {
            updateUserLatency(peerId, await room.ping(peerId))
            connectedUsers++;
        }
        updateConnections(connectedUsers);
    }, 3000);
    
    initializeCursorEvents(sendPosition);
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
function updateConnections(users) {
    const connections = document.querySelector("#connections h2");
    connections.textContent = users;
    connectedUsers = 0;
}

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
        room = "";
        joinWebrtc.disabled = false;
        leaveWebrtc.disabled = true;
        clearInterval(latencyInterval);
        updateConnections(0);
        
        //remove user from users list and remove their cursor, which can be a container or single svg
        for (const webrtcId in otherUsers) {
            delete otherUsers[webrtcId];
            
            const user = document.querySelector(`.cursorContainer[data-webrtcid="${webrtcId}"]`) ||
                         document.querySelector(`.single-svg-cursor[data-webrtcid="${webrtcId}"]`);
            user.remove();
        }
        console.log("disconnected: all other users,", otherUsers); // false
        updateTable();
    });
}



