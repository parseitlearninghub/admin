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
const authAdmin = getAuth(appAdmin);
const databaseAdmin = getDatabase(appAdmin);
const dbRefAdmin = ref(databaseAdmin);


//variables
let year = "";
let section = "";

window.addEventListener("load", function () {
    setScreenSize(window.innerWidth, window.innerHeight);
    document.body.style.display = "flex";
});


//processess
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
document.getElementById("academicyr_lbl").addEventListener("click", function () {
    document.getElementById("setupacad_div").style.display = "flex";
});
document.getElementById("canceladdacad_btn").addEventListener("click", function () {
    document.getElementById("setupacad_div").style.display = "none";
});

document.getElementById("addstudent_btn").addEventListener("click", function () {
    showAddStudent();

});
document.getElementById("canceladdstudent_btn").addEventListener("click", function () {
    hideAddStudent();
    hideAddTeacher();
    hideAddAdmin();
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

document.getElementById("addteacher_btn").addEventListener("click", function () {
    hideAddStudent();
    showAddTeacher();
    showAddAdmin();
});
document.getElementById("canceladdteacher_btn").addEventListener("click", function () {
    hideAddStudent();
    hideAddTeacher();
    hideAddAdmin();
});
document.getElementById("submitteacher_btn").addEventListener("click", function () {
    let id = document.getElementById("id_teacher_txt").value;
    let firstname = document.getElementById("firstname_teacher_txt").value;
    let middlename = document.getElementById("middlename_teacher_txt").value;
    let lastname = document.getElementById("lastname_teacher_txt").value;
    let suffix = document.getElementById("suffix_teacher_txt").value;
    let birthday = document.getElementById("birthday_teacher_txt").value;
    let email = document.getElementById("email_teacher_txt").value;
    if (suffix === "") {
        suffix = "none";
    }

    submitTeacher(id, firstname, middlename, lastname, suffix, birthday, email);
});

document.getElementById("addadmin_btn").addEventListener("click", function () {
    hideAddStudent();
    hideAddTeacher();
    showAddAdmin();
});
document.getElementById("submitadmin_btn").addEventListener("click", function () {
    let id = document.getElementById("id_admin_txt").value;
    let firstname = document.getElementById("firstname_admin_txt").value;
    let middlename = document.getElementById("middlename_admin_txt").value;
    let lastname = document.getElementById("lastname_admin_txt").value;
    let suffix = document.getElementById("suffix_admin_txt").value;
    let birthday = document.getElementById("birthday_admin_txt").value;
    let email = document.getElementById("email_admin_txt").value;
    if (suffix === "") {
        suffix = "none";
    }
    submitAdmin(id, firstname, middlename, lastname, suffix, birthday, email);
});
document.getElementById("canceladdadmin_btn").addEventListener("click", function () {
    hideAddStudent();
    hideAddTeacher();
    hideAddAdmin();
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
function createTemporaryPass(firstname, lastname, suffix) {

    let temporarypass = "";
    if (suffix === "none") {
        temporarypass = firstname + lastname + ".parser"
    }
    else {
        temporarypass = firstname + lastname + suffix + ".parseradmin"
    }
    temporarypass = temporarypass.toLowerCase();
    return temporarypass.replace(/\s+/g, "");

}
function submitStudent(regularity, year, section, id, firstname, middlename, lastname, suffix, birthday, email) {
    update(ref(database, "PARSEIT/administration/students/" + id), {
        activated: "no",
        birthday: birthday,
        disabled: "no",
        email: email,
        firstname: firstname,
        id: id,
        lastname: lastname,
        middlename: middlename,
        regular: regularity,
        section: section,
        suffix: suffix,
        temporarypass: createTemporaryPass(firstname, lastname, suffix),
        type: "student",
        yearlvl: year,
    }).then(() => {
        document.getElementById("check_animation_div").style.display = "flex";
        clearAddStudentForm();
    });
}
function submitTeacher(id, firstname, middlename, lastname, suffix, birthday, email) {
    update(ref(database, "PARSEIT/administration/teachers/" + id), {
        activated: "no",
        birthday: birthday,
        disabled: "no",
        email: email,
        firstname: firstname,
        id: id,
        lastname: lastname,
        middlename: middlename,
        suffix: suffix,
        temporarypass: createTemporaryPass(firstname, lastname, suffix),
        type: "teacher",
    }).then(() => {
        document.getElementById("check_animation_div").style.display = "flex";
        clearAddTeacherForm();
    });
}
function submitAdmin(id, firstname, middlename, lastname, suffix, birthday, email) {
    update(ref(databaseAdmin, "PARSEIT/administration/admins/" + id), {
        activated: "no",
        birthday: birthday,
        disabled: "no",
        email: email,
        firstname: firstname,
        id: id,
        lastname: lastname,
        middlename: middlename,
        suffix: suffix,
        temporarypass: createTemporaryPass(firstname, lastname, suffix),
        type: "admin",
    }).then(() => {
        document.getElementById("check_animation_div").style.display = "flex";
        clearAddAdminForm();
    });
}
function clearAddStudentForm() {
    setTimeout(() => {
        document.getElementById("check_animation_div").style.display = "none";
    }, 2000);
    document.getElementById("id_txt").value = "";
    document.getElementById("firstname_txt").value = "";
    document.getElementById("middlename_txt").value = "";
    document.getElementById("lastname_txt").value = "";
    document.getElementById("suffix_txt").value = "";
    document.getElementById("birthday_txt").value = "";
    document.getElementById("email_txt").value = "";
    document.getElementById('regular-radio-1').checked = false;
    document.getElementById('regular-radio-2').checked = false;
    document.getElementById("first_radio").checked = false;
    document.getElementById("second_radio").checked = false;
    document.getElementById("third_radio").checked = false;
    document.getElementById("fourth_radio").checked = false;
    document.getElementById("input-section").style.display = "none";
    document.getElementById('section-radio-1').checked = false;
    document.getElementById('section-radio-2').checked = false;
}
function clearAddTeacherForm() {
    setTimeout(() => {
        document.getElementById("check_animation_div").style.display = "none";
    }, 2000);
    document.getElementById("id_teacher_txt").value = "";
    document.getElementById("firstname_teacher_txt").value = "";
    document.getElementById("middlename_teacher_txt").value = "";
    document.getElementById("lastname_teacher_txt").value = "";
    document.getElementById("suffix_teacher_txt").value = "";
    document.getElementById("birthday_teacher_txt").value = "";
    document.getElementById("email_teacher_txt").value = "";
}
function clearAddAdminForm() {
    setTimeout(() => {
        document.getElementById("check_animation_div").style.display = "none";
    }, 2000);
    document.getElementById("id_admin_txt").value = "";
    document.getElementById("firstname_admin_txt").value = "";
    document.getElementById("middlename_admin_txt").value = "";
    document.getElementById("lastname_admin_txt").value = "";
    document.getElementById("suffix_admin_txt").value = "";
    document.getElementById("birthday_admin_txt").value = "";
    document.getElementById("email_admin_txt").value = "";
}
function showAddStudent() {
    document.getElementById("menu_div").style.display = "none";
    document.getElementById("navbar").style.display = "none";
    document.getElementById("addstudent_div").style.display = "flex";
}
function showAddTeacher() {
    document.getElementById("menu_div").style.display = "none";
    document.getElementById("navbar").style.display = "none";
    document.getElementById("addteacher_div").style.display = "flex";
}
function showAddAdmin() {
    document.getElementById("menu_div").style.display = "none";
    document.getElementById("navbar").style.display = "none";
    document.getElementById("addadmin_div").style.display = "flex";
}
function hideAddStudent() {
    document.getElementById("menu_div").style.display = "block";
    document.getElementById("navbar").style.display = "flex";
    document.getElementById("addstudent_div").style.display = "none";
}
function hideAddTeacher() {
    document.getElementById("menu_div").style.display = "block";
    document.getElementById("navbar").style.display = "flex";
    document.getElementById("addteacher_div").style.display = "none";
}
function hideAddAdmin() {
    document.getElementById("menu_div").style.display = "block";
    document.getElementById("navbar").style.display = "flex";
    document.getElementById("addadmin_div").style.display = "none";
}