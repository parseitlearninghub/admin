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


//preloads
setScreenSize(window.innerWidth, window.innerHeight);
window.addEventListener("load", function () {
    document.getElementById("loading_animation_div").style.display = "none";
    //document.getElementById("home_div").style.display = "flex";

});
function setScreenSize(width, height) {
    document.body.style.width = width + "px";
    document.body.style.height = height + "px";
    document.documentElement.style.height = height + "px";
}

async function getTriggerInputs() {
    const refPath = ref(database, `PARSEIT/siti_chatbot/`);
    const container = document.getElementById("chatbot-data-wrapper");

    await onValue(refPath, (snapshot) => {
        container.innerHTML = "";
        if (snapshot.exists()) {
            const data = snapshot.val();
            Object.entries(data).forEach(([key, value]) => {
                const itemDiv = document.createElement("div");
                itemDiv.className = "chatbot-data";
                itemDiv.id = key;

                const response = document.createElement("textarea");
                response.className = "response-txtarea";
                response.value = value.response;
                response.placeholder = "Enter Response";
                response.style.height = "60px";
                response.oninput = function () {
                    this.style.height = "60px";
                    this.style.height = this.scrollHeight + "px";
                };

                const triggerDiv = document.createElement("div");
                triggerDiv.className = "chatbot-trigger-wrapper";

                const trigger_input = document.createElement("input");
                trigger_input.type = "text";
                trigger_input.className = "trigger-txt";
                trigger_input.placeholder = "Enter Trigger Input";

                const addTrigger = document.createElement("button");
                addTrigger.textContent = "Add";
                addTrigger.className = "addchattrigger_btn";

                const addedTrigger = document.createElement("div");
                addedTrigger.className = "added-trigger-wrapper";

                const updateChatdata = document.createElement("button");
                updateChatdata.textContent = "Update Response";
                updateChatdata.className = "update-button";

                const removeChatdata = document.createElement("button");
                removeChatdata.textContent = "Remove Chatbot Data";
                removeChatdata.className = "remove-button";

                for (const trigger in value.trigger_input) {
                    const section_trigger = document.createElement("div");
                    section_trigger.className = "item";

                    const textNode = document.createTextNode(value.trigger_input[trigger]);
                    const removeButton = document.createElement("button");
                    removeButton.textContent = "Remove";
                    removeButton.className = "remove-button";

                    section_trigger.appendChild(textNode);
                    section_trigger.appendChild(removeButton);
                    addedTrigger.appendChild(section_trigger);

                    removeButton.addEventListener("click", async () => {
                        delete value.trigger_input[trigger];
                        await update(ref(database, `PARSEIT/siti_chatbot/${key}`), {
                            trigger_input: value.trigger_input,
                        });
                    });
                }

                addTrigger.addEventListener("click", async () => {
                    const newTrigger = trigger_input.value.trim();
                    if (newTrigger) {
                        value.trigger_input = value.trigger_input || [];
                        value.trigger_input.push(newTrigger);
                        await update(ref(database, `PARSEIT/siti_chatbot/${key}`), {
                            trigger_input: value.trigger_input,
                        });
                        trigger_input.value = "";
                    }
                });

                updateChatdata.addEventListener("click", async () => {
                    await update(ref(database, `PARSEIT/siti_chatbot/${key}`), {
                        response: response.value,
                    });
                });

                removeChatdata.addEventListener("click", async () => {
                    await remove(ref(database, `PARSEIT/siti_chatbot/${key}`));
                });

                itemDiv.appendChild(response);
                itemDiv.appendChild(updateChatdata);
                itemDiv.appendChild(triggerDiv);
                triggerDiv.appendChild(trigger_input);
                triggerDiv.appendChild(addTrigger);
                itemDiv.appendChild(addedTrigger);
                itemDiv.appendChild(removeChatdata);
                container.appendChild(itemDiv);
            });
        } else {
            container.innerHTML = "";
        }
    }, (error) => {
        console.error("Error reading data:", error);
    });
} getTriggerInputs();

document.getElementById("canceladdchatbot-btn").addEventListener("click", async function () {
    window.location.href = "homepage.html";
});