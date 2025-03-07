// import { ColorsPage } from "../components/ColorsPage.js";
import { WebSocketPage } from "../components/WebSocketPage.js";
import { WebrtcPage } from "../components/WebrtcPage.js";

window.addEventListener("hashchange", () => navigate(window.location.hash ));
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

function navigate(path) {
    path = path.substring(1);
    // console.log(path)
    const fullPath = `${basePath}/#${path}`;
    window.history.pushState({}, "", fullPath);

    if (routes[path]) {
        routes[path]();
    } else {
        console.log("Route not found", path);
    }
}

// Initial route
navigate(window.location.hash || "#/websocket");
// router(window.location.hash || "#/websocket");
