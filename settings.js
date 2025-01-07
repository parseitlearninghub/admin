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

import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail, } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCoIfQLbAq5gPil3COSauqfHNlv5P5tYXc",
    authDomain: "parseitadmin.firebaseapp.com",
    databaseURL: "https://parseitadmin-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "parseitadmin",
    storageBucket: "parseitadmin.firebasestorage.app",
    messagingSenderId: "1009498274532",
    appId: "1:1009498274532:web:69083f905357ae31b74af1"
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const dbRef = ref(database);
const auth = getAuth();


let user_parser = localStorage.getItem("user-parser-admin");


//preloads
setScreenSize(window.innerWidth, window.innerHeight);
window.addEventListener("load", function () {
    document.getElementById("loading_animation_div").style.display = "none";

});
function setScreenSize(width, height) {
    document.body.style.width = width + "px";
    document.body.style.height = height + "px";
    document.documentElement.style.height = height + "px";
}

document.getElementById("canceladdchatbot-btn").addEventListener("click", function () {
    window.location.href = "homepage.html";
});


document.getElementById("changepass_btn").addEventListener("click", function () {
    get(child(dbRef, "PARSEIT/administration/admins/" + user_parser)).then((snapshot) => {
        if (snapshot.exists()) {
            sendResetEmail(user_parser);
        }
    })
});

function showMessage(message) {
    document.getElementById("msg_lbl").innerText = message;
    document.getElementById("notif_div").style.display = "flex";
}

function sendResetEmail(id) {
    get(child(dbRef, "PARSEIT/administration/admins/" + id)).then((snapshot) => {
        if (snapshot.exists()) {
            const email = snapshot.val().email;
            sendPasswordResetEmail(auth, email);
            showMessage("Please check your email, thank you!");
        }
    });
}

document.getElementById("notifclose_btn").addEventListener("click", function () {
    document.getElementById("notif_div").style.display = "none";
});

document.getElementById("changeemail_btn").addEventListener("click", function () {
    window.location.href = "changeemail.html";
});
