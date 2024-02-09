"use strict";

//Variabler
let openBtnEl = document.getElementById("openmenu");
let closeBtnEl = document.getElementById("closemenu");

//Händelsehanterare
openBtnEl.addEventListener("click", toggleMenu);
closeBtnEl.addEventListener("click", toggleMenu);

//Funktion för att öppna och stänga huvudmenyn
function toggleMenu() {
    let navMenuEl = document.getElementById("huvudmeny");

    let style = window.getComputedStyle(navMenuEl);

    if(style.display === "none") {
        navMenuEl.style.display = "block";
    } else {
        navMenuEl.style.display = "none";
    }
}