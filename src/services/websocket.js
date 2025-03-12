import { io } from "socket.io-client";

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
    
    joinWS.addEventListener("click", (e) => {
        socket.connect();
        joinWS.disabled = true;
        leaveWS.disabled = false;
    });
    leaveWS.addEventListener("click", (e) => {
        socket.disconnect();
        joinWS.disabled = false;
        leaveWS.disabled = true;
    });

    socket.on("connect", () => {
        console.log("connected:", socket.connected); // true
        setInterval(() => {
            const start = Date.now();
            socket.volatile.emit("latency", Date.now());
        }, 3000);
    });

    socket.on("disconnect", () => {
        console.log("connected:", socket.connected); // false

        //gray out latency and connections
        document.querySelector("#latencyContainer h2").textContent = 0;
        document.querySelector("#connections h2").textContent = 0;
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
