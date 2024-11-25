import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import {
    getAuth,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import {
    getDatabase,
    ref,
    get,
    child,
    update
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";
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
const auth = getAuth();
const database = getDatabase(app);
const dbRef = ref(database);

//admin
let admin = [{
    activated: "",
    email: "",
    firstname: "",
    lastname: "",
    middlename: "",
    suffix: "",
    temporarypass: "",
    type: "",
}];

//global variables
const idBorder = document.getElementById("id_container");
const passwordBorder = document.getElementById("password_container");

//pre-tasks
setScreenSize(window.innerWidth, window.innerHeight);
setLoginBodyHeight(window.innerHeight);
document.getElementById("login_div").style.display = "block";


//listeners
document.getElementById("login_btn").addEventListener("click", function () {
    const id = document.getElementById("id_txt").value.trim();
    const password = document.getElementById("password_txt").value.trim();

    if (!id) {
        applyErrorStyle(idBorder);
        resetStyle(passwordBorder);
        return;
    } else if (!password) {
        applyErrorStyle(passwordBorder);
        resetStyle(idBorder);
        return;
    }

    getParser(id).then(() => {
        if (admin[0].activated === "no") {
            if (admin[0].temporarypass !== password) {
                applyErrorStyle(passwordBorder);
                resetStyle(idBorder);
            }
            else {
                let middleinitial = admin[0].middlename[0] + ".";
                if (admin[0].suffix === "none") {
                    admin[0].suffix = "";
                }
                localStorage.setItem("name-parser-admin", admin[0].firstname + " " + middleinitial + " " + admin[0].lastname + " " + admin[0].suffix);
                if (admin[0].middlename === "none") {
                    localStorage.setItem("name-parser-admin", admin[0].firstname + " " + admin[0].lastname + " " + admin[0].suffix);
                }
                localStorage.setItem("activate-parser-admin", id);
                localStorage.setItem("email-parser-admin", admin[0].email);
                window.location.href = "activate.html";


            }
        }
        else {
            loginParser(admin[0].email, password, id);
        }
    }).catch((error) => {
        applyErrorStyle(idBorder);
        resetStyle(passwordBorder);
    });

});

document.getElementById("showpass_btn").addEventListener("click", function () {
    showpassword();
});

document.getElementById("hidepass_btn").addEventListener("click", function () {
    hidepassword();
});

document.getElementById("forgotpass_a").addEventListener("click", function () {
    const forgot_id = document.getElementById("id_txt").value;
    if (forgot_id === "") {
        applyErrorStyle(document.getElementById("id_container"));
    }
    else {
        get(child(dbRef, "PARSEIT/administration/admins/" + forgot_id)).then((snapshot) => {
            if (snapshot.exists()) {
                //const email = snapshot.val().email;
                sendResetEmail(forgot_id);
                resetStyle(idBorder);
                showMessage("Please check your email, thank you!");
            } else {
                applyErrorStyle(idBorder);
                resetStyle(passwordBorder);
            }
        }).catch((error) => {

        });

    }

});

document.getElementById("notifclose_btn").addEventListener("click", function () {
    document.getElementById("notif_div").style.display = "none";
});

//functions

function setScreenSize(width, height) {
    document.body.style.width = width + "px";
    document.body.style.height = height + "px";
}

function setLoginBodyHeight(height) {
    const bodyheight = height - 390;
    document.getElementById("body_login_div").style.height = bodyheight + "px";
}

function applyErrorStyle(element) {
    element.style.border = "1px solid red";
    element.style.animation = "shake 0.3s ease-in-out";
}

function resetStyle(element) {
    element.style.border = "1px solid #e0e0e0";
    element.style.animation = "none";
}

function getParser(id) {
    return new Promise((resolve, reject) => {
        const dbRef = ref(database);
        get(child(dbRef, "PARSEIT/administration/admins/" + id)).then((snapshot) => {
            if (snapshot.exists()) {
                admin[0].activated = snapshot.val().activated;
                admin[0].email = snapshot.val().email;
                admin[0].firstname = snapshot.val().firstname;
                admin[0].lastname = snapshot.val().lastname;
                admin[0].middlename = snapshot.val().middlename;
                admin[0].suffix = snapshot.val().suffix;
                admin[0].temporarypass = snapshot.val().temporarypass;
                resolve();
            }
            else {
                applyErrorStyle(idBorder);
                resetStyle(passwordBorder);
            }
        }).catch((error) => {
            alert('Error getting user info');
            reject(error);
        });
    });
}

async function loginParser(email, password, id) {
    try {
        const userCredentials = await signInWithEmailAndPassword(auth, email, password);
        localStorage.setItem("user-parser-admin", id);
        window.location.href = "homepage.html";
    } catch (error) {
        const errorCode = error.code;
        switch (errorCode) {
            case "auth/invalid-email":
                applyErrorStyle(idBorder);
                resetStyle(passwordBorder);
                break;
            case "auth/invalid-credential":
                applyErrorStyle(idBorder);
                applyErrorStyle(passwordBorder);
                break;
            default:
                console.error("An unexpected error occurred:", error);
        }
    }
}

function showpassword() {
    document.getElementById("showpass_btn").style.display = "none";
    document.getElementById("hidepass_btn").style.display = "flex";
    document.getElementById("password_txt").type = "text";
}

function hidepassword() {
    document.getElementById("showpass_btn").style.display = "flex";
    document.getElementById("hidepass_btn").style.display = "none";
    document.getElementById("password_txt").type = "password";
}

function sendResetEmail(id) {
    get(child(dbRef, "PARSEIT/administration/admins/" + id)).then((snapshot) => {
        if (snapshot.exists()) {
            const email = snapshot.val().email;
            sendPasswordResetEmail(auth, email).then(() => {
                document.getElementById("id_txt").value = "";
            }).catch((error) => {

            });
        } else {
            applyErrorStyle(idBorder);
            resetStyle(passwordBorder);
        }
    }).catch((error) => {

    });
}

function showMessage(message) {
    document.getElementById("msg_lbl").innerText = message;
    document.getElementById("notif_div").style.display = "flex";
}

