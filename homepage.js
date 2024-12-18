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


// //variables
// let year = "";
// let section = "";
// let subjectparseclass_id = "";
// let selectedSubject = "";
// let selectedTeacher = "";
// let currentacad_ref = "";
// let acad_radio = "";
// let selected_section = "";
// setLabelAcademicYear();
// setButtonStart();



let admin_id = localStorage.getItem("user-parser-admin");
getCurrentAcadYear(); let latest_acad_ref = ''; let latest_ongoing = ''; let latest_sem = '';


//preloads
setScreenSize(window.innerWidth, window.innerHeight);
window.addEventListener("load", function () {
    document.getElementById("loading_animation_div").style.display = "none";
    document.getElementById("home_div").style.display = "flex";
    showClusters(admin_id);

});
function setScreenSize(width, height) {
    document.body.style.width = width + "px";
    document.body.style.height = height + "px";
    document.documentElement.style.height = height + "px";
}
document.getElementById("nav_btn").addEventListener("click", function () {
    // getUsernameById(admin_id).then((username) => {// });
    document.getElementById("parser_username").innerText = `[Fullname]`
    showSidebar();
});
document.getElementById("logout_btn").addEventListener("click", function () {
    localStorage.removeItem("user-parser-admin");
    window.location.href = "login.html";
});
function showSidebar() {
    document.getElementById("sidebar_frame").style.animation = "showsidebar 0.3s ease-in-out forwards";
}
let startX = 0;
let endX = 0;
document.addEventListener('touchstart', (event) => {
    startX = event.touches[0].clientX;
});
document.addEventListener('touchend', (event) => {
    endX = event.changedTouches[0].clientX;
    if (startX - endX > 50) {
        hideSidebar();
    }
});
function hideSidebar() {
    document.getElementById("sidebar_frame").style.animation = "hidesidebar 0.3s ease-in-out forwards";
}
async function showClusters(admin_id) {
    const mycluster_cont = document.getElementById("cluster_div");
    let mycluster = "";
    const path = `PARSEIT/administration/admins/${admin_id}/mycluster/forparseroom/`;
    try {
        return await get(child(dbRefAdmin, path)).then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                Object.entries(data).forEach(([key, cluster]) => {
                    const clusterHTML = `
                        <div class="radio-cluster-wrapper" id="${key}">
                            <label class="cluster-radio-default"
                            onclick="localStorage.setItem('active-view-cluster','${key}');
                            localStorage.setItem('active-clustername', '${cluster.name}');
                            window.location.href='addcluster.html';"
                            for="cluster-radio-${admin_id}-${key}">
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
document.getElementById("pushCluster").addEventListener("click", async function () {

    window.location.href = "addcluster.html";
});

document.getElementById("addadmin_btn").addEventListener("click", function () {
    hideAddStudent();
    hideAddTeacher();
    showAddAdmin();
});
document.getElementById("canceladdadmin_btn").addEventListener("click", function () {
    hideAddStudent();
    hideAddTeacher();
    hideAddAdmin();
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
document.getElementById("addstudent_btn").addEventListener("click", function () {
    showAddStudent();

});
document.getElementById("canceladdstudent_btn").addEventListener("click", function () {
    hideAddStudent();
    hideAddTeacher();
    hideAddAdmin();
});
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

document.getElementById("submitadmin_btn").addEventListener("click", async function () {
    let firstname = document.getElementById("firstname_admin_txt").value;
    let lastname = document.getElementById("lastname_admin_txt").value;
    let birthday = document.getElementById("birthday_admin_txt").value;

    let id = document.getElementById("id_admin_txt").value;
    let verified_id = await checkAdminId(id);
    if (verified_id) {
        errorElement("input-wrap-admin-id");
        return;
    }
    let email = document.getElementById("email_admin_txt").value;
    let verified_email = await checkAdminEmail(email);
    if (verified_email) {
        errorElement("input-wrap-admin-email");
        return;
    }
    let middlename = document.getElementById("middlename_admin_txt").value;
    if (middlename === '') {
        middlename = 'none';
    }
    let suffix = document.getElementById("suffix_admin_txt").value;
    if (suffix === '') {
        suffix = "none";
    }
    submitAdmin(id, firstname, middlename, lastname, suffix, birthday, email);
});
document.getElementById("viewadmin_btn").addEventListener("click", function () {
    window.location.href = "viewCreatedAdmin.html";
});
async function checkAdminId(id) {
    let admin = await get(ref(databaseAdmin, "PARSEIT/administration/admins/" + id));
    if (admin.val()) {
        return true;
    } else {
        return false;
    }
}
async function checkAdminEmail(email) {
    let admin = await get(ref(databaseAdmin, `PARSEIT/administration/admins/`));
    if (admin.exists()) {
        const admin_id = admin.val();
        for (const id in admin_id) {
            if (admin_id[id]?.email === email) {
                return true;
            }
        }
    }
    return false;
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
async function submitAdmin(id, firstname, middlename, lastname, suffix, birthday, email) {
    await update(ref(databaseAdmin, "PARSEIT/administration/admins/" + id), {
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

document.getElementById("submitteacher_btn").addEventListener("click", async function () {
    let firstname = document.getElementById("firstname_teacher_txt").value;
    let lastname = document.getElementById("lastname_teacher_txt").value;
    let birthday = document.getElementById("birthday_teacher_txt").value;

    let id = document.getElementById("id_teacher_txt").value;
    let verified_id = await checkParserId(id);
    if (verified_id) {
        errorElement("input-wrap-teacher-id");
        return;
    }
    let email = document.getElementById("email_teacher_txt").value;
    let verified_email = await checkParserEmail(email);
    if (verified_email) {
        errorElement("input-wrap-teacher-email");
        return;
    }
    let middlename = document.getElementById("middlename_teacher_txt").value;
    if (middlename === '') {
        middlename = 'none';
    }
    let suffix = document.getElementById("suffix_teacher_txt").value;
    if (suffix === '') {
        suffix = "none";
    }
    submitTeacher(id, firstname, middlename, lastname, suffix, birthday, email);
});
document.getElementById("viewteacher_btn").addEventListener("click", function () {
    window.location.href = "viewCreatedTeacher.html";
});
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
async function submitTeacher(id, firstname, middlename, lastname, suffix, birthday, email) {
    await update(ref(database, "PARSEIT/administration/teachers/" + id), {
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

document.getElementById("submitstudent_btn").addEventListener("click", async function () {
    let firstname = document.getElementById("firstname_student_txt").value;
    let lastname = document.getElementById("lastname_student_txt").value;
    let birthday = document.getElementById("birthday_student_txt").value;

    const selectedRegular = document.querySelector('input[name="regular"]:checked');
    let regularity = selectedRegular.value;

    const selectedSection = document.querySelector('input[name="section"]:checked');
    let section = selectedSection.value;

    const selectedYear = document.querySelector('input[name="year"]:checked');
    let year = selectedYear.value;

    let id = document.getElementById("id_student_txt").value;
    let verified_id = await checkParserId(id);
    if (verified_id) {
        errorElement("input-wrap-student-id");
        return;
    }
    let email = document.getElementById("email_student_txt").value;
    let verified_email = await checkParserEmail(email);
    if (verified_email) {
        errorElement("input-wrap-student-email");
        return;
    }
    let middlename = document.getElementById("middlename_student_txt").value;
    if (middlename === '') {
        middlename = 'none';
    }
    let suffix = document.getElementById("suffix_student_txt").value;
    if (suffix === '') {
        suffix = "none";
    }
    submitStudent(regularity, year, section, id, firstname, middlename, lastname, suffix, birthday, email);
});
document.querySelectorAll('input[name="year"]').forEach((input) => {
    input.addEventListener("change", async () => {
        document.getElementById("input-section").style.display = "flex";
        const year = document.querySelector('input[name="year"]:checked').value;

        await get(child(dbRef, `PARSEIT/administration/section/year-lvl-${year}`)).then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const entries = Object.entries(data);

                if (entries.length >= 1) {
                    const [key1, value1] = entries[0];
                    document.getElementById("section-1").innerText = `${key1}-${value1}`;
                    document.getElementById("section-radio-1").setAttribute('value', `${key1}-${value1}`);
                }
                if (entries.length >= 2) {
                    const [key2, value2] = entries[1];
                    document.getElementById("section-2").innerText = `${key2}-${value2}`;
                    document.getElementById("section-radio-2").setAttribute('value', `${key2}-${value2}`);
                }
            } else {
                console.log('No data available for the selected year');
                document.getElementById("section-1").innerText = '';
                document.getElementById("section-2").innerText = '';
            }
        }).catch((error) => {
            console.error('Error fetching data:', error);
        });
    });
});
document.getElementById("viewstudent_btn").addEventListener("click", function () {
    window.location.href = "viewCreatedStudent.html";
});
function createTemporaryPassStudent(firstname, lastname, suffix) {
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
function clearAddStudentForm() {
    setTimeout(() => {
        document.getElementById("check_animation_div").style.display = "none";
    }, 2000);
    document.getElementById("id_student_txt").value = "";
    document.getElementById("firstname_student_txt").value = "";
    document.getElementById("middlename_student_txt").value = "";
    document.getElementById("lastname_student_txt").value = "";
    document.getElementById("suffix_student_txt").value = "";
    document.getElementById("birthday_student_txt").value = "";
    document.getElementById("email_student_txt").value = "";
}
async function submitStudent(regularity, year, section, id, firstname, middlename, lastname, suffix, birthday, email) {
    await update(ref(database, "PARSEIT/administration/students/" + id), {
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
        temporarypass: createTemporaryPassStudent(firstname, lastname, suffix),
        type: "student",
        yearlvl: year,
    }).then(() => {
        document.getElementById("check_animation_div").style.display = "flex";
        clearAddStudentForm();
    });
}

async function checkParserEmail(email) {
    let student = await get(ref(database, `PARSEIT/administration/students/`));
    let teacher = await get(ref(database, `PARSEIT/administration/teachers/`));
    if (student.exists()) {
        const student_id = student.val();
        for (const id in student_id) {
            if (student_id[id]?.email === email) {
                return true;
            }
        }
    }
    if (teacher.exists()) {
        const teacher_id = teacher.val();
        for (const id in teacher_id) {
            if (teacher_id[id]?.email === email) {
                return true;
            }
        }
    }
    return false;
}
async function checkParserId(id) {
    let student = await get(ref(database, `PARSEIT/administration/students/`));
    let teacher = await get(ref(database, `PARSEIT/administration/teachers/`));
    if (student.exists()) {
        const student_id = student.val();
        for (const parser in student_id) {
            if (parser === id) {
                return true;
            }
        }
    }
    if (teacher.exists()) {
        const teacher_id = teacher.val();
        for (const parser in teacher_id) {
            if (parser === id) {
                return true;
            }
        }
    }
    return false;
}
function errorElement(element) {
    document.getElementById(element).style.border = "0.5px solid red";
    setTimeout(() => {
        document.getElementById(element).style.border = "0.5px solid #dcdcdc";
    }, 1000);
}
function showCheckAnimation() {
    document.getElementById("check_animation_div").style.display = "flex";
    setTimeout(() => {
        document.getElementById("check_animation_div").style.display = "none";
    }, 2000);
}
async function getCurrentAcadYear() {
    return new Promise(() => {
        const dbRefPath = ref(database, "PARSEIT/administration/academicyear/status/");
        onValue(dbRefPath, (snapshot) => {
            if (snapshot.exists()) {
                const currentacad_ref = snapshot.val().academic_ref;
                latest_acad_ref = currentacad_ref; //set as global acad_ref

                latest_ongoing = snapshot.val().ongoing; //set as global ongoing

                if (latest_ongoing === "true") {
                    document.getElementById('endacad_btn').style.display = "block";
                    document.getElementById('startacad_btn').style.display = "none";
                }
                else {
                    document.getElementById('endacad_btn').style.display = "none";
                    document.getElementById('startacad_btn').style.display = "block";
                }

                if (snapshot.val().current_sem === "1") {
                    latest_sem = "first-sem"; //set as global sem
                    toggleSem1();
                }
                else {
                    latest_sem = "second-sem"; //set as global sem
                    toggleSem2();
                }

                get(child(dbRef, `PARSEIT/administration/academicyear/BSIT/${currentacad_ref}`))
                    .then((acad_ref) => {
                        document.getElementById('academicyr_lbl').innerText = acad_ref.val().title;
                    });
            } else {
                //console.log("No data available at the specified reference.");
            }
        }, (error) => {
            //console.log(error);
        });
    });
}
document.getElementById("startacad_btn").addEventListener("click", async function () {
    await update(ref(database, "PARSEIT/administration/academicyear/status"), {
        ongoing: "true",
    });
});
document.getElementById("endacad_btn").addEventListener("click", async function () {
    await update(ref(database, "PARSEIT/administration/academicyear/status"), {
        ongoing: "false",
    });
});
document.getElementById("academicyr_lbl").addEventListener("click", function () {
    viewAcademicYear();
    document.getElementById("allacademicyear_sec").style.display = "flex";
    document.getElementById("setupacad_div").style.display = "flex";
    document.getElementById('description_txt').value = "";
});
document.getElementById("canceladdacad_btn").addEventListener("click", function () {
    document.getElementById("setupacad_div").style.display = "none";
    document.getElementById('addacademicyear_div').style.display = "none";
});
document.getElementById("sem1").addEventListener("click", async function () {
    await update(ref(database, "PARSEIT/administration/academicyear/status"), {
        current_sem: "1",
    });
    toggleSem1();
});
document.getElementById("sem2").addEventListener("click", async function () {
    await update(ref(database, "PARSEIT/administration/academicyear/status"), {
        current_sem: "2",
    });
    toggleSem2();
});
function toggleSem1() {
    document.getElementById('sem1').style.color = "#ff3334";
    document.getElementById('sem1').style.backgroundColor = "#fefefe";

    document.getElementById('sem2').style.color = "#fefefe";
    document.getElementById('sem2').style.backgroundColor = "transparent";
}
function toggleSem2() {
    document.getElementById('sem1').style.color = "#fefefe";
    document.getElementById('sem1').style.backgroundColor = "transparent";

    document.getElementById('sem2').style.color = "#ff3334";
    document.getElementById('sem2').style.backgroundColor = "#fefefe";
}
async function viewAcademicYear() {
    await get(child(dbRef, "PARSEIT/administration/academicyear/BSIT/"))
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
                    radioButton.id = `${key}`;
                    radioButton.name = "academic-year";
                    radioButton.value = key;
                    radioButton.className = "radio-academicyear";
                    radioButton.setAttribute("data-id", `${key}`);
                    const label = document.createElement("label");
                    label.htmlFor = `${key}`;
                    label.textContent = title;
                    label.className = "lbl-academicyear";

                    container.appendChild(radioButton);
                    container.appendChild(label);
                    academicyear_cont.appendChild(container);


                    if (`${key}` === latest_acad_ref) {
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
document.getElementById("setacademicyear_btn").addEventListener("click", function () {
    const selectedRadioButton = document.querySelector('input[name="academic-year"]:checked');
    if (selectedRadioButton) {
        const dataId = selectedRadioButton.dataset.id;
        if (dataId === latest_acad_ref) {
            document.getElementById('allacademicyear_sec').style.border = "0.5px solid red";
            setTimeout(() => {
                document.getElementById('allacademicyear_sec').style.border = "0.5px solid #dcdcdc";
            }, 1500);
            return;
        }
        else {
            update(ref(database, "PARSEIT/administration/academicyear/status"), {
                academic_ref: dataId,
                current_sem: "1",
                ongoing: "false",
            });
            showCheckAnimation();
            viewAcademicYear();
        }

    } else {
        console.log("No radio button selected.");
    }

});
document.getElementById("addacademicyear_btn").addEventListener("click", function () {
    document.getElementById('optionmenu_addacad').style.display = "none";
    document.getElementById('submitacademicyear').style.display = "block";
    document.getElementById('addacademicyear_div').style.display = "block";
});
document.getElementById("submitacademicyear").addEventListener("click", async function () {
    const academic_ref = generateAcadRef();
    let title = document.getElementById('description_txt').value;
    await update(ref(database, "PARSEIT/administration/academicyear/BSIT/" + academic_ref), {
        title: title,
    }).then(() => {
        update(ref(database, "PARSEIT/administration/academicyear/status/"), {
            academic_ref: academic_ref,
            current_sem: "1",
            ongoing: "false",
        }).then(() => {
            showCheckAnimation();
            viewAcademicYear();
            createAllParseClass(academic_ref);
            document.getElementById('optionmenu_addacad').style.display = "flex";
            document.getElementById('submitacademicyear').style.display = "none";
            document.getElementById('addacademicyear_div').style.display = "none";
            document.getElementById('description_txt').value = '';

        });

    });
});
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
            //console.log("Data with custom fields successfully updated for each subject!");
        } else {
            //console.log("No data found at the source reference.");
        }
    } catch (error) {
        //console.error("Error during data transfer:", error);
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
document.getElementById("deleteacademicyear_btn").addEventListener("click", function () {
    const selectedRadioButton = document.querySelector('input[name="academic-year"]:checked');
    if (selectedRadioButton) {
        const dataId = selectedRadioButton.dataset.id;
        if (dataId === latest_acad_ref) {
            document.getElementById('allacademicyear_sec').style.border = "0.5px solid red";
            setTimeout(() => {
                document.getElementById('allacademicyear_sec').style.border = "0.5px solid #dcdcdc";
            }, 1500);
            return;
        }
        else {
            remove(ref(database, `PARSEIT/administration/academicyear/BSIT/` + dataId));
            remove(ref(database, `PARSEIT/administration/parseclass/` + dataId));
            showCheckAnimation();
            viewAcademicYear();
        }

    } else {
        console.log("No radio button selected.");
    }

});

document.getElementById("createfirstyr_btn").addEventListener("click", function () {
    hideEnrollButton();
    document.getElementById("createparseclass_yr").innerText = "Year: Freshman (1st year)";
    document.getElementById("createparseclass_yr").setAttribute('data-value', 'year-lvl-1');
    populateSections("1");
    populateSubjects("year-lvl-1", latest_sem, latest_acad_ref);
    selectedSubjects = [];
    document.getElementById("createparseclass_div").style.display = "flex";
    if (latest_sem === "first-sem") {
        document.getElementById("createparseclass_sem").innerText = "Semester: First";
    }
    else {
        document.getElementById("createparseclass_sem").innerText = "Semester: Second";
    }
    hideHome();
});

document.getElementById("cancelcreateparseclass_btn").addEventListener("click", function () {
    document.getElementById("createparseclass_div").style.display = "none";
    showHome();
    window.location.reload();
});






function hideEnrollButton() {
    document.getElementById('enrollParseclass').style.visibility = "hidden";
}
function hideHome() {
    document.getElementById("home_div").style.display = "none";
}
function showHome() {
    document.getElementById("home_div").style.display = "flex";
}

// setInterval(() => {
//     console.log(creategroupchat_section);
// }, 1000);

let creategroupchat_section = '';
async function populateSections(yearlvl) {
    get(child(dbRef, `PARSEIT/administration/section/year-lvl-${yearlvl}`))
        .then((snapshot) => {
            const academicyear_cont = document.getElementById('section_list');
            academicyear_cont.innerHTML = "";
            const data = snapshot.val();
            if (data) {
                Object.keys(data).forEach((key) => {
                    const title = key;
                    const sectionname = (data[key]);
                    const container = document.createElement("div");
                    container.className = "radio-section";

                    const radioButton = document.createElement("input");
                    radioButton.type = "radio";
                    radioButton.id = `parsesection-${title}-${sectionname}`;
                    radioButton.name = "section-list";
                    radioButton.className = "radio-sectionlist";
                    radioButton.value = `${title}-${sectionname}`;

                    radioButton.addEventListener("click", () => {
                        creategroupchat_section = radioButton.value;
                        makeElementAvailable('parseclass_list');

                        document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
                            checkbox.checked = false;
                            selectedSubjects = [];

                            makeElementUnavailable('addteacher_parseclass');
                            document.getElementById('assignTeacher_txt').value = '';
                            document.getElementById('assignTeacher_txt').disabled = false;
                            document.getElementById('assignTeacher_btn').style.display = "block";
                            document.getElementById('removeTeacher_btn').style.display = "none";


                            makeElementUnavailable('schedtime');
                            makeElementUnavailable('schedday');
                            document.getElementById('start_txt').value = '';
                            document.getElementById('end_txt').value = '';
                            document.getElementById('room_txt').value = '';

                            makeElementUnavailable('addstudent_parseclass');
                            makeElementUnavailable('addcluster_parseclass');
                            document.getElementById('assignTeacher_txt').value = '';
                            document.getElementById('addCluster_txt').value = '';




                            document.getElementById('schedule_list').style.display = "none";

                        });
                    });

                    const label = document.createElement("label");
                    label.htmlFor = `parsesection-${title}-${sectionname}`;
                    label.textContent = sectionname;
                    label.className = "lbl-sectionlist";

                    container.appendChild(radioButton);
                    container.appendChild(label);
                    academicyear_cont.appendChild(container);

                });
            } else {
                academicyear_cont.innerHTML = "<div class='nodatafound'>No data found.</div>";
            }
        })
        .catch((error) => {
            //alert(error);
        });
}
let selectedSubjects = [];
async function populateSubjects(yearlvl, sem, acad_ref) {
    get(child(dbRef, `PARSEIT/administration/parseclass/${acad_ref}/${yearlvl}/${sem}`))
        .then((snapshot) => {
            const academicyear_cont = document.getElementById('parseclass_list');
            academicyear_cont.innerHTML = "";
            const data = snapshot.val();
            if (data) {
                Object.keys(data).forEach((key) => {
                    const title = key;
                    const container = document.createElement("div");
                    container.className = "radio-subject";
                    const checkBox = document.createElement("input");
                    checkBox.type = "checkbox";
                    checkBox.id = `parseclass-${key.replace(/\s+/g, "")}`;
                    checkBox.name = "subject-list";
                    checkBox.className = "radio-subjectlist";
                    checkBox.value = title.replace(/\s+/g, "");
                    checkBox.addEventListener("change", () => {

                        if (checkBox.checked) {
                            selectedSubjects.push(title);
                        } else {
                            const index = selectedSubjects.indexOf(title);
                            if (index > -1) {
                                selectedSubjects.splice(index, 1);
                            }
                        }

                        if (selectedSubjects.length === 0) {
                            makeElementUnavailable('addteacher_parseclass');
                            document.getElementById('assignTeacher_txt').value = '';
                            document.getElementById('assignTeacher_txt').disabled = false;

                            makeElementUnavailable('schedtime');
                            makeElementUnavailable('schedday');
                            document.getElementById('start_txt').value = '';
                            document.getElementById('end_txt').value = '';
                            document.getElementById('room_txt').value = '';

                            makeElementUnavailable('addstudent_parseclass');
                            makeElementUnavailable('addcluster_parseclass');
                            document.getElementById('assignTeacher_txt').value = '';
                            document.getElementById('addCluster_txt').value = '';
                            document.getElementById('assignTeacher_btn').style.display = "block";
                            document.getElementById('removeTeacher_btn').style.display = "none";


                            document.getElementById('schedule_list').style.display = "none";
                        }

                        if (selectedSubjects.length === 1) {
                            makeElementAvailable('addteacher_parseclass');
                            document.getElementById('assignTeacher_txt').value = '';
                            document.getElementById('assignTeacher_btn').style.display = "block";
                            document.getElementById('removeTeacher_btn').style.display = "none";

                            makeElementAvailable('schedule_list');

                            makeElementAvailable('schedtime');
                            makeElementAvailable('schedday');
                            document.getElementById('start_txt').value = '';
                            document.getElementById('end_txt').value = '';
                            document.getElementById('room_txt').value = '';

                            makeElementAvailable('addstudent_parseclass');
                            makeElementAvailable('addcluster_parseclass');
                            document.getElementById('assignTeacher_txt').value = '';
                            document.getElementById('addCluster_txt').value = '';

                            get(child(dbRef, `PARSEIT/administration/parseclass/${acad_ref}/${yearlvl}/${sem}/${selectedSubjects}/${creategroupchat_section}`)).then((section) => {
                                if (section.exists()) {

                                    get(child(dbRef, `PARSEIT/administration/parseclass/${acad_ref}/${yearlvl}/${sem}/${selectedSubjects}/${creategroupchat_section}/teacher_id`)).then((teacher) => {
                                        if (teacher.exists()) {
                                            document.getElementById('assignTeacher_txt').value = section.val().teacher_id;
                                            document.getElementById('assignTeacher_txt').disabled = true;
                                            document.getElementById('assignTeacher_btn').style.display = "none";
                                            document.getElementById('removeTeacher_btn').style.display = "block";

                                        }
                                        else {
                                            document.getElementById('assignTeacher_txt').value = '';
                                            document.getElementById('assignTeacher_txt').disabled = false;
                                            document.getElementById('assignTeacher_btn').style.display = "block";
                                            document.getElementById('removeTeacher_btn').style.display = "none";
                                        }
                                    })

                                    get(child(dbRef, `PARSEIT/administration/parseclass/${acad_ref}/${yearlvl}/${sem}/${selectedSubjects}/${creategroupchat_section}/schedule`)).then((schedule) => {
                                        if (schedule.exists()) {
                                            document.getElementById('schedule_list').style.display = "flex";
                                            populateSchedules(acad_ref, yearlvl, sem, selectedSubjects, creategroupchat_section);
                                        }
                                        else {
                                            document.getElementById('schedule_list').style.display = "none";
                                        }
                                    });
                                }
                                else {
                                    makeElementAvailable('addteacher_parseclass');
                                    document.getElementById('assignTeacher_txt').value = '';
                                    document.getElementById('assignTeacher_btn').style.display = "block";
                                    document.getElementById('removeTeacher_btn').style.display = "none";

                                    makeElementAvailable('schedtime');
                                    makeElementAvailable('schedday');
                                    document.getElementById('start_txt').value = '';
                                    document.getElementById('end_txt').value = '';
                                    document.getElementById('room_txt').value = '';

                                    makeElementAvailable('addstudent_parseclass');
                                    makeElementAvailable('addcluster_parseclass');
                                    document.getElementById('assignTeacher_txt').value = '';
                                    document.getElementById('addCluster_txt').value = '';

                                    document.getElementById('schedule_list').style.display = "none";
                                }
                            });


                        }

                        if (selectedSubjects.length > 1) {
                            makeElementAvailable('addteacher_parseclass');
                            document.getElementById('assignTeacher_txt').value = '';
                            document.getElementById('assignTeacher_txt').disabled = false;
                            document.getElementById('assignTeacher_btn').style.display = "block";
                            document.getElementById('removeTeacher_btn').style.display = "none";


                            makeElementUnavailable('schedtime');
                            makeElementUnavailable('schedday');
                            document.getElementById('start_txt').value = '';
                            document.getElementById('end_txt').value = '';
                            document.getElementById('room_txt').value = '';

                            makeElementAvailable('addstudent_parseclass');
                            makeElementAvailable('addcluster_parseclass');
                            document.getElementById('assignTeacher_txt').value = '';
                            document.getElementById('addCluster_txt').value = '';

                            document.getElementById('schedule_list').style.display = "none";
                        }


                    });
                    const label = document.createElement("label");
                    label.htmlFor = `parseclass-${key.replace(/\s+/g, "")}`;
                    label.textContent = title;
                    label.className = "lbl-subjectlist";

                    container.appendChild(checkBox);
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

let selectedSchedules = [];
async function populateSchedules(acadref, yrlvl, sem, subject, section) {
    get(child(dbRef, `PARSEIT/administration/parseclass/${acadref}/${yrlvl}/${sem}/${subject}/${section}/`))
        .then((snapshot) => {
            const academicyear_cont = document.getElementById('schedule_list');
            academicyear_cont.innerHTML = "";
            const data = snapshot.val();

            if (data) {
                Object.keys(data.schedule).forEach((key) => {
                    const title = data.schedule[key].day;
                    const start = data.schedule[key].start;
                    const end = data.schedule[key].end;
                    const container = document.createElement("div");
                    container.className = "checkbox-schedule";

                    const checkbox = document.createElement("input");
                    checkbox.type = "checkbox";
                    checkbox.id = `schedule-${key.replace(/\s+/g, "")}`;
                    checkbox.name = "schedule-list";
                    checkbox.className = "checkbox-schedulelist";
                    checkbox.value = key;

                    checkbox.addEventListener("change", () => {
                        if (checkbox.checked) {
                            selectedSchedules.push(key);
                        } else {
                            const index = selectedSchedules.indexOf(key);
                            if (index > -1) {
                                selectedSchedules.splice(index, 1);
                            }
                        }

                        if (selectedSchedules.length === 0) {
                            document.getElementById('addschedulesection').style.display = "block";
                            document.getElementById('deleteschedulesection').style.display = "none";
                        }
                        else {
                            document.getElementById('addschedulesection').style.display = "none";
                            document.getElementById('deleteschedulesection').style.display = "block";
                        }
                    });
                    const label = document.createElement("label");
                    label.htmlFor = `schedule-${key.replace(/\s+/g, "")}`;
                    label.textContent = `${title} (${start}-${end})`;
                    label.className = "lbl-schedulelist";

                    container.appendChild(checkbox);
                    container.appendChild(label);
                    academicyear_cont.appendChild(container);
                    document.getElementById('schedule_list').style.display = "flex";
                    document.getElementById("schedtime").style.marginTop = "10px";
                });
            } else {
                document.getElementById('schedule_list').style.display = "none";
                document.getElementById("schedtime").style.marginTop = "0px";
            }
        });
}


// async function populateSchedules(acadref, yrlvl, sem, subject, section) {
//     get(child(dbRef, `PARSEIT/administration/parseclass/${acadref}/${yrlvl}/${sem}/${subject}/${section}`))
//         .then((snapshot) => {
//             const academicyear_cont = document.getElementById('schedule_list');
//             academicyear_cont.innerHTML = "";
//             const data = snapshot.val();
//             if (data) {
//                 Object.keys(data.schedule).forEach((key) => {
//                     const title = data.schedule[key].day;
//                     const start = data.schedule[key].start;
//                     const end = data.schedule[key].end;
//                     const container = document.createElement("div");
//                     container.className = "radio-schedule";
//                     //console.log(data.schedule[key].day);
//                     const radioButton = document.createElement("input");
//                     radioButton.type = "radio";
//                     radioButton.id = `schedule-${key.replace(/\s+/g, "")}`;
//                     radioButton.name = "schedule-list";
//                     radioButton.className = "radio-schedulelist";
//                     radioButton.value = title.replace(/\s+/g, "");

//                     radioButton.addEventListener("click", () => {

//                         document.getElementById('start_txt').value = start;
//                         document.getElementById('end_txt').value = end;
//                         document.getElementById('day-select').value = title;
//                         document.getElementById('assignTeacher_txt').value = data.teacher_id;

//                         document.getElementById('addschedulesection').disabled = true;
//                         document.getElementById('addschedulesection').style.backgroundColor = "#dcdcdc";
//                         document.getElementById('start_txt').disabled = true;
//                         document.getElementById('end_txt').disabled = true;
//                         document.getElementById('day-select').disabled = true;


//                         document.getElementById('schedday').style.display = "none";
//                         document.getElementById('schedtime').style.display = "none";

//                         document.getElementById('assignTeacher_btn').style.display = "none";

//                         document.getElementById('assignTeacher_txt').disabled = true;

//                     });

//                     const label = document.createElement("label");
//                     label.htmlFor = `schedule-${key.replace(/\s+/g, "")}`;
//                     label.textContent = `${title} (${start}-${end})`;
//                     label.className = "lbl-schedulelist";

//                     container.appendChild(radioButton);
//                     container.appendChild(label);
//                     academicyear_cont.appendChild(container);
//                     document.getElementById('schedule_list').style.display = "flex";
//                     document.getElementById("schedtime").style.marginTop = "10px";
//                 });
//             } else {
//                 document.getElementById('schedule_list').style.display = "none";
//                 document.getElementById("schedtime").style.marginTop = "0px";
//             }
//         })
// }

document.getElementById("removeTeacher_btn").addEventListener("click", async function () {
    const yearlvl = document.getElementById("createparseclass_yr").getAttribute('data-value');
    for (const subject in selectedSubjects) {
        await remove(ref(database, `PARSEIT/administration/parseclass/${latest_acad_ref}/${yearlvl}/${latest_sem}/${selectedSubjects[subject]}/${creategroupchat_section}/teacher_id`));
        document.getElementById('assignTeacher_txt').value = '';
        document.getElementById('assignTeacher_btn').style.display = "block";
        document.getElementById('removeTeacher_btn').style.display = "none";
        document.getElementById('assignTeacher_txt').disabled = false;
    }
});
document.getElementById("assignTeacher_btn").addEventListener("click", async function () {
    const yearlvl = document.getElementById("createparseclass_yr").getAttribute('data-value');
    const teacherid = document.getElementById('assignTeacher_txt').value;

    if (await checkTeacherId(teacherid)) {
        for (const subject of selectedSubjects) {
            try {
                const path = `PARSEIT/administration/parseclass/${latest_acad_ref}/${yearlvl}/${latest_sem}/${subject}/${creategroupchat_section}/`;
                await update(ref(database, path), { teacher_id: teacherid });
                document.getElementById('assignTeacher_txt').disabled = true;
                document.getElementById('assignTeacher_btn').style.display = "none";
                document.getElementById('removeTeacher_btn').style.display = "block";
            } catch (error) {
                //console.error("Error updating teacher ID:", error);
            }
        }
    }
    else {
        errorElement("addteacher_parseclass");
    }


});
document.getElementById("clear_section").addEventListener("click", function () {
    const yrlvl = document.getElementById('createparseclass_yr').getAttribute("data-value");
    const selectedRadioButton = document.querySelector('input[name="section-list"]:checked');
    const subject = document.querySelector('input[name="subject-list"]:checked');
    if (selectedRadioButton) {
        if (subject) {
            get(child(dbRef, `PARSEIT/administration/parseclass/${latest_acad_ref}/${yrlvl}/${latest_sem}/`))
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        selectedSubjects.forEach((subjectKey) => {
                            remove(ref(database, `PARSEIT/administration/parseclass/${latest_acad_ref}/${yrlvl}/${latest_sem}/${subjectKey}/${selectedRadioButton.value}/members`));
                        });
                    } else {
                        console.log("No data available");
                    }
                });
        }
        else {
            get(child(dbRef, `PARSEIT/administration/parseclass/${latest_acad_ref}/${yrlvl}/${latest_sem}/`))
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        const data = snapshot.val();
                        for (const subjectKey in data) {

                            remove(ref(database, `PARSEIT/administration/parseclass/${latest_acad_ref}/${yrlvl}/${latest_sem}/${subjectKey}/${selectedRadioButton.value}/members`));
                        }
                    } else {
                        console.log("No data available");
                    }
                });
        }

    } else {
        console.log("No radio button selected.");
    }

});
document.getElementById("addschedulesection").addEventListener("click", async function () {
    let start = document.getElementById('start_txt').value;
    let end = document.getElementById('end_txt').value;
    let room = document.getElementById('room_txt').value;

    if (start === "") {
        document.getElementById('start_txt').style.border = "0.5px solid red";
        setTimeout(() => {
            document.getElementById('start_txt').style.border = "0.5px solid #dcdcdc";
        }, 2000);
        return;
    }
    if (end === "") {
        document.getElementById('end_txt').style.border = "0.5px solid red";
        setTimeout(() => {
            document.getElementById('end_txt').style.border = "0.5px solid #dcdcdc";
        }, 2000);
        return;
    }
    if (selectedSubjects.length === 0) {
        document.getElementById("parseclass_list").style.border = "0.5px solid red";
        setTimeout(() => {
            document.getElementById('parseclass_list').style.border = "0.5px solid #dcdcdc";
        }, 2000);
    }
    else {
        const yr = document.getElementById("createparseclass_yr").getAttribute('data-value');
        const day = document.getElementById('day-select').value;
        const currentTime = Date.now();
        if (room === "") {
            room = "TBA";
        }
        for (const subject of selectedSubjects) {
            await update(ref(database, `PARSEIT/administration/parseclass/${latest_acad_ref}/${yr}/${latest_sem}/${subject}/${creategroupchat_section}/schedule/${currentTime.toString()}/`), {
                day: day,
                start: start,
                end: end,
                room: room,
            })
        }
        document.getElementById('start_txt').value = '';
        document.getElementById('end_txt').value = '';
        document.getElementById('room_txt').value = '';
        populateSchedules(latest_acad_ref, yr, latest_sem, selectedSubjects, creategroupchat_section);
    }
});
document.getElementById("deleteschedulesection").addEventListener("click", async function () {
    const yearlvl = document.getElementById("createparseclass_yr").getAttribute('data-value');
    for (const scheduleid of selectedSchedules) {
        await remove(ref(database, `PARSEIT/administration/parseclass/${latest_acad_ref}/${yearlvl}/${latest_sem}/${selectedSubjects}/${creategroupchat_section}/schedule/${scheduleid}`));
    }
    get(child(dbRef, `PARSEIT/administration/parseclass/${latest_acad_ref}/${yearlvl}/${latest_sem}/${selectedSubjects}/${creategroupchat_section}/schedule`)).then((section) => {
        if (section.exists()) {
            populateSchedules(latest_acad_ref, yearlvl, latest_sem, selectedSubjects, creategroupchat_section);
            document.getElementById("deleteschedulesection").style.display = "none";
            document.getElementById("addschedulesection").style.display = "block";
        }
        else {
            document.getElementById('schedule_list').style.display = "none";
            document.getElementById("deleteschedulesection").style.display = "none";
            document.getElementById("addschedulesection").style.display = "block";
        }
    });

});

async function checkTeacherId(id) {
    let teacher = await get(ref(database, `PARSEIT/administration/teachers/`));
    if (teacher.exists()) {
        const teacher_id = teacher.val();
        for (const parser in teacher_id) {
            if (parser === id) {
                return true;
            }
        }
    }
    return false;
}

function makeElementAvailable(element) {
    document.getElementById(element).style.transition = "0.3s ease-in-out";
    document.getElementById(element).style.opacity = "1";
    document.getElementById(element).style.pointerEvents = "all";
}

function makeElementUnavailable(element) {
    document.getElementById(element).style.transition = "0.3s ease-in-out";
    document.getElementById(element).style.opacity = "0.5";
    document.getElementById(element).style.pointerEvents = "none";
}


















// document.getElementById("createsecondyr_btn").addEventListener("click", function () {
//     viewAcademicYear();
//     hideEnrollButton();
//     document.getElementById("createparseclass_yr").innerText = "Year: Sophomore (2nd year)";
//     document.getElementById("createparseclass_yr").setAttribute('data-value', 'year-lvl-2');
//     document.getElementById("addStudent_txt").value = "";
//     getSemester().then((sem) => {
//         document.getElementById("createparseclass_sem").setAttribute('data-value', `${sem}`);
//         populateSubjects("year-lvl-2", sem, currentacad_ref);
//         populateSections("2");
//         document.getElementById("createparseclass_div").style.display = "flex";
//         if (sem === "first-sem") {
//             document.getElementById("createparseclass_sem").innerText = "Semester: First";
//         }
//         else {
//             document.getElementById("createparseclass_sem").innerText = "Semester: Second";
//         }
//         hideHome();
//     }).catch((error) => {
//         console.error("Error fetching semester:", error);
//     });
// });
// document.getElementById("createthirdyr_btn").addEventListener("click", function () {
//     hideEnrollButton();
//     viewAcademicYear();
//     document.getElementById("createparseclass_yr").innerText = "Year: Junior (3rd year)";
//     document.getElementById("createparseclass_yr").setAttribute('data-value', 'year-lvl-3');
//     document.getElementById("addStudent_txt").value = "";
//     getSemester().then((sem) => {
//         populateSubjects("year-lvl-3", sem, currentacad_ref);
//         populateSections("3");
//         document.getElementById("createparseclass_sem").setAttribute('data-value', `${sem}`);
//         document.getElementById("createparseclass_div").style.display = "flex";
//         if (sem === "first-sem") {
//             document.getElementById("createparseclass_sem").innerText = "Semester: First";
//         }
//         else {
//             document.getElementById("createparseclass_sem").innerText = "Semester: Second";
//         }
//         hideHome();
//     }).catch((error) => {
//         console.error("Error fetching semester:", error);
//     });
// });
// document.getElementById("createfourthyr_btn").addEventListener("click", function () {
//     viewAcademicYear();
//     hideEnrollButton();
//     document.getElementById("createparseclass_yr").innerText = "Year: Senior (4th year)";
//     document.getElementById("createparseclass_yr").setAttribute('data-value', 'year-lvl-4');
//     document.getElementById("addStudent_txt").value = "";
//     getSemester().then((sem) => {
//         document.getElementById("createparseclass_sem").setAttribute('data-value', `${sem}`);
//         populateSubjects("year-lvl-4", sem, currentacad_ref);
//         populateSections("4");
//         document.getElementById("createparseclass_div").style.display = "flex";
//         if (sem === "first-sem") {
//             document.getElementById("createparseclass_sem").innerText = "Semester: First";
//         }
//         else {
//             document.getElementById("createparseclass_sem").innerText = "Semester: Second";
//         }
//         hideHome();
//     }).catch((error) => {
//         console.error("Error fetching semester:", error);
//     });
// });








// function setButtonStart() {
//     get(child(dbRef, "PARSEIT/administration/academicyear/status/"))
//         .then((snapshot) => {
//             if (snapshot.val().ongoing === "true") {
//                 document.getElementById('startacad_btn').style.display = "none";
//                 document.getElementById('endacad_btn').style.display = "block";

//             }
//             else {
//                 document.getElementById('startacad_btn').style.display = "block";
//                 document.getElementById('endacad_btn').style.display = "none";
//             }
//         });
// }



// let selectedCluster_id = "";
// let selectedCluster_name = "";
// async function viewCluster(admin_id) {
//     const mycluster_cont = document.getElementById("cluster-div");
//     const path = `PARSEIT/administration/admins/${admin_id}/mycluster/forparseroom/`;
//     try {
//         const snapshot = await get(child(dbRefAdmin, path));
//         if (snapshot.exists()) {
//             const data = snapshot.val();
//             mycluster_cont.innerHTML = '';
//             Object.entries(data).forEach(([key, cluster]) => {
//                 const clusterTitleDiv = document.createElement("div");
//                 clusterTitleDiv.classList.add("cluster-title-div");
//                 clusterTitleDiv.id = `cluster-title-${key}`;
//                 const radioInput = document.createElement("input");
//                 radioInput.type = "radio";
//                 radioInput.classList.add("radio-title");
//                 radioInput.id = `radio-title-${key}`;
//                 radioInput.name = "radio-cluster-title";
//                 clusterTitleDiv.appendChild(radioInput);

//                 const clusterLabel = document.createElement("label");
//                 clusterLabel.classList.add("cluster-title");
//                 clusterLabel.id = `cluster-title-${key}`;
//                 clusterLabel.setAttribute("for", `radio-title-${key}`);
//                 clusterLabel.textContent = cluster.name;
//                 clusterTitleDiv.appendChild(clusterLabel);

//                 mycluster_cont.appendChild(clusterTitleDiv);

//                 document.getElementById(`radio-title-${key}`).addEventListener('click', function () {
//                     selectedCluster_id = `${key}`;
//                     selectedCluster_name = `${cluster.name}`;

//                     // document.querySelectorAll(".id-cluster").forEach(function (element) {
//                     //     element.style.display = 'none';
//                     // });

//                     // document.querySelectorAll(`.id-cluster-${key}`).forEach(function (element) {
//                     //     element.style.display = 'flex';
//                     // });
//                 });

//                 // Object.entries(cluster.cluster).forEach(([cluster_studentid]) => {
//                 //     const listDiv = document.createElement("div");
//                 //     listDiv.classList.add(`cluster-list`);
//                 //     listDiv.classList.add(`cluster-list-${key}`);
//                 //     const studentIdSpan = document.createElement("span");
//                 //     studentIdSpan.classList.add("id-cluster");
//                 //     studentIdSpan.classList.add(`id-cluster-${key}`);
//                 //     studentIdSpan.id = `cluster-parser-${cluster_studentid}`;
//                 //     studentIdSpan.textContent = cluster_studentid;

//                 //     listDiv.appendChild(studentIdSpan);
//                 //     mycluster_cont.appendChild(listDiv);
//                 // });
//             });

//         } else {
//             // console.log("No data available");
//         }
//     } catch (error) {
//         console.error("Error fetching data:", error);
//     }
// }




// // document.getElementById("assignTeacher_btn").addEventListener("click", function () {
// //     const targetId = document.getElementById("assignTeacher_txt").value;
// //     if (subjectparseclass_id === "") {
// //         document.getElementById("parseclass_list").style.border = "0.5px solid red";
// //     }
// //     else if (targetId === "") {
// //         document.getElementById("addteacher_parseclass").style.border = "0.5px solid red";
// //     }
// //     else {
// //         getTeacher(targetId).then((snapshot) => {
// //             if (snapshot) {
// //                 check_teacher = true;
// //                 selectedTeacher = document.getElementById("assignTeacher_txt").value;
// //                 console.log(selectedTeacher);

// //                 document.getElementById("assignTeacher_txt").value = snapshot.val().firstname + " " + snapshot.val().lastname;
// //                 document.getElementById("addteacher_parseclass").style.border = "0.5px solid #dcdcdc";
// //                 document.getElementById("assignTeacher_btn").style.visibility = "hidden";
// //                 document.getElementById("assignTeacher_txt").disabled = true;

// //             }

// //             if (!snapshot) {
// //                 document.getElementById("addteacher_parseclass").style.border = "0.5px solid red";

// //             }
// //         })

// //     }

// // });
// document.getElementById("assignTeacher_txt").addEventListener("click", function () {
//     const targetId = document.getElementById("assignTeacher_txt").value;
//     if (subjectparseclass_id === "") {
//         document.getElementById("parseclass_list").style.border = "0.5px solid red";
//     }
//     else if (targetId === "") {
//         document.getElementById("addteacher_parseclass").style.border = "0.5px solid red";
//     }
//     else {
//         getTeacher(targetId).then((snapshot) => {
//             if (snapshot) {
//                 //console.log(snapshot);
//                 check_teacher = true;
//                 selectedTeacher = document.getElementById("assignTeacher_txt").value;
//                 //console.log(selectedTeacher);

//                 document.getElementById("assignTeacher_txt").value = snapshot.firstname + " " + snapshot.lastname;
//                 document.getElementById("addteacher_parseclass").style.border = "0.5px solid #dcdcdc";
//                 document.getElementById("assignTeacher_btn").style.visibility = "hidden";
//                 document.getElementById("assignTeacher_txt").disabled = true;

//             }

//             if (!snapshot) {
//                 document.getElementById("addteacher_parseclass").style.border = "0.5px solid red";

//             }
//         })

//     }

// });


// document.getElementById("addStudent_txt").addEventListener("blur", function () {
//     const targetId = document.getElementById("addStudent_txt").value;
//     if (subjectparseclass_id === "") {
//         document.getElementById("parseclass_list").style.border = "0.5px solid red";
//     }
//     else if (targetId === "") {
//         document.getElementById("addstudent_parseclass").style.border = "0.5px solid red";
//     }
//     else {
//         getStudent(targetId).then((snapshot) => {
//             if (snapshot) {
//                 check_student = true;
//                 showEnrollButton();
//                 document.getElementById("addstudent_parseclass").style.border = "0.5px solid #dcdcdc";
//                 document.getElementById("addStudent_btn").style.display = "none";
//                 document.getElementById("addStudent_txt").disabled = true;
//                 document.getElementById("viewStudent_btn").style.display = "block";

//             }

//             if (!snapshot) {
//                 document.getElementById("addstudent_parseclass").style.border = "0.5px solid red";

//             }
//         })

//     }

// });
// document.getElementById("viewStudent_btn").addEventListener("touchstart", async function () {
//     const parser_username = await getUsernameById(document.getElementById("addStudent_txt").value);
//     await getDetails(document.getElementById("addStudent_txt").value);
//     document.getElementById("iddetails-username").innerHTML = "Username: " + parser_username;
//     document.getElementById("viewid_div").style.display = "flex";
//     document.getElementById("iddetails").style.animation = "fadeInFromTop 0.3s ease-out forwards";
// });
// document.getElementById("viewStudent_btn").addEventListener("touchend", function () {
//     document.getElementById("viewid_div").style.display = "none";
//     document.getElementById("iddetails").style.animation = "fadeOutFromBottom 0.3s ease-out forwards";
// });
// let check_student = false;
// let check_teacher = false;
// document.getElementById("enrollParseclass").addEventListener("click", function () {
//     const academicref = currentacad_ref;
//     const yr = document.getElementById("createparseclass_yr").getAttribute('data-value');
//     const sem = document.getElementById("createparseclass_sem").getAttribute('data-value');
//     const subject = selectedSubject;
//     let teacherid = selectedTeacher;
//     let studentid = document.getElementById('addStudent_txt').value;
//     let clusterid = selectedCluster_id;

//     const sourcePath = `PARSEIT/administration/admins/${admin_id}/mycluster/forparseroom/${clusterid}/cluster/`;
//     const destinationPath = `PARSEIT/administration/parseclass/${academicref}/${yr}/${sem}/${selectedSubject}/${selected_section}/members`;

//     //console.log(academicref, yr, sem, subject, section, teacherid, sched_day, sched_end, sched_start);


//     if (teacherid !== "") {
//         if (check_teacher == true) {
//             assignTeacher(academicref, yr, sem, subject, selected_section, teacherid);
//             document.getElementById("addstudent_parseclass").style.border = "0.5px solid #dcdcdc";
//         }

//     }
//     if (studentid !== "") {
//         if (check_student == true) {
//             enrollStudent(academicref, yr, sem, subject, selected_section, studentid);
//         }
//     }
//     else {
//         document.getElementById("addstudent_parseclass").style.border = "0.5px solid red";

//     }

//     if (clusterid !== "") {
//         enrollCluster(sourcePath, destinationPath, yr, section);
//         document.getElementById("addstudent_parseclass").style.border = "0.5px solid #dcdcdc";
//     }

//     document.getElementById("check_animation_div").style.display = "flex";
//     setTimeout(() => {
//         document.getElementById("check_animation_div").style.display = "none";
//         window.location.reload();

//         // document.getElementById('sectionsched_txt').value = "";
//         // document.getElementById('assignTeacher_txt').value = "";
//         // document.getElementById('addStudent_txt').value = "";
//         // document.getElementById('day_txt').value = "";
//         // document.getElementById('start_txt').value = ""
//         // document.getElementById('end_txt').value = "";
//         // document.getElementById('day_txt').value = "";
//         // document.getElementById('addCluster_txt').value = "";

//         // const radios = document.querySelectorAll('input[type="radio"]');
//         // radios.forEach(radio => {
//         //     radio.checked = false;
//         // });



//     }, 2000);
//     document.getElementById('assignTeacher_btn').style.visibility = "visible";
//     document.getElementById('assignTeacher_txt').disabled = false;
//     document.getElementById('addStudent_txt').disabled = false;
//     document.getElementById("viewStudent_btn").style.display = "none";
//     document.getElementById("addStudent_btn").style.display = "none";

// });
// document.getElementById("myCluster_btn").addEventListener("click", function () {
//     document.getElementById("cluster_div").style.display = "flex";
//     getMyClusters(admin_id);

// });

// document.getElementById("addCluster_btn").addEventListener("click", function () {
//     viewCluster(admin_id);
//     document.getElementById("viewcluster_div").style.display = "flex";
// });
// document.getElementById("clusterclose_btn").addEventListener("click", function () {
//     document.getElementById("viewcluster_div").style.display = "none";
//     document.getElementById("cluster-div").innerHTML = "";
//     selectedCluster_id = "";
//     selectedCluster_name = "";
//     document.getElementById("viewStudent_btn").style.display = "block";
//     document.getElementById("addStudent_btn").style.display = "none";


// });
// document.getElementById("select-cluster-btn").addEventListener("click", function () {

//     document.getElementById("viewcluster_div").style.display = "none";
//     document.getElementById('addCluster_txt').value = selectedCluster_name;
//     document.getElementById('enrollParseclass').style.visibility = "visible";
//     document.getElementById("addCluster_btn").style.display = "none";

// });

// document.getElementById("pushCluster").addEventListener("click", async function () {
//     await deleteCluster();
//     window.location.href = "addcluster.html";
// });


// //functions

// }
// function showSection(year) {
//     let section_a = "";
//     let section_b = "";
//     let value_a = "";
//     let value_b = "";
//     if (year === 1) {
//         section_a = "1A - Microsoft";
//         value_a = "1A-Microsoft"
//         section_b = "1B - Google";
//         value_b = "1B-Google"
//     }

//     if (year === 2) {
//         section_a = "2A - Section B";
//         value_a = "2A-SectionA"
//         section_b = "2B - Section A";
//         value_b = "2B-SectionB"

//     }

//     if (year === 3) {
//         section_a = "3A - Section A";
//         value_a = "3A-SectionA"
//         section_b = "3B - Section B";
//         value_b = "3B-SectionB"
//     }

//     if (year === 4) {
//         section_a = "4A - Xamarin";
//         value_a = "4A-Xamarin"
//         section_b = "4B - Laravel";
//         value_b = "4B-Laravel"

//     }
//     document.getElementById('section-radio-1').checked = false;
//     document.getElementById('section-radio-2').checked = false;
//     document.getElementById("section-1").innerText = section_a;
//     document.getElementById("section-1").setAttribute('data-value', value_a);
//     document.getElementById("section-2").innerText = section_b;
//     document.getElementById("section-2").setAttribute('data-value', value_b);
//

//     //console.log(value_a, value_b, year);

// }
// function getRegularity() {
//     const regular = document.getElementById('regular-radio-1');
//     const irregular = document.getElementById('regular-radio-2');
//     if (regular.checked) {
//         return "yes"
//     }

//     if (irregular.checked) {
//         return "no"
//     }
// }
// function createTemporaryPass(firstname, lastname, suffix) {

//     let temporarypass = "";
//     if (suffix === "none") {
//         temporarypass = firstname + lastname + ".parser"
//     }
//     else {
//         temporarypass = firstname + lastname + suffix + ".parser"
//     }
//     temporarypass = temporarypass.toLowerCase();
//     return temporarypass.replace(/\s+/g, "");

// }


// function clearAddStudentForm() {
//     setTimeout(() => {
//         document.getElementById("check_animation_div").style.display = "none";
//     }, 2000);
//     document.getElementById("id_txt").value = "";
//     document.getElementById("firstname_txt").value = "";
//     document.getElementById("middlename_txt").value = "";
//     document.getElementById("lastname_txt").value = "";
//     document.getElementById("suffix_txt").value = "";
//     document.getElementById("birthday_txt").value = "";
//     document.getElementById("email_txt").value = "";
//     document.getElementById('regular-radio-1').checked = false;
//     document.getElementById('regular-radio-2').checked = false;
//     document.getElementById("first_radio").checked = false;
//     document.getElementById("second_radio").checked = false;
//     document.getElementById("third_radio").checked = false;
//     document.getElementById("fourth_radio").checked = false;
//     document.getElementById("input-section").style.display = "none";
//     document.getElementById('section-radio-1').checked = false;
//     document.getElementById('section-radio-2').checked = false;
// }



// function updateAcademicYear(id) {
//     update(ref(database, "PARSEIT/administration/academicyear/status"), {
//         academic_ref: id,
//     });
// }



// function getUsernameById(targetId) {
//     try {
//         return get(child(dbRef, "PARSEIT/username/")).then((snapshot) => {
//             if (snapshot.exists()) {
//                 const data = snapshot.val();
//                 const username = Object.keys(data).find(key => data[key] === targetId);
//                 if (username) {
//                     return username;
//                 } else {
//                     console.log("ID not found");
//                     return null;
//                 }
//             } else {
//                 console.log("No data available");
//                 return null;
//             }
//         });
//     } catch (error) {
//         console.error("Error fetching data:", error);
//     }
// };


// // async function populateSubjects(yearlvl, sem, acad_ref) {
// //     get(child(dbRef, "PARSEIT/administration/parseclass/" + acad_ref + "/" + yearlvl + "/" + sem))
// //         .then((snapshot) => {
// //             const academicyear_cont = document.getElementById('parseclass_list');
// //             academicyear_cont.innerHTML = "";
// //             const data = snapshot.val();
// //             if (data) {
// //                 Object.keys(data).forEach((key) => {
// //                     const title = key;
// //                     const container = document.createElement("div");
// //                     container.className = "radio-subject";

// //                     const radioButton = document.createElement("input");
// //                     radioButton.type = "radio";
// //                     radioButton.id = `parseclass-${key.replace(/\s+/g, "")}`;
// //                     radioButton.name = "subject-list";
// //                     radioButton.className = "radio-subjectlist";
// //                     radioButton.value = title.replace(/\s+/g, "");

// //                     radioButton.addEventListener("click", () => {
// //                         if (!noSection) {
// //                             document.getElementById("parseclass_list").style.border = "0.5px solid #dcdcdc";
// //                             document.getElementById("sectioncreate").style.border = "0.5px solid #dcdcdc";
// //                             subjectparseclass_id = `${key.replace(/\s+/g, "")}`;
// //                             selectedSubject = title;
// //                             const sem = document.getElementById("createparseclass_sem").getAttribute('data-value');
// //                             const yr = document.getElementById("createparseclass_yr").getAttribute('data-value');
// //                             populateSchedules(currentacad_ref, yr, sem, selectedSubject, selected_section);
// //                             get(child(dbRef, "PARSEIT/administration/parseclass/" + acad_ref + "/" + yearlvl + "/" + sem + "/" + key + "/" + selected_section)).
// //                                 then((teacher) => {
// //                                     if (teacher.exists()) {
// //                                         document.getElementById('assignTeacher_txt').value = teacher.val().teacher_id;
// //                                         document.getElementById('assignTeacher_txt').focus();
// //                                         check_teacher = true;
// //                                         selectedTeacher = teacher.val().teacher_id;
// //                                     }
// //                                     else {
// //                                         check_teacher = false;
// //                                         document.getElementById('assignTeacher_txt').value = '';
// //                                         document.getElementById('assignTeacher_txt').disabled = false;
// //                                         document.getElementById('assignTeacher_txt').focus();

// //                                     }

// //                                 });

// //                         }
// //                         else {
// //                             radioButton.checked = false;
// //                             document.getElementById("sectioncreate").style.border = "0.5px solid red";
// //                         }

// //                     });
// //                     const label = document.createElement("label");
// //                     label.htmlFor = `parseclass-${key.replace(/\s+/g, "")}`;
// //                     label.textContent = title;
// //                     label.className = "lbl-subjectlist";

// //                     container.appendChild(radioButton);
// //                     container.appendChild(label);
// //                     academicyear_cont.appendChild(container);

// //                 });
// //             } else {
// //                 academicyear_cont.innerHTML = "<div class='nodatafound'>No data found.</div>";
// //             }
// //         })
// //         .catch((error) => {
// //             alert(error);
// //         });
// // }





// function getTeacher(targetId) {
//     return get(child(dbRef, `PARSEIT/administration/teachers/${targetId}`))
//         .then((snapshot) => {
//             if (snapshot.exists()) {
//                 if (snapshot.val().activated === "yes") {
//                     return snapshot.val();
//                 }
//                 else {
//                     return false;
//                 }
//             }

//         })
// }
// function getStudent(targetId) {
//     return get(child(dbRef, `PARSEIT/administration/students/${targetId}`))
//         .then((snapshot) => {
//             if (snapshot.exists()) {
//                 return true;
//             }
//             else {
//                 return false;
//             }
//         })
// }
// function getDetails(targetId) {
//     return get(child(dbRef, `PARSEIT/administration/students/${targetId}`))
//         .then((snapshot) => {
//             if (snapshot.exists()) {
//                 let suffix = snapshot.val().suffix;
//                 if (snapshot.val().suffix === "none") {
//                     suffix = snapshot.val().suffix = "";
//                 }
//                 document.getElementById("iddetails-fullname").innerHTML = "Fullname: " + snapshot.val().firstname + " " + snapshot.val().middlename + " " + snapshot.val().lastname + " " + suffix;
//                 document.getElementById("iddetails-email").innerHTML = "Email: " + snapshot.val().email;
//                 document.getElementById("iddetails-birthday").innerHTML = "Birthday: " + snapshot.val().birthday;

//             }
//         })
// }
// async function assignTeacher(academicref, yr, sem, subject, section, teacherid) {
//     await update(ref(database, `PARSEIT/administration/parseclass/${academicref}/${yr}/${sem}/${subject}/${section}/`), {
//         teacher_id: teacherid,
//         parseclass_id: academicref + "_" + section + "_" + subject.replace(/\s+/g, ""),
//     }).then(() => {

//     }).catch((error) => {
//         console.error("Error updating data:", error);
//     });
// }
// async function enrollStudent(academicref, yr, sem, subject, section, studentid) {
//     const studentData = {
//         [studentid]: {
//             finalgrade: "0"
//         }
//     };

//     const membersPath = `PARSEIT/administration/parseclass/${academicref}/${yr}/${sem}/${subject}/${section}/members`;

//     try {
//         // Update only the specific student data within the `members` object
//         await update(ref(database, membersPath), studentData);

//         // Update student year and section information
//         // updateStudentYrSection(studentid, translateYr(yr), section);
//     } catch (error) {
//         console.error("Error updating data:", error);
//     }
// }
// async function enrollCluster(sourcePath, destinationPath, yr, section) {
//     if (yr === "year-lvl-1") {
//         yr = "1";
//     }
//     if (yr === "year-lvl-2") {
//         yr = "2";
//     }
//     if (yr === "year-lvl-3") {
//         yr = "3";
//     }
//     if (yr === "year-lvl-4") {
//         yr = "4";
//     }
//     try {
//         const sourceRef = ref(databaseAdmin, sourcePath);
//         const snapshot = await get(sourceRef);
//         if (snapshot.exists()) {
//             const data = snapshot.val();
//             const destinationRef = ref(database, destinationPath);
//             await update(destinationRef, data);
//             snapshot.forEach(childSnapshot => {
//                 const key = childSnapshot.key;
//                 // updateStudentYrSection(key, yr, section);

//             });
//             console.log(`Data successfully copied from ${sourcePath} to ${destinationPath}`);
//         } else {
//             console.log(`No data found at ${sourcePath}`);
//         }
//     } catch (error) {
//         console.error("Error copying data:", error);
//     }
// }
// // async function updateStudentYrSection(parser_id, yr, section) {
// //     await update(ref(database, `PARSEIT/administration/students/${parser_id}/`), {
// //         yearlvl: yr,
// //         section: section
// //     });
// // }
// function translateYr(yr) {
//     switch (yr) {
//         case "year-lvl-1":
//             return "1";
//         case "year-lvl-2":
//             return "2";
//         case "year-lvl-3":
//             return "3";
//         case "year-lvl-4":
//             return "4";
//         default:
//             console.log("error");
//     }
// }


// function showEnrollButton() {
//     document.getElementById('enrollParseclass').style.visibility = "visible";
// }

// // async function populateEnrollDetails(acadRef, yrlvl, sem, subject) {
// //     const section = document.getElementById('sectionsched_txt').value;
// //     try {
// //         const snapshot = await get(child(dbRef, `PARSEIT/administration/parseclass/${acadRef}/${yrlvl}/${sem}/${subject}/${section}`));
// //         if (snapshot.exists()) {
// //             const data = snapshot.val();
// //             document.getElementById('assignTeacher_txt').value = data.teacher_id;
// //             if (data.schedule) {
// //                 document.getElementById('day_txt').value = data.schedule.sched_day || '';
// //                 document.getElementById('start_txt').value = data.schedule.sched_start || '';
// //                 document.getElementById('end_txt').value = data.schedule.sched_end || '';
// //             } else {
// //                 document.getElementById('assignTeacher_txt').value = '';
// //                 document.getElementById('day_txt').value = '';
// //                 document.getElementById('start_txt').value = '';
// //                 document.getElementById('end_txt').value = '';
// //                 console.log('No schedule found');
// //             }
// //             document.getElementById('assignTeacher_btn').style.visibility = "hidden";
// //             document.getElementById('assignTeacher_txt').disabled = true;

// //         } else {
// //             console.log('No data exists for the provided details');
// //             document.getElementById('assignTeacher_txt').value = '';
// //             noSection = true;
// //             check_teacher = false;
// //             document.getElementById('assignTeacher_btn').style.visibility = "visible";
// //             document.getElementById('assignTeacher_txt').disabled = false;

// //         }
// //     } catch (error) {
// //         console.error('Error fetching data:', error);
// //     }
// // }
