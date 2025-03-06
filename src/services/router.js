// import { ColorsPage } from "../components/ColorsPage.js";
import { WebSocketPage } from "../components/WebSocketPage.js";
import { WebrtcPage } from "../components/WebrtcPage.js";

window.addEventListener("hashchange", () => router(window.location.hash));
const basePath = "/cursor-collab-side-project";

const main = document.querySelector("main");
const routes = {
    "/websocket": () => {
        main.innerHTML = WebSocketPage();
    },
    "/webrtc": () => {
        main.innerHTML = WebrtcPage();
    },
    /* "/colors": () => {
        main.innerHTML = ColorsPage();
    }, */
};

function router(url) {
    // const path = url.replace(basePath, "").replace(/^\//, "").substring(1);
    const path = url.substring(1);
    // console.log(path);
    if (routes[path]) {
        routes[path]();
    } else {
        console.log("Route not found", url);
    }
}

function navigate(path) {
    const fullPath = `${basePath}/${path}`;

    window.history.pushState({}, "", fullPath);
    console.log(path)
    router(path);
}

// Initial route
navigate(window.location.hash || "#/websocket");
// router(window.location.hash || "#/websocket");
