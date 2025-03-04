import flag from "country-code-emoji";
import { setCursor, setCursorColors } from "./colorPicker.js";

export { userData, setUserData };

const userData = JSON.parse(localStorage.getItem("userData")) || {};

console.log(userData, typeof userData);

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
