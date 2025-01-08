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

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const deletetype = urlParams.get('deletetype');

let admin_id = localStorage.getItem("user-parser-admin");
setScreenSize(window.innerWidth, window.innerHeight);
window.addEventListener("load", function () {

    document.getElementById("loading_animation_div").style.display = "none";
    document.getElementById("home-div").style.display = "flex";
    if (deletetype === "admin") {
        populateAdmin();
    }
    else if (deletetype === "teacher") {
        populateTeachers();
    }
    else if (deletetype === "student") {
        populateStudents();
    }
});


//events
document.getElementById("canceladdcluster-btn").addEventListener("click", function () {
    localStorage.removeItem('active-clustername');
    localStorage.removeItem('active-view-cluster');
    window.location.href = "homepage.html";

});




document.getElementById("delete-cluster-btn").addEventListener("click", async function () {
    const id = document.getElementById("cluster-name-txt").value;

    if (id === '') {
        errorElement("cluster-name-txt");
        return;
    }
    else {
        if (deletetype === "admin") {
            remove(ref(databaseAdmin, `PARSEIT/administration/admins/${id}`));
            populateAdmin();
            document.getElementById("cluster-name-txt").value = '';
        }
        else if (deletetype === "teacher") {
            const acadRef = ref(database, `PARSEIT/administration/parseclass/`);
            onValue(acadRef, async (acadRefSnapshot) => {

                if (acadRefSnapshot.exists()) {
                    const updates = {};
                    for (const acadref in acadRefSnapshot.val()) {
                        const yearlvlSnapshot = acadRefSnapshot.val()[acadref];

                        for (const yearlvl in yearlvlSnapshot) {
                            const semSnapshot = yearlvlSnapshot[yearlvl];

                            for (const sem in semSnapshot) {
                                const subjectSnapshot = semSnapshot[sem];

                                for (const subject in subjectSnapshot) {
                                    const sectionSnapshot = subjectSnapshot[subject];

                                    for (const key in sectionSnapshot) {
                                        const value = sectionSnapshot[key];
                                        if (value.teacher_id === id) {
                                            await remove(ref(database, `PARSEIT/administration/parseclass/${acadref}/${yearlvl}/${sem}/${subject}/${key}/teacher_id/`));

                                            // get(child(dbRef, `PARSEIT/username/`)).then((snapshot) => {
                                            //     if (snapshot.exists()) {
                                            //         const data = snapshot.val();
                                            //         for (const username in data) {
                                            //             if (data[id] === id) {
                                            //                 remove(ref(database, `PARSEIT/username/${username}/`));
                                            //             }
                                            //         }
                                            //     }
                                            // });

                                        }
                                    }
                                }
                            }
                        }
                    }
                    await remove(ref(database, `PARSEIT/administration/teachers/${id}/`));
                    populateTeachers();
                    document.getElementById("cluster-name-txt").value = '';
                }
            });

        }
        else if (deletetype === "student") {
            const acadRef = ref(database, `PARSEIT/administration/parseclass/`);
            onValue(acadRef, async (acadRefSnapshot) => {
                if (acadRefSnapshot.exists()) {
                    const updates = {};
                    for (const acadref in acadRefSnapshot.val()) {
                        const yearlvlSnapshot = acadRefSnapshot.val()[acadref];

                        for (const yearlvl in yearlvlSnapshot) {
                            const semSnapshot = yearlvlSnapshot[yearlvl];

                            for (const sem in semSnapshot) {
                                const subjectSnapshot = semSnapshot[sem];

                                for (const subject in subjectSnapshot) {
                                    const sectionSnapshot = subjectSnapshot[subject];

                                    for (const key in sectionSnapshot) {
                                        const value = sectionSnapshot[key];
                                        //console.log(value);
                                        if (typeof value === "object" && value !== null) {
                                            for (const subKey in value) {
                                                console.log(subKey);
                                                if (typeof value[subKey] === "object" && value[subKey] !== null) {
                                                    for (const studentKey in value[subKey]) {
                                                        if (studentKey === id) {

                                                            // if (!updates[acadref]) updates[acadref] = {};
                                                            // if (!updates[acadref][sem]) updates[acadref][sem] = {};

                                                            // updates[acadref][sem][subject] = {
                                                            //     name: subjectSnapshot[subject].name,
                                                            //     finalgrade: value[subKey][studentKey].finalgrade,
                                                            //     unit: subjectSnapshot[subject].unit,
                                                            // };

                                                            await remove(ref(database, `PARSEIT/administration/parseclass/${acadref}/${yearlvl}/${sem}/${subject}/${key}/members/${id}`));

                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    await remove(ref(database, `PARSEIT/administration/students/${id}/`));
                    populateStudents();
                    document.getElementById("cluster-name-txt").value = '';
                }
            });

        }
    }
});





//functions
function setScreenSize(width, height) {
    document.body.style.width = width + "px";
    document.body.style.height = height + "px";
    document.documentElement.style.height = height + "px";
    document.getElementById("loading_animation_div").style.visibility = "visible";

}
async function populateAdmin() {
    const path = `PARSEIT/administration/admins/`;
    try {
        return await get(child(dbRefAdmin, path)).then((snapshot) => {
            const academicyear_cont = document.getElementById('cluster-view-list-body');
            academicyear_cont.innerHTML = "";
            if (snapshot.exists()) {
                const data = snapshot.val();


                for (const id in data) {
                    getParserAdminFullname(id).then((fullname) => {
                        academicyear_cont.innerHTML += `
                                        <section id="tally-cluster">
                                            <span class="parser-id">${id}</span>
                                            <span class="parser-name">${fullname}</span>
                                        </section>`;
                    });
                }
            } else {

                console.log("No data available");
            }
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }

}

async function populateTeachers() {
    const path = `PARSEIT/administration/teachers/`;
    try {
        return await get(child(dbRef, path)).then((snapshot) => {
            const academicyear_cont = document.getElementById('cluster-view-list-body');
            academicyear_cont.innerHTML = "";
            if (snapshot.exists()) {
                const data = snapshot.val();


                for (const id in data) {
                    getParserTeacherFullname(id).then((fullname) => {
                        academicyear_cont.innerHTML += `
                                        <section id="tally-cluster">
                                            <span class="parser-id">${id}</span>
                                            <span class="parser-name">${fullname}</span>
                                        </section>`;
                    });
                }
            } else {

                console.log("No data available");
            }
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

async function populateStudents() {
    const path = `PARSEIT/administration/students/`;
    try {
        return await get(child(dbRef, path)).then((snapshot) => {
            const academicyear_cont = document.getElementById('cluster-view-list-body');
            academicyear_cont.innerHTML = "";
            if (snapshot.exists()) {
                const data = snapshot.val();
                for (const id in data) {
                    getParserStudentFullname(id).then((fullname) => {
                        academicyear_cont.innerHTML += `
                                        <section id="tally-cluster">
                                            <span class="parser-id">${id}</span>
                                            <span class="parser-name">${fullname}</span>
                                        </section>`;
                    });
                }
            } else {

                console.log("No data available");
            }
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
async function getParserAdminFullname(id) {
    try {
        return get(child(dbRefAdmin, `PARSEIT/administration/admins/${id}`))
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

async function getParserStudentFullname(id) {
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

async function getParserTeacherFullname(id) {
    try {
        return get(child(dbRef, `PARSEIT/administration/teachers/${id}`))
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
async function addCluster(admin_id, student_id, active_cluster_id, cluster_name) {
    const currentTime = Date.now().toString();

    await get(child(dbRef, `PARSEIT/administration/students/${student_id}`))
        .then((snapshot) => {
            if (snapshot.exists()) {
                if (active_cluster_id !== null) {
                    const path = `PARSEIT/administration/admins/${admin_id}/mycluster/forparseroom/${active_cluster_id}/cluster/`;
                    update(ref(databaseAdmin, path), {
                        [student_id]: {
                            finalgrade: "0",
                        },
                    });
                }
                else {
                    const path = `PARSEIT/administration/admins/${admin_id}/mycluster/forparseroom/${currentTime}`;
                    update(ref(databaseAdmin, path), {
                        name: cluster_name,
                        cluster: {
                            [student_id]: {
                                finalgrade: "0",
                            },
                        },
                    });

                    localStorage.setItem('active-view-cluster', currentTime);
                    localStorage.setItem('active-clustername', cluster_name);
                }
                enableDeleteCluster();
                enableRemoveClusterId();
                document.getElementById("cluster-id-txt").value = '';
                document.getElementById("cluster-name-txt").disabled = true;
                populateCluster(admin_id, cluster_name);
            } else {
                errorElement("cluster-id-txt");
            }
        });

}


function disableDeleteCluster() {
    document.getElementById("delete-cluster-btn").style.backgroundColor = '#dcdcdc';
    document.getElementById("delete-cluster-btn").disabled = true;
}

function enableDeleteCluster() {
    document.getElementById("delete-cluster-btn").style.backgroundColor = '#f30505';
    document.getElementById("delete-cluster-btn").disabled = false;
}
function errorElement(element) {
    document.getElementById(element).style.border = "0.5px solid red";
    setTimeout(() => {
        document.getElementById(element).style.border = "0.5px solid #dcdcdc";
    }, 1000);
}

