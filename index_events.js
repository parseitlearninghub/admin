window.onload = function () {
    document.getElementById("superadmin").addEventListener("click", (event) => {
        document.getElementById("superadmin").style.borderRadius = "5px 5px 0px 0px";
        if (document.getElementById("superadmin").value === "off") {
            document.getElementById("sadminmenu").style.display = "flex";
            document.getElementById("superadmin").value = "on";
        }
        else {
            document.getElementById("sadminmenu").style.display = "none";
            document.getElementById("superadmin").value = "off";
            document.getElementById("superadmin").style.borderRadius = "5px 5px 5px 5px";
        }

    });

    document.getElementById("admin").addEventListener("click", (event) => {
        document.getElementById("admin").style.borderRadius = "5px 5px 0px 0px";
        if (document.getElementById("admin").value === "off") {
            document.getElementById("adminmenu").style.display = "flex";
            document.getElementById("admin").value = "on";
        }
        else {
            document.getElementById("adminmenu").style.display = "none";
            document.getElementById("admin").value = "off";
            document.getElementById("admin").style.borderRadius = "5px 5px 5px 5px";
        }

    });

    document.getElementById("btnmenu").addEventListener("click", (event) => {
        document.getElementById("gridmenu").style.display = "flex";
    });

    if (document.getElementById("school_year").value === "start") {
        document.getElementById("endsemester").style.backgroundColor = "transparent";
        document.getElementById("endsemester").style.color = "#fefefe";

        document.getElementById("startsemester").style.backgroundColor = "#fefefe";
        document.getElementById("startsemester").style.color = "#ff3334";
    }
    else {
        document.getElementById("startsemester").style.backgroundColor = "transparent";
        document.getElementById("startsemester").style.color = "#fefefe";

        document.getElementById("endsemester").style.backgroundColor = "#fefefe";
        document.getElementById("endsemester").style.color = "#ff3334";
    }

    if (document.getElementById("semester_val").value === "1") {
        document.getElementById("sem2").style.backgroundColor = "transparent";
        document.getElementById("sem2").style.color = "#fefefe";

        document.getElementById("sem1").style.backgroundColor = "#fefefe";
        document.getElementById("sem1").style.color = "#ff3334";
    }
    else {
        document.getElementById("sem1").style.backgroundColor = "transparent";
        document.getElementById("sem1").style.color = "#fefefe";

        document.getElementById("sem2").style.backgroundColor = "#fefefe";
        document.getElementById("sem2").style.color = "#ff3334";
    }

    document.getElementById("startsemester").addEventListener("click", (event) => {
        document.getElementById("inputaccesskey").style.display = "none";
        document.getElementById("btnaccess").style.display = "none";
        document.getElementById("yearemail").value = "";
        document.getElementById("yearaccess").value = "";
        if (document.getElementById("school_year").value === "start") {
            document.getElementById("yeardiv").style.borderRadius = "5px 5px 5px 5px";
            document.getElementById("yearoptions").style.display = "none";
            //console.log('same');
        }
        else {
            document.getElementById("yeardiv").style.borderRadius = "5px 5px 0px 0px";
            document.getElementById("yearoptions").style.display = "flex";
            //console.log('not same');
        }

        document.getElementById("currschool_year").value = "start";

        document.getElementById("endsemester").style.backgroundColor = "transparent";
        document.getElementById("endsemester").style.color = "#fefefe";

        document.getElementById("startsemester").style.backgroundColor = "#fefefe";
        document.getElementById("startsemester").style.color = "#ff3334";


    });

    document.getElementById("endsemester").addEventListener("click", (event) => {
        document.getElementById("inputaccesskey").style.display = "none";
        document.getElementById("btnaccess").style.display = "none";
        document.getElementById("yearemail").value = "";
        document.getElementById("yearaccess").value = "";
        if (document.getElementById("school_year").value === "end") {
            document.getElementById("yeardiv").style.borderRadius = "5px 5px 5px 5px";
            document.getElementById("yearoptions").style.display = "none";
            //console.log('same');
        }
        else {
            document.getElementById("yeardiv").style.borderRadius = "5px 5px 0px 0px";
            document.getElementById("yearoptions").style.display = "flex";
            //console.log('not same');
        }
        document.getElementById("startsemester").style.backgroundColor = "transparent";
        document.getElementById("startsemester").style.color = "#fefefe";

        document.getElementById("endsemester").style.backgroundColor = "#fefefe";
        document.getElementById("endsemester").style.color = "#ff3334";

        document.getElementById("currschool_year").value = "end";
    });

    document.getElementById("btnsendaccesskey").addEventListener("click", (event) => {
        //document.getElementById("inputgmailadd").style.display = "none";
        //document.getElementById("btnsendaccesskey").style.display = "none";

        document.getElementById("inputaccesskey").style.display = "flex";
        document.getElementById("btnaccess").style.display = "block";
    })


    //yff
    document.getElementById("sem1").addEventListener("click", (event) => {
        document.getElementById("inputaccesskeyx").style.display = "none";
        document.getElementById("btnaccessx").style.display = "none";
        document.getElementById("sememail").value = "";
        document.getElementById("semaccess").value = "";
        if (document.getElementById("semester_val").value === "1") {
            document.getElementById("semesterdiv").style.borderRadius = "5px 5px 5px 5px";
            document.getElementById("semoptions").style.display = "none";
            //console.log('same');
        }
        else {
            document.getElementById("semesterdiv").style.borderRadius = "5px 5px 0px 0px";
            document.getElementById("semoptions").style.display = "flex";
            //console.log('not same');
        }

        document.getElementById("currsemester_val").value = "1";

        document.getElementById("sem2").style.backgroundColor = "transparent";
        document.getElementById("sem2").style.color = "#fefefe";

        document.getElementById("sem1").style.backgroundColor = "#fefefe";
        document.getElementById("sem1").style.color = "#ff3334";


    });

    document.getElementById("sem2").addEventListener("click", (event) => {
        document.getElementById("inputaccesskeyx").style.display = "none";
        document.getElementById("btnaccessx").style.display = "none";
        document.getElementById("sememail").value = "";
        document.getElementById("semaccess").value = "";
        if (document.getElementById("semester_val").value === "2") {
            document.getElementById("semesterdiv").style.borderRadius = "5px 5px 5px 5px";
            document.getElementById("semoptions").style.display = "none";
            //console.log('same');
        }
        else {
            document.getElementById("semesterdiv").style.borderRadius = "5px 5px 0px 0px";
            document.getElementById("semoptions").style.display = "flex";
            //console.log('not same');
        }
        document.getElementById("sem1").style.backgroundColor = "transparent";
        document.getElementById("sem1").style.color = "#fefefe";

        document.getElementById("sem2").style.backgroundColor = "#fefefe";
        document.getElementById("sem2").style.color = "#ff3334";

        document.getElementById("currsemester_val").value = "2";
    });

    document.getElementById("btnsendaccesskeyx").addEventListener("click", (event) => {
        //document.getElementById("inputgmailadd").style.display = "none";
        //document.getElementById("btnsendaccesskey").style.display = "none";

        document.getElementById("inputaccesskeyx").style.display = "flex";
        document.getElementById("btnaccessx").style.display = "block";
    })
}