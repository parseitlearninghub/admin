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