import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import {
    getDatabase,
    ref,
    get,
    child,
    update,
    remove,
    set,
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
const auth = getAuth();
const database = getDatabase(app);
const dbRef = ref(database);

//variables
let year = "";
let section = "";

window.addEventListener("load", function () {
    setScreenSize(window.innerWidth, window.innerHeight);
    document.body.style.display = "flex";
});


//processess
document.getElementById("addstudent_btn").addEventListener("click", function () {
    document.getElementById("menu_div").style.display = "none";
    document.getElementById("navbar").style.display = "none";
    document.getElementById("addstudent_div").style.display = "flex";
});

document.getElementById("canceladdstudent_btn").addEventListener("click", function () {
    document.getElementById("menu_div").style.display = "block";
    document.getElementById("navbar").style.display = "flex";
    document.getElementById("addstudent_div").style.display = "none";
});

document.getElementById("first_radio").addEventListener("click", function () {
    year = "1";
    showSection(1)
});
document.getElementById("second_radio").addEventListener("click", function () {
    year = "2";
    showSection(2)
});
document.getElementById("third_radio").addEventListener("click", function () {
    year = "3";
    showSection(3)
});
document.getElementById("fourth_radio").addEventListener("click", function () {
    year = "4";
    showSection(4)
});

document.getElementById("section-radio-1").addEventListener("click", function () {
    section = document.getElementById("section-1").getAttribute('data-value');
    //console.log(section);
});
document.getElementById("section-radio-2").addEventListener("click", function () {
    section = document.getElementById("section-2").getAttribute('data-value');
    //console.log(section);
});

document.getElementById("submitstudent_btn").addEventListener("click", function () {
    let regularity = getRegularity();
    let id = document.getElementById("id_txt").value;
    let firstname = document.getElementById("firstname_txt").value;
    let middlename = document.getElementById("middlename_txt").value;
    let lastname = document.getElementById("lastname_txt").value;
    let suffix = document.getElementById("suffix_txt").value;
    let birthday = document.getElementById("birthday_txt").value;
    let email = document.getElementById("email_txt").value;
    if (suffix === "") {
        suffix = "none";
    }

    submitStudent(regularity, year, section, id, firstname, middlename, lastname, suffix, birthday, email);
});



//functions
function setScreenSize(width, height) {
    document.body.style.width = width + "px";
    document.body.style.height = height + "px";
}

function showSection(year) {
    let section_a = "";
    let section_b = "";
    let value_a = "";
    let value_b = "";
    if (year === 1) {
        section_a = "1A - Microsoft";
        value_a = "1A-Microsoft"
        section_b = "1B - Google";
        value_b = "1B-Google"
    }

    if (year === 2) {
        section_a = "2A - Section B";
        value_a = "2A-SectionA"
        section_b = "2B - Section A";
        value_b = "2B-SectionB"

    }

    if (year === 3) {
        section_a = "3A - Section A";
        value_a = "3A-SectionA"
        section_b = "3B - Section B";
        value_b = "3B-SectionB"
    }

    if (year === 4) {
        section_a = "4A - Xamarin";
        value_a = "4A-Xamarin"
        section_b = "4B - Laravel";
        value_b = "4B-Laravel"

    }
    document.getElementById('section-radio-1').checked = false;
    document.getElementById('section-radio-2').checked = false;
    document.getElementById("section-1").innerText = section_a;
    document.getElementById("section-1").setAttribute('data-value', value_a);
    document.getElementById("section-2").innerText = section_b;
    document.getElementById("section-2").setAttribute('data-value', value_b);
    document.getElementById("input-section").style.display = "flex";

    //console.log(value_a, value_b, year);

}

function getRegularity() {
    const regular = document.getElementById('regular-radio-1');
    const irregular = document.getElementById('regular-radio-2');
    if (regular.checked) {
        return "yes"
    }

    if (irregular.checked) {
        return "no"
    }
}

function createTemporaryPass(firstname, middlename, lastname, suffix) {

    if (suffix === "none") {
        return firstname + middlename + lastname + ".parser"
    }
    else {
        return firstname + middlename + lastname + suffix + ".parser"
    }

}

function submitStudent(regularity, year, section, id, firstname, middlename, lastname, suffix, birthday, email) {
    set(ref(database, "PARSEIT/administration/students/" + id), {
        activated: "yes",
        birthday: birthday,
        email: email,
        firstname: firstname,
        id: id,
        lastname: lastname,
        middlename: middlename,
        regular: regularity,
        section: section,
        temporarypass: createTemporaryPass(firstname, middlename, lastname, suffix),
        type: "student",
        year: year,

    }).then(() => {

    });
}
