// function signout() {
//     localStorage.removeItem("user-parser-admin");
//     window.location.href = "login.html";
// }
// document.getElementById("username").innerText = localStorage.getItem("user-parser-admin");

window.addEventListener("load", function () {
    setScreenSize(window.innerWidth, window.innerHeight);
});


//functions
function setScreenSize(width, height) {
    document.body.style.width = width + "px";
    document.body.style.height = height + "px";
}

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