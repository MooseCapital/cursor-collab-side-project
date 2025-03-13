import { io } from "socket.io-client";
import { myData, User, otherUsers } from "./userData.js"
export { socketioSetup };

function socketioSetup() {
    const socket = io(import.meta.env.VITE_WSSERVER, {
        autoConnect: false,
    });
    localStorage.debug = "socket.io-client:socket";

    const joinWS = document.querySelector("#join-websocket");
    const leaveWS = document.querySelector("#leave-websocket");

    socket.connect();
    joinWS.disabled = true;
    
    joinWS.addEventListener("click", () => {
        socket.connect();
        joinWS.disabled = true;
        leaveWS.disabled = false;
    });
    leaveWS.addEventListener("click", () => {
        socket.disconnect();
        joinWS.disabled = false;
        leaveWS.disabled = true;
    });

    socket.on("connect", () => {
        console.log("connected:", socket.connected); // true
        setInterval(() => {
            // const start = Date.now();
            socket.volatile.emit("latency", Date.now());
        }, 3000);
        
        //important: we can't run this at first, we need to get our data before ws connection
        // so it's best to have button to connect rather than connect on website load
        //emit user data  { id, userColor, userRGBA, flag, countryCode, region }
        socket.emit("newUser", { id: myData.id, cursorColor: myData.cursorColor, cursorRGBA: myData.cursorRGBA,
            flag: myData.flag, countryCode: myData.countryCode, region: myData.region });
    });
    
    socket.on("newUser", (data) => {
        // console.log("new user:", data);
        new User(data);
        // console.log("new user:", otherUsers)
    });
    
    socket.on("user:color", (data) => {
        // console.log("new user:", data);
        //need id, color, rgba to send on color change input
        //server sends to all other users
        //they render the new cursor color
        
        
    });
    
    socket.on("getAllUsers", (mainUsers) => {
        console.log("initial visit, get all users:", mainUsers);
        for (const id of Object.keys(mainUsers)) {
            new User(mainUsers[id]);
        }
    });
    
    //get sent id, remove from otherUsers obj, and remove svg on screen
    socket.on("removeUser", (id) => {
        delete otherUsers[id];
        document?.querySelector(`.other-cursors[data-id="${id}"]`)?.remove();
        console.log("removed user, all other users:", otherUsers);
    });
    
    socket.on("disconnect", () => {
        //gray out latency and connections
        document.querySelector("#latencyContainer h2").textContent = 0;
        document.querySelector("#connections h2").textContent = 0;
        for (const id of Object.keys(otherUsers)) {
            delete otherUsers[id];
            document?.querySelector(`.other-cursors[data-id="${id}"]`)?.remove();
        }
        console.log("disconnected: all other users", otherUsers); // false
    });

    socket.on("latency", (data) => {
        document.querySelector("#latencyContainer h2").textContent = data;
    });

    socket.on("connections", (data) => {
        console.log(`connections: ${data}, type:${typeof data}`);

        document.querySelector("#connections h2").textContent = data || 0;
    });

    socket.on("connect_error", (error) => {
        if (socket.active) {
            // temporary failure, the socket will automatically try to reconnect
        } else {
            // the connection was denied by the server
            // in that case, `socket.connect()` must be manually called in order to reconnect
            console.log(error.message);
        }
    });
    // socket.volatile.emit( /* ... */ );
}

// }
