import {selfId} from 'trystero'
import {joinRoom} from 'trystero/torrent'
const room = joinRoom({appId: 'cursor-collab'}, 'mainRoom')

// user gets their ip, we use geo ip library to put local state/country and flag emoji on a rectangle by cursor
//because other users cant get our ip with trystero, we send them the data when joining, so on join we send initial data event like mouse color

// log round-trip time every 2 seconds
room.onPeerJoin(peerId =>
  setInterval(
    async () => console.log(`took ${await room.ping(peerId)}ms ${room.getPeers()}`),
    5000
  )
)
console.log(room)

room.onPeerLeave(peerId => console.log(`${peerId} left`))









































