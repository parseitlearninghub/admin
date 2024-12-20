import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import {
    getDatabase,
    ref,
    get,
    child,
    update,
    remove,
    onValue,
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCFqgbA_t3EBVO21nW70umJOHX3UdRr9MY",
    authDomain: "parseit-8021e.firebaseapp.com",
    databaseURL:
        "https://parseit-8021e-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "parseit-8021e",
    storageBucket: "parseit-8021e.appspot.com",
    messagingSenderId: "15166597986",
    appId: "1:15166597986:web:04b0219b1733780ae61a3b",
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const dbRef = ref(database);

const firebaseConfigAdmin = {
    apiKey: "AIzaSyCoIfQLbAq5gPil3COSauqfHNlv5P5tYXc",
    authDomain: "parseitadmin.firebaseapp.com",
    databaseURL: "https://parseitadmin-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "parseitadmin",
    storageBucket: "parseitadmin.firebasestorage.app",
    messagingSenderId: "1009498274532",
    appId: "1:1009498274532:web:69083f905357ae31b74af1"
};
const appAdmin = initializeApp(firebaseConfigAdmin, "ParseITAdmin");
const databaseAdmin = getDatabase(appAdmin);
const dbRefAdmin = ref(databaseAdmin);

let admin_id = localStorage.getItem("user-parser-admin");
const chatCode = await generateChatCode();

//preloads
setScreenSize(window.innerWidth, window.innerHeight);
window.addEventListener("load", async function () {
    document.getElementById("loading_animation_div").style.display = "none";

});
function setScreenSize(width, height) {
    document.body.style.width = width + "px";
    document.body.style.height = height + "px";
    document.documentElement.style.height = height + "px";
}
async function generateChatCode() {
    const currentTime = Date.now();
    return currentTime.toString();
}
document.getElementById("canceladdchatbot-btn").addEventListener("click", async function () {
    await remove(ref(database, `PARSEIT/siti_chatbot/${chatCode}/`));
    window.location.href = "homepage.html";
});

document.getElementById("addchatdata_btn").addEventListener("click", async function () {
    const chatdata = document.getElementById("chatbot-response-txt").value;

    if (chatdata === '') {
        document.getElementById('chatbot-response-txt').style.border = "0.5px solid red";
        setTimeout(() => {
            document.getElementById('chatbot-response-txt').style.border = "0.5px solid #dcdcdc";
        }, 2000);
        return;
    }

    await get(child(dbRef, `PARSEIT/siti_chatbot/${chatCode}/trigger_input`)).then(async (snapshot) => {
        if (snapshot.exists()) {
            const path = `PARSEIT/siti_chatbot/${chatCode}/`;
            await update(ref(database, path), {
                response: chatdata,
            });
            window.location.reload();
        }
        else {
            document.getElementById('trigger-txt').style.border = "0.5px solid red";
            setTimeout(() => {
                document.getElementById('trigger-txt').style.border = "0.5px solid #dcdcdc";
            }, 2000);
            return;
        }
    });
});
let triggerCode = 0;
document.getElementById("addchattrigger_btn").addEventListener("click", async function () {
    const chattrigger = document.getElementById("trigger-txt").value;

    if (chattrigger === '') {
        document.getElementById('trigger-txt').style.border = "0.5px solid red";
        setTimeout(() => {
            document.getElementById('trigger-txt').style.border = "0.5px solid #dcdcdc";
        }, 2000);
        return;
    }
    const path = `PARSEIT/siti_chatbot/${chatCode}/trigger_input/`;
    await update(ref(database, path), {
        [triggerCode]: chattrigger,
    });
    triggerCode++;
    document.getElementById('trigger-txt').value = '';
    await getTriggerInputs();
});

async function getTriggerInputs() {
    const refPath = ref(database, `PARSEIT/siti_chatbot/${chatCode}/trigger_input/`);

    const container = document.getElementById("added-trigger-wrapper");

    await onValue(refPath, (snapshot) => {
        container.innerHTML = "";
        if (snapshot.exists()) {
            const data = snapshot.val();
            Object.entries(data).forEach(([key, value]) => {
                const itemDiv = document.createElement("div");
                itemDiv.className = "item";
                itemDiv.id = key;

                const textNode = document.createTextNode(value);
                itemDiv.appendChild(textNode);

                const removeButton = document.createElement("button");
                removeButton.textContent = "Remove";
                removeButton.className = "remove-button";

                removeButton.addEventListener("click", async () => {
                    const itemRef = ref(database, `PARSEIT/siti_chatbot/${chatCode}/trigger_input/${key}`);
                    await remove(itemRef);
                });

                itemDiv.appendChild(removeButton);

                container.appendChild(itemDiv);
            });
        } else {
            container.innerHTML = "";
        }
    }, (error) => {
        console.error("Error reading data:", error);
    });
}
