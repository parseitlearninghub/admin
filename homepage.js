function signout() {
    localStorage.removeItem("user-parser");
    window.location.href = "login.html";
}
document.getElementById("username").innerText = localStorage.getItem("user-parser");