// import { selfId } from "trystero";
// import { joinRoom } from "trystero/torrent";
// const room = joinRoom({appId: 'cursor-collab'}, 'mainRoom')
import { randomCursorColor } from "./colorPicker.js";
// user gets their ip, we use geo ip library to put local state/country and flag emoji on a rectangle by cursor
//because other users cant get our ip with trystero, we send them the data when joining, so on join we send initial data event like mouse color

const users = {};

class User {
    constructor(id) {
        // Constructor
        this.id = id;
        this.color = `${randomCursorColor()}`;

        this.render(id);
    }
    //this is the prototype, use for shared methods or default property values until the user sets
    render(id) {
        document.querySelector("#app").insertAdjacentHTML(
            "afterend",
            `<svg
              height="24"
              viewBox="0 0 19.196396 23.999937"
              fill="none"
              version="1.1"
              class="cursor"
              id="${id}"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:svg="http://www.w3.org/2000/svg">
            <defs
                id="defs8" />
            <path
                d="m 17.289555,12.591263 -0.0015,-0.0013 -0.0016,-0.0014 L 5.759437,2.370346 C 5.214821,1.872439 4.67901,1.471068
                4.164547,1.215153 3.661648,0.964989 3.063331,0.797236 2.465876,0.961997 1.823272,1.139207 1.4205,1.630363 1.196844,2.18767
                0.98076103,2.726114 0.89521003,3.400914 0.89521003,4.165489 v 15.470608 0.0065 l 9.5e-5,0.0065 c 0.01274,0.874886 0.51891797,1.820757
                1.10537697,2.458043 0.30512,0.33165 0.68668,0.641604 1.124187,0.826544 0.447269,0.189048 1.005439,0.264562 1.558585,0.01496 0.45124,
                -0.203581 0.864281,-0.613905 1.199311,-0.972411 0.192481,-0.206004 0.418865,-0.463299 0.650767,-0.726912 0.176357,-0.200317 0.355821,
                -0.40432 0.526016,-0.59221 0.859299,-0.948293 1.823706,-1.878893 2.962732,-2.392744 1.142923,-0.515643 2.490586,-0.635285 3.770635,
                -0.659403 0.315536,-0.006 0.620013,-0.0062 0.914907,-0.0064 h 0.0014 0.0024 c 0.290786,-2.1e-4 0.576938,-4.21e-4 0.840025,-0.007
                0.481203,-0.0119 1.05119,-0.04318 1.48658,-0.225277 1.04624,-0.437812 1.284366,-1.58421 1.261301,-2.362835 -0.02443,-0.826649
                -0.335231,-1.808645 -1.01001,-2.412334 z"
                fill="rgba(255,31,31,0.6)"
                stroke="#000000"
                stroke-width="1.79042"
                id="path2" />
          </svg> `,
        );
    }
}

function addNewUser(id) {
    users[`${id}`] = new User(`${id}`);
}
// log round-trip time every 2 seconds

/* room.onPeerJoin((peerId) => {
    addNewUser(peerId)
    console.log(users)
    setInterval(async () => console.log(`took ${await room.ping(peerId)}ms ${room.getPeers()}`), 5000)
}); */
// console.log(room)

// room.onPeerLeave(peerId => console.log(`${peerId} left`))
