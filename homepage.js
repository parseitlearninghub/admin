
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
    showSection(1)
});
document.getElementById("second_radio").addEventListener("click", function () {
    showSection(2)
});
document.getElementById("third_radio").addEventListener("click", function () {
    showSection(3)
});
document.getElementById("fourth_radio").addEventListener("click", function () {
    showSection(4)
});


//functions
function setScreenSize(width, height) {
    document.body.style.width = width + "px";
    document.body.style.height = height + "px";
}

function showSection(year) {
    let section_a = "";
    let section_b = "";
    if (year === 1) {
        section_a = "1A - Microsoft";
        section_b = "1B - Google";
    }

    if (year === 2) {
        section_a = "2A - Section B";
        section_b = "2B - Section A";

    }

    if (year === 3) {
        section_a = "3A - Section A";
        section_b = "3B - Section B";
    }

    if (year === 4) {
        section_a = "4A - Xamarin";
        section_b = "4B - Laravel";

    }

    document.getElementById("section-1").innerText = section_a;
    document.getElementById("section-2").innerText = section_b;
    document.getElementById("input-section").style.display = "flex";

}