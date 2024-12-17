import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import {
    getDatabase,
    ref,
    get,
    child,
    update,
    remove,
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

setScreenSize(window.innerWidth, window.innerHeight);
window.addEventListener("load", function () {
    document.getElementById("loading_animation_div").style.display = "none";
    document.getElementById("home-div").style.display = "flex";
    populateCluster();
});
//events
document.getElementById("canceladdcluster-btn").addEventListener("click", function () {
    window.location.href = "homepage.html";
});
//functions
function setScreenSize(width, height) {
    document.body.style.width = width + "px";
    document.body.style.height = height + "px";
    document.documentElement.style.height = height + "px";
    document.getElementById("loading_animation_div").style.visibility = "visible";
}
async function populateCluster() {

    const path = `PARSEIT/administration/students/`;
    try {
        return await get(child(dbRef, path)).then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const academicyear_cont = document.getElementById('cluster-view-list-body');
                academicyear_cont.innerHTML = "";
                for (const id in data) {
                    getParserFullName(id).then((fullname) => {
                        academicyear_cont.innerHTML += `
                        <section id="tally-cluster">
                        <span class="parser-id">${id}</span>
                        <span class="parser-name">${fullname}</span>
                        </section>`;
                    });
                }
            } else {
            }
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
async function getParserFullName(id) {
    try {
        return get(child(dbRef, `PARSEIT/administration/students/${id}`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    return data.firstname + " " + data.lastname;
                } else {
                    console.log("No data available");
                }
            });
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}