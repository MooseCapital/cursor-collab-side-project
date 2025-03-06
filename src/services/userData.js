import flag from "country-code-emoji";
import {getRandomColorObj, setCursor, setCursorColors} from "./colorPicker.js";

export { userData, setUserData };

const userData = JSON.parse(localStorage.getItem("userData")) || {};
const otherUsers = {};
// console.log(userData, typeof userData);

async function setUserData() {
    try {
        await getLocationData();
        setFlag();
        setCursorColors(userData);
        
        setCursor(userData.cursorColor);

        localStorage.setItem("userData", JSON.stringify(userData));
    } catch (err) {
        console.log(err);
    }
}

async function getLocationData() {
    try {
        if (!userData?.country) {
            const res = await fetch("http://ip-api.com/json");
            const data = await res.json();

            for (const prop in data) {
                userData[prop] = data[prop];
            }

            console.log(userData, "inside function");
        } else {
            // console.log("not fetched");
        }
    } catch (e) {
        //toast popup
        console.log("fetch error", e);
    }
}

function setFlag() {
    userData.flag = flag(userData?.countryCode);
}


class User {
    constructor(id) {
        // { name: "blue", rgba: "rgba(68,255,255,0.6)" }
        const colorObj = getRandomColorObj();
        this.id = id;
        this.userColor = colorObj.name;
        this.userRGBA = colorObj.rgba;
        this.render(id);
        
    }
    //this is the prototype, use for shared methods or default property values until the user sets
    render(id) {
            document.querySelector("#app").insertAdjacentHTML(
            "afterbegin",
            `<object class="cursors" type="image/svg+xml" data="${import.meta.env.BASE_URL}/images/bibata-${this.userColor}.svg" data-id="${this.id}" width="auto" height="auto"></object>`)
        }
}

function addNewUser(id) {
    otherUsers[`${id}`] = new User(`${id}`);
}
// addNewUser(1234)



