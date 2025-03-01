const routes = {
    "/websocket": () => 1,
    "/webrtc": () => 1,
    "/colors": () => 1,
};
const basePath = "/cursor-collab-side-project";

function router(url) {
    const path = url.replace(basePath, "").replace(/^\//, "").substring(1);
    console.log(path)
    if (routes[path]) {
        routes[path]();
    } else {
        setTimeout(() => {
            console.log("Route not found", url);
        }, 1000);
    }
}

window.addEventListener("hashchange", () => {
    router(window.location.hash);
    // console.log("hash change", window.location.hash);
});

function updateURL(path) {
    const fullPath = `${basePath}${path}`;
    window.history.pushState({}, "", fullPath);
    // router(path);
}

// Initial route
updateURL("/#/websocket");

// router("#/websocket")
