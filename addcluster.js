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



let admin_id = localStorage.getItem("user-parser-admin");
setScreenSize(window.innerWidth, window.innerHeight);
window.addEventListener("load", function () {
    let active_clustername = localStorage.getItem('active-clustername');

    document.getElementById("loading_animation_div").style.display = "none";
    document.getElementById("home-div").style.display = "flex";
    if (active_clustername !== null) {
        document.getElementById("cluster-name-txt").value = active_clustername;
        document.getElementById("cluster-name-txt").disabled = true;
        enableDeleteCluster();
        enableRemoveClusterId();
        populateCluster(admin_id, active_clustername);
    }
    else {
        disableDeleteCluster();
        disableRemoveClusterId();
        document.getElementById("cluster-name-txt").disabled = false;
        document.getElementById("cluster-name-txt").value = '';
    }
});


//events
document.getElementById("canceladdcluster-btn").addEventListener("click", function () {
    localStorage.removeItem('active-clustername');
    localStorage.removeItem('active-view-cluster');
    clusterTitleAvailable = false;
    window.location.href = "homepage.html";

});

let clusterTitleAvailable = false;
document.getElementById("cluster-name-txt").addEventListener("input", async function () {
    const path = `PARSEIT/administration/admins/${admin_id}/mycluster/forparseroom/`;
    const cluster_name = document.getElementById("cluster-name-txt").value;
    try {
        return await get(child(dbRefAdmin, path)).then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const academicyear_cont = document.getElementById('cluster-view-list-body');
                academicyear_cont.innerHTML = "";
                Object.entries(data).forEach(([key, cluster]) => {
                    if (cluster.name !== cluster_name) {
                        clusterTitleAvailable = true
                    }
                    else {
                        clusterTitleAvailable = false;
                        errorElement("cluster-name-txt");
                        document.getElementById('cluster-id-txt').value = "";
                    }
                });
            } else {
                console.log("No data available");
            }
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }

});

document.getElementById("add-cluster-btn").addEventListener("click", async function () {
    const student_id = document.getElementById("cluster-id-txt").value;
    const cluster_name = document.getElementById("cluster-name-txt").value;
    let active_cluster_id = localStorage.getItem("active-view-cluster");
    let active_clustername = localStorage.getItem('active-clustername');

    if (clusterTitleAvailable) {
        if (active_cluster_id !== null && active_cluster_id !== null) {
            if (student_id !== '') {
                document.getElementById("remove-clusterid-btn").style.display = 'block';
                addCluster(admin_id, student_id, active_cluster_id, active_clustername);


            } else {
                errorElement("cluster-id-txt");
            }
        }
        else {
            if (student_id !== '') {
                document.getElementById("remove-clusterid-btn").style.display = 'block';
                addCluster(admin_id, student_id, active_cluster_id, cluster_name);

            } else {
                errorElement("cluster-id-txt");
            }
        }
    }
    else {
        errorElement("cluster-name-txt");
    }

});

document.getElementById("delete-cluster-btn").addEventListener("click", async function () {
    //console.log(`PARSEIT/administration/admins/${admin_id}/mycluster/forparseroom/${localStorage.getItem('active-view-cluster')}/cluster/`)
    remove(ref(databaseAdmin, `PARSEIT/administration/admins/${admin_id}/mycluster/forparseroom/${localStorage.getItem('active-view-cluster')}`)).then(() => {
        localStorage.removeItem('active-clustername');
        localStorage.removeItem('active-view-cluster');
        clusterTitleAvailable = false;
        window.location.href = "homepage.html";
    });

});

document.getElementById("remove-clusterid-btn").addEventListener("click", async function () {
    const student_id = document.getElementById("cluster-id-txt").value;
    const active_cluster_name = localStorage.getItem("active-clustername");
    const active_cluster_id = localStorage.getItem("active-view-cluster");
    await get(child(dbRefAdmin, `PARSEIT/administration/admins/${admin_id}/mycluster/forparseroom/${active_cluster_id}/cluster/${student_id}`))
        .then((snapshot) => {
            if (snapshot.exists()) {
                if (student_id !== '') {
                    remove(ref(databaseAdmin, `PARSEIT/administration/admins/${admin_id}/mycluster/forparseroom/${localStorage.getItem('active-view-cluster')}/cluster/${student_id}`)).then(() => {
                        populateCluster(admin_id, active_cluster_name);
                    });

                } else {
                    errorElement("cluster-id-txt");
                }

            } else {
                errorElement("cluster-id-txt");
            }
        });

});




//functions
function setScreenSize(width, height) {
    document.body.style.width = width + "px";
    document.body.style.height = height + "px";
    document.documentElement.style.height = height + "px";
    document.getElementById("loading_animation_div").style.visibility = "visible";

}
async function populateCluster(admin_id, cluster_name) {
    const path = `PARSEIT/administration/admins/${admin_id}/mycluster/forparseroom/`;
    try {
        return await get(child(dbRefAdmin, path)).then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const academicyear_cont = document.getElementById('cluster-view-list-body');
                academicyear_cont.innerHTML = "";
                Object.entries(data).forEach(([key, cluster]) => {
                    if (cluster.name === cluster_name) {
                        for (const property in cluster) {
                            for (const id in cluster[property]) {
                                if (typeof id === 'string' && id.length >= 7) {
                                    getParserFullName(id).then((fullname) => {
                                        academicyear_cont.innerHTML += `
                                        <section id="tally-cluster">
                                            <span class="parser-id">${id}</span>
                                            <span class="parser-name">${fullname}</span>
                                        </section>`;
                                    });

                                }
                            }
                        }
                    }
                    else {
                        document.getElementById('cluster-id-txt').value = "";
                    }
                });
            } else {

                console.log("No data available");
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


function disableRemoveClusterId() {
    document.getElementById("remove-clusterid-btn").style.backgroundColor = '#dcdcdc';
    document.getElementById("remove-clusterid-btn").disabled = true;
}
function enableRemoveClusterId() {
    document.getElementById("remove-clusterid-btn").style.backgroundColor = '#f30505';
    document.getElementById("remove-clusterid-btn").disabled = false;
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