// import { selfId } from "trystero";
// import { joinRoom } from "trystero/torrent";
// const room = joinRoom({appId: 'cursor-collab'}, 'mainRoom')
// user gets their ip, we use geo ip library to put local state/country and flag emoji on a rectangle by cursor
//because other users cant get our ip with trystero, we send them the data when joining, so on join we send initial data event like mouse color

import {getRandomColorObj} from "./cursorSetting.js";



// `<img class="cursors" src="${import.meta.env.BASE_URL}/images/bibata-${this.userColor}.svg" alt="" data-id="${this.id}" width="auto" height="auto" />`



// log round-trip time every 2 seconds

/* room.onPeerJoin((peerId) => {
    addNewUser(peerId)
    console.log(users)
    setInterval(async () => console.log(`took ${await room.ping(peerId)}ms ${room.getPeers()}`), 5000)
}); */
// console.log(room)

// room.onPeerLeave(peerId => console.log(`${peerId} left`))
