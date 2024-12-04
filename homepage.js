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
let subjectparseclass_id = "";
let selectedSubject = "";
let selectedTeacher = "";
let admin_id = localStorage.getItem("user-parser-admin");
let currentacad_ref = "";
let acad_radio = "";
let selectedCluster_id = "";
let selectedCluster_name = "";
let selected_section = "";

//preloads



setScreenSize(window.innerWidth, window.innerHeight);
window.addEventListener("load", function () {
    document.getElementById("loading_animation_div").style.display = "none";
    document.getElementById("home_div").style.display = "flex";
    subjectparseclass_id = "";
    setLabelAcademicYear();
    setButtonStart();
    checkCurrentAcadYear();
    viewCluster(admin_id);
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
    setLabelSemester();
    viewAcademicYear();
    document.getElementById("allacademicyear_sec").style.display = "flex";
    document.getElementById("setupacad_div").style.display = "flex";
    document.getElementById('description_txt').value = "";
});
document.getElementById("canceladdacad_btn").addEventListener("click", function () {
    setLabelAcademicYear();
    setLabelSemester();
    document.getElementById("setupacad_div").style.display = "none";
    document.getElementById('addacademicyear_div').style.display = "none";

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
document.getElementById("startacad_btn").addEventListener("click", function () {
    update(ref(database, "PARSEIT/administration/academicyear/status"), {
        ongoing: "true",
    }).then(() => {
        setButtonStart();
    });
});
document.getElementById("endacad_btn").addEventListener("click", function () {
    update(ref(database, "PARSEIT/administration/academicyear/status"), {
        ongoing: "false",
    }).then(() => {
        setButtonStart();
    });
});
document.getElementById("sem1").addEventListener("click", function () {
    update(ref(database, "PARSEIT/administration/academicyear/status"), {
        current_sem: "1",
    }).then(() => {
        setLabelSemester();
    });
});
document.getElementById("sem2").addEventListener("click", function () {
    update(ref(database, "PARSEIT/administration/academicyear/status"), {
        current_sem: "2",
    }).then(() => {
        setLabelSemester();
    });
});
document.getElementById("addacademicyear_btn").addEventListener("click", function () {
    document.getElementById('allacademicyear_sec').style.display = "none";
    document.getElementById('addacademicyear_div').style.display = "flex";
});
document.getElementById("submitacademicyear").addEventListener("click", function () {
    const academic_ref = generateAcadRef();
    const title = document.getElementById('description_txt').value;
    update(ref(database, "PARSEIT/administration/academicyear/BSIT/" + academic_ref), {
        title: title,
    }).then(() => {
        update(ref(database, "PARSEIT/administration/academicyear/status/"), {
            academic_ref: academic_ref,
            current_sem: "1",
            ongoing: "false",
        }).then(() => {
            viewAcademicYear();
            createAllParseClass(academic_ref);
            currentacad_ref = academic_ref;
            document.getElementById('allacademicyear_sec').style.display = "flex";
            document.getElementById('addacademicyear_div').style.display = "none";
        });

    });
});
document.getElementById("nav_btn").addEventListener("click", function () {
    getUsernameById(admin_id).then((username) => {
        document.getElementById("parser_username").innerText = "@" + `${username}`
        showSidebar();
    });
});
document.getElementById("logout_btn").addEventListener("click", function () {
    logout();
});
document.getElementById("cancelcreateparseclass_btn").addEventListener("click", function () {
    document.getElementById("createparseclass_div").style.display = "none";
    document.getElementById("assignTeacher_btn").style.visibility = "visible";
    document.getElementById("assignTeacher_txt").disabled = false;
    subjectparseclass_id = "";

    document.getElementById("addStudent_btn").style.display = "block";
    document.getElementById("viewStudent_btn").style.display = "none";
    document.getElementById("addStudent_txt").disabled = false;

    document.getElementById("addStudent_txt").value = "";
    document.getElementById("addTeacher_txt").value = "";
    document.getElementById("day_txt").value = "";
    document.getElementById("start_txt").value = "";
    document.getElementById("end_txt").value = "";
    document.getElementById("addCluster_txt").value = "";

    showHome();
});
document.getElementById("createfirstyr_btn").addEventListener("click", function () {
    viewAcademicYear();
    hideEnrollButton();
    document.getElementById("createparseclass_yr").innerText = "Year: Freshman (1st year)";
    document.getElementById("createparseclass_yr").setAttribute('data-value', 'year-lvl-1');
    document.getElementById("addStudent_txt").value = "";
    getSemester().then((sem) => {
        document.getElementById("createparseclass_sem").setAttribute('data-value', `${sem}`);
        populateSubjects("year-lvl-1", sem, currentacad_ref);
        //console.log("year-lvl-1", sem, currentacad_ref);
        document.getElementById("createparseclass_div").style.display = "flex";
        if (sem === "first-sem") {
            document.getElementById("createparseclass_sem").innerText = "Semester: First";
        }
        else {
            document.getElementById("createparseclass_sem").innerText = "Semester: Second";
        }
        hideHome();
    }).catch((error) => {
        console.error("Error fetching semester:", error);
    });
});
document.getElementById("createsecondyr_btn").addEventListener("click", function () {
    viewAcademicYear();
    hideEnrollButton()
    document.getElementById("createparseclass_yr").innerText = "Year: Sophomore (2nd year)";
    document.getElementById("createparseclass_yr").setAttribute('data-value', 'year-lvl-2');
    document.getElementById("addStudent_txt").value = "";
    getSemester().then((sem) => {
        document.getElementById("createparseclass_sem").setAttribute('data-value', `${sem}`);
        populateSubjects("year-lvl-2", sem, currentacad_ref);
        document.getElementById("createparseclass_div").style.display = "flex";
        if (sem === "first-sem") {
            document.getElementById("createparseclass_sem").innerText = "Semester: First";
        }
        else {
            document.getElementById("createparseclass_sem").innerText = "Semester: Second";
        }
        hideHome();
    }).catch((error) => {
        console.error("Error fetching semester:", error);
    });
});
document.getElementById("createthirdyr_btn").addEventListener("click", function () {
    hideEnrollButton();
    viewAcademicYear();
    document.getElementById("createparseclass_yr").innerText = "Year: Junior (3rd year)";
    document.getElementById("createparseclass_yr").setAttribute('data-value', 'year-lvl-3');
    document.getElementById("addStudent_txt").value = "";
    getSemester().then((sem) => {
        populateSubjects("year-lvl-3", sem, currentacad_ref);
        document.getElementById("createparseclass_sem").setAttribute('data-value', `${sem}`);
        document.getElementById("createparseclass_div").style.display = "flex";
        if (sem === "first-sem") {
            document.getElementById("createparseclass_sem").innerText = "Semester: First";
        }
        else {
            document.getElementById("createparseclass_sem").innerText = "Semester: Second";
        }
        hideHome();
    }).catch((error) => {
        console.error("Error fetching semester:", error);
    });
});
document.getElementById("createfourthyr_btn").addEventListener("click", function () {
    viewAcademicYear();
    hideEnrollButton();
    document.getElementById("createparseclass_yr").innerText = "Year: Senior (4th year)";
    document.getElementById("createparseclass_yr").setAttribute('data-value', 'year-lvl-4');
    document.getElementById("addStudent_txt").value = "";
    getSemester().then((sem) => {
        document.getElementById("createparseclass_sem").setAttribute('data-value', `${sem}`);
        populateSubjects("year-lvl-4", sem, currentacad_ref);
        document.getElementById("createparseclass_div").style.display = "flex";
        if (sem === "first-sem") {
            document.getElementById("createparseclass_sem").innerText = "Semester: First";
        }
        else {
            document.getElementById("createparseclass_sem").innerText = "Semester: Second";
        }
        hideHome();
    }).catch((error) => {
        console.error("Error fetching semester:", error);
    });
});
document.getElementById("assignTeacher_btn").addEventListener("click", function () {
    const targetId = document.getElementById("assignTeacher_txt").value;
    if (subjectparseclass_id === "") {
        document.getElementById("parseclass_list").style.border = "0.5px solid red";
    }
    else if (targetId === "") {
        document.getElementById("addteacher_parseclass").style.border = "0.5px solid red";
    }
    else {
        getTeacher(targetId).then((snapshot) => {
            if (snapshot) {
                check_teacher = true;
                showEnrollButton();
                selectedTeacher = document.getElementById("assignTeacher_txt").value;
                document.getElementById("addteacher_parseclass").style.border = "0.5px solid #dcdcdc";
                document.getElementById("assignTeacher_btn").style.visibility = "hidden";
                document.getElementById("assignTeacher_txt").disabled = true;

            }

            if (!snapshot) {
                document.getElementById("addteacher_parseclass").style.border = "0.5px solid red";

            }
        })

    }

});
document.getElementById("addStudent_btn").addEventListener("click", function () {
    const targetId = document.getElementById("addStudent_txt").value;
    if (subjectparseclass_id === "") {
        document.getElementById("parseclass_list").style.border = "0.5px solid red";
    }
    else if (targetId === "") {
        document.getElementById("addstudent_parseclass").style.border = "0.5px solid red";
    }
    else {
        getStudent(targetId).then((snapshot) => {
            if (snapshot) {
                check_student = true;
                showEnrollButton();
                document.getElementById("addstudent_parseclass").style.border = "0.5px solid #dcdcdc";
                document.getElementById("addStudent_btn").style.display = "none";
                document.getElementById("addStudent_txt").disabled = true;
                document.getElementById("viewStudent_btn").style.display = "block";

            }

            if (!snapshot) {
                document.getElementById("addstudent_parseclass").style.border = "0.5px solid red";

            }
        })

    }

});
document.getElementById("viewStudent_btn").addEventListener("touchstart", function () {
    document.getElementById("viewid_div").style.display = "flex";
    document.getElementById("iddetails").style.animation = "fadeInFromTop 0.3s ease-out forwards";
});
document.getElementById("viewStudent_btn").addEventListener("touchend", function () {
    document.getElementById("viewid_div").style.display = "none";
    document.getElementById("iddetails").style.animation = "fadeOutFromBottom 0.3s ease-out forwards";
});
let check_student = false;
let check_teacher = false;
document.getElementById("enrollParseclass").addEventListener("click", function () {
    const academicref = currentacad_ref;
    const yr = document.getElementById("createparseclass_yr").getAttribute('data-value');
    const sem = document.getElementById("createparseclass_sem").getAttribute('data-value');
    const subject = selectedSubject;
    let section = document.getElementById('sectionsched_txt').value;
    let teacherid = document.getElementById('assignTeacher_txt').value;
    let studentid = document.getElementById('addStudent_txt').value;
    let sched_day = document.getElementById('day_txt').value;
    let sched_end = document.getElementById('end_txt').value;
    let sched_start = document.getElementById('start_txt').value;
    let cluster = document.getElementById('addCluster_txt').value;
    let clusterid = selectedCluster_id;

    const sourcePath = `PARSEIT/administration/admins/${admin_id}/mycluster/forparseroom/${clusterid}/cluster/`;
    const destinationPath = `PARSEIT/administration/parseclass/${academicref}/${yr}/${sem}/${subject}/${section}/members`;

    //console.log(academicref, yr, sem, subject, section, teacherid, sched_day, sched_end, sched_start);

    if (teacherid !== "") {
        if (check_teacher == true) {
            assignTeacher(academicref, yr, sem, subject, section, teacherid, sched_day, sched_end, sched_start);
        }

    }
    if (studentid !== "") {
        if (check_student == true) {
            enrollStudent(academicref, yr, sem, subject, section, studentid);
        }
    }
    if (clusterid !== "") {
        enrollCluster(sourcePath, destinationPath, yr, section);
    }

    document.getElementById("check_animation_div").style.display = "flex";
    setTimeout(() => {
        document.getElementById("check_animation_div").style.display = "none";
        section = "";
        teacherid = "";
        studentid = "";
        sched_day = "";
        sched_end = ""
        sched_start = "";
        cluster = "";

        const radios = document.querySelectorAll('input[type="radio"]');
        radios.forEach(radio => {
            radio.checked = false;
        });
    }, 2000);





});
document.getElementById("myCluster_btn").addEventListener("click", function () {
    document.getElementById("cluster_div").style.display = "flex";
    getMyClusters(admin_id);
});
let startX = 0;
let endX = 0;
document.addEventListener('touchstart', (event) => {
    startX = event.touches[0].clientX;
});
document.addEventListener('touchend', (event) => {
    endX = event.changedTouches[0].clientX;
    // if (endX - startX > 50) {
    //     showSidebar();
    // }
    if (startX - endX > 50) {
        hideSidebar();
        document.getElementById("cluster_div").style.display = "none";

    }
});
document.getElementById("addCluster_btn").addEventListener("click", function () {
    document.getElementById("viewcluster_div").style.display = "flex";
});
document.getElementById("clusterclose_btn").addEventListener("click", function () {
    document.getElementById("viewcluster_div").style.display = "none";

});
document.getElementById("select-cluster-btn").addEventListener("click", function () {
    document.getElementById("viewcluster_div").style.display = "none";
    document.getElementById('addCluster_txt').value = selectedCluster_name;

});
document.getElementById('sectionsched_txt').addEventListener('blur', (event) => {
    noSection = false;
    selected_section = document.getElementById('sectionsched_txt').value;
});

//functions
function setScreenSize(width, height) {
    document.body.style.width = width + "px";
    document.body.style.height = height + "px";
    document.documentElement.style.height = height + "px";

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
        temporarypass = firstname + lastname + suffix + ".parser"
    }
    temporarypass = temporarypass.toLowerCase();
    return temporarypass.replace(/\s+/g, "");

}
function createTemporaryPassTeacher(firstname, lastname, suffix) {

    let temporarypass = "";
    if (suffix === "none") {
        temporarypass = firstname + lastname + ".parserteacher"
    }
    else {
        temporarypass = firstname + lastname + suffix + ".parserteacher"
    }
    temporarypass = temporarypass.toLowerCase();
    return temporarypass.replace(/\s+/g, "");

}
function createTemporaryPassAdmin(firstname, lastname, suffix) {

    let temporarypass = "";
    if (suffix === "none") {
        temporarypass = firstname + lastname + ".parseradmin"
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
        temporarypass: createTemporaryPassTeacher(firstname, lastname, suffix),
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
        temporarypass: createTemporaryPassAdmin(firstname, lastname, suffix),
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
function hideHome() {
    document.getElementById("home_div").style.display = "none";
}
function showHome() {
    document.getElementById("home_div").style.display = "flex";
}
async function viewAcademicYear() {
    const currentAcadYear = currentacad_ref;
    acad_radio = "";
    get(child(dbRef, "PARSEIT/administration/academicyear/BSIT/"))
        .then((snapshot) => {
            const academicyear_cont = document.getElementById('allacademicyear_div');
            academicyear_cont.innerHTML = "";
            const data = snapshot.val();

            if (data) {
                Object.keys(data).forEach((key) => {
                    const title = data[key]?.title || key;
                    const container = document.createElement("div");
                    container.className = "radio-item";

                    const radioButton = document.createElement("input");
                    radioButton.type = "radio";
                    radioButton.id = `academic-year-${key}`;
                    radioButton.name = "academic-year";
                    radioButton.value = key;
                    radioButton.className = "radio-academicyear";

                    radioButton.addEventListener("click", () => {
                        updateAcademicYear(`${key}`);
                    });


                    const label = document.createElement("label");
                    label.htmlFor = `academic-year-${key}`;
                    label.textContent = title;
                    label.className = "lbl-academicyear";

                    container.appendChild(radioButton);
                    container.appendChild(label);
                    academicyear_cont.appendChild(container);


                    if (`${key}` === currentAcadYear) {
                        radioButton.checked = true;

                    }
                });
            } else {
                academicyear_cont.innerHTML = "<div class='nodatafound'>No data found.</div>";
            }
        })
        .catch((error) => {
            alert(error);
        });
}
function updateAcademicYear(id) {
    update(ref(database, "PARSEIT/administration/academicyear/status"), {
        academic_ref: id,
    });
}
function setLabelAcademicYear() {
    get(child(dbRef, "PARSEIT/administration/academicyear/status/"))
        .then((snapshot) => {
            get(child(dbRef, "PARSEIT/administration/academicyear/BSIT/" + snapshot.val().academic_ref))
                .then((acad_ref) => {
                    document.getElementById('academicyr_lbl').innerText = acad_ref.val().title;
                });
        });
}
function setLabelSemester() {
    get(child(dbRef, "PARSEIT/administration/academicyear/status/"))
        .then((snapshot) => {
            if (snapshot.val().current_sem === "1") {
                document.getElementById('sem1').style.color = "#ff3334";
                document.getElementById('sem1').style.backgroundColor = "#fefefe";

                document.getElementById('sem2').style.color = "#fefefe";
                document.getElementById('sem2').style.backgroundColor = "transparent";
            }
            else {
                document.getElementById('sem1').style.color = "#fefefe";
                document.getElementById('sem1').style.backgroundColor = "transparent";

                document.getElementById('sem2').style.color = "#ff3334";
                document.getElementById('sem2').style.backgroundColor = "#fefefe";
            }
        });
}
async function checkCurrentAcadYear() {
    return await get(child(dbRef, "PARSEIT/administration/academicyear/status/"))
        .then((snapshot) => {
            currentacad_ref = snapshot.val().academic_ref;
            return snapshot.val().academic_ref;

        });
}
function setButtonStart() {
    get(child(dbRef, "PARSEIT/administration/academicyear/status/"))
        .then((snapshot) => {
            if (snapshot.val().ongoing === "true") {
                document.getElementById('startacad_btn').style.display = "none";
                document.getElementById('endacad_btn').style.display = "block";

            }
            else {
                document.getElementById('startacad_btn').style.display = "block";
                document.getElementById('endacad_btn').style.display = "none";
            }
        });
}
function generateAcadRef() {
    const currentTime = Date.now();
    const random = Math.random().toString(36).substr(2, 5);
    return currentTime.toString() + "P" + random;
}
async function createParseclass(yearlvl, sem, academicRef) {
    try {
        const sourceRef = `PARSEIT/administration/programs/${yearlvl}/${sem}/`;
        const snapshot = await get(child(dbRef, sourceRef));
        if (snapshot.exists()) {
            let data = snapshot.val();
            for (const subjectKey in data) {
                if (data.hasOwnProperty(subjectKey)) {
                    data[subjectKey] = {
                        ...data[subjectKey],
                        //put custom data
                    };
                }
            }
            const destinationRef = `PARSEIT/administration/parseclass/${academicRef}/${yearlvl}/${sem}/`;
            await update(ref(database, destinationRef), data);
            console.log("Data with custom fields successfully updated for each subject!");
        } else {
            console.log("No data found at the source reference.");
        }
    } catch (error) {
        console.error("Error during data transfer:", error);
    }
}
function createAllParseClass(acadRef) {
    createParseclass("year-lvl-1", "first-sem", acadRef);
    createParseclass("year-lvl-1", "second-sem", acadRef);

    createParseclass("year-lvl-2", "first-sem", acadRef);
    createParseclass("year-lvl-2", "second-sem", acadRef);

    createParseclass("year-lvl-3", "first-sem", acadRef);
    createParseclass("year-lvl-3", "second-sem", acadRef);

    createParseclass("year-lvl-4", "first-sem", acadRef);
    createParseclass("year-lvl-4", "second-sem", acadRef);
}
function showSidebar() {
    document.getElementById("sidebar_frame").style.animation = "showsidebar 0.3s ease-in-out forwards";
}
function hideSidebar() {
    document.getElementById("sidebar_frame").style.animation = "hidesidebar 0.3s ease-in-out forwards";
}
function getUsernameById(targetId) {
    try {
        return get(child(dbRef, "PARSEIT/username/")).then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const username = Object.keys(data).find(key => data[key] === targetId);
                if (username) {
                    return username;
                } else {
                    console.log("ID not found");
                    return null;
                }
            } else {
                console.log("No data available");
                return null;
            }
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};
function logout() {
    localStorage.removeItem("user-parser-admin");
    window.location.href = "login.html";
}
function getSemester() {

    return get(child(dbRef, "PARSEIT/administration/academicyear/status/"))
        .then((snapshot) => {
            if (snapshot.exists()) {
                if (snapshot.val().current_sem === "1") {
                    return "first-sem";
                }
                else {
                    return "second-sem";
                }
            }
        });
}
let noSection = true;
async function populateSubjects(yearlvl, sem, acad_ref) {
    get(child(dbRef, "PARSEIT/administration/parseclass/" + acad_ref + "/" + yearlvl + "/" + sem))
        .then((snapshot) => {
            const academicyear_cont = document.getElementById('parseclass_list');
            academicyear_cont.innerHTML = "";
            const data = snapshot.val();
            if (data) {
                Object.keys(data).forEach((key) => {
                    const title = data[key]?.title || key;
                    const container = document.createElement("div");
                    container.className = "radio-subject";

                    const radioButton = document.createElement("input");
                    radioButton.type = "radio";
                    radioButton.id = `parseclass-${data[key].parseclass_id}`;
                    radioButton.name = "subject-list";
                    radioButton.className = "radio-subjectlist";
                    radioButton.value = title;

                    radioButton.addEventListener("click", () => {
                        if (!noSection) {
                            document.getElementById("parseclass_list").style.border = "0.5px solid #dcdcdc";
                            document.getElementById("sectionsched_txt").style.border = "0.5px solid #dcdcdc";
                            subjectparseclass_id = `${data[key].parseclass_id}`;
                            selectedSubject = title;
                            populateEnrollDetails(acad_ref, yearlvl, sem, selectedSubject)
                        }
                        else {
                            radioButton.checked = false;
                            document.getElementById("sectionsched_txt").style.border = "0.5px solid red";
                        }

                    });
                    const label = document.createElement("label");
                    label.htmlFor = `parseclass-${data[key].parseclass_id}`;
                    label.textContent = title;
                    label.className = "lbl-subjectlist";

                    container.appendChild(radioButton);
                    container.appendChild(label);
                    academicyear_cont.appendChild(container);

                });
            } else {
                academicyear_cont.innerHTML = "<div class='nodatafound'>No data found.</div>";
            }
        })
        .catch((error) => {
            alert(error);
        });
}
function getTeacher(targetId) {
    return get(child(dbRef, `PARSEIT/administration/teachers/${targetId}`))
        .then((snapshot) => {
            if (snapshot.exists()) {
                if (snapshot.val().activated === "yes") {
                    return true;
                }
                else {
                    return false;
                }
            }

        })
}
function getStudent(targetId) {
    return get(child(dbRef, `PARSEIT/administration/students/${targetId}`))
        .then((snapshot) => {
            if (snapshot.exists()) {
                if (snapshot.val().activated === "yes") {
                    return true;
                }
                else {
                    return false;
                }
            }

        })
}
async function assignTeacher(academicref, yr, sem, subject, section, teacherid, sched_day, sched_end, sched_start) {
    //console.log(`PARSEIT/administration/parseclass/${academicref}/year-lvl-${yr}/${sem}/${subject}/${section}/`)
    await update(ref(database, `PARSEIT/administration/parseclass/${academicref}/${yr}/${sem}/${subject}/${section}/`), {
        teacher_id: teacherid,
        parseclass_id: academicref + "_" + section + "_" + subject.replace(/\s+/g, ""),
        schedule: {
            sched_day: sched_day,
            sched_end: sched_end,
            sched_start: sched_start
        }
    }).then(() => {

    }).catch((error) => {
        console.error("Error updating data:", error);
    });
}
async function enrollStudent(academicref, yr, sem, subject, section, studentid) {
    const memberId = {};
    memberId[studentid] = {
        finalgrade: "0"
    };

    await update(ref(database, `PARSEIT/administration/parseclass/${academicref}/${yr}/${sem}/${subject}/${section}/`), {
        members: memberId
    }).then(() => {
        updateStudentYrSection(studentid, translateYr(yr), section)
    }).catch((error) => {
        console.error("Error updating data:", error);
    });
}
async function enrollCluster(sourcePath, destinationPath, yr, section) {
    try {
        const sourceRef = ref(databaseAdmin, sourcePath);
        const snapshot = await get(sourceRef);
        if (snapshot.exists()) {
            const data = snapshot.val();
            const destinationRef = ref(database, destinationPath);
            await update(destinationRef, data);
            snapshot.forEach(childSnapshot => {
                const key = childSnapshot.key;
                updateStudentYrSection(key, yr, section)
            });
            console.log(`Data successfully copied from ${sourcePath} to ${destinationPath}`);
        } else {
            console.log(`No data found at ${sourcePath}`);
        }
    } catch (error) {
        console.error("Error copying data:", error);
    }
}
async function updateStudentYrSection(parser_id, yr, section) {
    await update(ref(database, `PARSEIT/administration/students/${parser_id}/`), {
        yearlvl: yr,
        section: section
    });
}
function translateYr(yr) {
    switch (yr) {
        case "year-lvl-1":
            return "1";
        case "year-lvl-2":
            return "2";
        case "year-lvl-3":
            return "3";
        case "year-lvl-4":
            return "4";
        default:
            console.log("error");
    }
}
function getMyClusters(admin_id) {
    const mycluster_cont = document.getElementById("cluster_div");
    let mycluster = "";
    // if (!admin_id) {
    //     console.error("Invalid admin_id");
    //     return;
    // }
    const path = `PARSEIT/administration/admins/${admin_id}/mycluster/forparseroom/`;
    try {
        return get(child(dbRefAdmin, path)).then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                Object.entries(data).forEach(([key, cluster]) => {
                    const clusterHTML = `
                        <div class="radio-cluster-wrapper">
                            <label class="cluster-radio-default" for="cluster-radio-${admin_id}-${key}">
                                ${cluster.name || "Unnamed Cluster"}
                            </label>
                        </div>`;

                    mycluster += clusterHTML;
                    mycluster_cont.innerHTML = mycluster;
                });

            } else {
                console.log("No data available");
            }
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
async function viewCluster(admin_id) {
    const mycluster_cont = document.getElementById("cluster-div");
    const path = `PARSEIT/administration/admins/${admin_id}/mycluster/forparseroom/`;

    try {
        const snapshot = await get(child(dbRefAdmin, path));
        if (snapshot.exists()) {
            const data = snapshot.val();

            Object.entries(data).forEach(([key, cluster]) => {
                const clusterTitleDiv = document.createElement("div");
                clusterTitleDiv.classList.add("cluster-title-div");
                clusterTitleDiv.id = `cluster-title-${key}`;

                const radioInput = document.createElement("input");
                radioInput.type = "radio";
                radioInput.classList.add("radio-title");
                radioInput.id = `radio-title-${key}`;
                radioInput.name = "radio-cluster-title";
                clusterTitleDiv.appendChild(radioInput);

                const clusterLabel = document.createElement("label");
                clusterLabel.classList.add("cluster-title");
                clusterLabel.id = `cluster-title-${key}`;
                clusterLabel.setAttribute("for", `radio-title-${key}`);
                clusterLabel.textContent = cluster.name;
                clusterTitleDiv.appendChild(clusterLabel);

                mycluster_cont.appendChild(clusterTitleDiv);

                document.getElementById(`radio-title-${key}`).addEventListener('click', function () {
                    selectedCluster_id = `${key}`;
                    selectedCluster_name = `${cluster.name}`;

                    document.querySelectorAll(".id-cluster").forEach(function (element) {
                        element.style.display = 'none';
                    });

                    document.querySelectorAll(`.id-cluster-${key}`).forEach(function (element) {
                        element.style.display = 'flex';
                    });
                });

                Object.entries(cluster.cluster).forEach(([cluster_studentid]) => {
                    const listDiv = document.createElement("div");
                    listDiv.classList.add(`cluster-list`);
                    listDiv.classList.add(`cluster-list-${key}`);
                    const studentIdSpan = document.createElement("span");
                    studentIdSpan.classList.add("id-cluster");
                    studentIdSpan.classList.add(`id-cluster-${key}`);
                    studentIdSpan.id = `cluster-parser-${cluster_studentid}`;
                    studentIdSpan.textContent = cluster_studentid;

                    listDiv.appendChild(studentIdSpan);
                    mycluster_cont.appendChild(listDiv);
                });
            });

        } else {
            console.log("No data available");
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
function showEnrollButton() {
    document.getElementById('enrollParseclass').style.visibility = "visible";
}
function hideEnrollButton() {
    document.getElementById('enrollParseclass').style.visibility = "hidden";
}
async function populateEnrollDetails(acadRef, yrlvl, sem, subject) {
    const section = document.getElementById('sectionsched_txt').value;
    try {
        const snapshot = await get(child(dbRef, `PARSEIT/administration/parseclass/${acadRef}/${yrlvl}/${sem}/${subject}/${section}`));
        if (snapshot.exists()) {
            const data = snapshot.val();
            document.getElementById('assignTeacher_txt').value = data.teacher_id;
            if (data.schedule) {
                document.getElementById('day_txt').value = data.schedule.sched_day || '';
                document.getElementById('start_txt').value = data.schedule.sched_start || '';
                document.getElementById('end_txt').value = data.schedule.sched_end || '';
            } else {
                console.log('No schedule found');
            }
            noSection = false;
            check_teacher = true;
        } else {
            console.log('No data exists for the provided details');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
