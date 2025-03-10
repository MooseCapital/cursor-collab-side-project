import flag from "country-code-emoji";
import {getRandomColorObj, setCursor, generateCursorColors, } from "./cursorSetting.js";

export { userData, setUserData };

const userData = JSON.parse(localStorage.getItem("userData")) || {};
const otherUsers = {};
// console.log(userData, typeof userData);

async function setUserData() {
    try {
        await getLocationData();
        setFlag();
        generateCursorColors(userData);
        
        setCursor({cursorColor: userData.cursorColor,
            cursorRGBA: userData.cursorRGBA
        
        });
        // setLocationCursor(userData.cursorColor, userData.cursorRGBA);

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
            console.log("not fetched");
        }
    } catch (e) {
        //toast popup
        console.log("fetch error", e);
    }
}

function setFlag() {
    userData.flag = flag(userData?.countryCode);
}

//generate colors for business case when users see black cursor as their own
//otherwise, send the users colors
class User {
    constructor({id, userColor, userRGBA, flag, countryCode, region}) {
        
        const colorObj = getRandomColorObj();
        this.id = id;
        this.userColor = userColor || colorObj.name;
        this.userRGBA = userRGBA || colorObj.rgba;
        this.flag = flag;
        this.countryCode = countryCode;
        this.region = region;
        // this.render(id);
        
    }
    //this is the prototype, use for shared methods or default property values until the user sets
    render(id) {
            document.querySelector("#app").insertAdjacentHTML(
            "afterbegin",
            `<object class="cursors" type="image/svg+xml" data="${import.meta.env.BASE_URL}/images/bibata-${this.userColor}.svg" data-id="${this.id}" width="auto" height="auto"></object>`)
    }
}
console.log(new User({id: 1234, userColor: "purple", userRGBA: "rgba(173,144,255,0.6)", flag: "🇷🇸", countryCode: "RS", region: "RS"}));

function addNewUser(id) {
    otherUsers[`${id}`] = new User(`${id}`);
}
// addNewUser(1234)



